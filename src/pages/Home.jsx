import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PreviewCards from '../components/home/PreviewCards';
import CourseHighlight from '../components/home/CourseHighlight';
import ValueStack from '../components/home/ValueStack';
import CredibilitySection from '../components/home/CredibilitySection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PreviewCards />
      <CourseHighlight />
      <ValueStack />
      <CredibilitySection />
      <CTASection />
    </div>
  );
}