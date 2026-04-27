import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import SolutionSection from '../components/home/SolutionSection';
import ValueStack from '../components/home/ValueStack';
import CourseHighlight from '../components/home/CourseHighlight';
import FinalCTA from '../components/home/FinalCTA';
import PaywallModal from '../components/shared/PaywallModal';

export default function Home() {
  const [paywallOpen, setPaywallOpen] = useState(false);

  return (
    <div>
      <HeroSection onCtaClick={() => setPaywallOpen(true)} />
      <ProblemSection />
      <SolutionSection />
      <ValueStack />
      <CourseHighlight />
      <FinalCTA onCtaClick={() => setPaywallOpen(true)} />
      <PaywallModal open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}