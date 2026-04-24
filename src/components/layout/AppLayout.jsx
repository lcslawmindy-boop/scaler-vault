import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import EmailCapturePopup from '../shared/EmailCapturePopup';
import EngineeringAssistant from '../ai/EngineeringAssistant';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <EmailCapturePopup />
      <EngineeringAssistant />
    </div>
  );
}