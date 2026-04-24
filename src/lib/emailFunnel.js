// 7-Day Email Funnel — Scalar Venture Vault
// Direct response copy optimized for curiosity → value → urgency → conversion

export const EMAIL_FUNNEL = [
  {
    day: 0,
    tag: 'Welcome',
    subject: "You're in. Here's what most engineers never find out.",
    preview: "Welcome to the Vault — and a heads up about what's inside.",
    body: `Hey {{name}},

You just joined a small group of engineers who decided that reading abstracts wasn't enough.

Most people find out about Scalar Vault, poke around the previews, and leave.

You didn't.

That already puts you in a different category.

Here's what's waiting for you inside the full vault:

→ Complete build frameworks — not "how it works" but "how to build it"
→ Full BOMs with exact part numbers, quantities, and sourcing links
→ Market context for each build — so you understand the commercial angle
→ Execution systems that take you from zero components to working prototype

Right now you have free preview access. You can see the first section of every build.

What you can't see: the full step-by-step breakdowns, the supplier-verified component lists, and the tested assembly sequences.

I'll be sending you one email a day for the next week. Each one covers a different build category and gives you a real look inside what Pro members are building.

After that, you decide.

— The Scalar Team

P.S. The most popular build right now is the EEG Brain-Computer Interface. 23 engineers started it this month. Here's a free preview: [View Build →]`,
    cta_text: 'See What Pro Members Are Building',
    cta_url: '/vault',
    color: 'cyan',
  },
  {
    day: 1,
    tag: 'Curiosity',
    subject: "What happens inside a brain-computer interface (and how to build one)",
    preview: "The components cost $680. The knowledge is worth considerably more.",
    body: `Hey {{name}},

In 2024, a team at Neuralink made headlines for letting a paralyzed patient control a computer with his thoughts.

The hardware they used? A variation of what you can build on your workbench for $680.

I'm not exaggerating.

The core of any EEG-based BCI is:
- A set of electrodes that detect microvolt-level electrical signals from your scalp
- An instrumentation amplifier with a common-mode rejection ratio above 80dB
- A microcontroller that samples and transmits that data in real time
- Signal processing software that classifies alpha/beta/theta wave patterns

The difference between a Neuralink and your build isn't the principle. It's the precision of the surgical implant and the ML model trained on millions of data points.

You can replicate the principle. Today.

Inside the vault, we have a full EEG BCI build guide that covers:

✓ Dry vs wet electrode design tradeoffs
✓ ADS1299 analog front-end wiring (the same chip Texas Instruments sells to medical device companies)
✓ ESP32 integration for wireless data streaming
✓ Real-time alpha wave detection in Python

Here's what the preview won't show you: the exact amplifier gain configuration that eliminates 60Hz powerline noise — the #1 problem every first-time builder hits.

That's in the Pro guide.

Want it? [Unlock the Full EEG Build →]

— The Scalar Team

P.S. The starter kit for this build ships in 3-5 days. Components pre-matched and tested.`,
    cta_text: 'Unlock the Full EEG Build',
    cta_url: '/build',
    color: 'cyan',
  },
  {
    day: 2,
    tag: 'Value',
    subject: "The $450 build that demonstrates the principle behind wireless charging",
    preview: "Tesla figured this out in 1899. Here's the modern implementation.",
    body: `Hey {{name}},

Nikola Tesla spent his final years trying to prove that power could be transmitted wirelessly at scale.

He was right. He was just 120 years early.

Today, wireless charging is a $30 billion market. Every iPhone has it. Every EV uses a version of it. Hospitals use resonant power transfer for implanted devices.

The underlying physics: a resonant Tesla coil.

And you can build one for $450.

Inside the Scalar Vault Tesla Coil Power Transmitter build, you get:

→ LC circuit calculations — how to tune your coil to the exact resonant frequency
→ MOSFET half-bridge driver schematic — the switching circuit that makes it work
→ Secondary coil winding guide — turn count, wire gauge, and layering technique
→ Safety systems — because 400V is not something you eyeball

Here's what most DIY guides miss: the impedance matching between primary and secondary. Get it wrong and your efficiency drops to 15%. Get it right and you're transmitting power with 85%+ efficiency.

The full guide shows you exactly how to calculate and tune it.

Three engineers told us this build alone was worth the entire Pro subscription.

[See the Full Tesla Coil Build →]

— The Scalar Team

P.S. This one has a starter kit. Everything pre-sourced, pre-matched. Saves you 6 hours of component hunting.`,
    cta_text: 'See the Full Tesla Coil Build',
    cta_url: '/vault',
    color: 'purple',
  },
  {
    day: 3,
    tag: 'Social Proof',
    subject: "What 2,400 engineers are actually building (and what it's costing them not to)",
    preview: "Most engineers waste 40 hours on research that already exists.",
    body: `Hey {{name}},

Here's the honest version of what happens when engineers try to build advanced systems without a structured guide:

Week 1: Research phase. Watching YouTube, reading forum posts, bookmarking data sheets.
Week 2: Component ordering. Getting it wrong. Reordering.
Week 3: Assembly. Hitting a problem no forum post addresses.
Week 4: Debugging. Or giving up.

This is the standard path. It costs you 4 weeks minimum and usually $200-400 in wrong parts.

The 2,400 engineers inside the Scalar Vault took a different path.

They started with a build that already had:
- The research done and verified
- The correct components listed with part numbers
- The failure points documented and solved
- The execution sequence optimized from real builds

What they said:

"I built the EEG system in 11 days. Would have taken me 6 months to figure out the amplifier stage alone." — James K., RF Engineer

"The BOM alone saved me $300 in wrong parts. Everything on the list is exactly what you need." — Priya M., Embedded Systems

"I've subscribed to technical publications for years. This is the first resource that actually tells you how to execute." — David R., Electrical Engineer

The cost of Pro membership: $99/month.
The cost of figuring this out alone: 40+ hours and $300 in mistakes. Every. Single. Build.

[Join 2,400 Engineers in the Vault →]

— The Scalar Team`,
    cta_text: 'Join 2,400 Engineers in the Vault',
    cta_url: '/pricing',
    color: 'cyan',
  },
  {
    day: 4,
    tag: 'Objection Handle',
    subject: "\"Is this actually worth $99/month?\" — I'll answer that directly.",
    preview: "A direct answer to the question most people don't ask out loud.",
    body: `Hey {{name}},

I want to address something directly.

When you look at a $99/month subscription, the question running in the back of your head is:

"Is this actually worth it? Or is this just documentation I could find for free?"

Fair question. Here's the honest answer.

95% of what's in the Scalar Vault does exist online — scattered across IEEE papers, forum threads, Reddit posts, data sheets, YouTube comments, and out-of-print textbooks.

The 5% that doesn't exist anywhere else: the integration layer. The part that tells you how these pieces fit together, in what order, with what tolerances, and what goes wrong at each step.

That 5% is what takes a pile of components and turns it into a working system.

Here's a concrete example.

The Tesla Coil build. The secondary coil winding. Every guide online tells you the turn count. None of them tell you that the interlayer capacitance of a tightly wound coil shifts your resonant frequency by 8-12% — and exactly how to compensate for it. We documented that from a failed build. It's on page 4 of the assembly guide.

That's what $99/month buys.

Not documentation. Problem-solving that's already been done, so you don't have to do it.

Still not sure? Here's the guarantee: if you go through any build in the first 30 days and don't think it was worth it, email us and we'll refund you. No questions, no retention calls.

[Start Your 30-Day Risk-Free Access →]

— The Scalar Team

P.S. The Starter plan is $49/month if $99 feels like a big first step. It's the same vault with a build limit. You can upgrade anytime.`,
    cta_text: 'Start 30-Day Risk-Free Access',
    cta_url: '/pricing',
    color: 'cyan',
  },
  {
    day: 5,
    tag: 'Urgency',
    subject: "New build drops Friday. Pro members get it 48 hours early.",
    preview: "This one's in the bio/signal category. And it's the most requested build we've ever done.",
    body: `Hey {{name}},

Quick note.

Every Friday, a new build drops in the Scalar Vault.

This Friday: EMG Gesture Controller — a wearable armband that reads muscle signals and classifies hand gestures using ML running on a microcontroller.

Practical applications: prosthetic control interfaces, VR interaction, industrial equipment operation, robotics.

Build cost: ~$350.
Time to working prototype: 2-3 weeks with the guide.

Pro members get access 48 hours before the public preview goes live.

That means if you're a Pro member by Thursday night, you wake up Friday morning with the full build guide in your dashboard — before anyone on the free tier sees the first section.

If you're not a member, you'll see the preview. The section that ends right before the electrode array wiring diagram.

The build that most people say is the moment they understood why the subscription exists.

[Unlock Early Access — Join Pro →]

This Friday's build is included in all plans.

— The Scalar Team

P.S. After this email, I have one more for you. Then I'll stop. If Pro isn't right for you right now, that's genuinely okay — the free previews aren't going anywhere.`,
    cta_text: 'Unlock Early Access — Join Pro',
    cta_url: '/pricing',
    color: 'purple',
  },
  {
    day: 6,
    tag: 'Final Push',
    subject: "Last email. Then I'll leave you alone.",
    preview: "One question before I go.",
    body: `Hey {{name}},

This is the last email in this sequence.

I want to ask you one question before I stop.

What's the system you've been meaning to build?

Not the concept. The actual thing. The project that's been sitting in a notes doc or a sketchbook for months — maybe years. The one where you got 20% through the research and hit a wall you didn't have time to climb.

That build exists in the Scalar Vault. Or something close to it that teaches you exactly what you need to build it yourself.

I'm not going to give you another list of features or another testimonial.

I'll just tell you what I know:

The engineers who join the vault and actually execute a build describe it the same way. Not as "learning." As remembering why they got into engineering in the first place.

That feeling — of working with your hands and your mind on something that most people would call impossible — is available to you this weekend.

Pro membership. $99/month. Cancel anytime. 30-day guarantee.

[Open the Vault →]

If you're not ready, that's fine. The previews are free. The AI assistant is free. Come back when you are.

But if you are ready — don't wait for a better moment. There isn't one. There's just now, and a build waiting.

— The Scalar Team

P.S. If cost is the issue: the Starter plan is $49/month. Same vault, limited builds. Upgrade when you're ready. The important thing is you start.`,
    cta_text: 'Open the Vault',
    cta_url: '/pricing',
    color: 'cyan',
  },
];