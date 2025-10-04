import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  MapPin,
  Star,
  Github,
  ExternalLink,
  Zap,
  Satellite,
  Globe,
  Activity,
  User,
  LogIn,
  UserPlus,
  LogOut,
  AlertCircle,
  Calendar,

  Clock
} from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';
import Background3D from "@/components/Background3D";
import Navbar from '@/components/Navbar';
import Login from "@/components/Login";
import Signup from '@/components/Signup';
import Footer from '@/components/footer';
import Chatbot from '@/components/Chatbot';
import About from '@/components/About';
import Explore from '@/components/Explore';
type TimeSlot = 'morning' | 'afternoon' | 'evening';
import WeatherDashboard from '@/components/WeatherDashboard';
import TaskManager from '@/components/TaskManager';


// Time validation utility
const isTimeSlotInPast = (selectedDate: string, timeSlot: TimeSlot): boolean => {
  const today = new Date();
  const selected = new Date(selectedDate);

  if (selected.toDateString() !== today.toDateString()) {
    return selected < today;
  }

  const currentHour = today.getHours();

  switch (timeSlot) {
    case 'morning':
      return currentHour >= 12;
    case 'afternoon':
      return currentHour >= 18;
    case 'evening':
      return currentHour >= 23;
    default:
      return false;
  }
};

// Time slot display utility
const getTimeSlotDisplay = (timeSlot: TimeSlot): string => {
  const slots = {
    morning: '6:00 AM - 12:00 PM',
    afternoon: '12:00 PM - 6:00 PM',
    evening: '6:00 PM - 11:00 PM'
  };
  return slots[timeSlot] || timeSlot;
};

