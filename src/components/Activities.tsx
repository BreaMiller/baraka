import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Calendar, MapPin, Users, Star, Filter, Search, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Activity {
  id: string;
  title: string;
  type: 'yoga' | 'workshop' | 'support-group' | 'fitness' | 'education';
  description: string;
  date: string;
  time: string;
  location: string;
  coordinates: [number, number];
  instructor: string;
  price: string;
  rating: number;
  participants: number;
  image: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Prenatal Yoga Flow',
    type: 'yoga',
    description: 'Gentle yoga sequences designed specifically for expecting mothers.',
    date: '2025-02-15',
    time: '10:00 AM',
    location: 'Wellness Center, Atlanta',
    coordinates: [33.7490, -84.3880],
    instructor: 'Sarah Chen',
    price: '$25',
    rating: 4.8,
    participants: 12,
    image: 'https://plus.unsplash.com/premium_photo-1682435592216-787019c529ef?q=80&w=2621&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: 'Birthing Preparation Workshop',
    type: 'workshop',
    description: 'Comprehensive workshop covering birthing techniques and preparation.',
    date: '2025-02-18',
    time: '2:00 PM',
    location: 'Family Center, Decatur',
    coordinates: [33.7748, -84.2963],
    instructor: 'Dr. Emily Rodriguez',
    price: '$120',
    rating: 4.9,
    participants: 8,
    image: 'https://plus.unsplash.com/premium_photo-1733353243858-01d34d400b98?q=80&w=2757&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '4',
    title: 'Prenatal Fitness Class',
    type: 'fitness',
    description: 'Safe and effective workout routines for pregnant women.',
    date: '2025-02-22',
    time: '9:00 AM',
    location: 'FitMama Studio, Buckhead',
    coordinates: [33.8389, -84.3789],
    instructor: 'Jessica Parker',
    price: '$30',
    rating: 4.6,
    participants: 10,
    image: 'https://plus.unsplash.com/premium_photo-1664453892244-f908365f18a6?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '5',
    title: 'Breastfeeding Basics',
    type: 'education',
    description: 'Educational session on breastfeeding techniques and tips.',
    date: '2025-02-25',
    time: '3:00 PM',
    location: 'Maternal Care Center, Sandy Springs',
    coordinates: [33.9304, -84.3733],
    instructor: 'Maria Garcia',
    price: '$45',
    rating: 5.0,
    participants: 6,
    image: 'https://plus.unsplash.com/premium_photo-1664476564122-b20ed5a28b9a?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400'
  }
];

export const Activities = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddToCalendarModal, setShowAddToCalendarModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activityTypes = [
    { value: 'yoga', label: 'Yoga Classes' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'support-group', label: 'Support Groups' },
    { value: 'fitness', label: 'Fitness Classes' },
    { value: 'education', label: 'Education' }
  ];

  const priceRanges = [
    'Free',
    'Under $25',
    '$25-$50',
    '$50-$100',
    '$100+'
  ];

  const timeSlots = [
    'Morning',
    'Afternoon',
    'Evening',
    'Weekend'
  ];

  const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'All Levels'
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredActivities = mockActivities.filter(activity => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(activity.type);
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddToCalendar = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowAddToCalendarModal(true);
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* Activity Types */}
      <div>
        <label className="block text-sm font-medium text-purple-900 mb-4">Activity Types</label>
        <div className="flex flex-wrap gap-2">
          {activityTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => toggleType(type.value)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                selectedTypes.includes(type.value)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-purple-900 mb-4">Price Range</label>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range}
              className="px-3 py-1.5 rounded-full text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Time of Day */}
      <div>
        <label className="block text-sm font-medium text-purple-900 mb-4">Time of Day</label>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className="px-3 py-1.5 rounded-full text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-purple-900 mb-4">Experience Level</label>
        <div className="flex flex-wrap gap-2">
          {experienceLevels.map((level) => (
            <button
              key={level}
              className="px-3 py-1.5 rounded-full text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Filters */}
          <div className="lg:w-80">
            {/* Search Bar */}
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-purple-900">Search</h2>
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full lg:hidden glass-card p-4 mb-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-semibold text-purple-900">Filters</span>
              </div>
              {showMobileFilters ? (
                <ChevronUp className="w-5 h-5 text-purple-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-600" />
              )}
            </button>

            {/* Filters Panel */}
            <div className={`glass-card p-6 lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
              <FiltersPanel />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {/* Map */}
            <div className="glass-card p-6">
              <div style={{ height: '400px', width: '100%' }}>
                <MapContainer
                  center={[33.7490, -84.3880]}
                  zoom={11}
                  style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredActivities.map((activity) => (
                    <Marker key={activity.id} position={activity.coordinates}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-medium text-purple-900">{activity.title}</h3>
                          <p className="text-sm text-purple-600">{activity.location}</p>
                          <p className="text-sm text-purple-600">{activity.date} at {activity.time}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Activities Grid */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="glass-card p-6 relative">
                  {/* Mobile Layout */}
                  <div className="block lg:hidden">
                    {/* Price Tag - Outside the card */}
                    <div className="absolute -top-3 -right-3 bg-white px-3 py-1 rounded-full shadow-lg">
                      <span className="text-purple-600 font-medium">{activity.price}</span>
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-32 rounded-xl object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-purple-900 mb-2">{activity.title}</h3>
                      <div className="flex items-center justify-center gap-1 text-sm text-purple-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </div>
                      <p className="text-sm text-purple-600 mb-4">{activity.description}</p>

                      <div className="flex justify-center items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span className="text-sm font-medium text-purple-900">{activity.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{activity.participants} spots left</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-600">{activity.date} at {activity.time}</span>
                      </div>

                      <button
                        onClick={() => handleAddToCalendar(activity)}
                        className="w-full glass-button px-4 py-2 rounded-lg text-white text-sm font-medium mt-4"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    <div className="flex gap-4">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-purple-900">{activity.title}</h3>
                            <div className="flex items-center gap-1 text-sm text-purple-600">
                              <MapPin className="w-4 h-4" />
                              {activity.location}
                            </div>
                          </div>
                          <span className="text-purple-600 font-medium">{activity.price}</span>
                        </div>

                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm font-medium text-purple-900">{activity.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-purple-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{activity.participants} spots left</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-purple-600">{activity.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-600">{activity.date} at {activity.time}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCalendar(activity)}
                        className="glass-button px-4 py-2 rounded-lg text-white text-sm font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add to Calendar Modal */}
      {showAddToCalendarModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">Book Activity</h3>
            <p className="text-purple-600 mb-4">
              Would you like to book "{selectedActivity.title}"?
            </p>
            <div className="text-sm text-purple-600 space-y-2 mb-6">
              <p><strong>Date:</strong> {selectedActivity.date}</p>
              <p><strong>Time:</strong> {selectedActivity.time}</p>
              <p><strong>Location:</strong> {selectedActivity.location}</p>
              <p><strong>Price:</strong> {selectedActivity.price}</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddToCalendarModal(false)}
                className="px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would implement the actual booking logic
                  setShowAddToCalendarModal(false);
                }}
                className="glass-button px-4 py-2 rounded-lg text-white text-sm font-medium"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};