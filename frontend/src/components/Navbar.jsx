// frontend/src/components/Navbar.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Zap,
  Users,
  Heart,
  Shield,
  TrendingUp,
  Database,
  Code,
  Building,
  FileText,
  BookOpen,
  User,
  Phone,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const timeoutRef = useRef(null);
  const submenuTimeoutRef = useRef(null);

  const handleMouseEnter = (dropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleSubmenuMouseEnter = (submenu) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveSubmenu(submenu);
  };

  const handleSubmenuMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150);
  };

  const toggleMobileDropdown = (dropdown) => {
    setActiveMobileDropdown(
      activeMobileDropdown === dropdown ? null : dropdown
    );
    setActiveMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (submenu) => {
    setActiveMobileSubmenu(activeMobileSubmenu === submenu ? null : submenu);
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Heart className="h-4 w-4" />,
      dropdown: [
        {
          name: "About Us",
          href: "/about",
          icon: <Users className="h-4 w-4" />,
        },
        {
          name: "Why Choose Us",
          href: "/why-choose-us",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Our Team",
          href: "/team",
          icon: <Users className="h-4 w-4" />,
        },
        {
          name: "Our Products",
          href: "/products",
          icon: <Database className="h-4 w-4" />,
        },
        {
          name: "Testimonials",
          href: "/testimonials",
          icon: <User className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Services",
      href: "/services",
      icon: <TrendingUp className="h-4 w-4" />,
      dropdown: [
        {
          name: "Revenue Cycle Services",
          href: "/services/revenue-cycle",
          icon: <TrendingUp className="h-4 w-4" />,
          hasSubmenu: true,
          dropdown: [
            {
              name: "End-to-End RCM",
              href: "/services/revenue-cycle/end-to-end",
              icon: <Database className="h-4 w-4" />,
            },
            {
              name: "Eligibility & Benefits Verification",
              href: "/services/revenue-cycle/eligibility",
              icon: <Shield className="h-4 w-4" />,
            },
            {
              name: "Coding & Charge Entry",
              href: "/services/revenue-cycle/coding",
              icon: <Code className="h-4 w-4" />,
            },
            {
              name: "Claims Submission",
              href: "/services/revenue-cycle/claims",
              icon: <FileText className="h-4 w-4" />,
            },
            {
              name: "Payment Posting",
              href: "/services/revenue-cycle/payment-posting",
              icon: <TrendingUp className="h-4 w-4" />,
            },
            {
              name: "AR Follow-up & Denial Management",
              href: "/services/revenue-cycle/ar-denials",
              icon: <Users className="h-4 w-4" />,
            },
            {
              name: "Patient Collections",
              href: "/services/revenue-cycle/collections",
              icon: <Heart className="h-4 w-4" />,
            },
          ],
        },
        {
          name: "BPO Health",
          href: "/services/bpo-health",
          icon: <Heart className="h-4 w-4" />,
        },
        {
          name: "IT Services",
          href: "/services/it-services",
          icon: <Code className="h-4 w-4" />,
        },
        {
          name: "RCM Automation",
          href: "/services/rcm-automation",
          icon: <Database className="h-4 w-4" />,
        },
        {
          name: "Finance & Accounting",
          href: "/services/finance-accounting",
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Products",
      href: "/products",
      icon: <Code className="h-4 w-4" />,
      dropdown: [
        {
          name: "RCM Analytics Tool",
          href: "/technology/analytics",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          name: "RCM SOP Management Tool",
          href: "/technology/ai-ml",
          icon: <Database className="h-4 w-4" />,
        },
        {
          name: "RCM WFM Platform",
          href: "/technology/cloud",
          icon: <Code className="h-4 w-4" />,
        },
        {
          name: "BET Tool",
          href: "/technology/integration",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Integration Tool",
          href: "/technology/integration",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Voice-to-EMR Agent",
          href: "/technology/mobile-health",
          icon: <Heart className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      icon: <Code className="h-4 w-4" />,
      dropdown: [
        {
          name: "AI Solutions",
          href: "/solutions/ai-solutions",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          name: "Problem-Solution Cards",
          href: "/solutions/problem-solution",
          icon: <Database className="h-4 w-4" />,
        },
        {
          name: "Consulting",
          href: "/solutions/consulting",
          icon: <Code className="h-4 w-4" />,
        },
        {
          name: "Pricing calculator",
          href: "/solutions/pricing-calculator",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Free Revenue Audit",
          href: "/solutions/free-revenue-audit",
          icon: <Heart className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Industries",
      href: "/industries",
      icon: <Building className="h-4 w-4" />,
      dropdown: [
        {
          name: "Hospitals & Health Systems",
          href: "/industries/hospitals",
          icon: <Building className="h-4 w-4" />,
        },
        {
          name: "Medical Practices",
          href: "/industries/medical-practices",
          icon: <Users className="h-4 w-4" />,
        },
        {
          name: "Specialty Clinics",
          href: "/industries/specialty-clinics",
          icon: <Heart className="h-4 w-4" />,
        },
        {
          name: "Ambulatory Surgery Centers",
          href: "/industries/surgery-centers",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Mental Health Facilities",
          href: "/industries/mental-health",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Insights",
      href: "/insights",
      icon: <BookOpen className="h-4 w-4" />,
      dropdown: [
        {
          name: "Blog",
          href: "/insights/blog",
          icon: <BookOpen className="h-4 w-4" />,
        },
        {
          name: "Newsletter",
          href: "/insights/newsletter",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          name: "Case Studies",
          href: "/insights/case-studies",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          name: "Whitepapers",
          href: "/insights/whitepapers",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          name: "Industry Reports",
          href: "/insights/reports",
          icon: <Database className="h-4 w-4" />,
        },
        {
          name: "Webinars",
          href: "/insights/webinars",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
  ];

  const SubmenuDropdown = ({ items, isOpen, parentName }) => (
    <div
      className={`absolute top-0 left-full ml-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 transform ${
        isOpen
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
      }`}
      onMouseEnter={() => handleSubmenuMouseEnter(parentName)}
      onMouseLeave={handleSubmenuMouseLeave}
    >
      <div className="p-2">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 group"
          >
            <span className="text-emerald-500 mr-3 group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );

  const DropdownMenu = ({ items, isOpen, onMouseEnter, onMouseLeave }) => (
    <div
      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 transform ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-2">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <a
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 group"
              onMouseEnter={() =>
                item.hasSubmenu && handleSubmenuMouseEnter(item.name)
              }
              onMouseLeave={() => item.hasSubmenu && handleSubmenuMouseLeave()}
            >
              <span className="text-emerald-500 mr-3 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="font-medium flex-1">{item.name}</span>
              {item.hasSubmenu && (
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors duration-200" />
              )}
            </a>
            {item.hasSubmenu && item.dropdown && (
              <SubmenuDropdown
                items={item.dropdown}
                isOpen={activeSubmenu === item.name}
                parentName={item.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const MobileSubmenu = ({ items, isOpen }) => (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96" : "max-h-0"
      }`}
    >
      <div className="pl-8 py-2 bg-gray-100 rounded-lg mt-2">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            <span className="text-emerald-500 mr-3 text-xs">{item.icon}</span>
            <span className="text-xs font-medium">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );

  const MobileDropdown = ({ items, isOpen }) => (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <div className="pl-4 py-2 bg-gray-50 rounded-lg mt-2">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <a
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex-1"
              >
                <span className="text-emerald-500 mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </a>
              {item.hasSubmenu && (
                <button
                  onClick={() => toggleMobileSubmenu(item.name)}
                  className="p-2 text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeMobileSubmenu === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>
            {item.hasSubmenu && item.dropdown && (
              <MobileSubmenu
                items={item.dropdown}
                isOpen={activeMobileSubmenu === item.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/logo 4.png"
                alt="Getmax Healthcare Logo"
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation - Shows on tablet/laptop/desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group rounded-lg"
                >
                  <span className="mr-1">{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
                </a>

                {item.dropdown && (
                  <DropdownMenu
                    items={item.dropdown}
                    isOpen={activeDropdown === item.name}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Contact & Login - Shows on tablet/laptop/desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/contact"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group rounded-lg"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/login"
              className="group relative px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 hover:from-emerald-600 hover:to-teal-600 flex items-center"
            >
              <span className="relative z-10 flex items-center">
                Login
                <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Mobile menu button - Shows on mobile/tablet only */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Shows on mobile/tablet only */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium rounded-lg flex-1"
                  >
                    <span className="mr-3 text-emerald-500">{item.icon}</span>
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="p-2 text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeMobileDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.dropdown && (
                  <MobileDropdown
                    items={item.dropdown}
                    isOpen={activeMobileDropdown === item.name}
                  />
                )}
              </div>
            ))}

            {/* Mobile Contact & Login */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <a
                href="/contact"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium rounded-lg"
              >
                <Phone className="h-4 w-4 mr-3 text-emerald-500" />
                Contact Us
              </a>
              <a
                href="/login"
                className="mt-2 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                <span className="flex items-center">
                  Login
                  <Zap className="ml-2 h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
