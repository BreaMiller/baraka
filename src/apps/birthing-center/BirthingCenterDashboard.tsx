import React, { useState, useEffect } from 'react';
import { Users, Calendar, Building2, Star, MessageCircle, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/auth';

export const BirthingCenterDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    activeClients: 0,
    upcomingBirths: 0,
    totalDoulas: 0,
    averageRating: 0,
    occupancyRate: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch stats from Supabase
      // This is a placeholder for actual data fetching
      setStats({
        activeClients: 24,
        upcomingBirths: 8,
        totalDoulas: 12,
        averageRating: 4.8,
        occupancyRate: 75,
        unreadMessages: 5
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
                <p className="text-sm text-purple-600">Upcoming Births</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.upcomingBirths}</h3>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Doulas</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.totalDoulas}</h3>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
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
                <p className="text-sm text-purple-600">Occupancy Rate</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.occupancyRate}%</h3>
              </div>
              <Building2 className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Activity Level</p>
                <h3 className="text-2xl font-semibold text-purple-900">High</h3>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Room Status Grid */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Room Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl ${
                  i % 3 === 0
                    ? 'bg-green-100 text-green-700'
                    : i % 3 === 1
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                <p className="font-medium">Room {i + 1}</p>
                <p className="text-sm">
                  {i % 3 === 0 ? 'Available' : i % 3 === 1 ? 'Occupied' : 'Cleaning'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Today's Schedule</h2>
          {/* Schedule component will be added here */}
        </div>
      </main>
    </div>
  );
};