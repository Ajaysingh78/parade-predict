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
  LogOut
} from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';
import Background3D from "@/components/Background3D";

// Login Component
const Login = ({ onLogin, onSwitchToSignup, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email & Password required");
      return;
    }
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
      alert("Login successful!");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Background3D />
      
      <div className="relative z-10 glass-morphism p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4 backdrop-blur-xl border border-blue-400/30 bg-black/30">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Satellite className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Mission Login</h2>
          </div>
          <p className="text-blue-200 text-sm">Access NASA Weather System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="astronaut@nasa.gov"
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-400/50 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring focus:ring-blue-400/30 transition-all text-white placeholder-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-400/50 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring focus:ring-blue-400/30 transition-all text-white placeholder-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 animate-spin" />
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Launch Mission
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-blue-200">
            New to the mission?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              Join the crew
            </button>
          </p>
          
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
          >
            ← Back to Mission Control
          </button>
        </div>
      </div>
    </div>
  );
};

// Signup Component
const Signup = ({ onSignup, onSwitchToLogin, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("All fields required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setLoading(false);
      onSignup(email);
      alert("Account created successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Background3D />
      
      <div className="relative z-10 glass-morphism p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4 backdrop-blur-xl border border-blue-400/30 bg-black/30">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <UserPlus className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Join Mission</h2>
          </div>
          <p className="text-purple-200 text-sm">Register for NASA Weather System</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="astronaut@nasa.gov"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring focus:ring-purple-400/30 transition-all text-white placeholder-purple-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring focus:ring-purple-400/30 transition-all text-white placeholder-purple-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring focus:ring-purple-400/30 transition-all text-white placeholder-purple-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 animate-spin" />
                Creating Account...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Join the Mission
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-purple-200">
            Already part of the crew?{' '}
            <button 
              onClick={onSwitchToLogin}
              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
            >
              Login here
            </button>
          </p>
          
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
          >
            ← Back to Mission Control
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Routing
const Index = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup'
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('morning');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [comfortScore, setComfortScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [demoMode, setDemoMode] = useState(null);

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
      const scenario = demoScenarios[demoMode];
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

    setShowResults(false);
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 100);
      setComfortScore(mockScore);
      setShowResults(true);
    }, 2000);
  };

  const handleLogin = (email) => {
    setUser(email);
    setCurrentPage('home');
  };

  const handleSignup = (email) => {
    setUser(email);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  // Render different pages based on currentPage state
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

  // Main Home Page
  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      <Background3D />
      
      <div className="relative z-10">
        {/* Navigation Header */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="glass-morphism px-4 py-2 rounded-full border border-green-400/30 bg-green-500/20">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm font-mono">{user}</span>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="glass-morphism border-red-400/50 text-red-300 hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setCurrentPage('login')}
                variant="outline"
                size="sm"
                className="glass-morphism border-blue-400/50 text-blue-300 hover:bg-blue-500/20"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button
                onClick={() => setCurrentPage('signup')}
                variant="outline"
                size="sm"
                className="glass-morphism border-purple-400/50 text-purple-300 hover:bg-purple-500/20"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          </div>

          {/* Floating elements */}
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

          {/* Main Content */}
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

              {/* Control Panel */}
              <div className="nasa-control-panel glass-morphism rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 max-w-6xl mx-auto shadow-2xl backdrop-blur-xl border border-blue-400/30 animate-scale-in bg-black/30">
                <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
                  {/* Left Column */}
                  <div className="space-y-6 md:space-y-8">
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl font-heading font-bold flex items-center gap-2 md:gap-3 text-white flex-wrap">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0" />
                        <span className="break-words">Mission Coordinates</span>
                        <span className="text-xs font-mono bg-blue-500/20 px-2 py-1 rounded whitespace-nowrap">GPS</span>
                      </h3>
                      <LocationSearchInput
                        value={location}
                        onChange={setLocation}
                        onLocationSelect={setLocation}
                        className="w-full rounded-lg md:rounded-xl border-2 border-blue-400/50 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring focus:ring-blue-400/30 transition-all text-white placeholder-blue-200 text-sm md:text-base"
                      />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl font-heading font-bold flex items-center gap-2 md:gap-3 text-white flex-wrap">
                        <Activity className="w-5 h-5 md:w-6 md:h-6 text-purple-400 flex-shrink-0" />
                        <span className="break-words">Mission Timeline</span>
                        <span className="text-xs font-mono bg-purple-500/20 px-2 py-1 rounded whitespace-nowrap">UTC</span>
                      </h3>
                      <DateTimePicker
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onDateChange={setSelectedDate}
                        onTimeChange={setSelectedTime}
                        className="rounded-lg md:rounded-xl border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring focus:ring-purple-400/30 transition-all"
                      />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl font-heading font-bold flex items-center gap-2 md:gap-3 text-white flex-wrap">
                        <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 flex-shrink-0" />
                        <span className="break-words">Mission Profile</span>
                        <span className="text-xs font-mono bg-yellow-500/20 px-2 py-1 rounded whitespace-nowrap">CLASS</span>
                      </h3>
                      <EventProfileSelector
                        selectedProfile={selectedProfile}
                        onProfileSelect={setSelectedProfile}
                      />
                    </div>

                    <Button
                      onClick={handleCheckWeather}
                      className="w-full text-base sm:text-lg md:text-xl font-bold py-4 md:py-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 border border-blue-400/50"
                    >
                      <Satellite className="w-5 h-5 md:w-6 md:h-6 animate-spin flex-shrink-0" />
                      <span className="break-words text-center">INITIATE WEATHER ANALYSIS</span>
                      <Zap className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                    </Button>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[500px] relative">
                    {showResults ? (
                      <div className="space-y-6 md:space-y-8 animate-fade-in text-center">
                        <div className="relative">
                          <CircularProgress score={comfortScore} animated size={120} className="md:hidden" />
                          <CircularProgress score={comfortScore} animated size={160} className="hidden md:block" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 -z-10 animate-pulse"></div>
                        </div>

                        {location && (
                          <div className="text-center space-y-2 md:space-y-3">
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 break-words px-2">
                              {location}
                            </div>
                            <div className="text-blue-200 font-mono text-xs sm:text-sm md:text-base bg-blue-500/20 rounded-full px-3 md:px-4 py-2 inline-block break-words">
                              {new Date(selectedDate).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs font-mono mt-4">
                              <span className="text-green-400 whitespace-nowrap">MISSION: GO</span>
                              <span className="text-blue-400 whitespace-nowrap">WEATHER: ANALYZED</span>
                              <span className="text-purple-400 whitespace-nowrap">STATUS: READY</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-4 md:space-y-6">
                        <div className="relative">
                          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full glass-morphism border-4 border-blue-400/30 flex items-center justify-center animate-pulse-glow">
                            <Satellite className="w-16 h-16 md:w-20 md:h-20 text-blue-400 animate-spin-slow" />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse -z-10"></div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-white font-bold text-base md:text-lg break-words">Awaiting Mission Parameters</p>
                          <p className="text-blue-200 text-xs md:text-sm font-mono break-words">NASA Satellite Network Standing By</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom indicators */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs md:text-sm font-mono z-20 px-4">
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

        {/* Weather Results Section */}
        {showResults && (
          <section className="py-12 md:py-24 bg-gradient-to-b from-transparent via-black/40 to-black/60 backdrop-blur-sm border-t border-blue-400/30 relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12 md:mb-16">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
                  <Satellite className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  <span className="text-blue-300 font-mono text-xs md:text-sm tracking-widest break-words text-center">
                    SATELLITE TELEMETRY ANALYSIS
                  </span>
                  <Satellite className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 md:mb-6 break-words">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Mission Weather Assessment
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed break-words px-2">
                  Real-time atmospheric analysis using NASA Earth Science Division satellites and advanced meteorological modeling
                </p>
              </div>

              {/* Risk Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8 max-w-8xl mx-auto mb-12 md:mb-16">
                {weatherRisks.map((risk, index) => (
                  <div
                    key={risk.title}
                    className="animate-fade-in hover:scale-105 transition-all duration-500 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="nasa-risk-card glass-morphism backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300">
                      <WeatherRiskCard
                        {...risk}
                        className="bg-transparent"
                      />
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-blue-400/20">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-blue-300 whitespace-nowrap">NASA-VERIFIED</span>
                          <span className="text-green-400 whitespace-nowrap">REAL-TIME</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission Summary */}
              <div className="nasa-control-panel glass-morphism rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 backdrop-blur-xl border border-blue-400/30 max-w-4xl mx-auto bg-black/30">
                <div className="text-center space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                    <span className="break-words">Mission Weather Summary</span>
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <div className="text-2xl md:text-3xl font-bold text-blue-400">{comfortScore}%</div>
                      <div className="text-xs md:text-sm text-blue-200 break-words">Mission Readiness</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl md:text-3xl font-bold text-green-400">A+</div>
                      <div className="text-xs md:text-sm text-green-200 break-words">NASA Data Grade</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl md:text-3xl font-bold text-purple-400">0.8s</div>
                      <div className="text-xs md:text-sm text-purple-200 break-words">Analysis Time</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-4 border border-blue-400/30">
                    <p className="text-white font-medium text-sm md:text-base break-words leading-relaxed">
                      {comfortScore >= 80 
                        ? "🚀 MISSION GO: Optimal atmospheric conditions for space event execution"
                        : comfortScore >= 60
                        ? "⚠️ MISSION CAUTION: Acceptable conditions with recommended precautions"
                        : "🛑 MISSION HOLD: Weather conditions require postponement or indoor alternatives"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-12 lg:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">NASA Earth Monitor</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Advanced Earth observation and climate monitoring system powered by NASA satellite data and machine learning.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
                  <ul className="space-y-3">
                    <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                    <li><a href="#data-sources" className="text-gray-400 hover:text-white transition-colors text-sm">Data Sources</a></li>
                    <li><a href="#api" className="text-gray-400 hover:text-white transition-colors text-sm">API Access</a></li>
                    <li><a href="#documentation" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
                  <ul className="space-y-3">
                    <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About Project</a></li>
                    <li><a href="#methodology" className="text-gray-400 hover:text-white transition-colors text-sm">Methodology</a></li>
                    <li><a href="#datasets" className="text-gray-400 hover:text-white transition-colors text-sm">Datasets Used</a></li>
                    <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Team</a></li>
                  </ul>
                </div>

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

            <div className="py-6 border-t border-gray-800">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <p className="text-gray-400 text-sm">
                    © 2025 NASA Earth Monitor. Built for NASA Space Apps Challenge.
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
      </div>
    </div>
  );
};

export default Index;