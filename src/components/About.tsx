import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-block mb-8">
            <img
              src="https://i.imgur.com/zhdl0wV.png"
              alt="Baraka Logo"
              className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
            />
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About Baraka
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">The Meaning of Baraka</h2>
            <p className="text-purple-800 leading-relaxed mb-6">
              Baraka is a Swahili word meaning blessing – which we refer to as the sacred energy embodied by new mothers during their postpartum journey. In many traditions, the postpartum period recognizes mothers as radiant beings deserving profound reverence, with entire communities mobilizing to nurture them through intentional care practices.
            </p>
            <p className="text-purple-800 leading-relaxed">
              The postpartum mother becomes the focal point of collective support, honored through nourishing meals, healing rituals, and protective cocooning for at least forty days. Traditional caregivers describe how people would gather simply to bask in her luminous presence, treating her with the celebratory reverence reserved for brides. This reflects the deep cultural wisdom that a mother's wellbeing directly nourishes her family and society.
            </p>
          </section>

          <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">The Postpartum Journey</h2>
            <p className="text-purple-800 leading-relaxed mb-6">
              While pregnancy and birth are fleeting chapters, the postpartum experience imprints itself forever. Every mother carries this transition in her bones, making holistic care essential for her lifelong resilience. Yet modern systems often neglect maternal healing, prioritizing infant needs over the village of support required to uphold both.
            </p>
            <p className="text-purple-800 leading-relaxed">
              Reclaiming postpartum traditions means restoring sacred space for mothers to replenish – through ancestral practices like closing ceremonies, nutrient-rich foods, and extended recovery periods. It also means evolving care models to address emotional, spiritual, and physical healing collectively rather than individually. By centering the mother's restoration, we honor the baraka she brings to the world through the act of nurturing new life.
            </p>
          </section>

          <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">Our Vision</h2>
            <p className="text-purple-800 leading-relaxed">
              This paradigm shift begins within families and communities, rippling outward as we collectively reinvest in postpartum care's transformative power. Join the conversation about rebuilding these vital support systems in ways that empower mothers to thrive.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/signup"
                className="group relative glass-button px-8 py-3 rounded-xl text-white text-lg font-medium inline-flex items-center gap-2 overflow-hidden"
              >
                <Heart className="w-5 h-5" />
                <span>Join Our Community</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};