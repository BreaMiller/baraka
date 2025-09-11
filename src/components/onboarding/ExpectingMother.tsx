import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Heart, Baby, ArrowRight, ArrowLeft, Mail, User, Lock, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const ExpectingMotherOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    basicInfo: {
      fullName: '',
      email: '',
      password: '',
      dueDate: '',
      location: ''
    },
    preferences: {
      birthPlan: [],
      doula: {
        experience: [] as string[],
        specialties: [] as string[],
        culturalBackground: [] as string[]
      }
    }
  });

  const birthPlanOptions = [
    { id: 'natural', label: 'Natural Birth', icon: <Baby className="w-4 h-4" /> },
    { id: 'hospital', label: 'Hospital Birth', icon: <Heart className="w-4 h-4" /> },
    { id: 'home', label: 'Home Birth', icon: <MapPin className="w-4 h-4" /> },
    { id: 'water', label: 'Water Birth', icon: <Calendar className="w-4 h-4" /> },
    { id: 'hypno', label: 'Hypnobirthing', icon: <Heart className="w-4 h-4" /> },
    { id: 'vbac', label: 'VBAC', icon: <Baby className="w-4 h-4" /> }
  ];

  const doulaPreferences = {
    experience: [
      { id: 'first-time', label: 'First Time Mothers', icon: <Baby className="w-4 h-4" /> },
      { id: 'vbac', label: 'VBAC', icon: <Heart className="w-4 h-4" /> },
      { id: 'twins', label: 'Twins', icon: <Baby className="w-4 h-4" /> },
      { id: 'high-risk', label: 'High Risk', icon: <Heart className="w-4 h-4" /> }
    ],
    specialties: [
      { id: 'prenatal', label: 'Prenatal Support', icon: <Calendar className="w-4 h-4" /> },
      { id: 'labor', label: 'Labor Support', icon: <Heart className="w-4 h-4" /> },
      { id: 'postpartum', label: 'Postpartum Care', icon: <Baby className="w-4 h-4" /> },
      { id: 'lactation', label: 'Lactation', icon: <Heart className="w-4 h-4" /> }
    ],
    culturalBackground: [
      { id: 'black-american', label: 'Black American', icon: <Heart className="w-4 h-4" /> },
      { id: 'west-indian', label: 'West Indian', icon: <Heart className="w-4 h-4" /> },
      { id: 'african', label: 'African', icon: <Heart className="w-4 h-4" /> },
      { id: 'asian', label: 'Asian', icon: <Heart className="w-4 h-4" /> },
      { id: 'hispanic', label: 'Hispanic', icon: <Heart className="w-4 h-4" /> },
      { id: 'middle-eastern', label: 'Middle Eastern', icon: <Heart className="w-4 h-4" /> },
      { id: 'european', label: 'European', icon: <Heart className="w-4 h-4" /> }
    ]
  };

  const handlePreferenceToggle = (category: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        doula: {
          ...prev.preferences.doula,
          [category]: prev.preferences.doula[category as keyof typeof prev.preferences.doula].includes(value)
            ? prev.preferences.doula[category as keyof typeof prev.preferences.doula].filter(item => item !== value)
            : [...prev.preferences.doula[category as keyof typeof prev.preferences.doula], value]
        }
      }
    }));
  };

  const handleBirthPlanToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        birthPlan: prev.preferences.birthPlan.includes(value)
          ? prev.preferences.birthPlan.filter(item => item !== value)
          : [...prev.preferences.birthPlan, value]
      }
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    setError(null);
    
    switch (stepNumber) {
      case 1:
        const { fullName, email, password, dueDate, location } = formData.basicInfo;
        if (!fullName || !email || !password || !dueDate || !location) {
          setError('Please fill in all fields');
          return false;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          return false;
        }
        if (!email.includes('@')) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;

      case 2:
        if (formData.preferences.birthPlan.length === 0) {
          setError('Please select at least one birth plan preference');
          return false;
        }
        return true;

      case 3:
        const { experience, specialties, culturalBackground } = formData.preferences.doula;
        if (experience.length === 0 || specialties.length === 0 || culturalBackground.length === 0) {
          setError('Please select at least one option for each category');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!validateStep(step)) {
        return;
      }

      setLoading(true);
      setError(null);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.basicInfo.email,
        password: formData.basicInfo.password,
        options: {
          data: {
            full_name: formData.basicInfo.fullName,
            role: 'mother'
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Failed to create account');
      }

      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: formData.basicInfo.email,
          full_name: formData.basicInfo.fullName,
          role: 'mother'
        });

      if (userError) throw userError;

      const { error: preferencesError } = await supabase
        .from('mother_preferences')
        .insert({
          user_id: authData.user.id,
          due_date: formData.basicInfo.dueDate,
          location: formData.basicInfo.location,
          birth_plan: formData.preferences.birthPlan,
          doula_preferences: formData.preferences.doula
        });

      if (preferencesError) throw preferencesError;

      navigate('/dashboard');

    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderProgressSteps = () => (
    <div className="flex items-center justify-between max-w-xs mx-auto mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              step >= stepNumber
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-400'
            }`}
          >
            {step > stepNumber ? (
              <Check className="w-5 h-5" />
            ) : (
              stepNumber
            )}
          </div>
          <div className="h-1 w-16 absolute -z-10 transform -translate-y-6">
            {stepNumber < 3 && (
              <div className={`h-1 ${
                step > stepNumber ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-purple-100'
              }`} />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-50 p-2 rounded-full glass hover:bg-white/50 transition-colors"
        aria-label="Close registration form"
      >
        <X className="w-6 h-6 text-purple-600" />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderProgressSteps()}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form Content */}
        <div className="glass-card p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Welcome to Baraka</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.fullName}
                    onChange={(e) => setFormData({
                      ...formData,
                      basicInfo: { ...formData.basicInfo, fullName: e.target.value }
                    })}
                    className="glass-input w-full px-4 py-2 rounded-lg pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                  <User className="w-4 h-4 text-purple-400 absolute left-3 top-[38px]" />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.basicInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      basicInfo: { ...formData.basicInfo, email: e.target.value }
                    })}
                    className="glass-input w-full px-4 py-2 rounded-lg pl-10"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="w-4 h-4 text-purple-400 absolute left-3 top-[38px]" />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.basicInfo.password}
                    onChange={(e) => setFormData({
                      ...formData,
                      basicInfo: { ...formData.basicInfo, password: e.target.value }
                    })}
                    className="glass-input w-full px-4 py-2 rounded-lg pl-10"
                    placeholder="Create a password (min. 6 characters)"
                    required
                    minLength={6}
                  />
                  <Lock className="w-4 h-4 text-purple-400 absolute left-3 top-[38px]" />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.basicInfo.dueDate}
                    onChange={(e) => setFormData({
                      ...formData,
                      basicInfo: { ...formData.basicInfo, dueDate: e.target.value }
                    })}
                    className="glass-input w-full px-4 py-2 rounded-lg pl-10"
                    required
                  />
                  <Calendar className="w-4 h-4 text-purple-400 absolute left-3 top-[38px]" />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      basicInfo: { ...formData.basicInfo, location: e.target.value }
                    })}
                    className="glass-input w-full px-4 py-2 rounded-lg pl-10"
                    placeholder="Enter your city"
                    required
                  />
                  <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-[38px]" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Birth Preferences</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {birthPlanOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleBirthPlanToggle(option.id)}
                    className={`p-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      formData.preferences.birthPlan.includes(option.id)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      formData.preferences.birthPlan.includes(option.id)
                        ? 'bg-white/20'
                        : 'bg-white'
                    }`}>
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Doula Preferences</h2>
              
              {Object.entries(doulaPreferences).map(([category, options]) => (
                <div key={category}>
                  <h3 className="text-lg font-medium text-purple-900 mb-4 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handlePreferenceToggle(category, option.id)}
                        className={`p-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                          formData.preferences.doula[category as keyof typeof formData.preferences.doula].includes(option.id)
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                            : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          formData.preferences.doula[category as keyof typeof formData.preferences.doula].includes(option.id)
                            ? 'bg-white/20'
                            : 'bg-white'
                        }`}>
                          {option.icon}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-purple-900 transition-colors"
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < 3) {
                  handleNext();
                } else {
                  handleSubmit();
                }
              }}
              disabled={loading}
              className="glass-button px-6 py-2 rounded-xl text-white flex items-center gap-2 ml-auto disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {step === 3 ? 'Complete' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};