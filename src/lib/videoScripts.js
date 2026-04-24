// 30 Short-Form Video Scripts — Scalar Venture Vault
// Optimized for TikTok / Reels / Shorts
// Format: hook (0-2s) → demo idea → CTA

export const VIDEO_SCRIPTS = [
  {
    id: 1,
    title: "The $680 Brain Interface",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "Neuralink costs $1.5 million to develop. You can build the same principle for $680.",
    demo: "Show a live EEG signal appearing on a laptop screen from a homemade electrode headset. Point to the waveform — 'this is your brain. That's alpha wave. This is how BCIs work.' Cut to the BOM list. Component count: 11 parts.",
    script: `[0-2s] HOOK ON SCREEN: "Neuralink costs $1.5M to develop. This costs $680."

[2-8s] B-roll: hands placing electrodes on a mannequin head. Laptop screen showing real-time EEG waveforms. Zoom in on the signal spikes.

[8-15s] Voiceover: "This is a brain-computer interface. The same principle behind Neuralink — detecting electrical signals from your brain and converting them into data. You can build this on your workbench."

[15-22s] Screen record: pull up the Scalar Vault BOM. Show 11 components, total cost $680. Highlight the ADS1299 chip — "same chip Texas Instruments sells to medical device companies."

[22-28s] Voiceover: "The full build guide is inside Scalar Vault. Schematics, wiring diagrams, Python code. Everything."

[28-30s] CTA: "Link in bio. Build it this weekend."`,
    cta: "Link in bio — Full build guide at ScalarVault.com",
    tags: ["BCI", "neurotech", "engineering", "build"],
  },
  {
    id: 2,
    title: "The Wireless Power Transmission Secret",
    category: "hidden_systems",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "Tesla figured this out in 1899. It's now a $30 billion industry. Here's how to build it.",
    demo: "Light a bulb with no wires. Hold it in the air next to a coil — it glows. No connection. Slowly move it further away, bulb dims. Show the schematic next to it.",
    script: `[0-2s] Hold up a glowing lightbulb with no wires. Dead silence. Then: "No battery. No wires. This is wireless power transmission."

[2-10s] Show the Tesla coil setup. Narrate: "Two coils, tuned to the same resonant frequency. Power jumps the gap between them. This is how your phone charges on a pad. How EVs charge on the road. How hospitals power implanted devices."

[10-18s] Show the Scalar Vault build page: LC circuit calculations, MOSFET driver schematic, coil winding guide. Scroll slowly. "This build costs $450. The knowledge it gives you? Priceless."

[18-25s] Demo: move the bulb closer and further. Show efficiency reading on a multimeter — 85% at close range.

[25-30s] CTA: "Full schematic and build guide in the vault. Link below."`,
    cta: "Link in bio — ScalarVault.com/build",
    tags: ["Tesla coil", "wireless power", "engineering", "physics"],
  },
  {
    id: 3,
    title: "The Cost Vs Value Drop",
    category: "cost_vs_value",
    platform: ["TikTok", "Reels"],
    hook: "An MIT engineering degree costs $320,000. A Scalar Vault subscription costs $99/month.",
    demo: "Side-by-side split screen: MIT tuition statement vs Scalar Vault subscription page. Then show a finished EEG build on one side, a textbook on the other.",
    script: `[0-2s] SPLIT SCREEN TEXT: "$320,000 MIT degree" vs "$99/month Scalar Vault"

[2-8s] Voiceover: "MIT teaches you the theory. The Vault teaches you to build the thing. Which one do you actually need?"

[8-18s] Show a completed EEG system, Tesla coil, plasma reactor — real builds. "47 advanced engineering systems. Complete BOMs. Step-by-step guides. Supplier links."

[18-25s] Flash the price again. "Forty-seven builds. Ninety-nine dollars a month. That's $2.10 per build."

[25-30s] CTA: "Start building. Link in bio."`,
    cta: "ScalarVault.com — $99/month, cancel anytime",
    tags: ["engineering education", "DIY", "value", "skills"],
  },
  {
    id: 4,
    title: "The Hidden SDR Station",
    category: "hidden_systems",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "Your phone is surrounded by invisible signals. Here's how to see all of them.",
    demo: "Open SDR# software. Show the frequency waterfall — planes, weather satellites, emergency services, all visible. Zoom into an aircraft transponder signal. Decode it live.",
    script: `[0-2s] "Every second, thousands of invisible signals pass through your room. Here's how to see them."

[2-10s] Show SDR waterfall display. Point to different signals: "That's a commercial aircraft. That's a weather satellite. That's your neighbor's wireless security camera." 

[10-18s] Reveal the hardware: a $25 USB dongle. "This is a software-defined radio. Twenty-five dollars. You can receive signals from 100kHz to 1.7GHz. Satellites in orbit. Planes at 35,000 feet. Ships at sea."

[18-25s] Pull up the Scalar Vault build guide: antenna design, software setup, frequency guide. "Full setup guide inside the vault. You'll be receiving satellite imagery within 2 hours."

[25-30s] CTA: "Link in bio. The signals have always been there."`,
    cta: "ScalarVault.com — SDR build guide inside",
    tags: ["SDR", "radio", "signals", "hidden tech"],
  },
  {
    id: 5,
    title: "The Muscle Gesture Controller",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "I controlled a computer with my hand without touching anything.",
    demo: "Wear a homemade EMG armband. Show different hand gestures — fist, open, point — each triggering a different action on screen. Volume up. Slide change. Application launch.",
    script: `[0-2s] Close your fist. Volume on the screen goes to 100%. Open your hand. Volume drops to 0. Look at camera: "I'm not touching anything."

[2-10s] Reveal the armband: "EMG electrodes reading muscle signals. A microcontroller classifying the gestures. Machine learning model trained on 50 gestures."

[10-18s] Show the signal on a scope: "Every time you flex, your muscles fire electrical signals. This armband intercepts them. Classifies them. Converts them into commands."

[18-25s] Scroll through the Scalar Vault guide: electrode array design, MyoWare sensor integration, gesture classification model. "Build cost: $350. Build time: 2 weeks with the guide."

[25-30s] CTA: "Full guide at the link. Build it."`,
    cta: "ScalarVault.com — EMG Gesture Controller build",
    tags: ["EMG", "gesture control", "wearable", "ML"],
  },
  {
    id: 6,
    title: "The $300 Plasma Reactor",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "This is a plasma reactor. It cost $300 to build. It runs at 10,000 volts.",
    demo: "Show a plasma globe-style device with visible plasma arcs. Then show the internal construction — transformer, resonant circuit. Test it by bringing a fluorescent tube near — it glows without contact.",
    script: `[0-2s] Extreme close-up of plasma arcs. "10,000 volts. 300 dollars. Built in a garage."

[2-10s] Pull back to show the full device. Narrate: "Plasma is the fourth state of matter. 99% of the visible universe is plasma. The sun is plasma. And you can create it on your workbench."

[10-18s] Walk through the components: "High-voltage transformer, resonant LC circuit, copper electrode array. Eleven parts total." Show the BOM on screen.

[18-25s] Demo: bring a fluorescent tube near the device. It glows without being plugged in. "Wireless power transfer through ionized gas."

[25-30s] CTA: "Full schematic and safety guide in the Scalar Vault. Link in bio. Don't build this without reading the safety section."`,
    cta: "ScalarVault.com — Plasma Reactor build (with safety guide)",
    tags: ["plasma", "high voltage", "physics", "engineering"],
  },
  {
    id: 7,
    title: "The Monetization Angle",
    category: "monetization",
    platform: ["TikTok", "Reels"],
    hook: "Engineers who can build bio-signal systems charge $150/hour as consultants. The build costs $680.",
    demo: "Show Upwork/LinkedIn freelance listings for embedded systems engineers, neurotech consultants, biosignal processing. Circle the hourly rates. Then show the Scalar Vault subscription cost.",
    script: `[0-2s] Screen record: Upwork listing. "Biosignal Systems Engineer — $150/hr." Freeze frame.

[2-10s] "If you can build a working EEG system, you can charge $150 an hour as a consultant. The components cost $680. One consulting day pays for the build 10 times over."

[10-18s] Show 5 more listings: SDR engineer, embedded ML engineer, wireless power consultant, prosthetics hardware. All $100-200/hr. "These are real skills. Real market demand. Real money."

[18-25s] Show Scalar Vault: "47 builds. Each one is a marketable skill. The subscription is $99/month." Do the math on screen: 1 consulting hour pays for 18 months of access.

[25-30s] CTA: "The ROI is obvious. Link in bio."`,
    cta: "ScalarVault.com — Build the skill. Charge for it.",
    tags: ["freelance", "engineering career", "ROI", "consulting"],
  },
  {
    id: 8,
    title: "The Part Nobody Talks About",
    category: "hidden_systems",
    platform: ["TikTok", "Shorts"],
    hook: "Every engineering guide online shows you 90% of the build. Here's the 10% they leave out.",
    demo: "Pull up a popular YouTube tutorial on Tesla coil building. Pause at the coil winding section. Show the step they skip. Then open the Scalar Vault guide and show the exact calculation they omit.",
    script: `[0-2s] "Every free engineering guide online shows you 90% of the build. I'm going to show you the 10% they always leave out."

[2-12s] Pull up a popular coil winding tutorial. "See here — they tell you 400 turns of 28AWG wire. But they never tell you that the interlayer capacitance of a tightly wound coil shifts your resonant frequency by up to 12%. Your build will work at 30% efficiency and you'll never know why."

[12-20s] Open Scalar Vault guide. "This is page 4 of our Tesla coil guide. Here's the compensation calculation. Here's the winding technique that eliminates the problem. We documented this from a failed build."

[20-28s] "The free guides teach you the theory. The vault teaches you why the theory fails in practice, and how to fix it."

[28-30s] CTA: "Link in bio. Stop building broken things."`,
    cta: "ScalarVault.com — The full picture, not just the theory",
    tags: ["engineering fails", "DIY tips", "Tesla coil", "hidden knowledge"],
  },
  {
    id: 9,
    title: "The Satellite Imagery Pull",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "I downloaded a live satellite image from space using a $25 USB stick.",
    demo: "Show the full process: SDR dongle in laptop, antenna pointing out window, NOAA satellite passing overhead, image downloading in real time, final weather satellite image displayed.",
    script: `[0-2s] Show a weather satellite image downloading in real-time. "I just received this from a satellite 530 miles above the Earth. Using a $25 USB stick."

[2-12s] Walk through the setup: "RTL-SDR dongle. Dipole antenna made from coat hangers. Free software called WXtoImg. When NOAA-15 passes overhead, you can receive its direct broadcast signal and decode it into an image."

[12-20s] Show the final image: cloud formations, coastlines, visible from space. "This is real-time satellite weather data. Available to anyone with $25 and the right setup."

[20-28s] Pull up the Scalar Vault SDR guide: antenna design, software walkthrough, frequency schedule, satellite pass prediction. "Complete guide inside the vault."

[28-30s] CTA: "The satellites are broadcasting right now. Link in bio."`,
    cta: "ScalarVault.com — SDR Satellite Receiver build",
    tags: ["satellite", "SDR", "NOAA", "space"],
  },
  {
    id: 10,
    title: "The 40-Hour Save",
    category: "cost_vs_value",
    platform: ["TikTok", "Reels"],
    hook: "I spent 40 hours researching this build before I found the guide. You won't have to.",
    demo: "Show browser with 47 tabs open — forum posts, data sheets, YouTube videos. Then show the Scalar Vault guide: clean, structured, complete. Side-by-side comparison.",
    script: `[0-2s] Screen record: 47 browser tabs. Reddit threads. IEEE papers. YouTube. "This is what building without a guide looks like."

[2-10s] "I spent 40 hours in this before I had a working schematic. Wrong parts. Failed assemblies. Forum posts with no answers. This is what the standard engineering DIY experience looks like."

[10-20s] Switch to Scalar Vault guide: clean layout, numbered steps, sourced BOM. "This is what 40 hours of research, distilled into an execution guide, looks like. Every part. Every step. Every failure point documented."

[20-28s] "The subscription is $99/month. Your time is worth more than $2.47/hour. Do the math."

[28-30s] CTA: "Stop researching. Start building. Link in bio."`,
    cta: "ScalarVault.com — Skip the research. Just build.",
    tags: ["productivity", "engineering", "time savings", "DIY"],
  },
  {
    id: 11,
    title: "The Prosthetic Hand Control",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "I built a prosthetic hand that responds to muscle signals. Total cost: $420.",
    demo: "Show a 3D-printed robotic hand. Wear an EMG armband. Flex fingers — the hand mirrors the movement in real time. Show the signal processing happening on a laptop between them.",
    script: `[0-2s] Close your fist. A 3D-printed robotic hand across the table closes its fingers simultaneously. No physical connection.

[2-12s] Explain: "EMG armband reads muscle signals from my forearm. Arduino processes the signal. Servo motors in the hand respond. The signal delay is under 50 milliseconds — faster than conscious thought."

[12-20s] Show the build breakdown: 3D-printed hand design files, EMG sensor circuit, servo control code. "This is the same principle used in $80,000 clinical prosthetics. Your build: $420."

[20-28s] Pull up the Scalar Vault guide. Show the EMG processing section, servo mapping algorithm. "Full guide, CAD files, and code included."

[28-30s] CTA: "Link in bio. This is real hardware."`,
    cta: "ScalarVault.com — Prosthetic hand build guide",
    tags: ["prosthetics", "robotics", "EMG", "biomedical"],
  },
  {
    id: 12,
    title: "The $49 Entry Point",
    category: "cost_vs_value",
    platform: ["TikTok", "Reels"],
    hook: "For $49 a month, you get access to 47 advanced engineering build guides. That's $1.04 per build.",
    demo: "Calculator on screen doing the math. Then scroll through vault categories: Energy, Bio/Signal, Communication, Demo Builds. Show thumbnail previews of each.",
    script: `[0-2s] Calculator screen: "47 builds ÷ $49 = $1.04 per build." Hold on that number.

[2-10s] "A single engineering textbook costs $200 and covers theory. The Scalar Vault covers execution. Forty-seven builds. Full schematics. Sourced BOMs. Step-by-step guides. One dollar and four cents each."

[10-20s] Scroll through the vault: Tesla coil, EEG system, SDR station, plasma reactor, EMG controller, laser communication link, plasma speaker. "These aren't projects. These are systems."

[20-28s] "Starter plan is $49/month. Pro is $99. Both include access to the full vault. Cancel anytime. 30-day guarantee."

[28-30s] CTA: "Do the math. Link in bio."`,
    cta: "ScalarVault.com — Starter plan from $49/month",
    tags: ["value", "affordable", "engineering", "education"],
  },
  {
    id: 13,
    title: "The Laser Communication Link",
    category: "hidden_systems",
    platform: ["TikTok", "Shorts"],
    hook: "I transmitted audio through a beam of light across my apartment.",
    demo: "Show a laser pointed at a photoresistor 10 feet away. Play music through the laser transmitter — it plays out the receiver. Block the beam with your hand — music stops instantly.",
    script: `[0-2s] Music playing. Block a laser beam with your hand. Music stops. Remove hand. Music resumes. "The audio is traveling through light."

[2-12s] "This is a free-space optical communication link. The audio signal modulates the intensity of the laser. A photodiode on the other end demodulates it back into sound. This is how fiber optic cables work — just without the fiber."

[12-20s] Show the circuit: laser driver circuit, op-amp modulator, transimpedance amplifier receiver. "Total build cost: $85. The principle is identical to the system that carries 95% of global internet traffic."

[20-28s] Pull up Scalar Vault guide: modulator design, receiver sensitivity optimization, alignment system. "Full guide inside the vault."

[28-30s] CTA: "Light. Sound. $85. Link in bio."`,
    cta: "ScalarVault.com — Laser Comms build guide",
    tags: ["laser", "optical", "communication", "physics"],
  },
  {
    id: 14,
    title: "The RFID Cloner Reality Check",
    category: "hidden_systems",
    platform: ["TikTok", "Reels"],
    hook: "Most access cards can be cloned in 3 seconds with a $30 device. Here's how they work.",
    demo: "Show an RFID card. Show an Arduino with an RFID reader module. Scan the card — UID appears. Write it to a blank card. New card opens the same reader. Educational breakdown of why low-frequency RFID is inherently insecure.",
    script: `[0-2s] Scan an office access card with a small Arduino device. "I just read the UID of this access card. It took 3 seconds."

[2-12s] "Most 125kHz RFID cards — the ones used in millions of offices and apartment buildings — have zero encryption. They broadcast their ID to any reader in range. Understanding this is the first step to building secure systems."

[12-20s] Explain the hardware: "RC522 RFID module. Arduino Nano. $30 in parts. This is a study tool — not a hacking device. Knowing how these systems fail is how you design better ones."

[20-28s] Show Scalar Vault RFID module guide: card architecture, secure alternatives (MIFARE DESFire), reader circuit design. "Full educational guide inside the vault."

[28-30s] CTA: "Understand the systems around you. Link in bio."`,
    cta: "ScalarVault.com — RFID Systems build guide",
    tags: ["RFID", "security", "embedded systems", "educational"],
  },
  {
    id: 15,
    title: "The 11-Day Build",
    category: "social_proof",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "It took me 11 days to build a working EEG system from scratch. Here's every day.",
    demo: "Time-lapse or day-by-day montage: Day 1 — components arrive. Day 3 — PCB assembled. Day 5 — first noisy signal. Day 7 — clean signal with filtering. Day 9 — alpha wave detection. Day 11 — classifying mental states.",
    script: `[0-2s] "Day 1 to Day 11. Building an EEG brain-computer interface from scratch. Let's go."

[2-20s] MONTAGE:
"Day 1: Components arrive. ADS1299 evaluation board, electrodes, ESP32."
"Day 3: First circuit assembly. Nothing works."  
"Day 5: First signal. Mostly noise."
"Day 7: Implemented the notch filter. 60Hz noise gone. Clean signal."
"Day 9: Alpha wave detection working. Eyes open = low alpha. Eyes closed = high alpha."
"Day 11: Real-time mental state classification. Focus vs relaxed vs drowsy."

[20-28s] "Total cost: $680. Guide from Scalar Vault: cut 4 weeks of research down to 11 days. The BOM alone saved me $200 in wrong parts."

[28-30s] CTA: "Your 11 days start now. Link in bio."`,
    cta: "ScalarVault.com — EEG BCI build guide",
    tags: ["build log", "EEG", "progress", "timelapse"],
  },
  {
    id: 16,
    title: "The Plasma Speaker",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "This speaker has no moving parts. The sound comes directly from plasma.",
    demo: "Show a plasma speaker arc making music. The arc visibly pulses with the audio. No cone, no diaphragm. Just ionized air vibrating at audio frequencies.",
    script: `[0-2s] A plasma arc producing visible, audible music. "No speaker cone. No diaphragm. The sound is coming directly from plasma."

[2-12s] "When you modulate high-frequency plasma at audio frequencies, the ionized air itself vibrates and produces sound. Zero moving parts. Zero mass. Theoretically infinite frequency response. This is how a plasma speaker works."

[12-20s] Show the circuit: "SSTC driver circuit, audio modulation input, safety enclosure. Build cost: $220. Warning: this runs at high voltage. Read the safety section before building."

[20-28s] Pull up the Scalar Vault guide: SSTC circuit design, audio modulation technique, safety enclosure specs. Show the waveform on an oscilloscope — "clean audio modulation on a 300kHz carrier."

[28-30s] CTA: "Sound from plasma. $220. Link in bio."`,
    cta: "ScalarVault.com — Plasma Speaker build guide",
    tags: ["plasma speaker", "audio", "high voltage", "physics"],
  },
  {
    id: 17,
    title: "The Components Are Cheap. The Knowledge Isn't.",
    category: "cost_vs_value",
    platform: ["TikTok", "Reels"],
    hook: "The components for an EEG system cost $680. The knowledge to build it correctly costs nothing — if you know where to look.",
    demo: "Show the component list — $680. Then show the average salary for a neurotech engineer — $140k/year. Then show the Scalar Vault subscription — $99/month.",
    script: `[0-2s] Three numbers on screen: "$680 in components." "$140,000 average neurotech engineer salary." "$99/month Scalar Vault."

[2-12s] "The gap between knowing how something works and being able to build it is called execution. That gap is where careers are made. The components are cheap. Anyone can order them. What's rare is knowing exactly how to put them together."

[12-22s] "The Scalar Vault closes that gap. Not with theory — with complete, tested build guides that take you from a box of components to a working system. Every failure point documented. Every supplier link included."

[22-28s] "The engineers who can build these systems charge $100-200 an hour. The subscription to learn from them is $99 a month."

[28-30s] CTA: "Close the gap. Link in bio."`,
    cta: "ScalarVault.com — Build the skills that pay",
    tags: ["skills", "career", "neurotech", "ROI"],
  },
  {
    id: 18,
    title: "The Frequency You Can't Hear",
    category: "hidden_systems",
    platform: ["TikTok", "Shorts"],
    hook: "There are audio frequencies playing in your room right now that you can't hear. Here's how to detect them.",
    demo: "Show an ultrasonic transducer circuit. Point it at different objects. Show the reflected signal on a scope — and distance readout. Then show bat-detector mode — converting ultrasonic signals to audible range.",
    script: `[0-2s] "There's ultrasound in this room right now. Most of it from your own devices. Here's how to hear it."

[2-12s] "Any piezoelectric transducer can detect ultrasonic frequencies — above 20kHz, beyond human hearing. Motion detectors, range finders, bats, dolphins, medical ultrasound — all use the same basic principle. A crystal that converts vibration to electrical signal."

[12-20s] "We built a bat detector. It downconverts ultrasonic signals into audible range using a heterodyne circuit. Turn it on near a running laptop and you can hear the switching frequency of the power supply. Near a motion sensor: the 40kHz ping."

[20-28s] Show Scalar Vault ultrasonic module: transducer circuit, heterodyne downconverter, range finder application. Build cost: $45.

[28-30s] CTA: "Hear what you've been missing. Link in bio."`,
    cta: "ScalarVault.com — Ultrasonic Systems build guide",
    tags: ["ultrasonic", "bat detector", "sensors", "hidden signals"],
  },
  {
    id: 19,
    title: "The Market That Needs This",
    category: "monetization",
    platform: ["TikTok", "Reels"],
    hook: "The global brain-computer interface market hits $5.4 billion by 2030. The engineers who can prototype these systems are already rare.",
    demo: "Show market research graphics, job listings, startup funding announcements. Then cut to a $680 workbench build that demonstrates the same core technology.",
    script: `[0-2s] Headline text: "$5.4 billion BCI market by 2030." Then: "The engineers who can prototype this are already rare."

[2-12s] "Neurable, Kernel, Emotiv, OpenBCI — these companies are competing for engineers who understand biosignal acquisition, analog front-end design, and real-time signal processing. The barrier to entry isn't intelligence. It's access to the right build experience."

[12-22s] "Every build in the Scalar Vault teaches a technology stack that's actively valued in the market: EEG systems, EMG interfaces, wireless biotelemetry, signal classification. You don't need a PhD. You need a working prototype and the ability to explain how you built it."

[22-28s] "The vault gives you both. $99/month. Cancel when you've got the skill."

[28-30s] CTA: "The market is here. Link in bio."`,
    cta: "ScalarVault.com — Build market-ready skills",
    tags: ["BCI market", "neurotech", "career", "startup"],
  },
  {
    id: 20,
    title: "The Part Number That Changes Everything",
    category: "hidden_systems",
    platform: ["TikTok", "Shorts"],
    hook: "One wrong component in an EEG circuit introduces 60dB of noise. Here's the exact part that fixes it.",
    demo: "Show two oscilloscope traces side-by-side: one with a standard op-amp (noisy signal) vs one with a proper instrumentation amplifier (clean signal). Same circuit. Different chip.",
    script: `[0-2s] "Same circuit. Same electrodes. Two different chips." Show noisy scope trace vs clean trace.

[2-12s] "The left trace uses a standard op-amp. The right uses an instrumentation amplifier with 110dB CMRR. CMRR — common-mode rejection ratio — is the spec that determines how much of the noise it filters out. For EEG signals, you need at least 80dB. The wrong chip gives you noise. The right one gives you your brain."

[12-20s] "The part number is INA128. $4.50 on Mouser. This single substitution is the difference between a build that works and one that sits in a drawer. It's on page 1 of the Scalar Vault EEG guide."

[20-28s] Show the guide: "We document every critical component selection like this. Not just what — but why. And what happens when you get it wrong."

[28-30s] CTA: "Get the right parts list. Link in bio."`,
    cta: "ScalarVault.com — EEG build guide with verified BOM",
    tags: ["EEG", "components", "INA128", "engineering tips"],
  },
  {
    id: 21,
    title: "The Build That Impresses Any Employer",
    category: "monetization",
    platform: ["TikTok", "Reels"],
    hook: "You don't need a new degree. You need a working prototype and a story about how you built it.",
    demo: "Show a GitHub repo with EEG code, a video of the working system, and a LinkedIn post about building it getting 50k views. Cut to job interview scenario.",
    script: `[0-2s] "Employers don't remember GPA. They remember the person who walked into an interview and said 'I built a brain-computer interface on my workbench.'"

[2-12s] "The engineers getting hired in neurotech, embedded ML, and biosignal processing aren't always the ones with the best grades. They're the ones with GitHub repos full of real hardware projects, and the ability to explain every design decision they made."

[12-22s] "Building a full EEG system — schematic to signal classification — demonstrates: analog circuit design, embedded programming, signal processing, data science. That's four skill domains on one build. The Scalar Vault EEG guide walks you through all of it."

[22-28s] "Build it in 11 days. Post it. Interview differently. Subscription: $99/month."

[28-30s] CTA: "Build your portfolio. Link in bio."`,
    cta: "ScalarVault.com — Real builds. Real portfolio.",
    tags: ["career", "portfolio", "hiring", "embedded systems"],
  },
  {
    id: 22,
    title: "The Quantified Self Build",
    category: "curiosity",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "I built a device that tells me my stress level in real time. No app required.",
    demo: "Show a custom GSR (galvanic skin response) wristband. Show the data readout — skin conductance rising during a stressful moment, dropping during relaxed breathing. Correlation to heart rate via a finger clip sensor.",
    script: `[0-2s] Wristband on wrist. Data readout: "Stress: 78/100." Take a deep breath. Watch it drop to 34 in real time.

[2-12s] "This is a galvanic skin response sensor. When you're stressed, your sweat glands activate — even before you consciously register the stress. Your skin conductance rises. This device reads that change 20 times per second."

[12-20s] "The hardware: two silver electrodes, a Wheatstone bridge, an analog amplifier, and a microcontroller. Total: $95. The data it generates is the same data used in clinical stress research and lie detector tests."

[20-28s] Show Scalar Vault biometrics guide: GSR circuit, HRV analysis module, sleep stage classifier. "Full biometrics build suite inside the vault."

[28-30s] CTA: "Know yourself better. Link in bio."`,
    cta: "ScalarVault.com — Biometrics build guide",
    tags: ["biometrics", "stress", "wearable", "health tech"],
  },
  {
    id: 23,
    title: "The 30-Day Guarantee Close",
    category: "cost_vs_value",
    platform: ["TikTok", "Reels"],
    hook: "Try any build in the next 30 days. If it's not worth it, I'll give you your money back.",
    demo: "Show the guarantee card on Scalar Vault. Then show a completed build next to it. Then a calendar with 30 days marked.",
    script: `[0-2s] Text on screen: "30-Day Guarantee. Try any build. If you don't think it's worth it, email us. Full refund."

[2-12s] "I can make that guarantee because the builds work. Because the guides are complete. Because we've documented the failure points and eliminated them. If you go through any build in the first 30 days and don't think the subscription was worth it, email us and we'll refund every dollar."

[12-22s] "No questions. No retention call. No survey. Just a refund." Show the process: email → refund in 3-5 days. "The risk is zero. The only thing you're risking is staying where you are."

[22-28s] Show the vault: 47 builds, every category. "Pick one that excites you. Start this weekend. If it doesn't deliver, cancel for free."

[28-30s] CTA: "Zero risk. Maximum builds. Link in bio."`,
    cta: "ScalarVault.com — 30-day money-back guarantee",
    tags: ["guarantee", "risk-free", "offer", "CTA"],
  },
  {
    id: 24,
    title: "The Underground Knowledge",
    category: "hidden_systems",
    platform: ["TikTok", "Shorts"],
    hook: "There's a tier of engineering knowledge that never makes it into textbooks. This is it.",
    demo: "Flip through a standard electrical engineering textbook — all theory, equations, no execution. Then open a Scalar Vault guide — numbered steps, actual photos, sourced parts.",
    script: `[0-2s] Hold up a $200 EE textbook. "Theory. Equations. Zero builds." Drop it. Pull up Scalar Vault on screen. "Execution."

[2-12s] "Textbooks teach you how circuits work. They don't teach you that the 10% tolerance on a standard resistor makes your filter cut-off frequency drift enough to miss the signal you're looking for. They don't teach you that connector choice affects noise floor. They don't teach you which capacitor types have self-resonance issues at your operating frequency."

[12-22s] "The knowledge that separates engineers who can actually build from engineers who can only calculate — it doesn't live in textbooks. It lives in failed builds, fixed builds, and documented experience. That's what the Scalar Vault is."

[22-28s] Show vault guides: each one dense with practical detail, photos, scope traces. "47 builds. All execution. Zero theory padding."

[28-30s] CTA: "Real knowledge. Link in bio."`,
    cta: "ScalarVault.com — Engineering knowledge that actually builds things",
    tags: ["practical knowledge", "engineering education", "skills", "textbooks"],
  },
  {
    id: 25,
    title: "The Beginner Path",
    category: "cost_vs_value",
    platform: ["TikTok", "Reels"],
    hook: "You don't need an engineering degree to build advanced systems. You need a starting point.",
    demo: "Show a beginner (no engineering background) following the vault guide step by step. Day 1 confused. Day 7 — completed circuit. Day 14 — working system. Interview them.",
    script: `[0-2s] "I'm not an engineer. I work in marketing. I just built an EEG system in 14 days."

[2-12s] "The Scalar Vault builds are written for implementation, not academia. Every step has a 'why.' Every component is explained. Every failure point is flagged before you hit it. You don't need to know how a Laplace transform works to build a working EEG amplifier — you need to know which components to use and in what order."

[12-22s] "We have lawyers, marketers, students, and retirees inside the vault building systems that most engineering graduates have never touched. Because the guide eliminates the barrier that isn't intelligence — it's structured execution."

[22-28s] "If you can follow a recipe, you can follow these guides. And you'll understand every step along the way."

[28-30s] CTA: "Start anywhere. Link in bio."`,
    cta: "ScalarVault.com — Built for builders, not academics",
    tags: ["beginner", "accessible", "non-engineer", "motivation"],
  },
  {
    id: 26,
    title: "The Supplier Hack",
    category: "hidden_systems",
    platform: ["TikTok", "Shorts"],
    hook: "Most DIY builders overpay for components by 40-300%. Here's how to source the same parts for less.",
    demo: "Compare Amazon prices vs Mouser vs AliExpress vs LCSC for the same component. Show the math: $47 on Amazon, $3.20 on Mouser, $0.85 on LCSC. Same part.",
    script: `[0-2s] "Same component. Amazon: $47. Mouser: $3.20. LCSC: $0.85." Calculator: that's a 5,500% markup.

[2-12s] "Most first-time builders buy components on Amazon because it's familiar. For common parts — op-amps, microcontrollers, passive components — you're paying a 5-50x premium for convenience. The professional sourcing stack is: Mouser or DigiKey for quality components, LCSC for passives and common ICs in bulk, AliExpress for non-critical parts."

[12-20s] "Every BOM inside the Scalar Vault includes supplier links for each component — not just the part number. Mouser links. DigiKey alternates. LCSC bulk options where available. We've done the sourcing research so you don't have to."

[20-28s] "On a $680 EEG build, smart sourcing saves $150-200. Almost enough to cover two months of Pro membership."

[28-30s] CTA: "Better builds for less. Link in bio."`,
    cta: "ScalarVault.com — Sourced BOMs with every guide",
    tags: ["components", "sourcing", "Mouser", "save money"],
  },
  {
    id: 27,
    title: "The Startup Prototype Path",
    category: "monetization",
    platform: ["TikTok", "Reels"],
    hook: "Six of the last 12 months of Scalar Vault builds map directly to hardware startup opportunities under $1,000.",
    demo: "List 6 builds with their costs and the startup opportunity adjacent to each one. EEG → neurotech startup. EMG → prosthetics/AR. SDR → spectrum monitoring. Tesla coil → wireless EV charging startup.",
    script: `[0-2s] "Hardware startup idea. Build cost. Adjacent market." Three columns. Six rows filling in.

[2-15s] Read through each row:
"EEG BCI — $680 — Neurotech / meditation apps / cognitive monitoring"
"EMG Gesture — $350 — AR/VR interfaces / prosthetics / industrial control"
"SDR Station — $220 — Spectrum monitoring / IoT interference detection"
"Plasma Reactor — $300 — High-voltage research tools / educational hardware"
"Laser Comms — $85 — Low-cost mesh networking / FSO demonstration"
"GSR Biometrics — $95 — Stress monitoring wearables / mental health tech"

[15-25s] "None of these require $1M in seed funding to prototype. Every one of them has an adjacent market receiving venture capital today. The prototype you build from the Scalar Vault guide IS your MVP. It's the thing you show an investor."

[25-30s] CTA: "Build your MVP this month. Link in bio."`,
    cta: "ScalarVault.com — Build the prototype. Find the market.",
    tags: ["startup", "MVP", "hardware", "entrepreneurship"],
  },
  {
    id: 28,
    title: "The Friday Drop",
    category: "urgency",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "Every Friday a new engineering build drops in the vault. Pro members get it 48 hours early. It's Thursday.",
    demo: "Show a countdown timer. Show the vault dashboard with a blurred card labeled 'New Build — Friday.' Show Pro member getting early access notification.",
    script: `[0-2s] Countdown timer: 18:32:04 remaining. "Tomorrow's build goes live. Pro members get it now."

[2-10s] "Every Friday, a new advanced build guide drops in the Scalar Vault. This week: the EMG Gesture Controller — a wearable that reads muscle signals and classifies hand gestures using machine learning on a microcontroller. $350 build. 2-week guide."

[10-20s] "Pro members get the full guide 48 hours before free users see the first section. If you join tonight, you wake up Friday morning with the complete build waiting in your dashboard."

[20-28s] "If you're not Pro, you get the preview Friday. The section that ends before the electrode array wiring diagram — which is the part that makes it work." Knowing pause. 

[28-30s] CTA: "Join tonight. Wake up with the full build. Link in bio."`,
    cta: "ScalarVault.com — Early access starts tonight",
    tags: ["FOMO", "urgency", "new release", "Pro access"],
  },
  {
    id: 29,
    title: "The Engineer's Confession",
    category: "social_proof",
    platform: ["TikTok", "Reels"],
    hook: "I have a master's degree in electrical engineering and I still learned something from the vault.",
    demo: "First-person confessional style. Engineer holding degree. Then showing the vault guide section that taught them something they hadn't encountered in formal education.",
    script: `[0-2s] Hold up a master's degree. "Electrical Engineering. UC Berkeley. 2019." Pause. "I still learned something from a $99/month website."

[2-12s] "The interlayer capacitance compensation technique in the Tesla coil guide — I never encountered that in any coursework. The instrumentation amplifier selection criteria for sub-microvolt EEG signals — we did theory, never implementation. The CMRR optimization section alone was worth more than three lectures."

[12-22s] "Academia teaches you to understand systems. It doesn't teach you to build them. There's a gap between the classroom and the workbench that formal education never closes. The Scalar Vault closes it."

[22-28s] "I have a master's degree. I'm a Pro member. Both things can be true."

[28-30s] CTA: "See what they didn't teach you. Link in bio."`,
    cta: "ScalarVault.com — The education after education",
    tags: ["master's degree", "learning gap", "confessional", "credibility"],
  },
  {
    id: 30,
    title: "The Last Script",
    category: "urgency",
    platform: ["TikTok", "Reels", "Shorts"],
    hook: "You've been meaning to build something for months. You still haven't started. Here's why.",
    demo: "Simple talking-head style. Direct eye contact. No b-roll. Pure direct response copy delivery.",
    script: `[0-2s] Direct eye contact. No intro. "You've been meaning to build something for months. You still haven't. I know why."

[2-12s] "It's not time. It's not money. It's the gap between 'I want to build this' and 'I know exactly what to do next.' That gap doesn't close by watching more YouTube. It closes by having a guide that tells you step one, step two, and what to do when step three fails."

[12-22s] "The Scalar Vault exists for that moment. When you open the Tesla coil guide and step one says 'Order these 11 components from these links' — the paralysis is over. You have a next action. You make the order. You start."

[22-28s] "The build you've been thinking about is probably in the vault. $99/month. 30-day guarantee. Cancel anytime." Pause. "But I don't think you'll cancel."

[28-30s] CTA: "You already know what you want to build. Link in bio."`,
    cta: "ScalarVault.com — Start this weekend.",
    tags: ["motivation", "urgency", "final CTA", "direct response"],
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Scripts' },
  { id: 'curiosity', label: 'Curiosity' },
  { id: 'hidden_systems', label: 'Hidden Systems' },
  { id: 'cost_vs_value', label: 'Cost vs Value' },
  { id: 'monetization', label: 'Monetization' },
  { id: 'social_proof', label: 'Social Proof' },
  { id: 'urgency', label: 'Urgency' },
];