import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const Terms = () => {
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
            <h1 className="text-3xl font-bold text-purple-900">Terms and Conditions</h1>
          </div>

          <div className="space-y-8 text-purple-900">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Baraka's platform, you agree to be bound by these Terms and Conditions, our Privacy Policy, and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Healthcare Disclaimer</h2>
              <p className="mb-4">
                Baraka is a platform connecting expecting mothers with doulas and is not a substitute for professional medical care. We do not provide medical advice, diagnosis, or treatment.
              </p>
              <p className="mb-4">
                Always seek the advice of qualified healthcare providers with questions regarding medical conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Use the platform in compliance with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Doula Services</h2>
              <p className="mb-4">
                Doulas listed on our platform are independent contractors. Baraka is not responsible for the services provided by doulas.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verify doula credentials and certifications independently</li>
                <li>Establish clear agreements with doulas regarding services and fees</li>
                <li>Report any concerns about doula services through appropriate channels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Privacy and Data Protection</h2>
              <p className="mb-4">
                We are committed to protecting your privacy and maintaining HIPAA compliance. See our <Link to="/privacy" className="text-pink-600 hover:text-pink-700 underline">Privacy Policy</Link> for detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Platform Usage</h2>
              <p className="mb-4">Users agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the platform for any unlawful purpose</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Post false or misleading information</li>
                <li>Attempt to gain unauthorized access to the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Termination</h2>
              <p className="mb-4">
                We reserve the right to terminate or suspend accounts that violate these terms or engage in inappropriate behavior.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="mb-4">
                We may update these terms periodically. Continued use of the platform after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
              <p className="mb-4">
                For questions about these terms, contact us at legal@baraka.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};