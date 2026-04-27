import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Vault from './pages/Vault';
import BuildDetail from './pages/BuildDetail';

import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import KitUpsell from './pages/KitUpsell';
import EmailFunnel from './pages/EmailFunnel';
import VideoScripts from './pages/VideoScripts';
import ProductLadder from './pages/ProductLadder';
import Positioning from './pages/Positioning';
import InvestorAudit from './pages/InvestorAudit';
import StripeSuccess from './pages/StripeSuccess';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CheckoutSuccess from './pages/CheckoutSuccess';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/vault" element={<Vault />} />
        <Route path="/build/:id" element={<BuildDetail />} />

        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kits" element={<KitUpsell />} />
        <Route path="/email-funnel" element={<EmailFunnel />} />
        <Route path="/video-scripts" element={<VideoScripts />} />
        <Route path="/product-ladder" element={<ProductLadder />} />
        <Route path="/positioning" element={<Positioning />} />
        <Route path="/investor-audit" element={<InvestorAudit />} />
        <Route path="/success" element={<StripeSuccess />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/success" element={<CheckoutSuccess />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App