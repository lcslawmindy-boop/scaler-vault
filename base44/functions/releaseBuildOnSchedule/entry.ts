import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Scheduled automation — releases a build every 2 weeks
 * Set up with create_automation:
 * - automation_type: "scheduled"
 * - repeat_interval: 2
 * - repeat_unit: "weeks"
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get the next unreleased build (by creation order)
    const unreleased = await base44.asServiceRole.entities.Build.filter({
      is_published: false
    }, 'created_date', 1);

    if (unreleased.length === 0) {
      return Response.json({ message: 'No unreleased builds found' }, { status: 200 });
    }

    const build = unreleased[0];

    // Publish the build
    await base44.asServiceRole.entities.Build.update(build.id, {
      is_published: true,
      release_date: new Date().toISOString().split('T')[0],
    });

    // Track event
    await base44.analytics.track({
      eventName: 'build_released_scheduled',
      properties: { build_id: build.id, build_title: build.title }
    });

    return Response.json({
      message: 'Build released successfully',
      build_id: build.id,
      build_title: build.title,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});