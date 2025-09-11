import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Baby, UserCircle, Building2, Users, ArrowRight, CheckCircle2, Mail, Lock, X, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ scale: 1, y: 0 });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;
      
      // Calculate logo transformation based on scroll position
      const maxScale = 1;
      const minScale = 0.5;
      const scaleRange = maxScale - minScale;
      const scrollRange = 200;

      let scale = maxScale - (scrollPosition / scrollRange) * scaleRange;
      scale = Math.max(minScale, Math.min(maxScale, scale));

      setLogoPosition({
        scale,
        y: scrollPosition * 0.3,
      });

      setScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Close the modal and redirect to dashboard
        setShowLoginModal(false);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      id: 'expecting-mothers',
      title: 'For Expecting Mothers',
      subtitle: 'Your Journey to Motherhood, Supported with Love',
      description: 'Begin your motherhood journey with comprehensive support from experienced doulas who understand your unique needs.',
      features: [
        'Personalized doula matching based on your preferences',
        'Access to prenatal and postpartum resources',
        'Community support from other mothers',
        'Birth plan development assistance'
      ],
      images: [
        {
          url: 'https://plus.unsplash.com/premium_photo-1664453891536-906905614ac5?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop&q=80&w=800',
          alt: 'Pregnant woman folding clothes'
        }
      ],
      cta: {
        text: 'Start My Journey',
        link: '/onboarding/mother'
      }
    },
    {
      id: 'doulas',
      title: 'For Doulas',
      subtitle: 'Grow Your Practice, Touch More Lives',
      description: 'Connect with clients who value your expertise and build a thriving practice on your terms.',
      features: [
        'Smart matching with compatible clients',
        'Flexible scheduling and booking system',
        'Secure messaging and file sharing',
        'Professional profile customization'
      ],
      images: [
        {
          url: 'https://plus.unsplash.com/premium_photo-1681826183557-9133034685d1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop&q=80&w=800',
          alt: 'Doula supporting mother during pregnancy'
        }
      ],
      cta: {
        text: 'Join as a Doula',
        link: '/onboarding/doula'
      }
    },
    {
      id: 'birthing-centers',
      title: 'For Birthing Centers',
      subtitle: 'Enhance Your Care Network',
      description: 'Partner with qualified doulas and expand your services to provide comprehensive maternal care.',
      features: [
        'Access to verified doula network',
        'Integrated scheduling system',
        'Client satisfaction tracking',
        'Resource sharing platform'
      ],
      images: [
        {
          url: 'https://plus.unsplash.com/premium_photo-1667516577318-4396a6da8179?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop&q=80&w=800',
          alt: 'Modern birthing center facility'
        }
      ],
      cta: {
        text: 'Become a Partner',
        link: '/onboarding/birthing-center'
      }
    },
    {
      id: 'organizations',
      title: 'For Doula Organizations',
      subtitle: 'Streamline Your Operations',
      description: 'Manage your doula network efficiently and expand your reach with our comprehensive platform.',
      features: [
        'Doula management dashboard',
        'Performance analytics',
        'Training resource distribution',
        'Client matching automation'
      ],
      images: [
        {
          url: 'https://plus.unsplash.com/premium_photo-1675035661871-c680999e5246?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop&q=80&w=800',
          alt: 'Doulas holding hands'
        }
      ],
      cta: {
        text: 'Expand My Organization',
        link: '/onboarding/organization'
      }
    }
  ];

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Personalized Care",
      description: "Connect with experienced doulas who match your unique needs, preferences, and cultural background."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Supportive Community",
      description: "Join a vibrant community of expecting mothers, share experiences, and get advice from those who understand."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      title: "Vetted Professionals",
      description: "Every doula is thoroughly vetted and certified, ensuring you receive the highest quality care."
    }
  ];

  const handleRoleSelect = (role: string) => {
    switch(role) {
      case 'expecting-mother':
        navigate('/onboarding/mother');
        break;
      case 'doula':
        navigate('/onboarding/doula');
        break;
      case 'birthing-center':
        navigate('/onboarding/birthing-center');
        break;
      case 'doula-organization':
        navigate('/onboarding/organization');
        break;
      default:
        break;
    }
  };

  const roles = [
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Expecting Mother",
      description: "Find your perfect doula and join a supportive community",
      color: "from-pink-500 to-purple-500",
      role: "expecting-mother"
    },
    {
      icon: <UserCircle className="w-8 h-8" />,
      title: "Doula",
      description: "Connect with clients and grow your practice",
      color: "from-purple-500 to-indigo-500",
      role: "doula"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Birthing Center",
      description: "Partner with doulas and expand your services",
      color: "from-indigo-500 to-blue-500",
      role: "birthing-center"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Doula Organization",
      description: "Manage your network of doulas efficiently",
      color: "from-blue-500 to-cyan-500",
      role: "doula-organization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Fixed Header with Animated Logo */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/70 backdrop-blur-lg shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Centered Logo */}
            <div
              className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                scrolled ? 'h-16' : 'h-48'
              }`}
            >
              <img
                src="https://i.imgur.com/zhdl0wV.png"
                alt="Baraka Logo"
                className={`
                  transition-all duration-500 ease-in-out
                  ${scrolled
                    ? 'w-10 h-10'
                    : 'w-28 h-28'
                  }
                `}
                style={{
                  transform: scrolled
                    ? 'none'
                    : `scale(${logoPosition.scale})`,
                }}
              />
            </div>

            {/* Navigation Links - Hidden until scroll */}
            <div 
              className={`
                absolute right-0 top-1/2 -translate-y-1/2
                flex items-center gap-4
                transition-all duration-500
                ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
            >
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 rounded-lg text-purple-600 hover:bg-white/50 transition-colors text-sm font-medium"
              >
                Log In
              </button>
              <Link
                to="/onboarding/mother"
                className="glass-button px-4 py-2 rounded-lg text-white text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative blurred circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Your Journey to Motherhood,<br />Supported with Love
            </h1>
            <p className="text-lg sm:text-xl text-purple-600 max-w-3xl mx-auto mb-10">
              Connect with experienced doulas, join a supportive community, and access resources 
              for an intimate birth experience.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`relative py-24 ${
            index % 2 === 0 ? 'bg-white/30' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-12 ${
              index % 2 === 0 ? '' : 'lg:flex-row-reverse'
            }`}>
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <p className="text-xl text-purple-600">
                  {section.subtitle}
                </p>
                <p className="text-lg text-purple-800">
                  {section.description}
                </p>
                <ul className="space-y-4">
                  {section.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-pink-500" />
                      <span className="text-purple-900">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={section.cta.link}
                  className="group relative glass-button px-8 py-3 rounded-xl text-white text-lg font-medium inline-flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {section.cta.text}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

              {/* Images */}
              <div className="flex-1">
                <div className="relative w-full h-[500px] perspective-1000">
                  {section.images.map((image, i) => (
                    <div
                      key={i}
                      className={`
                        relative w-full h-full
                        transform transition-all duration-500 ease-in-out
                        hover:scale-105
                        ${i === 1 ? 'absolute top-0 left-0 -translate-y-1/4 translate-x-1/4 rotate-6' : ''}
                      `}
                      style={{
                        zIndex: section.images.length - i
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Role Selection Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-4">
          Join Baraka As
        </h2>
        <p className="text-center text-purple-600 mb-12 max-w-2xl mx-auto">
          Whether you're an expecting mother, a doula, or an organization, 
          we have the tools and support your needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => handleRoleSelect(role.role)}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 text-left"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center text-white mb-4`}>
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                {role.title}
              </h3>
              <p className="text-purple-600">
                {role.description}
              </p>
              <div className="mt-4 flex items-center text-purple-600 gap-2">
                <span className="text-sm">Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-purple-600">
          <Link to="/terms" className="hover:text-purple-900">Terms & Conditions</Link>
          <span className="hidden sm:inline">•</span>
          <Link to="/privacy" className="hover:text-purple-900">Privacy Policy</Link>
          <span className="hidden sm:inline">•</span>
          <Link to="/about" className="hover:text-purple-900">About Us</Link>
        </div>
        <p className="text-center text-sm text-purple-400 mt-4">
          © {new Date().getFullYear()} Baraka. All rights reserved.
        </p>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-purple-50 transition-colors"
            >
              <X className="w-5 h-5 text-purple-600" />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Welcome Back</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full glass-button px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>

                <p className="text-sm text-purple-600 text-center">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      navigate('/onboarding/mother');
                    }}
                    className="text-purple-900 font-medium hover:text-pink-600"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};