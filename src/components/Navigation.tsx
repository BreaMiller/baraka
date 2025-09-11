import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, MessageCircle, Users, Activity, BookOpen, UserPlus, Menu, X, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../stores/auth';
import { supabase } from '../lib/supabase';

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState({
    unreadMessages: 0,
    upcomingAppointments: 0
  });

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowAuthButtons(currentScrollY > 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowAuthButtons(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      
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

      if (messagesError && messagesError.code !== 'PGRST116') {
        throw messagesError;
      }

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

      if (appointmentsError && appointmentsError.code !== 'PGRST116') {
        throw appointmentsError;
      }

      setNotifications({
        unreadMessages: unreadMessages || 0,
        upcomingAppointments: upcomingAppointments || 0
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications({
        unreadMessages: 0,
        upcomingAppointments: 0
      });
    }
  };

  // Don't show navigation on onboarding pages
  if (location.pathname.includes('/onboarding')) {
    return null;
  }

  const navItems = [
    { to: "/dashboard", icon: <Calendar className="w-5 h-5" />, label: "Calendar" },
    { to: "/find-doula", icon: <UserPlus className="w-5 h-5" />, label: "Find Doula" },
    { to: "/messages", icon: <MessageCircle className="w-5 h-5" />, label: "Messages" },
    { to: "/activities", icon: <Activity className="w-5 h-5" />, label: "Activities" },
    { to: "/community", icon: <Users className="w-5 h-5" />, label: "Community" },
    { to: "/resources", icon: <BookOpen className="w-5 h-5" />, label: "Resources" },
    { to: "/profile", icon: <Settings className="w-5 h-5" />, label: "Settings" }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-16 hover:w-56 hidden md:block glass border-r border-purple-100/30 group/nav z-40">
        {/* Logo only shown on landing page */}
        {location.pathname === '/' && (
          <div className="flex justify-center items-center h-16 border-b border-purple-100/30">
            <img
              src="https://i.imgur.com/zhdl0wV.png"
              alt="Baraka Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center p-3 h-full gap-6">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {user && (
        <>
          {/* Mobile Header */}
          <div className="md:hidden fixed top-0 left-0 right-0 glass border-b border-purple-100/30 z-40">
            <div className="flex items-center justify-between px-4 py-3">
              <img
                src="https://i.imgur.com/zhdl0wV.png"
                alt="Baraka Logo"
                className="w-8 h-8 object-contain"
              />
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-xl hover:bg-white/30 transition-colors"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6 text-purple-600" />
                ) : (
                  <Menu className="w-6 h-6 text-purple-600" />
                )}
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
              <div className="absolute top-full left-0 right-0 glass border-b border-purple-100/30 py-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 transition-colors
                      ${isActive ? 'bg-white/30 text-pink-600' : 'text-purple-900 hover:bg-white/20'}
                    `}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-white/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-purple-100/30 z-40">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex justify-between items-center px-4 py-2 min-w-max">
                {navItems.slice(0, 5).map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `
                      flex flex-col items-center px-4 py-2 rounded-xl transition-colors
                      ${isActive ? 'text-pink-600' : 'text-purple-600'}
                    `}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                    {item.to === '/messages' && notifications.unreadMessages > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Auth Buttons - Only shown on landing page */}
      {location.pathname === '/' && (
        <div
          className={`
            fixed top-4 right-4 md:flex items-center gap-3
            transition-all duration-500 ease-in-out
            ${showAuthButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          <Link
            to="/onboarding/mother"
            className="px-4 py-2 rounded-lg text-purple-600 hover:bg-white/50 transition-colors text-sm font-medium"
          >
            Log In
          </Link>
          <Link
            to="/onboarding/mother"
            className="glass-button px-4 py-2 rounded-lg text-white text-sm font-medium"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

const NavItem = ({
  icon,
  label,
  to,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      relative flex items-center p-2 rounded-xl transition-all duration-300 ease-in-out
      md:w-full
      ${isActive ? 'bg-white/30' : 'hover:bg-white/20'}
    `}
  >
    {({ isActive }) => (
      <>
        <div className="w-5 flex items-center justify-center">
          <div
            className={`
              transition-transform duration-300 ease-in-out
              ${isActive 
                ? 'text-pink-600 scale-110 [animation:iconPop_0.3s_ease-out]' 
                : 'text-purple-600 hover:scale-110'
              }
            `}
          >
            {icon}
          </div>
        </div>
        <span
          className={`
            ml-3 text-sm whitespace-nowrap transition-all duration-300 ease-in-out
            md:absolute md:left-12 md:opacity-0 md:translate-x-[-10px]
            group-hover/nav:opacity-100 group-hover/nav:translate-x-0
            hover:text-pink-600
            ${isActive 
              ? 'text-pink-600 font-medium' 
              : 'text-purple-900'
            }
          `}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);