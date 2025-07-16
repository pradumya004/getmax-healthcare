// frontend/src/pages/auth/Signup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Heart,
  Activity,
  User,
  Phone,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import.meta.env.VITE_BACKEND_URL;
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
    emailNotifications: true,
    companyName: "",
    jobTitle: "",
    country: "",
    industryType: "",
    companySize: "",
    monthlyClaimsVolume: "",
    currentEHR: "",
    leadSource: "website",
    referralCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePasswordStrength = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    return (
      password.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial
    );
  };

  const handleSubmit = async () => {
    if (!validatePasswordStrength(formData.password)) {
      alert("Password does not meet the strength requirements");
      return;
    }

    setIsLoading(true);

    const res = await register(formData);
    console.log("Registration response:", res);

    if (res.success) {
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } else {
      alert(res.error || "Registration failed");
    }

    setIsLoading(false);
  };

  const renderCompanyDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="group">
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Company Name
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
            placeholder="GetMax Healthcare"
          />
        </div>
      </div>
      <div className="group">
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Job Title
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
            placeholder="Founder / CEO"
          />
        </div>
      </div>
      <div className="group">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Country
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
            placeholder="India"
          />
        </div>
      </div>
      <div className="group">
        <label
          htmlFor="industryType"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Industry Type
        </label>
        <div className="relative">
          <BarChart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            id="industryType"
            name="industryType"
            value={formData.industryType}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
            placeholder="Healthcare, IT, RCM"
          />
        </div>
      </div>
    </div>
  );

  const handleGoogleSignup = () => {
    console.log("Google signup initiated");
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone
      );
    } else if (currentStep === 2) {
      return (
        formData.companyName &&
        formData.jobTitle &&
        formData.country &&
        formData.industryType
      );
    } else if (currentStep === 3) {
      return (
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword &&
        formData.agreeTerms &&
        formData.agreePrivacy
      );
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

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
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Join GetMax Healthcare
            </h1>
            <p className="text-slate-600">
              Start your journey to better health today
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 animate-slideUp">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                      currentStep >= step
                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg"
                        : "bg-white text-slate-400 border-2 border-slate-200"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 rounded-full transition-all duration-200 ${
                        currentStep > step
                          ? "bg-gradient-to-r from-blue-600 to-teal-600"
                          : "bg-slate-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2 space-x-8">
              <span
                className={`text-xs font-medium ${
                  currentStep >= 1 ? "text-blue-600" : "text-slate-400"
                }`}
              >
                Personal Info
              </span>
              <span
                className={`text-xs font-medium ${
                  currentStep >= 2 ? "text-blue-600" : "text-slate-400"
                }`}
              >
                Details
              </span>
              <span
                className={`text-xs font-medium ${
                  currentStep >= 3 ? "text-blue-600" : "text-slate-400"
                }`}
              >
                Security
              </span>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 animate-slideUp">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="group">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      First Name
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

                  {/* Last Name */}
                  <div className="group">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Last Name
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

                {/* Email */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email Address
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

                {/* Phone */}
                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
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
                      required
                    />
                  </div>
                </div>

                {/* Google Signup Alternative */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </button>
              </div>
            )}

            {/* Step 2: Additional Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Company & Business Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="group">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="Getmax Healthcare"
                      required
                    />
                  </div>

                  {/* Job Title */}
                  <div className="group">
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="Founder, Manager, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="group">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="India"
                      required
                    />
                  </div>

                  {/* Industry Type */}
                  <div className="group">
                    <label
                      htmlFor="industryType"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Industry Type
                    </label>
                    <input
                      type="text"
                      id="industryType"
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="Healthcare, Insurance, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Size */}
                  <div className="group">
                    <label
                      htmlFor="companySize"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Company Size
                    </label>
                    <input
                      type="text"
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="1-10, 11-50, 51-200..."
                      required
                    />
                  </div>

                  {/* Monthly Claims Volume */}
                  <div className="group">
                    <label
                      htmlFor="monthlyClaimsVolume"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Monthly Claims Volume
                    </label>
                    <input
                      type="text"
                      id="monthlyClaimsVolume"
                      name="monthlyClaimsVolume"
                      value={formData.monthlyClaimsVolume}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="e.g. 1000+"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current EHR */}
                  <div className="group">
                    <label
                      htmlFor="currentEHR"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Current EHR
                    </label>
                    <input
                      type="text"
                      id="currentEHR"
                      name="currentEHR"
                      value={formData.currentEHR}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="e.g. Epic, Cerner"
                      required
                    />
                  </div>

                  {/* Lead Source */}
                  <div className="group">
                    <label
                      htmlFor="leadSource"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      id="leadSource"
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="e.g. Google, LinkedIn"
                    />
                  </div>
                </div>

                {/* Referral Code */}
                <div className="group">
                  <label
                    htmlFor="referralCode"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="referralCode"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    placeholder="ABC123"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Security & Agreement */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Security & Agreement
                </h2>

                {/* Password */}
                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        Passwords do not match
                      </p>
                    )}
                </div>

                {/* Password Requirements */}
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains uppercase and lowercase letters</li>
                    <li>• Contains at least one number</li>
                    <li>• Contains at least one special character</li>
                  </ul>
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 mt-1"
                      required
                    />
                    <span className="ml-3 text-sm text-slate-600">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Terms of Service
                      </a>
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 mt-1"
                      required
                    />
                    <span className="ml-3 text-sm text-slate-600">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 mt-1"
                    />
                    <span className="ml-3 text-sm text-slate-600">
                      I would like to receive email notifications about
                      appointments and health tips
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all duration-200"
                >
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !isStepValid()}
                  className="ml-auto bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              )}
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-slate-500 text-sm">
            <p>© 2025 GetMax Healthcare. Your health, our priority.</p>
          </div>
        </div>
      </main>

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
      <Footer />
    </div>
  );
};
export default Signup;
