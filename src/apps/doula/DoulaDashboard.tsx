import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, Star, MessageCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/auth';

export const DoulaDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    activeClients: 0,
    upcomingAppointments: 0,
    totalEarnings: 0,
    averageRating: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      // Get doula profile
      const { data: doulaProfile } = await supabase
        .from('doulas')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (!doulaProfile) return;

      // Get active clients count
      const { count: activeClients } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('doula_id', doulaProfile.id)
        .eq('status', 'confirmed');

      // Get upcoming appointments
      const { count: upcomingAppointments } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('doula_id', doulaProfile.id)
        .eq('status', 'confirmed')
        .gte('date', new Date().toISOString());

      // Get total earnings
      const { data: earnings } = await supabase
        .from('appointments')
        .select('amount')
        .eq('doula_id', doulaProfile.id)
        .eq('payment_status', 'paid');

      const totalEarnings = earnings?.reduce((sum, appointment) => sum + appointment.amount, 0) || 0;

      // Get unread messages
      const { count: unreadMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', user?.id)
        .eq('read', false);

      setStats({
        activeClients: activeClients || 0,
        upcomingAppointments: upcomingAppointments || 0,
        totalEarnings,
        averageRating: doulaProfile.rating || 0,
        unreadMessages: unreadMessages || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Active Clients</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.activeClients}</h3>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Upcoming Appointments</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.upcomingAppointments}</h3>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Earnings</p>
                <h3 className="text-2xl font-semibold text-purple-900">
                  ${stats.totalEarnings.toLocaleString()}
                </h3>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Average Rating</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold text-purple-900">{stats.averageRating}</h3>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(stats.averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Unread Messages</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.unreadMessages}</h3>
              </div>
              <MessageCircle className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Hours This Week</p>
                <h3 className="text-2xl font-semibold text-purple-900">32</h3>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Upcoming Schedule</h2>
          {/* Calendar component will be added here */}
        </div>
      </main>
    </div>
  );
};