import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Target, Award, Shield, TrendingUp, Heart, Globe, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500+', label: 'Healthcare Providers', icon: <Heart className="w-6 h-6" /> },
    { number: '98%', label: 'Revenue Recovery', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '50+', label: 'Expert Team', icon: <Users className="w-6 h-6" /> },
    { number: '24/7', label: 'Support Available', icon: <Shield className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our operations, ensuring complete transparency with our clients.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Our commitment to excellence drives us to continuously improve our services and deliver outstanding results.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We work closely with healthcare providers as trusted partners, understanding their unique challenges and goals.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology and innovative solutions to streamline revenue cycle management processes.'
    }
  ];

  const services = [
    'Medical Coding & Billing',
    'Claims Processing & Management',
    'Revenue Cycle Optimization',
    'Denial Management',
    'Patient Registration & Verification',
    'Compliance & Audit Support'
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        
        <Navbar />
        <div className="pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              About GetMax Healthcare
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing Revenue Cycle Management with cutting-edge technology and unparalleled expertise
            </p>
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 border border-white/30">
                <span className="text-lg font-semibold">Trusted by 500+ Healthcare Providers</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'animate-pulse' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-teal-600">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 rounded-full">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold ml-4 text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To empower healthcare providers with innovative Revenue Cycle Management solutions that maximize revenue recovery, 
              reduce administrative burdens, and improve patient care outcomes through advanced technology and dedicated expertise.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-full">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold ml-4 text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the leading technology-driven RCM partner, transforming the healthcare industry by delivering exceptional 
              revenue cycle performance while maintaining the highest standards of compliance, security, and patient satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* About Company Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              GetMax Healthcare Solution Pvt Ltd is a premier technology-driven Revenue Cycle Management company 
              dedicated to serving healthcare providers across the United States. Founded on the principles of 
              innovation, integrity, and excellence, we combine cutting-edge technology with deep industry expertise 
              to deliver comprehensive RCM solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Our Expertise</h3>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Proven Results</h4>
                    <p className="text-gray-600">98% revenue recovery rate with reduced claim denials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">HIPAA Compliant</h4>
                    <p className="text-gray-600">Secure, compliant processes protecting patient data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Expert Team</h4>
                    <p className="text-gray-600">Certified professionals with deep healthcare knowledge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These values guide everything we do and shape our commitment to excellence in healthcare revenue cycle management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                activeCard === index ? 'ring-2 ring-teal-500' : ''
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 rounded-full text-white">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">{value.title}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Maximize Your Revenue?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who trust GetMax Healthcare Solution to optimize their revenue cycle management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
              Get Started Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
        <Footer />
    </div>
    </div>
  );
};

export default AboutUs;