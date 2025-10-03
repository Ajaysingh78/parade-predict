// Footer.tsx
import React from "react";
import { Github, ExternalLink, Satellite } from "lucide-react";
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';
import Background3D from "@/components/Background3D";
import Navbar from '@/components/Navbar';
import Login from "@/components/Login";
import Signup from '@/components/Signup';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">SkySure</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Advanced Earth observation and climate monitoring system powered by NASA satellite data and machine learning.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#data-sources" className="text-gray-400 hover:text-white transition-colors text-sm">Data Sources</a></li>
                <li><a href="#api" className="text-gray-400 hover:text-white transition-colors text-sm">API Access</a></li>
                <li><a href="#documentation" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About Project</a></li>
                <li><a href="#methodology" className="text-gray-400 hover:text-white transition-colors text-sm">Methodology</a></li>
                <li><a href="#datasets" className="text-gray-400 hover:text-white transition-colors text-sm">Datasets Used</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Team</a></li>
              </ul>
            </div>

            {/* Partnership Info */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Partnership</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-800/30">
                  <p className="text-blue-300 text-xs font-mono mb-2">NASA SPACE APPS 2025</p>
                  <p className="text-white text-sm font-medium">Official Challenge Project</p>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Earth Science Division</p>
                  <p>• POWER API Integration</p>
                  <p>• MODIS Satellite Data</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Explore Project Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-white font-semibold text-lg mb-2">Explore the Project</h3>
              <p className="text-gray-400 text-sm">Check out our source code and NASA Space Apps Challenge entry</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/Ajaysingh78/parade-predict" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-gray-600 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Github className="w-5 h-5 mr-2" />
                View Source Code
              </a>
              <a 
                href="https://www.spaceappschallenge.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                NASA Space Apps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 SkySure Weather Intelligence. Built for NASA Space Apps Challenge.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by NASA Earth Science Division • POWER API • MODIS Satellite Data
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#data" className="hover:text-white transition-colors">Data Usage</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
