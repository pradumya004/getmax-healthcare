import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageCircle, Heart, Activity, Shield, Building, Calendar, AlertCircle, CheckCircle, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GetMaxContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    preferredContact: '',
    urgency: '',
    message: '',
    attachments: null,
    agreePrivacy: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      console.log('Contact form submitted:', formData);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: '',
          preferredContact: '',
          urgency: '',
          message: '',
          attachments: null,
          agreePrivacy: false
        });
      }, 3000);
    }, 2000);
  };

  const inquiryTypes = [
    { value: 'appointment', label: 'Appointment Booking' },
    { value: 'medical', label: 'Medical Inquiry' },
    { value: 'insurance', label: 'Insurance Questions' },
    { value: 'billing', label: 'Billing Support' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Mon-Fri 8AM-6PM EST'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@getmaxhealth.com', 'Response within 24 hours'],
      color: 'text-teal-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Healthcare Blvd', 'New York, NY 10001'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Emergency',
      details: ['24/7 Emergency Line', '+1 (555) 911-HELP'],
      color: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      <Navbar />
      {/* Animated Background Elements */}
       <div className="pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-1/4 text-blue-200 animate-bounce">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 right-1/4 text-teal-200 animate-bounce animation-delay-1000">
        <Activity className="w-8 h-8" />
      </div>
      <div className="absolute top-1/3 right-10 text-slate-200 animate-bounce animation-delay-2000">
        <Shield className="w-5 h-5" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-xl shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about our healthcare services? We're here to help you on your health journey.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-slideUp">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-xl ${item.color === 'text-blue-600' ? 'bg-blue-100' : item.color === 'text-teal-600' ? 'bg-teal-100' : item.color === 'text-purple-600' ? 'bg-purple-100' : 'bg-red-100'}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 ml-3">{item.title}</h3>
              </div>
              <div className="space-y-2">
                {item.details.map((detail, idx) => (
                  <p key={idx} className={`text-sm ${idx === 0 ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 animate-slideUp">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Send className="w-6 h-6 mr-3 text-blue-600" />
              Send us a Message
            </h2>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-700">Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="john.doe@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="group">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                  placeholder="What is your inquiry about?"
                  required
                />
              </div>

              {/* Inquiry Type and Urgency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    required
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label htmlFor="urgency" className="block text-sm font-medium text-slate-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Needs response soon</option>
                    <option value="high">High - Urgent matter</option>
                    <option value="emergency">Emergency - Immediate attention</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['email', 'phone', 'either'].map((method) => (
                    <label key={method} className="flex items-center p-3 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-slate-700 capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 resize-none"
                  placeholder="Please describe your inquiry in detail..."
                  required
                />
              </div>

              {/* File Attachment */}
              <div className="group">
                <label htmlFor="attachments" className="block text-sm font-medium text-slate-700 mb-2">
                  Attachments (Optional)
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreePrivacy"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 mt-1"
                  required
                />
                <label htmlFor="agreePrivacy" className="ml-3 text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Privacy Policy
                  </a>{' '}
                  and consent to GetMax Healthcare contacting me about my inquiry.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 animate-slideUp">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-blue-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: "How quickly will I receive a response?",
                    answer: "We typically respond to inquiries within 24 hours during business days."
                  },
                  {
                    question: "Can I book an appointment through this form?",
                    answer: "Yes! Select 'Appointment Booking' as your inquiry type and we'll contact you to schedule."
                  },
                  {
                    question: "Is my information secure?",
                    answer: "Absolutely. We use industry-standard encryption and follow HIPAA guidelines for all communications."
                  },
                  {
                    question: "What if I have a medical emergency?",
                    answer: "For medical emergencies, please call 911 or our 24/7 emergency line at +1 (555) 911-HELP."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-slate-200 pb-4">
                    <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 animate-slideUp">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                Office Hours
              </h2>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                  { day: 'Emergency Line', hours: '24/7 Available' }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-700">{schedule.day}</span>
                    <span className="text-slate-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 animate-slideUp">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-3 text-blue-600" />
                Why Choose GetMax Healthcare?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Heart, text: 'Compassionate, patient-centered care' },
                  { icon: Shield, text: 'HIPAA-compliant security & privacy' },
                  { icon: Clock, text: '24/7 emergency support available' },
                  { icon: Building, text: 'State-of-the-art medical facilities' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-lg mr-4">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-slate-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>© 2025 GetMax Healthcare. Your health, our priority.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
      <Footer />
    </div>
  );
}
export default GetMaxContact;