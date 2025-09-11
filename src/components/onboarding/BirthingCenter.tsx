import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Phone, Globe, Mail, Clock, ArrowRight, ArrowLeft, AlignCenterVertical as Certificate, X } from 'lucide-react';

export const BirthingCenterOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    centerInfo: {
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      license: '',
      yearEstablished: ''
    },
    facilities: [],
    services: [],
    insuranceAccepted: [],
    staff: {
      midwives: '',
      nurses: '',
      doulas: '',
      lactationConsultants: ''
    },
    policies: {
      visitationPolicy: '',
      birthingOptions: [],
      covid19Protocols: ''
    }
  });

  const facilityOptions = [
    'Birth Pools',
    'Private Rooms',
    'Family Accommodation',
    'Kitchen Facilities',
    'Garden/Outdoor Space',
    'Lactation Room',
    'Operating Room',
    'Recovery Suites'
  ];

  const serviceOptions = [
    'Natural Birth',
    'Water Birth',
    'VBAC',
    'Prenatal Care',
    'Postpartum Care',
    'Lactation Support',
    'Childbirth Education',
    'Prenatal Yoga'
  ];

  const birthingOptions = [
    'Water Birth',
    'Natural Birth',
    'VBAC',
    'Hypnobirthing',
    'Birth Stool',
    'Birth Ball',
    'Squatting Bar',
    'Birthing Tub'
  ];

  const handleArrayToggle = (category: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: prev[category][field].includes(value)
          ? prev[category][field].filter(item => item !== value)
          : [...prev[category][field], value]
      }
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
            {[1, 2, 3].map((stepNumber) => (
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
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Center Name
                </label>
                <input
                  type="text"
                  value={formData.centerInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    centerInfo: { ...formData.centerInfo, name: e.target.value }
                  })}
                  placeholder="Enter center name"
                  className="glass-input w-full px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                <input
                  type="text"
                  value={formData.centerInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    centerInfo: { ...formData.centerInfo, address: e.target.value }
                  })}
                  placeholder="Enter full address"
                  className="glass-input w-full px-4 py-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.centerInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      centerInfo: { ...formData.centerInfo, phone: e.target.value }
                    })}
                    placeholder="Phone number"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.centerInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      centerInfo: { ...formData.centerInfo, email: e.target.value }
                    })}
                    placeholder="Email address"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.centerInfo.website}
                    onChange={(e) => setFormData({
                      ...formData,
                      centerInfo: { ...formData.centerInfo, website: e.target.value }
                    })}
                    placeholder="Website URL"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font icient text-purple-900 mb-2 flex items-center gap-2">
                    <Certificate className="w-4 h-4" />
                    License Number
                  </label>
                  <input
                    type="text"
                    value={formData.centerInfo.license}
                    onChange={(e) => setFormData({
                      ...formData,
                      centerInfo: { ...formData.centerInfo, license: e.target.value }
                    })}
                    placeholder="License number"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Facilities & Services</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Available Facilities</label>
                <div className="flex flex-wrap gap-2">
                  {facilityOptions.map((facility) => (
                    <button
                      key={facility}
                      onClick={() => handleArrayToggle('facilities', facility)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.facilities.includes(facility)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Staff Information</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-purple-600 mb-1">Midwives</label>
                    <input
                      type="number"
                      value={formData.staff.midwives}
                      onChange={(e) => setFormData({
                        ...formData,
                        staff: { ...formData.staff, midwives: e.target.value }
                      })}
                      placeholder="Number of midwives"
                      className="glass-input w-full px-4 py-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-600 mb-1">Nurses</label>
                    <input
                      type="number"
                      value={formData.staff.nurses}
                      onChange={(e) => setFormData({
                        ...formData,
                        staff: { ...formData.staff, nurses: e.target.value }
                      })}
                      placeholder="Number of nurses"
                      className="glass-input w-full px-4 py-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-600 mb-1">Doulas</label>
                    <input
                      type="number"
                      value={formData.staff.doulas}
                      onChange={(e) => setFormData({
                        ...formData,
                        staff: { ...formData.staff, doulas: e.target.value }
                      })}
                      placeholder="Number of doulas"
                      className="glass-input w-full px-4 py-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-600 mb-1">Lactation Consultants</label>
                    <input
                      type="number"
                      value={formData.staff.lactationConsultants}
                      onChange={(e) => setFormData({
                        ...formData,
                        staff: { ...formData.staff, lactationConsultants: e.target.value }
                      })}
                      placeholder="Number of consultants"
                      className="glass-input w-full px-4 py-2 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Policies & Options</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Birthing Options</label>
                <div className="flex flex-wrap gap-2">
                  {birthingOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleArrayToggle('policies', 'birthingOptions', option)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.policies.birthingOptions.includes(option)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">Visitation Policy</label>
                <textarea
                  value={formData.policies.visitationPolicy}
                  onChange={(e) => setFormData({
                    ...formData,
                    policies: { ...formData.policies, visitationPolicy: e.target.value }
                  })}
                  placeholder="Describe your visitation policy..."
                  className="glass-input w-full px-4 py-2 rounded-lg h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">COVID-19 Protocols</label>
                <textarea
                  value={formData.policies.covid19Protocols}
                  onChange={(e) => setFormData({
                    ...formData,
                    policies: { ...formData.policies, covid19Protocols: e.target.value }
                  })}
                  placeholder="Describe your COVID-19 safety protocols..."
                  className="glass-input w-full px-4 py-2 rounded-lg h-24 resize-none"
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
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              className="glass-button px-6 py-2 rounded-xl text-white flex items-center gap-2 ml-auto"
            >
              {step === 3 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};