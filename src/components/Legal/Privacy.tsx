import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText, Server, Bell, UserCheck, Scale } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="https://i.imgur.com/zhdl0wV.png"
              alt="Baraka Logo"
              className="w-8 h-8 sm:w-12 sm:h-12"
            />
            <h1 className="text-3xl font-bold text-purple-900">Privacy Policy</h1>
          </div>

          <div className="space-y-8 text-purple-900">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">1. HIPAA Compliance Statement</h2>
              </div>
              <p className="mb-4">
                Baraka is committed to maintaining compliance with the Health Insurance Portability and Accountability Act (HIPAA). We implement physical, technical, and administrative safeguards to protect your health information.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              </div>
              <h3 className="font-medium mb-2">Protected Health Information (PHI):</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Due date and pregnancy-related information</li>
                <li>Birth preferences and plans</li>
                <li>Healthcare provider information</li>
                <li>Medical history relevant to pregnancy and birth</li>
              </ul>
              
              <h3 className="font-medium mb-2">Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information</li>
                <li>Location and demographic data</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">3. How We Protect Your Information</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for all sensitive data</li>
                <li>Secure, HIPAA-compliant servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Strict access controls and authentication</li>
                <li>Employee training on privacy and security</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">4. Information Usage</h2>
              </div>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Connect you with appropriate doulas</li>
                <li>Facilitate communication between users</li>
                <li>Improve our services and user experience</li>
                <li>Process payments and maintain records</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">5. Information Sharing</h2>
              </div>
              <p className="mb-4">We share information only:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With doulas you choose to connect with</li>
                <li>With third-party service providers bound by confidentiality agreements</li>
                <li>When required by law or regulation</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">6. Your Rights</h2>
              </div>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to your information</li>
                <li>Receive a copy of your records</li>
                <li>Request restrictions on information sharing</li>
                <li>File a complaint about privacy practices</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">7. Changes to Privacy Policy</h2>
              </div>
              <p className="mb-4">
                We will notify you of any material changes to this privacy policy and obtain consent when required by law.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">8. Legal Compliance</h2>
              </div>
              <p className="mb-4">
                This privacy policy complies with HIPAA, state privacy laws, and other applicable regulations. For specific state privacy rights, please contact our privacy office.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
              <p className="mb-4">
                For privacy-related questions or concerns:
                <br />
                Email: privacy@baraka.com
                <br />
                Phone: (888) 555-0123
                <br />
                Address: 123 Privacy Way, Suite 100, Atlanta, GA 30303
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};