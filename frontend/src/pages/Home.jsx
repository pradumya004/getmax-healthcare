import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Star, ArrowRight, CheckCircle, Users, TrendingUp, Clock, Shield, Globe, ChevronRight, Sparkles, Zap, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GetMaxHealthcare = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      text: "GetMax transformed our revenue cycle completely. We saw a 35% increase in collections within the first quarter.",
      author: "Dr. Sarah Johnson",
      role: "Family Medicine Practice, Texas",
      rating: 5
    },
    {
      text: "Their tech-enabled approach reduced our claim denials by 60%. The transparency and reporting are exceptional.",
      author: "Michael Chen",
      role: "Practice Manager, California",
      rating: 5
    },
    {
      text: "Outstanding service and results. Our cash flow improved dramatically, and the team is incredibly responsive.",
      author: "Dr. Robert Martinez",
      role: "Specialty Clinic, Florida",
      rating: 5
    }
  ];

  const stats = [
    { number: "98%", label: "First-Pass Claim Rate" },
    { number: "45%", label: "Faster Collections" },
    { number: "500+", label: "Healthcare Practices" },
    { number: "24/7", label: "Support Available" }
  ];

  const services = [
    {
      title: "Medical Coding & Billing",
      description: "Accurate coding and streamlined billing processes with advanced technology integration",
      icon: <TrendingUp className="h-8 w-8 text-emerald-400" />,
      glow: "shadow-emerald-400/20"
    },
    {
      title: "Claims Management",
      description: "End-to-end claims processing with real-time tracking and denial management",
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      glow: "shadow-blue-400/20"
    },
    {
      title: "Revenue Analytics",
      description: "Advanced reporting and analytics to optimize your revenue cycle performance",
      icon: <Users className="h-8 w-8 text-purple-400" />,
      glow: "shadow-purple-400/20"
    },
    {
      title: "Patient Collections",
      description: "Compassionate patient communication and efficient payment collection strategies",
      icon: <Heart className="h-8 w-8 text-pink-400" />,
      glow: "shadow-pink-400/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-stone-50 to-amber-50">
      {/* Animated Background Elements */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-sm font-medium text-emerald-800 mb-6 shadow-lg shadow-emerald-200/50">
                <Sparkles className="h-4 w-4 mr-2" />
                Tech-Enabled Healthcare Solutions
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">Maximize Your</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-pulse">Revenue Cycle</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tech-enabled healthcare RCM solutions that increase collections, reduce denials, and streamline your practice operations for sustainable growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 hover:from-emerald-600 hover:to-teal-600">
                  <span className="relative z-10 flex items-center">
                    Schedule Demo
                    <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
                <button className="group px-8 py-4 border-2 border-emerald-300 text-emerald-700 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 backdrop-blur-sm bg-white/30 hover:border-emerald-400">
                  <span className="flex items-center">
                    View Case Studies
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Medical Professional Image Placeholder */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-2xl shadow-emerald-200/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 shadow-xl">
                      <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">{stat.number}</div>
                            <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-60 animate-bounce shadow-2xl shadow-pink-400/20"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-pulse shadow-2xl shadow-blue-400/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6 shadow-lg shadow-blue-200/50">
              <Shield className="h-4 w-4 mr-2" />
              Comprehensive Solutions
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Premium RCM</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From coding to collections, we handle every aspect of your revenue cycle with precision and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`group relative p-8 backdrop-blur-xl bg-white/60 rounded-3xl shadow-xl ${service.glow} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-white/20`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-white to-gray-50 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors">
                    Learn More 
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 mb-6 shadow-lg shadow-purple-200/50">
                <Globe className="h-4 w-4 mr-2" />
                Industry Leaders
              </div>
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Why Choose</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">GetMax Healthcare?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We combine cutting-edge technology with healthcare expertise to deliver measurable results for your practice.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Advanced Technology Stack</h3>
                    <p className="text-gray-600">AI-powered coding and automated workflows reduce errors and accelerate processing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Certified Healthcare Professionals</h3>
                    <p className="text-gray-600">Our team includes certified coders, billers, and revenue cycle specialists</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Transparent Reporting</h3>
                    <p className="text-gray-600">Real-time dashboards and detailed analytics keep you informed every step of the way</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl shadow-emerald-200/20 border border-white/20">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">15+</div>
                  <div className="text-gray-600 font-medium">Years of Experience</div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl text-center shadow-lg">
                    <Globe className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                    <div className="text-sm text-gray-600 font-medium">Global Reach</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl text-center shadow-lg">
                    <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <div className="text-sm text-gray-600 font-medium">HIPAA Compliant</div>
                  </div>
                </div>
                
                {/* Healthcare Team Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-full bg-gradient-to-t from-emerald-500/20 to-transparent flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-16 w-16 text-emerald-600 mx-auto mb-2 opacity-60" />
                      <div className="text-sm text-gray-600 font-medium">Expert Healthcare Team</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-sm font-medium text-yellow-800 mb-6 shadow-lg shadow-yellow-200/50">
              <Star className="h-4 w-4 mr-2" />
              Client Success Stories
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">What Our</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by healthcare practices across the United States
            </p>
          </div>
          
          <div className="relative">
            <div className="backdrop-blur-xl bg-gradient-to-r from-white/70 to-white/60 rounded-3xl p-12 shadow-2xl shadow-emerald-200/20 border border-white/20">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </div>
                <blockquote className="text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-lg">
                      {testimonials[activeTestimonial].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-800">
                      {testimonials[activeTestimonial].author}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-400/50' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Ready to Maximize Your Revenue?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Schedule a free consultation and discover how we can transform your practice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-white text-emerald-600 rounded-xl text-lg font-bold transition-all duration-300 shadow-2xl shadow-white/20 hover:shadow-white/30 transform hover:scale-105">
                <span className="relative z-10 flex items-center justify-center">
                  Schedule Free Demo
                  <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
                </span>
              </button>
              <button className="group px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center justify-center">
                  Call (555) 123-4567
                  <Phone className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-800 mb-6 shadow-lg shadow-indigo-200/50">
              <Mail className="h-4 w-4 mr-2" />
              Get in Touch
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Ready to</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Connect?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to start your revenue cycle transformation?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 backdrop-blur-xl bg-white/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Phone</h3>
              <p className="text-gray-600 text-lg font-medium">+1 (555) 123-4567</p>
            </div>
            
            <div className="group text-center p-8 backdrop-blur-xl bg-white/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Email</h3>
              <p className="text-gray-600 text-lg font-medium">info@getmaxhealthcare.com</p>
            </div>
            
            <div className="group text-center p-8 backdrop-blur-xl bg-white/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Address</h3>
              <p className="text-gray-600 text-lg font-medium">123 Healthcare Blvd<br />Medical City, NY 10001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Glassmorphism Footer */}
       <Footer />
    </div>
  );
};

export default GetMaxHealthcare;