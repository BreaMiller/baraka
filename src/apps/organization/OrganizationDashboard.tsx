import React, { useState, useEffect } from 'react';
import { Users, Calendar, Building2, Star, DollarSign, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/auth';

export const OrganizationDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalDoulas: 0,
    activeClients: 0,
    totalRevenue: 0,
    averageRating: 0,
    completedBirths: 0,
    growthRate: 0
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
        totalDoulas: 45,
        activeClients: 120,
        totalRevenue: 85000,
        averageRating: 4.9,
        completedBirths: 250,
        growthRate: 15
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
                <p className="text-sm text-purple-600">Total Doulas</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.totalDoulas}</h3>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>

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
                <p className="text-sm text-purple-600">Total Revenue</p>
                <h3 className="text-2xl font-semibold text-purple-900">
                  ${stats.totalRevenue.toLocaleString()}
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
                <p className="text-sm text-purple-600">Completed Births</p>
                <h3 className="text-2xl font-semibold text-purple-900">{stats.completedBirths}</h3>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Growth Rate</p>
                <h3 className="text-2xl font-semibold text-purple-900">+{stats.growthRate}%</h3>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Doula Performance */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Top Performing Doulas</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://i.pravatar.cc/40?img=${i}`}
                    alt="Doula"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-purple-900">Sarah Johnson</h3>
                    <p className="text-sm text-purple-600">15 active clients</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-purple-900">4.9</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">+12%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Analytics Overview</h2>
          {/* Analytics component will be added here */}
        </div>
      </main>
    </div>
  );
};