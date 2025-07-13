import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-400/25">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-xl opacity-50 blur-sm"></div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">GetMax Healthcare</div>
                <div className="text-sm text-gray-300">Solution Pvt Ltd</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Empowering healthcare practices with innovative revenue cycle management solutions that drive growth and efficiency.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Services</h4>
            <ul className="space-y-3">
              {['Medical Coding', 'Claims Management', 'Revenue Analytics', 'Patient Collections'].map(service => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Case Studies', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 GetMax Healthcare Solution Pvt Ltd. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map(link => (
                <a key={link} href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
