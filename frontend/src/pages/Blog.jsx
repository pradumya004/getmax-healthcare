import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  Shield, 
  Heart, 
  Users, 
  Target, 
  BookOpen, 
  Filter, 
  ChevronDown,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Award,
  Globe,
  Settings
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { name: 'All', count: 24, icon: <BookOpen className="w-4 h-4" /> },
    { name: 'RCM Insights', count: 8, icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'AI & Analytics', count: 6, icon: <Brain className="w-4 h-4" /> },
    { name: 'Compliance', count: 4, icon: <Shield className="w-4 h-4" /> },
    { name: 'Patient Care', count: 3, icon: <Heart className="w-4 h-4" /> },
    { name: 'Industry News', count: 3, icon: <Globe className="w-4 h-4" /> }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Revenue Cycle Management: AI-Powered Automation",
      excerpt: "Discover how artificial intelligence is revolutionizing healthcare revenue cycles, reducing manual tasks by 60% and improving accuracy across all processes.",
      category: "RCM Insights",
      author: "Dr. Sarah Chen",
      date: "July 8, 2025",
      readTime: "8 min read",
      image: "/api/placeholder/600/400",
      views: "2.4K",
      comments: 18,
      featured: true,
      tags: ["AI", "RCM", "Automation"]
    },
    {
      id: 2,
      title: "HIPAA Compliance in Cloud-Based Healthcare Systems",
      excerpt: "Essential guidelines for maintaining HIPAA compliance while leveraging cloud technologies for healthcare data management and patient privacy protection.",
      category: "Compliance",
      author: "Michael Rodriguez",
      date: "July 5, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/600/400",
      views: "1.8K",
      comments: 12,
      featured: true,
      tags: ["HIPAA", "Cloud", "Security"]
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: "Optimizing Patient Registration Workflows with Smart Forms",
      excerpt: "Learn how intelligent form design can reduce patient registration time by 40% while improving data accuracy and patient satisfaction scores.",
      category: "Patient Care",
      author: "Jennifer Park",
      date: "July 3, 2025",
      readTime: "5 min read",
      image: "/api/placeholder/400/300",
      views: "1.2K",
      comments: 8,
      featured: false,
      tags: ["Workflow", "Registration", "UX"]
    },
    {
      id: 4,
      title: "Advanced Analytics: Predicting Claim Denials Before They Happen",
      excerpt: "Explore predictive analytics models that help healthcare providers identify potential claim denials early and take preventive action.",
      category: "AI & Analytics",
      author: "Robert Kim",
      date: "June 30, 2025",
      readTime: "7 min read",
      image: "/api/placeholder/400/300",
      views: "1.5K",
      comments: 15,
      featured: false,
      tags: ["Analytics", "Claims", "Prediction"]
    },
    {
      id: 5,
      title: "Streamlining Multi-Location Practice Management",
      excerpt: "Best practices for managing healthcare operations across multiple locations with centralized systems and unified reporting.",
      category: "RCM Insights",
      author: "Dr. Amanda Foster",
      date: "June 28, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/400/300",
      views: "980",
      comments: 6,
      featured: false,
      tags: ["Multi-location", "Management", "Scaling"]
    },
    {
      id: 6,
      title: "2025 Healthcare Technology Trends: What's Next?",
      excerpt: "Industry insights on emerging technologies shaping the future of healthcare delivery and administrative efficiency.",
      category: "Industry News",
      author: "Tech Team",
      date: "June 25, 2025",
      readTime: "9 min read",
      image: "/api/placeholder/400/300",
      views: "2.1K",
      comments: 22,
      featured: false,
      tags: ["Trends", "Technology", "Future"]
    }
  ];

  const stats = [
    { number: '150+', label: 'Published Articles', icon: <BookOpen className="w-5 h-5" /> },
    { number: '25K+', label: 'Monthly Readers', icon: <Users className="w-5 h-5" /> },
    { number: '98%', label: 'Reader Satisfaction', icon: <Award className="w-5 h-5" /> },
    { number: '24/7', label: 'Updated Content', icon: <Clock className="w-5 h-5" /> }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        <Navbar />

        <div className="pt-20">
      {/* Hero Section - Different Design */}
      <div className="relative overflow-hidden">
        {/* Background with diagonal split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-400 transform -skew-y-2 origin-top-left scale-110"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-20 w-20 h-20 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className={`text-white transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full px-6 py-3 border border-white/30 mb-6">
                <BookOpen className="w-5 h-5 text-white" />
                <span className="text-lg font-semibold">Healthcare Insights Blog</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Insights That
                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Transform Healthcare
                </span>
              </h1>
              
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                Discover the latest trends, best practices, and innovative solutions in healthcare technology, 
                revenue cycle management, and patient care optimization.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center transform hover:scale-105">
                  Explore Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-300 transform hover:scale-105">
                  Subscribe to Updates
                </button>
              </div>
            </div>
            
            {/* Right side - Search and Quick Stats */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Find Your Topic</h3>
                
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300"
                  />
                </div>
                
                {/* Quick Categories */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Popular Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(1, 5).map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.name
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
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
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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

      {/* Featured Posts */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Featured Articles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In-depth insights and expert analysis on the latest healthcare technology trends
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setActiveCard(post.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative h-64 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                <div className="text-6xl text-teal-300">📊</div>
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight hover:text-teal-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  
                  <button className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors group">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-t border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-800">Browse Articles</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Filters
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    selectedCategory === category.name
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-teal-100 flex items-center justify-center">
                <div className="text-4xl text-teal-300">📄</div>
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Bookmark className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight hover:text-teal-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated with Healthcare Innovation</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest insights delivered directly to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center transform hover:scale-105">
              Subscribe to Newsletter
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-300 transform hover:scale-105">
              Browse All Articles
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default BlogPage;