import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Entity automation — releases a build when Membership count reaches milestones (100, 200, 300, etc.)
 * Set up with create_automation:
 * - automation_type: "entity"
 * - entity_name: "Membership"
 * - event_types: ["create"]
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Count total memberships
    const memberships = await base44.asServiceRole.entities.Membership.list();
    const totalMembers = memberships.length;

    // Check if we've hit a 100-member milestone
    if (totalMembers % 100 !== 0) {
      return Response.json({
        message: 'No milestone reached',
        current_members: totalMembers,
      }, { status: 200 });
    }

    // Get the next unreleased build
    const unreleased = await base44.asServiceRole.entities.Build.filter({
      is_published: false
    }, 'created_date', 1);

    if (unreleased.length === 0) {
      return Response.json({
        message: 'No unreleased builds to release',
        current_members: totalMembers,
        milestone_reached: true,
      }, { status: 200 });
    }

    const build = unreleased[0];

    // Publish the build
    await base44.asServiceRole.entities.Build.update(build.id, {
      is_published: true,
      release_date: new Date().toISOString().split('T')[0],
    });

    // Track milestone event
    await base44.analytics.track({
      eventName: 'build_released_milestone',
      properties: {
        build_id: build.id,
        build_title: build.title,
        member_count: totalMembers,
        milestone: Math.floor(totalMembers / 100) * 100,
      }
    });

    return Response.json({
      message: 'Build released on milestone',
      build_id: build.id,
      build_title: build.title,
      member_milestone: totalMembers,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});