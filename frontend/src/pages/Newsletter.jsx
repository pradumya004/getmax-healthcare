import React, { useState, useEffect } from 'react';
import { Mail, Calendar, TrendingUp, Users, Brain, Gamepad2, Settings, CheckCircle, ArrowRight, Bell, Star, ChevronRight, Heart, Globe, Target, Award, Shield, Send, Download, Clock, Eye } from 'lucide-react';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && selectedTopics.length > 0) {
      setIsSubscribed(true);
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setIsSubscribed(false);
      }, 4000);
    }
  };

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const newsletterStats = [
    { number: '15K+', label: 'Active Subscribers', icon: <Users className="w-5 h-5" /> },
    { number: '98%', label: 'Open Rate', icon: <Eye className="w-5 h-5" /> },
    { number: '150+', label: 'Weekly Insights', icon: <Brain className="w-5 h-5" /> },
    { number: '5min', label: 'Average Read Time', icon: <Clock className="w-5 h-5" /> }
  ];

  const newsletterTopics = [
    { 
      id: 'rcm', 
      name: 'Revenue Cycle Management', 
      icon: TrendingUp, 
      description: 'Latest trends in RCM optimization and best practices',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    { 
      id: 'ai', 
      name: 'AI-Driven Analytics', 
      icon: Brain, 
      description: 'Cutting-edge AI insights for healthcare efficiency',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'bet', 
      name: 'Business Enablement Tool', 
      icon: Settings, 
      description: 'Tools and strategies for business growth',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    { 
      id: 'crm', 
      name: 'Gamified CRM/HRMS', 
      icon: Gamepad2, 
      description: 'Innovative engagement solutions for teams',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      id: 'ops', 
      name: 'Operations Management', 
      icon: Globe, 
      description: 'Streamlined operations for healthcare providers',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      id: 'industry', 
      name: 'Healthcare Industry News', 
      icon: Heart, 
      description: 'Latest news and regulatory updates',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ];

  const recentNewsletters = [
    {
      title: "Maximizing RCM Efficiency with AI Analytics",
      date: "July 2, 2025",
      preview: "Discover how our latest AI-driven insights are helping healthcare providers reduce claim denials by 35% while improving patient satisfaction scores...",
      readTime: "5 min read",
      category: "AI Analytics",
      featured: true
    },
    {
      title: "BET Platform Update: New Gamification Features",
      date: "June 28, 2025",
      preview: "Introducing enhanced gamification elements that boost team productivity and engagement across healthcare operations by 40%...",
      readTime: "4 min read",
      category: "Product Update",
      featured: false
    },
    {
      title: "Healthcare Revenue Trends: Q2 2025 Report",
      date: "June 25, 2025",
      preview: "Our comprehensive analysis of healthcare revenue patterns and optimization strategies for the second quarter shows remarkable growth...",
      readTime: "7 min read",
      category: "Industry Report",
      featured: false
    },
    {
      title: "HIPAA Compliance in the Age of AI",
      date: "June 20, 2025",
      preview: "Navigate the complex landscape of AI implementation while maintaining strict HIPAA compliance standards...",
      readTime: "6 min read",
      category: "Compliance",
      featured: false
    }
  ];

  const benefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Actionable Insights',
      description: 'Get practical strategies you can implement immediately to improve your revenue cycle performance.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Industry Expertise',
      description: 'Learn from certified professionals with deep healthcare and technology knowledge.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trusted Content',
      description: 'Receive verified information from industry leaders and regulatory experts.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Stay Ahead',
      description: 'Keep up with the latest trends and innovations in healthcare technology.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        <Navbar />
        <div className="pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full px-6 py-3 border border-white/30 mb-6">
              <Bell className="w-5 h-5 text-white animate-bounce" />
              <span className="text-lg font-semibold">Healthcare Innovation Newsletter</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Stay Ahead of the Curve
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get exclusive insights on Revenue Cycle Management, AI Analytics, and Healthcare SaaS innovations delivered to your inbox
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full px-6 py-3 border border-white/30">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-semibold">15K+ Subscribers</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full px-6 py-3 border border-white/30">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-lg font-semibold">Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsletterStats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                animateStats ? 'animate-pulse' : ''
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

      {/* Newsletter Topics Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Choose Your Topics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the areas you're most interested in to receive personalized content tailored to your healthcare needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletterTopics.map((topic, index) => {
            const Icon = topic.icon;
            const isSelected = selectedTopics.includes(topic.id);
            
            return (
              <div
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  isSelected 
                    ? `border-teal-500 ${topic.bgColor} shadow-lg ring-2 ring-teal-200` 
                    : `border-gray-200 bg-white hover:${topic.borderColor}`
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${topic.color} transform transition-all duration-300 ${
                  isSelected ? 'scale-110' : ''
                }`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{topic.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{topic.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Weekly insights</span>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? 'border-teal-500 bg-teal-500 scale-110' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subscription Form */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-300">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Join Our Newsletter</h3>
                <p className="text-gray-600 text-lg">
                  Get exclusive insights delivered to your inbox every week
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                  <p className="text-sm text-teal-800 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span><strong>Selected Topics:</strong> {selectedTopics.length > 0 ? selectedTopics.length : 'None'} - Please select at least one topic above</span>
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={!email || selectedTopics.length === 0}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    email && selectedTopics.length > 0
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:scale-105 transform'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe to Newsletter</span>
                </button>
              </div>
              
              {showThankYou && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-green-800 font-semibold">Welcome aboard!</h4>
                      <p className="text-green-700">You'll receive your first newsletter soon.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Subscribe?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who rely on our insights to stay ahead
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 rounded-full text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Newsletters */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Recent Newsletters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Catch up on our latest insights and industry updates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {recentNewsletters.map((newsletter, index) => (
              <article 
                key={index} 
                className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  newsletter.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                      {newsletter.category}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{newsletter.date}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{newsletter.readTime}</span>
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight hover:text-teal-600 transition-colors">
                    {newsletter.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {newsletter.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors group">
                      <span>Read Newsletter</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust our insights to drive their success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center transform hover:scale-105">
              Subscribe Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-300 transform hover:scale-105">
              Browse Archives
            </button>
          </div>
        </div>
      </div>
    </div>
        <Footer />
        </div>
  );
};

export default NewsletterPage;