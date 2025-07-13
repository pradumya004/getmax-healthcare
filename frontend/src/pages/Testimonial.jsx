import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Quote,
  Award,
  Target,
  Zap,
  Shield,
  BarChart3,
  Building2,
  Heart,
  ArrowRight,
  Play,
  Pause,
  Eye,
  Calendar
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TestimonialsAndCaseStudies = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const testimonials = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      company: "Regional Health System",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      content: "GetMax Healthcare transformed our revenue cycle management completely. Their AI-driven analytics helped us identify bottlenecks we never knew existed. Our collection rate improved by 35% within the first quarter.",
      service: "RCM + AI Analytics",
      industry: "Multi-Specialty Healthcare",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "Michael Chen",
      role: "VP of Operations",
      company: "Metro Medical Center",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      content: "The BET platform revolutionized how we manage our workforce. The gamified dashboards increased employee engagement by 40%, and the integrated HRMS streamlined our entire HR process.",
      service: "BET Platform (HRMS)",
      industry: "Hospital System",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Jennifer Rodriguez",
      role: "CFO",
      company: "Valley Healthcare Network",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      content: "Working with GetMax Healthcare has been a game-changer. Their comprehensive RCM solution reduced our denial rates by 45% and accelerated our cash flow significantly. The team's expertise is unmatched.",
      service: "Full RCM Suite",
      industry: "Healthcare Network",
      gradient: "from-teal-600 to-blue-600"
    },
    {
      name: "Robert Thompson",
      role: "Practice Manager",
      company: "City Medical Group",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      content: "The CRM functionality within the BET platform helped us improve patient satisfaction scores by 28%. The analytics dashboard provides insights that drive real business decisions.",
      service: "BET Platform (CRM)",
      industry: "Medical Practice",
      gradient: "from-emerald-600 to-cyan-600"
    }
  ];

  const caseStudies = [
    {
      title: "45% Reduction in Denial Rates",
      client: "Large Multi-Specialty Clinic",
      challenge: "High denial rates and lengthy appeals process affecting cash flow",
      solution: "Implemented comprehensive RCM solution with AI-powered claims scrubbing and automated appeals workflow",
      results: [
        "45% reduction in denial rates",
        "60% faster appeals processing",
        "$2.3M increase in annual revenue",
        "98% first-pass claim accuracy"
      ],
      timeline: "6 months",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      metrics: {
        revenue: "$2.3M",
        efficiency: "60%",
        accuracy: "98%"
      },
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Workforce Productivity Surge",
      client: "Regional Hospital System",
      challenge: "Low employee engagement and inefficient HR processes across multiple locations",
      solution: "Deployed BET platform with gamified dashboards, integrated HRMS, and performance tracking",
      results: [
        "40% increase in employee engagement",
        "25% reduction in HR processing time",
        "50% improvement in goal completion rates",
        "85% user adoption rate"
      ],
      timeline: "4 months",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      metrics: {
        engagement: "40%",
        efficiency: "25%",
        adoption: "85%"
      },
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI-Driven Revenue Optimization",
      client: "Urban Healthcare Network",
      challenge: "Inconsistent revenue patterns and lack of predictive insights",
      solution: "Integrated AI analytics platform with predictive modeling and real-time dashboards",
      results: [
        "35% improvement in revenue predictability",
        "28% faster payment collection",
        "90% reduction in manual reporting",
        "15% increase in patient satisfaction"
      ],
      timeline: "5 months",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      metrics: {
        predictability: "35%",
        collection: "28%",
        automation: "90%"
      },
      gradient: "from-teal-600 to-blue-600"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextCaseStudy = () => {
    setActiveCaseStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCaseStudy = () => {
    setActiveCaseStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const stats = [
    { value: '150+', label: 'Healthcare Partners', icon: Building2 },
    { value: '$2.8B', label: 'Revenue Managed', icon: DollarSign },
    { value: '45%', label: 'Avg. Denial Reduction', icon: TrendingUp },
    { value: '99.2%', label: 'Client Satisfaction', icon: CheckCircle }
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
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full animate-pulse delay-1500 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Client Success Stories
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
              Discover how GetMax Healthcare has transformed revenue cycle management and 
              operational efficiency for healthcare organizations across the US
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Proven Results</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Trusted Partners</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Healthcare Focused</span>
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

      {/* Testimonials Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from healthcare leaders who trust GetMax Healthcare for their 
            revenue cycle management and operational excellence
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${testimonials[activeTestimonial].gradient} opacity-5`}></div>
            
            <div className="relative">
              <div className="absolute top-0 left-0">
                <Quote className="w-12 h-12 text-teal-400 opacity-30" />
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-shrink-0 text-center lg:text-left">
                  <div className="relative">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-teal-100 mx-auto lg:mx-0"
                    />
                    <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-center lg:justify-start mb-3">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {testimonials[activeTestimonial].name}
                    </h3>
                    <p className="text-teal-600 font-semibold mb-1">
                      {testimonials[activeTestimonial].role}
                    </p>
                    <p className="text-gray-500 mb-3">
                      {testimonials[activeTestimonial].company}
                    </p>
                    <div className="text-xs text-gray-400">
                      {testimonials[activeTestimonial].industry}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <blockquote className="text-2xl text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${testimonials[activeTestimonial].gradient} text-white text-sm font-medium`}>
                      <Zap className="w-4 h-4 mr-2" />
                      {testimonials[activeTestimonial].service}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span className="text-sm">{isAutoPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Auto-playing testimonials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === activeTestimonial
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Detailed Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth analysis of our most impactful implementations with measurable results
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={caseStudies[activeCaseStudy].image}
                    alt={caseStudies[activeCaseStudy].title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${caseStudies[activeCaseStudy].gradient} opacity-20`}></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Implementation: {caseStudies[activeCaseStudy].timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      {caseStudies[activeCaseStudy].title}
                    </h3>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${caseStudies[activeCaseStudy].gradient} text-white text-sm font-medium mb-4`}>
                      <Building2 className="w-4 h-4 mr-2" />
                      {caseStudies[activeCaseStudy].client}
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-8">
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                      <Target className="w-5 h-5 text-red-500" />
                      Challenge
                    </h4>
                    <p className="text-gray-600 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      {caseStudies[activeCaseStudy].challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-8">
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                      <Zap className="w-5 h-5 text-blue-500" />
                      Solution
                    </h4>
                    <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      {caseStudies[activeCaseStudy].solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Results
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {caseStudies[activeCaseStudy].results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="bg-white border-t border-gray-200 p-8">
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(caseStudies[activeCaseStudy].metrics).map(([key, value]) => (
                    <div key={key} className="text-center group">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <div className={`text-3xl font-bold bg-gradient-to-r ${caseStudies[activeCaseStudy].gradient} bg-clip-text text-transparent mb-2`}>
                          {value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {key === 'predictability' ? 'Revenue Predictability' : 
                           key === 'collection' ? 'Faster Collection' :
                           key === 'automation' ? 'Process Automation' :
                           key === 'engagement' ? 'Employee Engagement' :
                           key === 'efficiency' ? 'Efficiency Gain' :
                           key === 'adoption' ? 'User Adoption' :
                           key === 'accuracy' ? 'Claim Accuracy' :
                           key === 'revenue' ? 'Revenue Increase' : key}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Study Navigation */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevCaseStudy}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
              </button>
              
              <div className="flex items-center gap-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCaseStudy(index)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      index === activeCaseStudy
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextCaseStudy}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group hover:scale-105"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare Operations?
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join industry leaders who trust GetMax Healthcare for their revenue cycle management 
              and operational excellence. Let's discuss how we can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Schedule a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 transition-colors">
                Get Custom Analysis
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

export default TestimonialsAndCaseStudies;