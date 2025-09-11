import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Heart, AlignCenterVertical as Certificate, Clock, ArrowRight, ArrowLeft, DollarSign, Globe, X } from 'lucide-react';

export const DoulaOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    certifications: [],
    specialties: [],
    languages: [],
    culturalExpertise: [],
    availability: {
      days: [],
      hours: { start: '', end: '' }
    },
    services: [],
    rates: {
      weekly: '',
      package: ''
    },
    location: '',
    travelRadius: '',
    bio: ''
  });

  const certificationOptions = [
    'DONA International',
    'CAPPA',
    'ICEA',
    'ProDoula',
    'Birth Arts International'
  ];

  const specialtyOptions = [
    'Birth Doula',
    'Postpartum Doula',
    'Prenatal Support',
    'Lactation Support',
    'VBAC Support',
    'High Risk Pregnancy',
    'Twin Birth',
    'Water Birth',
    'Hypnobirthing'
  ];

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'Arabic',
    'Mandarin',
    'Hindi',
    'Swahili'
  ];

  const culturalOptions = [
    'African',
    'Asian',
    'Hispanic',
    'Middle Eastern',
    'European',
    'Indigenous'
  ];

  const serviceOptions = [
    'Birth Planning',
    'Labor Support',
    'Postpartum Care',
    'Lactation Support',
    'Childbirth Education',
    'Prenatal Yoga',
    'Massage Therapy',
    'Nutritional Guidance'
  ];

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    try {
      // Save data to Supabase
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

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
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-purple-100 text-purple-400'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-card p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Professional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4 flex items-center gap-2">
                  <Certificate className="w-4 h-4" />
                  Certifications
                </label>
                <div className="flex flex-wrap gap-2">
                  {certificationOptions.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => handleArrayToggle('certifications', cert)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.certifications.includes(cert)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => handleArrayToggle('specialties', specialty)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.specialties.includes(specialty)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Cultural Competency</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleArrayToggle('languages', lang)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.languages.includes(lang)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Cultural Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {culturalOptions.map((culture) => (
                    <button
                      key={culture}
                      onClick={() => handleArrayToggle('culturalExpertise', culture)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.culturalExpertise.includes(culture)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {culture}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Services & Availability</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Services Offered</label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      onClick={() => handleArrayToggle('services', service)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.services.includes(service)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Weekly Rate
                  </label>
                  <input
                    type="number"
                    value={formData.rates.weekly}
                    onChange={(e) => setFormData({
                      ...formData,
                      rates: { ...formData.rates, weekly: e.target.value }
                    })}
                    placeholder="Enter weekly rate"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">Package Rate</label>
                  <input
                    type="number"
                    value={formData.rates.package}
                    onChange={(e) => setFormData({
                      ...formData,
                      rates: { ...formData.rates, package: e.target.value }
                    })}
                    placeholder="Enter package rate"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Location & Bio</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Service Area
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your primary location"
                  className="glass-input w-full px-4 py-2 rounded-lg mb-4"
                />
                <input
                  type="number"
                  value={formData.travelRadius}
                  onChange={(e) => setFormData({ ...formData, travelRadius: e.target.value })}
                  placeholder="Travel radius (miles)"
                  className="glass-input w-full px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself and your approach to doula care..."
                  className="glass-input w-full px-4 py-2 rounded-lg h-32 resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-purple-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < 4) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              className="glass-button px-6 py-2 rounded-xl text-white flex items-center gap-2 ml-auto"
            >
              {step === 4 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};