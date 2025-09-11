import React, { useState } from 'react';
import { Calendar, Users, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const WelcomeHeader = () => (
  <header className="glass border-b border-purple-100/30">
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex items-center gap-4">
        <img
          src="https://i.imgur.com/zhdl0wV.png"
          alt="Baraka Logo"
          className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
            Welcome Back, Layla!
          </h1>
          <p className="text-sm sm:text-base text-purple-600">Week 28</p>
        </div>
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          <button className="p-1 sm:p-1.5 rounded-full hover:bg-purple-50">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const CalendarHeader = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const appointments = {
    14: { type: 'checkup', label: 'OB Checkup' },
    21: { type: 'ultrasound', label: 'Growth Scan' },
    28: { type: 'class', label: 'Birthing Class' }
  };
  
  const handleMonthChange = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
  };
  
  const getDaysInMonth = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="glass border-b border-purple-100/30 p-3 sm:p-4 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <button 
            onClick={() => handleMonthChange(-1)}
            className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mx-4">
            {month} {year}
          </h2>
          <button 
            onClick={() => handleMonthChange(1)}
            className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-0.5">
          {days.map(day => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-medium text-purple-600 py-1">
              {day}
            </div>
          ))}
          {getDaysInMonth().map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-md text-[10px] sm:text-xs
                ${day === new Date().getDate() && 
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium' 
                  : day 
                    ? 'hover:bg-purple-50 text-purple-900' 
                    : 'text-purple-200'
                }
                relative
              `}
            >
              {day}
              {appointments[day as keyof typeof appointments] && (
                <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-pink-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UpcomingAppointments = () => (
  <div className="glass-card p-4 sm:p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg sm:text-xl font-semibold text-purple-900">Upcoming Care</h2>
      <Calendar className="w-5 h-5 text-purple-600" />
    </div>
    <div className="mt-4 space-y-4">
      {[
        { title: 'OB Checkup', date: 'February 14, 10:00 AM', type: 'Regular 28-week appointment' },
        { title: 'Growth Ultrasound', date: 'February 21, 2:00 PM', type: 'Third trimester scan' },
        { title: 'Birthing Class', date: 'February 28, 1:00 PM', type: 'Session 1 of 4' },
      ].map((appointment, i) => (
        <div 
          key={i} 
          className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/50 transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:bg-white/50 cursor-pointer"
        >
          <p className="font-medium text-purple-900">{appointment.title}</p>
          <p className="text-xs sm:text-sm text-purple-600">{appointment.date}</p>
          <p className="text-xs text-purple-400 mt-1">{appointment.type}</p>
        </div>
      ))}
    </div>
  </div>
);

const CommunityCard = () => (
  <div className="glass-card p-4 sm:p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg sm:text-xl font-semibold text-purple-900">Community</h2>
      <Users className="w-5 h-5 text-purple-600" />
    </div>
    <div className="mt-4 space-y-4">
      <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/50 transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:bg-white/50 cursor-pointer">
        <p className="font-medium text-purple-900">ATL Mothers Support Group</p>
        <p className="text-xs sm:text-sm text-purple-600">15 members online</p>
      </div>
      <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/50 transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:bg-white/50 cursor-pointer">
        <p className="font-medium text-purple-900">Birthing Stories</p>
        <p className="text-xs sm:text-sm text-purple-600">3 new stories today</p>
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <WelcomeHeader />
      <CalendarHeader />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <UpcomingAppointments />
            <CommunityCard />
          </div>
        </div>
      </main>
    </div>
  );
};