import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  FileText, 
  CreditCard, 
  Shield, 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Building2,
  Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 'medical-coding',
      title: 'Medical Coding & Billing',
      description: 'Accurate ICD-10, CPT, and HCPCS coding with real-time claim processing and submission to maximize reimbursements.',
      icon: FileText,
      features: ['ICD-10 & CPT Coding', 'Real-time Claim Processing', 'Denial Management', 'Compliance Monitoring'],
      gradient: 'from-teal-500 to-emerald-500'
    },
    {
      id: 'payment-processing',
      title: 'Payment Processing',
      description: 'Streamlined payment workflows with automated posting, reconciliation, and comprehensive financial reporting.',
      icon: CreditCard,
      features: ['Automated Payment Posting', 'EOB Processing', 'Patient Statements', 'Financial Reporting'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'credentialing',
      title: 'Provider Credentialing',
      description: 'Complete credentialing and enrollment services ensuring providers are properly certified with all payers.',
      icon: Shield,
      features: ['Insurance Enrollment', 'CAQH Management', 'Re-credentialing', 'Compliance Tracking'],
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'analytics',
      title: 'Revenue Analytics',
      description: 'Advanced analytics and reporting to optimize revenue performance and identify growth opportunities.',
      icon: BarChart3,
      features: ['Performance Dashboards', 'KPI Tracking', 'Trend Analysis', 'Custom Reports'],
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'patient-services',
      title: 'Patient Services',
      description: 'Comprehensive patient support including eligibility verification, prior authorization, and customer service.',
      icon: Users,
      features: ['Eligibility Verification', 'Prior Authorization', '24/7 Customer Support', 'Patient Portal'],
      gradient: 'from-teal-600 to-blue-600'
    },
    {
      id: 'ar-management',
      title: 'A/R Management',
      description: 'Proactive accounts receivable management with automated follow-ups and denial resolution strategies.',
      icon: Clock,
      features: ['Automated Follow-ups', 'Denial Resolution', 'Aging Analysis', 'Collection Strategies'],
      gradient: 'from-emerald-600 to-cyan-600'
    }
  ];

  const stats = [
    { value: '99.2%', label: 'Claim Accuracy', icon: CheckCircle },
    { value: '15%', label: 'Revenue Increase', icon: BarChart3 },
    { value: '24/7', label: 'Support Available', icon: Clock },
    { value: '500+', label: 'Healthcare Providers', icon: Building2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />

        <div className="pt-20">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Services
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
              Comprehensive Revenue Cycle Management solutions designed to maximize your practice's financial performance
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-lg -mt-12 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Complete RCM Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From medical coding to revenue analytics, we provide end-to-end solutions 
            that streamline your revenue cycle and boost profitability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-${index}`}
              className={`animate-on-scroll group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="group/btn flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Optimize Your Revenue Cycle?
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join hundreds of healthcare providers who trust GetMax Healthcare Solution 
              for their revenue cycle management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg">
                Schedule Consultation
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
        <Footer />
      </div>
  );
};

export default ServicesPage;