import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth';
import { supabase } from './lib/supabase';
import { Navigation } from './components/Navigation';
import { Landing } from './components/Landing';
import { About } from './components/About';
import { Terms } from './components/Legal/Terms';
import { Privacy } from './components/Legal/Privacy';
import { Dashboard } from './components/Dashboard';
import { FindDoula } from './components/FindDoula';
import { Messages } from './components/Messages';
import { Activities } from './components/Activities';
import { Community } from './components/Community';
import { Resources } from './components/Resources';
import { Profile } from './components/Profile';
import { ExpectingMotherOnboarding } from './components/onboarding/ExpectingMother';
import { DoulaOnboarding } from './components/onboarding/Doula';
import { BirthingCenterOnboarding } from './components/onboarding/BirthingCenter';
import { DoulaOrganizationOnboarding } from './components/onboarding/DoulaOrganization';
import { User } from 'lucide-react';

interface Notification {
  unreadMessages: number;
  upcomingAppointments: number;
}

export interface NotificationState {
  notifications: Notification;
  fetchNotifications: () => Promise<void>;
}

export const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification>({
    unreadMessages: 0,
    upcomingAppointments: 0
  });

  useEffect(() => {
    if (user) {
      // Subscribe to realtime notifications
      const messagesSubscription = supabase
        .channel('messages')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`
        }, () => {
          fetchNotifications();
        })
        .subscribe();

      const appointmentsSubscription = supabase
        .channel('appointments')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `client_id=eq.${user.id}`
        }, () => {
          fetchNotifications();
        })
        .subscribe();

      // Initial fetch
      fetchNotifications();

      return () => {
        messagesSubscription.unsubscribe();
        appointmentsSubscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      // Get unread messages count
      const { count: unreadMessages, error: messagesError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', user.id)
        .eq('read', false);

      if (messagesError) throw messagesError;

      // Get upcoming appointments count (next 24 hours)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { count: upcomingAppointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', user.id)
        .eq('status', 'confirmed')
        .gte('date', new Date().toISOString())
        .lte('date', tomorrow.toISOString());

      if (appointmentsError) throw appointmentsError;

      setNotifications({
        unreadMessages: unreadMessages || 0,
        upcomingAppointments: upcomingAppointments || 0
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  return (
    <header className="glass border-b border-purple-100/30">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i.imgur.com/zhdl0wV.png"
            alt="Baraka Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-purple-600">{subtitle}</p>
          </div>
          
          {/* User Actions - Only visible on desktop */}
          {user && (
            <div className="hidden md:flex items-center gap-4 ml-auto">
              {/* Profile Photo */}
              <button
                onClick={() => navigate('/profile')}
                className="relative w-10 h-10 rounded-full overflow-hidden hover:ring-2 ring-purple-300 transition-all duration-200"
              >
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-300" />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

export default function App() {
  const { user, setSession } = useAuthStore();

  useEffect(() => {
    // Set up auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <Router>
      {user ? (
        <div className="relative min-h-screen overflow-hidden">
          {/* Decorative blurred circles */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="relative md:pl-16">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/find-doula" element={
                <>
                  <PageHeader title="Find Your Perfect Doula" subtitle="Connect with experienced doulas" />
                  <FindDoula />
                </>
              } />
              <Route path="/messages" element={
                <>
                  <PageHeader title="Messages" subtitle="Chat with your care team" />
                  <Messages />
                </>
              } />
              <Route path="/activities" element={
                <>
                  <PageHeader title="Local Activities" subtitle="Join events and classes" />
                  <Activities />
                </>
              } />
              <Route path="/community" element={
                <>
                  <PageHeader title="Community" subtitle="Connect with other moms" />
                  <Community />
                </>
              } />
              <Route path="/resources" element={
                <>
                  <PageHeader title="Resources" subtitle="Discover helpful info and guides" />
                  <Resources />
                </>
              } />
              <Route path="/profile" element={
                <>
                  <PageHeader title="Profile Settings" subtitle="Manage your account" />
                  <Profile />
                </>
              } />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
          <Navigation />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/onboarding/mother" element={<ExpectingMotherOnboarding />} />
          <Route path="/onboarding/doula" element={<DoulaOnboarding />} />
          <Route path="/onboarding/birthing-center" element={<BirthingCenterOnboarding />} />
          <Route path="/onboarding/organization" element={<DoulaOrganizationOnboarding />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}