import React, { useState } from 'react';
import { Search, MapPin, Calendar, Heart, Star, Filter, Users, Clock, Tag, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterState {
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
  religion: string;
  specialties: string[];
  rating: number;
}

const mockDoulas = [
  {
    id: 1,
    name: "Rachel Johnson",
    image: "https://images.unsplash.com/photo-1618085222100-93f0eecad0aa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200",
    location: "New York, NY",
    rating: 4.9,
    reviews: 127,
    specialties: ["Birth Doula", "Postpartum Care", "Lactation Support", "Cooking"],
    availability: "Available from June",
    religion: "Interfaith",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 98,
    specialties: ["Birth Doula", "Prenatal Yoga", "Childbirth Education", "Housekeeping"],
    availability: "Available Now",
    religion: "Christian",
  },
  {
    id: 3,
    name: "Vivian Chen",
    image: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200",
    location: "San Francisco, CA",
    rating: 5.0,
    reviews: 89,
    specialties: ["Birth Doula", "Pregnancy Massage", "Hypnobirthing", "Cooking", "Housekeeping"],
    availability: "Available from May",
    religion: "Buddhist",
  },
  {
    id: 4,
    name: "Amara Okina",
    image: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200",
    location: "Chicago, IL",
    rating: 4.9,
    reviews: 156,
    specialties: ["Birth Doula", "Ayurvedic Care", "Prenatal Nutrition", "Cooking"],
    availability: "Available from July",
    religion: "Hindu",
  },
  {
    id: 5,
    name: "Jessica Thompson",
    image: "https://plus.unsplash.com/premium_photo-1669882305249-5af7f5ed5c10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200",
    location: "Austin, TX",
    rating: 4.7,
    reviews: 73,
    specialties: ["Birth Doula", "Childbirth Education", "Breastfeeding Support", "Housekeeping"],
    availability: "Available Now",
    religion: "Secular",
  },
  {
    id: 6,
    name: "Leah Ahmed",
    image: "https://plus.unsplash.com/premium_photo-1681489830925-d47810835fda?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200",
    location: "Miami, FL",
    rating: 4.9,
    reviews: 112,
    specialties: ["Birth Doula", "Postpartum Care", "Jewish Birth Traditions", "Cooking", "Housekeeping"],
    availability: "Available from August",
    religion: "Jewish",
  }
];

export const FindDoula = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    dateRange: {
      start: '',
      end: ''
    },
    religion: '',
    specialties: [],
    rating: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Get current month's first and last day
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 3, 0);

  const specialtiesList = [
    'Birth Doula',
    'Postpartum Care',
    'Lactation Support',
    'Prenatal Yoga',
    'Childbirth Education',
    'Pregnancy Massage',
    'Hypnobirthing',
    'Prenatal Nutrition',
    'Cooking',
    'Housekeeping',
    'Breastfeeding Support',
    'Ayurvedic Care',
    'Jewish Birth Traditions'
  ];

  const culturalPreferences = [
    'Somalian',
    'Moroccan',
    'Korean',
    'Trinidadian',
    'Mexican',
    'Indian',
    'Christian',
    'Jewish',
    'Muslim',
    'Hindu',
    'Buddhist',
    'Interfaith',
    'Secular'
  ];

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const toggleCulture = (culture: string) => {
    setFilters(prev => ({
      ...prev,
      religion: prev.religion === culture.toLowerCase() ? '' : culture.toLowerCase()
    }));
  };

  const filteredDoulas = mockDoulas.filter(doula => {
    const matchesSearch = 
      doula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doula.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doula.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesReligion = !filters.religion || doula.religion.toLowerCase() === filters.religion;
    const matchesSpecialties = filters.specialties.length === 0 || 
      filters.specialties.some(s => doula.specialties.includes(s));
    
    return matchesSearch && matchesReligion && matchesSpecialties;
  });

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Filters and Search */}
          <div className="lg:w-80">
            {/* Search Bar */}
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-purple-900">Search Doulas</h2>
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, location, or specialty..."
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
              <div className="space-y-6">
                {/* Specialties */}
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Specialties
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {specialtiesList.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => toggleSpecialty(specialty)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                          filters.specialties.includes(specialty)
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cultural Preferences */}
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Cultural Background
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {culturalPreferences.map((culture) => (
                      <button
                        key={culture}
                        onClick={() => toggleCulture(culture)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                          filters.religion === culture.toLowerCase()
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        {culture}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Availability
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-purple-600 block mb-1">Start Date</label>
                      <input
                        type="date"
                        min={firstDay.toISOString().split('T')[0]}
                        max={lastDay.toISOString().split('T')[0]}
                        className="glass-input w-full px-3 py-2 rounded-lg text-sm"
                        value={filters.dateRange.start}
                        onChange={(e) => setFilters({
                          ...filters,
                          dateRange: { ...filters.dateRange, start: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-purple-600 block mb-1">End Date</label>
                      <input
                        type="date"
                        min={filters.dateRange.start || firstDay.toISOString().split('T')[0]}
                        max={lastDay.toISOString().split('T')[0]}
                        className="glass-input w-full px-3 py-2 rounded-lg text-sm"
                        value={filters.dateRange.end}
                        onChange={(e) => setFilters({
                          ...filters,
                          dateRange: { ...filters.dateRange, end: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doula List */}
          <div className="flex-1">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {filteredDoulas.map((doula) => (
                <div key={doula.id} className="glass-card p-6 relative">
                  {/* Mobile Layout */}
                  <div className="block lg:hidden">
                    {/* Heart Button - Outside the card */}
                    <button className="absolute -top-3 -right-3 p-2 rounded-full bg-white shadow-lg hover:bg-purple-50">
                      <Heart className="w-5 h-5 text-purple-400" />
                    </button>

                    {/* Image */}
                    <div className="flex justify-center mb-4">
                      <img
                        src={doula.image}
                        alt={doula.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-purple-900 mb-2">{doula.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-sm text-purple-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {doula.location}
                      </div>
                      <p className="text-sm text-purple-600 mb-4">{doula.description}</p>

                      <div className="flex justify-center items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span className="text-sm font-medium text-purple-900">{doula.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{doula.reviews} reviews</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {doula.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-600"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-600">{doula.availability}</span>
                      </div>

                      <button className="w-full glass-button px-4 py-2 rounded-lg text-white text-sm font-medium">
                        Contact
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    <div className="flex gap-4">
                      <img
                        src={doula.image}
                        alt={doula.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-purple-900">{doula.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-purple-600">
                              <MapPin className="w-4 h-4" />
                              {doula.location}
                            </div>
                          </div>
                          <button className="p-2 hover:bg-purple-50 rounded-full">
                            <Heart className="w-5 h-5 text-purple-400" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm font-medium text-purple-900">{doula.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-purple-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{doula.reviews} reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {doula.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-600"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-600">{doula.availability}</span>
                      </div>
                      <button className="glass-button px-4 py-2 rounded-lg text-white text-sm font-medium">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};