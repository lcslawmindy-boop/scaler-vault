import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProblemSolution from '../components/home/ProblemSolution';
import CourseHighlight from '../components/home/CourseHighlight';
import PreviewCards from '../components/home/PreviewCards';
import ValueStack from '../components/home/ValueStack';
import CredibilitySection from '../components/home/CredibilitySection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProblemSolution />
      <CourseHighlight />
      <PreviewCards />
      <ValueStack />
      <CredibilitySection />
      <CTASection />
    </div>
  );
}