import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, MapPin, Phone, Mail, Globe, ArrowRight, ArrowLeft, AlignCenterVertical as Certificate, DollarSign, X } from 'lucide-react';

export const DoulaOrganizationOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orgInfo: {
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      yearEstablished: '',
      taxId: ''
    },
    services: [],
    coverage: {
      serviceAreas: [],
      languages: []
    },
    requirements: {
      certification: [],
      experience: '',
      background: true,
      insurance: true
    },
    compensation: {
      structure: '',
      benefits: []
    }
  });

  const serviceOptions = [
    'Birth Doula Services',
    'Postpartum Care',
    'Lactation Support',
    'Childbirth Education',
    'Prenatal Support',
    'Placenta Encapsulation',
    'Bereavement Support',
    'Fertility Support'
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

  const certificationOptions = [
    'DONA International',
    'CAPPA',
    'ICEA',
    'ProDoula',
    'Birth Arts International'
  ];

  const benefitOptions = [
    'Health Insurance',
    'Liability Insurance',
    'Continuing Education',
    'Mentorship Program',
    'Flexible Schedule',
    'Paid Time Off',
    'Professional Development',
    'Marketing Support'
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
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Organization Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Organization Name
                </label>
                <input
                  type="text"
                  value={formData.orgInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    orgInfo: { ...formData.orgInfo, name: e.target.value }
                  })}
                  placeholder="Enter organization name"
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
                  value={formData.orgInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    orgInfo: { ...formData.orgInfo, address: e.target.value }
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
                    value={formData.orgInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      orgInfo: { ...formData.orgInfo, phone: e.target.value }
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
                    value={formData.orgInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      orgInfo: { ...formData.orgInfo, email: e.target.value }
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
                    value={formData.orgInfo.website}
                    onChange={(e) => setFormData({
                      ...formData,
                      orgInfo: { ...formData.orgInfo, website: e.target.value }
                    })}
                    placeholder="Website URL"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Certificate className="w-4 h-4" />
                    Tax ID
                  </label>
                  <input
                    type="text"
                    value={formData.orgInfo.taxId}
                    onChange={(e) => setFormData({
                      ...formData,
                      orgInfo: { ...formData.orgInfo, taxId: e.target.value }
                    })}
                    placeholder="Tax ID number"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Services & Coverage</h2>
              
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
                <label className="block text-sm font-medium text-purple-900 mb-4">Languages Supported</label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <button
                      key={language}
                      onClick={() => handleArrayToggle('coverage', 'languages', language)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.coverage.languages.includes(language)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">Service Areas</label>
                <textarea
                  value={formData.coverage.serviceAreas.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    coverage: {
                      ...formData.coverage,
                      serviceAreas: e.target.value.split(',').map(area => area.trim())
                    }
                  })}
                  placeholder="Enter service areas (comma-separated)"
                  className="glass-input w-full px-4 py-2 rounded-lg h-24 resize-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Requirements & Compensation</h2>
              
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Required Certifications</label>
                <div className="flex flex-wrap gap-2">
                  {certificationOptions.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => handleArrayToggle('requirements', 'certification', cert)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.requirements.certification.includes(cert)
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
                <label className="block text-sm font-medium text-purple-900 mb-2">Minimum Experience</label>
                <input
                  type="text"
                  value={formData.requirements.experience}
                  onChange={(e) => setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, experience: e.target.value }
                  })}
                  placeholder="e.g., 2 years of birth support"
                  className="glass-input w-full px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-4">Benefits Offered</label>
                <div className="flex flex-wrap gap-2">
                  {benefitOptions.map((benefit) => (
                    <button
                      key={benefit}
                      onClick={() => handleArrayToggle('compensation', 'benefits', benefit)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        formData.compensation.benefits.includes(benefit)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {benefit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Compensation Structure
                </label>
                <textarea
                  value={formData.compensation.structure}
                  onChange={(e) => setFormData({
                    ...formData,
                    compensation: { ...formData.compensation, structure: e.target.value }
                  })}
                  placeholder="Describe your compensation structure..."
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