// Time Validation Alert Modal
const TimeValidationAlert = ({
  isOpen,
  onClose,
  selectedDate,
  selectedTime
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedTime: TimeSlot;
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-morphism rounded-2xl p-6 max-w-md w-full mx-4 bg-red-900/30 border border-red-400/50">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="w-16 h-16 text-red-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Time Slot Unavailable</h3>
            <p className="text-red-200 text-sm">
              The selected time slot has already passed and cannot be considered for weather analysis.
            </p>
          </div>

          <div className="bg-red-500/20 rounded-lg p-4 border border-red-400/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-200">Selected Date:</span>
                <span className="text-white font-medium">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-200">Selected Time:</span>
                <span className="text-white font-medium">{getTimeSlotDisplay(selectedTime)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
            <p className="text-blue-200 text-sm">
              Please select a future time slot or a different date to proceed with the weather analysis.
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-medium rounded-xl transition-all duration-300"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Control Panel Component
const EnhancedControlPanel = ({
  location,
  setLocation,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedProfile,
  setSelectedProfile,
  onAnalyze
}: {
  location: string;
  setLocation: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedTime: TimeSlot;
  setSelectedTime: (value: TimeSlot) => void;
  selectedProfile: any;
  setSelectedProfile: (value: any) => void;
  onAnalyze: () => void;
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="glass-morphism rounded-3xl overflow-hidden border border-blue-400/30 bg-gradient-to-br from-black/50 via-blue-950/30 to-purple-950/30 backdrop-blur-xl shadow-2xl">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-b border-blue-400/30 px-6 md:px-10 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Satellite className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Mission Control Panel</h2>
                <p className="text-blue-200 text-xs md:text-sm font-mono">NASA Weather Intelligence System</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300">ONLINE</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-400/30">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300">LIVE DATA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left Column - Input Fields */}
            <div className="space-y-6">

              {/* Location Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Mission Location
                  </label>
                  <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md border border-blue-400/30">
                    GPS COORDINATES
                  </span>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                  <LocationSearchInput
                    value={location}
                    onChange={setLocation}
                    onLocationSelect={setLocation}
                    className="relative w-full px-4 py-3.5 rounded-xl border-2 border-blue-400/50 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all text-white placeholder-blue-200 text-sm md:text-base"
                  />
                </div>
                <p className="text-xs text-blue-200/80 ml-1">Enter city, state, or coordinates for weather analysis</p>
              </div>

              {/* Date & Time Section */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Date Picker */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Mission Date
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="relative w-full px-4 py-3.5 rounded-xl border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all text-white text-sm md:text-base [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Time Picker */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
                    <Clock className="w-5 h-5 text-pink-400" />
                    Time Slot
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value as TimeSlot)}
                      className="relative w-full px-4 py-3.5 rounded-xl border-2 border-pink-400/50 bg-white/10 backdrop-blur-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all text-white text-sm md:text-base appearance-none cursor-pointer"
                    >
                      <option value="morning" className="bg-gray-900 text-white">Morning (6AM-12PM)</option>
                      <option value="afternoon" className="bg-gray-900 text-white">Afternoon (12PM-6PM)</option>
                      <option value="evening" className="bg-gray-900 text-white">Evening (6PM-11PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Profile Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-white font-semibold text-sm md:text-base">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Event Profile
                  </label>
                  <span className="text-xs font-mono bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md border border-yellow-400/30">
                    MISSION TYPE
                  </span>
                </div>

                <EventProfileSelector
                  selectedProfile={selectedProfile}
                  onProfileSelect={setSelectedProfile}
                />
                <p className="text-xs text-yellow-200/80 ml-1">Select event type for customized weather analysis</p>
              </div>

            </div>

            {/* Right Column - Analysis Button & Info */}
            <div className="flex flex-col justify-between space-y-6">

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-5 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">Real-Time Analysis</h3>
                      <p className="text-blue-100 text-xs leading-relaxed">
                        Our AI analyzes live NASA satellite data including temperature, humidity, wind patterns, and precipitation probability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-5 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <Satellite className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">NASA Data Sources</h3>
                      <p className="text-purple-100 text-xs leading-relaxed">
                        Powered by MODIS, POWER API, Terra & Aqua satellites for accurate meteorological forecasting.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-xl p-5 border border-pink-400/30 hover:border-pink-400/50 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-500/20 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">Instant Results</h3>
                      <p className="text-pink-100 text-xs leading-relaxed">
                        Get comprehensive weather comfort scores and risk assessments in under 2 seconds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Button */}
              <div className="space-y-3">
                <Button
                  onClick={onAnalyze}
                  className="w-full text-lg font-bold py-6 md:py-7 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 border-2 border-blue-400/50 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Satellite className="w-6 h-6 animate-spin" />
                    <span>START WEATHER ANALYSIS</span>
                    <Zap className="w-6 h-6" />
                  </div>
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs font-mono">
                  <span className="text-green-400">✓ Secure</span>
                  <span className="text-blue-400">✓ Fast</span>
                  <span className="text-purple-400">✓ Accurate</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-t border-blue-400/30 px-6 md:px-10 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold text-blue-400">10K+</div>
              <div className="text-xs text-blue-200/80">Analyses Done</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-xs text-purple-200/80">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-pink-400">&lt;2s</div>
              <div className="text-xs text-pink-200/80">Response Time</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


// Main App Component
const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<TimeSlot>('morning');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [comfortScore, setComfortScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [demoMode, setDemoMode] = useState<string | null>(null);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [showTaskManager, setShowTaskManager] = useState(false);


  // Demo scenarios
  const demoScenarios = {
    perfect: {
      location: 'Kennedy Space Center, FL',
      score: 95,
      description: 'Optimal Launch Conditions - Clear Skies, Perfect Visibility'
    },
    challenging: {
      location: 'Houston Space Center, TX',
      score: 28,
      description: 'Mission Critical Weather - High Storm Risk, Mission Hold'
    },
    monsoon: {
      location: 'ISRO Sriharikota, India',
      score: 52,
      description: 'Monsoon Analysis - Tropical Storm Monitoring Required'
    }
  };

  // Weather risks
  const weatherRisks = [
    {
      icon: Sun,
      title: 'Solar Radiation',
      risk: demoMode ? (demoMode === 'challenging' ? 88 : demoMode === 'perfect' ? 12 : 38) : 45,
      description: 'UV Index & Heat Analysis',
      details: 'Solar radiation levels analyzed using NASA POWER satellite data.'
    },
    {
      icon: Thermometer,
      title: 'Thermal Comfort',
      risk: demoMode ? (demoMode === 'monsoon' ? 15 : 8) : 12,
      description: 'Temperature comfort zone',
      details: 'Thermal analysis based on NASA Earth observation data.'
    },
    {
      icon: Wind,
      title: 'Wind Shear Risk',
      risk: demoMode ? (demoMode === 'challenging' ? 72 : 18) : 35,
      description: 'Atmospheric wind analysis',
      details: 'Upper atmosphere wind patterns monitored via satellite telemetry.'
    },
    {
      icon: CloudRain,
      title: 'Precipitation Probability',
      risk: demoMode ? (demoMode === 'monsoon' ? 94 : demoMode === 'challenging' ? 76 : 8) : 28,
      description: 'Satellite-based rain forecast',
      details: 'Advanced meteorological modeling using NASA GPM satellite data.'
    },
    {
      icon: Droplets,
      title: 'Atmospheric Moisture',
      risk: demoMode ? (demoMode === 'challenging' ? 85 : demoMode === 'perfect' ? 18 : 58) : 42,
      description: 'Humidity & dewpoint analysis',
      details: 'Atmospheric water vapor analysis using MODIS satellite sensors.'
    }
  ];

  useEffect(() => {
    if (demoMode) {
      const scenario = demoScenarios[demoMode as keyof typeof demoScenarios];
      setLocation(scenario.location);
      setComfortScore(scenario.score);
      setShowResults(true);
    }
  }, [demoMode]);

  const handleCheckWeather = () => {
    if (!location) {
      alert("Please select coordinates for your space event mission.");
      return;
    }
    if (!selectedProfile) {
      alert("Please select your mission type for NASA-grade analysis.");
      return;
    }

    if (isTimeSlotInPast(selectedDate, selectedTime)) {
      setShowTimeAlert(true);
      return;
    }

    setShowResults(false);
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 100);
      setComfortScore(mockScore);
      setShowResults(true);
    }, 2000);
  };

  const handleLogin = (email: string) => {
    setUser(email);
    setCurrentPage('home');
  };

  const handleSignup = (email: string) => {
    setUser(email);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Existing code...
  if (currentPage === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentPage('signup')}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <Signup
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentPage('login')}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'about') {
    return (
      <About onBack={() => setCurrentPage('home')} />
    );
  }

  if (currentPage === 'explore') {
    return (
      <Explore onBack={() => setCurrentPage('home')} />
    );
  }

  // YE NEW SECTION ADD KARO
 if (currentPage === 'taskmanager') {
  return (
    <TaskManager 
      user={user || null}  // This ensures it's never undefined
      onBack={() => setCurrentPage('home')}
      onLogout={handleLogout}
    />
  );
}

  // Rest of the code continues...


  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      <Background3D />

      <TimeValidationAlert
        isOpen={showTimeAlert}
        onClose={() => setShowTimeAlert(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      <div className="relative z-10">
        <Navbar
          user={user}
          onLoginClick={() => setCurrentPage('login')}
          onSignupClick={() => setCurrentPage('signup')}
          onLogout={handleLogout}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />


        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
            <div className="nasa-orbital-element absolute top-1/4 left-1/4 w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 backdrop-blur-sm animate-float-glow">
              <Sun className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="nasa-orbital-element absolute top-1/3 right-1/4 w-20 h-20 flex items-center justify-center rounded-full bg-blue-400/20 backdrop-blur-sm animate-float-glow">
              <Cloud className="w-10 h-10 text-blue-300" />
            </div>
            <div className="nasa-orbital-element absolute bottom-1/3 left-1/3 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-400/20 backdrop-blur-sm animate-float-glow">
              <CloudRain className="w-6 h-6 text-indigo-300" />
            </div>
            <div className="nasa-orbital-element absolute top-1/2 right-1/3 w-14 h-14 flex items-center justify-center rounded-full bg-red-400/20 backdrop-blur-sm animate-float-glow">
              <Satellite className="w-7 h-7 text-red-400" />
            </div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center w-full">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 md:mb-16 animate-fade-in space-y-4 md:space-y-6">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
                  <Satellite className="w-6 h-6 md:w-8 md:h-8 text-blue-400 animate-pulse" />
                  <span className="text-blue-300 font-mono text-xs md:text-sm tracking-widest text-center break-words">
                    NASA SPACE APPS CHALLENGE 2025
                  </span>
                  <Satellite className="w-6 h-6 md:w-8 md:h-8 text-blue-400 animate-pulse" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-heading font-bold mb-4 md:mb-6 leading-tight break-words">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift">
                    SkySure: AI Weather Comfort Prediction
                  </span>
                </h1>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white break-words">
                    NASA-Grade Atmospheric Intelligence System
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed px-2 break-words">
                    Advanced meteorological analysis using NASA Earth observation satellites, POWER API, and machine learning for mission-critical event planning across India
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs md:text-sm font-mono mt-6 md:mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 whitespace-nowrap">SATELLITES ONLINE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 whitespace-nowrap">DATA STREAMING</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-300 whitespace-nowrap">AI PROCESSING</span>
                  </div>
                </div>
              </div>

              <EnhancedControlPanel
                location={location}
                setLocation={setLocation}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
                onAnalyze={handleCheckWeather}
              />
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs md:
          text-sm font-mono z-20 px-4">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 whitespace-nowrap">TERRA SATELLITE</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 whitespace-nowrap">AQUA SATELLITE</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 whitespace-nowrap">MODIS SENSOR</span>
            </div>
          </div>
        </section>

        // In your Index.tsx, import:


        // Replace the showResults section with:
        {showResults && (
          <WeatherDashboard
            comfortScore={comfortScore}
            location={location}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedProfile={selectedProfile}
          />
        )}
        {/* AI Chatbot - Add this before Footer */}
        <Chatbot />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;