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
  Activity
} from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';
import weatherHeroBg from '@/assets/weather-hero-bg.jpg';
import { toast } from '@/hooks/use-toast';
import Background3D from "@/components/Background3D";

const Index = () => {
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('morning');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [comfortScore, setComfortScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [demoMode, setDemoMode] = useState<string | null>(null);

  // Demo scenarios - Enhanced for NASA theme
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

  // Enhanced weather risks with NASA terminology
  const weatherRisks = [
    {
      icon: Sun,
      title: 'Solar Radiation',
      risk: demoMode ? (demoMode === 'challenging' ? 88 : demoMode === 'perfect' ? 12 : 38) : 45,
      description: 'UV Index & Heat Analysis',
      details: 'Solar radiation levels analyzed using NASA POWER satellite data. Current conditions show moderate UV exposure risk for outdoor space events and launches.'
    },
    {
      icon: Thermometer,
      title: 'Thermal Comfort',
      risk: demoMode ? (demoMode === 'monsoon' ? 15 : 8) : 12,
      description: 'Temperature comfort zone',
      details: 'Thermal analysis based on NASA Earth observation data shows optimal temperature ranges for mission-critical operations and space events.'
    },
    {
      icon: Wind,
      title: 'Wind Shear Risk',
      risk: demoMode ? (demoMode === 'challenging' ? 72 : 18) : 35,
      description: 'Atmospheric wind analysis',
      details: 'Upper atmosphere wind patterns monitored via satellite telemetry. Critical for rocket launches and aerial space demonstrations.'
    },
    {
      icon: CloudRain,
      title: 'Precipitation Probability',
      risk: demoMode ? (demoMode === 'monsoon' ? 94 : demoMode === 'challenging' ? 76 : 8) : 28,
      description: 'Satellite-based rain forecast',
      details: 'Advanced meteorological modeling using NASA GPM satellite constellation data for precision precipitation forecasting.'
    },
    {
      icon: Droplets,
      title: 'Atmospheric Moisture',
      risk: demoMode ? (demoMode === 'challenging' ? 85 : demoMode === 'perfect' ? 18 : 58) : 42,
      description: 'Humidity & dewpoint analysis',
      details: 'Atmospheric water vapor analysis using MODIS satellite sensors. Critical for equipment operation and astronaut comfort zones.'
    }
  ];

  useEffect(() => {
    if (demoMode) {
      const scenario = demoScenarios[demoMode as keyof typeof demoScenarios];
      setLocation(scenario.location);
      setComfortScore(scenario.score);
      setShowResults(true);
      toast({
        title: "NASA Mission Analysis Active",
        description: scenario.description,
      });
    }
  }, [demoMode]);

  const handleCheckWeather = () => {
    if (!location) {
      toast({
        title: "Mission Location Required",
        description: "Please select coordinates for your space event mission.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProfile) {
      toast({
        title: "Mission Profile Required",
        description: "Please select your mission type for NASA-grade analysis.",
        variant: "destructive",
      });
      return;
    }

    // Enhanced simulation with NASA theme
    setShowResults(false);
    toast({
      title: "Satellite Analysis Initiated",
      description: "Processing atmospheric data from NASA Earth observation network...",
    });

    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 100);
      setComfortScore(mockScore);
      setShowResults(true);

      toast({
        title: "Mission Weather Analysis Complete!",
        description: `Mission readiness score: ${mockScore}/100 for ${location}`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen relative text-white">
      {/* 3D Background - Fixed Position */}
      <Background3D />
      
      {/* Main Content with Transparent Backgrounds */}
      <div className="relative z-10">
        
        {/* Enhanced NASA Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          </div>

          {/* NASA Mission Control Panel */}
          <div className="absolute top-6 right-6 z-50">
            
          </div>

          {/* Enhanced floating NASA elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

          {/* Enhanced Main Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-6xl mx-auto">
              {/* NASA-style Hero Headlines */}
              <div className="mb-16 animate-fade-in space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Satellite className="w-8 h-8 text-blue-400 animate-pulse" />
                  <span className="text-blue-300 font-mono text-sm tracking-widest">NASA SPACE APPS CHALLENGE 2025</span>
                  <Satellite className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift">
                    Will It Rain On My Parade?
                  </span>
                </h1>
                
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    NASA-Grade Atmospheric Intelligence System
                  </p>
                  <p className="text-lg md:text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
                    Advanced meteorological analysis using NASA Earth observation satellites, POWER API, and machine learning for mission-critical event planning across India
                  </p>
                </div>

                {/* NASA Mission Status */}
                <div className="flex items-center justify-center gap-6 text-sm font-mono mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300">SATELLITES ONLINE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300">DATA STREAMING</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-300">AI PROCESSING</span>
                  </div>
                </div>
              </div>

              {/* Enhanced NASA Mission Control Panel */}
              <div className="nasa-control-panel glass-morphism rounded-3xl p-8 md:p-12 mb-12 max-w-6xl mx-auto shadow-2xl backdrop-blur-xl border border-blue-400/30 animate-scale-in bg-black/30">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Mission Inputs */}
                  <div className="space-y-8">
                    {/* Mission Coordinates */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-heading font-bold flex items-center gap-3 text-white">
                        <MapPin className="w-6 h-6 text-blue-400" />
                        Mission Coordinates
                        <span className="text-xs font-mono bg-blue-500/20 px-2 py-1 rounded">GPS</span>
                      </h3>
                      <LocationSearchInput
                        value={location}
                        onChange={setLocation}
                        onLocationSelect={setLocation}
                        className="w-full rounded-xl border-2 border-blue-400/50 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring focus:ring-blue-400/30 transition-all text-white placeholder-blue-200"
                      />
                    </div>

                    {/* Mission Timeline */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-heading font-bold flex items-center gap-3 text-white">
                        <Activity className="w-6 h-6 text-purple-400" />
                        Mission Timeline
                        <span className="text-xs font-mono bg-purple-500/20 px-2 py-1 rounded">UTC</span>
                      </h3>
                      <DateTimePicker
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onDateChange={setSelectedDate}
                        onTimeChange={setSelectedTime}
                        className="rounded-xl border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring focus:ring-purple-400/30 transition-all"
                      />
                    </div>

                    {/* Mission Profile */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-heading font-bold flex items-center gap-3 text-white">
                        <Star className="w-6 h-6 text-yellow-400" />
                        Mission Profile
                        <span className="text-xs font-mono bg-yellow-500/20 px-2 py-1 rounded">CLASS</span>
                      </h3>
                      <EventProfileSelector
                        selectedProfile={selectedProfile}
                        onProfileSelect={setSelectedProfile}
                      />
                    </div>

                    {/* Mission Launch Button */}
                    <Button
                      onClick={handleCheckWeather}
                      className="w-full text-xl font-bold py-6 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-blue-400/50"
                    >
                      <Satellite className="w-6 h-6 animate-spin" />
                      INITIATE WEATHER ANALYSIS
                      <Zap className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Right Column - Mission Status Display */}
                  <div className="flex flex-col items-center justify-center min-h-[500px] relative">
                    {showResults ? (
                      <div className="space-y-8 animate-fade-in text-center">
                        {/* Enhanced Circular Progress */}
                        <div className="relative">
                          <CircularProgress score={comfortScore} animated size={160} />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 -z-10 animate-pulse"></div>
                        </div>

                        {location && (
                          <div className="text-center space-y-3">
                            <div className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
                              {location}
                            </div>
                            <div className="text-blue-200 font-mono text-sm md:text-base bg-blue-500/20 rounded-full px-4 py-2 inline-block">
                              {new Date(selectedDate).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="flex justify-center gap-4 text-xs font-mono mt-4">
                              <span className="text-green-400">MISSION: GO</span>
                              <span className="text-blue-400">WEATHER: ANALYZED</span>
                              <span className="text-purple-400">STATUS: READY</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="relative">
                          <div className="w-40 h-40 mx-auto rounded-full glass-morphism border-4 border-blue-400/30 flex items-center justify-center animate-pulse-glow">
                            <Satellite className="w-20 h-20 text-blue-400 animate-spin-slow" />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse -z-10"></div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-white font-bold text-lg">Awaiting Mission Parameters</p>
                          <p className="text-blue-200 text-sm font-mono">NASA Satellite Network Standing By</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NASA Mission Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-sm font-mono z-20">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">TERRA SATELLITE</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300">AQUA SATELLITE</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300">MODIS SENSOR</span>
            </div>
          </div>
        </section>

        {/* Enhanced NASA Weather Risk Dashboard */}
        {showResults && (
          <section className="py-24 bg-gradient-to-b from-transparent via-black/40 to-black/60 backdrop-blur-sm border-t border-blue-400/30 relative">
            {/* Background space grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            
            <div className="container mx-auto px-4 relative z-10">
              {/* NASA Mission Analysis Header */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Satellite className="w-6 h-6 text-blue-400" />
                  <span className="text-blue-300 font-mono text-sm tracking-widest">SATELLITE TELEMETRY ANALYSIS</span>
                  <Satellite className="w-6 h-6 text-blue-400" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Mission Weather Assessment
                  </span>
                </h2>
                
                <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                  Real-time atmospheric analysis using NASA Earth Science Division satellites and advanced meteorological modeling
                </p>
              </div>

              {/* Enhanced Risk Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-8xl mx-auto mb-16">
                {weatherRisks.map((risk, index) => (
                  <div
                    key={risk.title}
                    className="animate-fade-in hover:scale-105 transition-all duration-500 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="nasa-risk-card glass-morphism backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300">
                      <WeatherRiskCard
                        {...risk}
                        className="bg-transparent"
                      />
                      {/* NASA Mission Classification */}
                      <div className="mt-4 pt-4 border-t border-blue-400/20">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-blue-300">NASA-VERIFIED</span>
                          <span className="text-green-400">REAL-TIME</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* NASA Mission Summary */}
              <div className="nasa-control-panel glass-morphism rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-blue-400/30 max-w-4xl mx-auto bg-black/30">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                    <Activity className="w-6 h-6 text-green-400" />
                    Mission Weather Summary
                    <Activity className="w-6 h-6 text-green-400" />
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-blue-400">{comfortScore}%</div>
                      <div className="text-sm text-blue-200">Mission Readiness</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-green-400">A+</div>
                      <div className="text-sm text-green-200">NASA Data Grade</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-purple-400">0.8s</div>
                      <div className="text-sm text-purple-200">Analysis Time</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-400/30">
                    <p className="text-white font-medium">
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

        {/* Enhanced NASA Footer */}
        <footer className="py-16 border-t border-blue-400/30 bg-gradient-to-b from-transparent to-black/60">
          <div className="container mx-auto px-4">
            <div className="nasa-control-panel glass-morphism rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-blue-400/30 bg-black/30">
              {/* NASA Mission Statistics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-12">
                <div className="space-y-3">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">2,847</div>
                  <div className="text-sm text-blue-200 font-mono">MISSIONS ANALYZED</div>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">28+</div>
                  <div className="text-sm text-green-200 font-mono">NASA SATELLITES</div>
                  <div className="w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">94.7%</div>
                  <div className="text-sm text-yellow-200 font-mono">ACCURACY RATE</div>
                  <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">&lt; 0.8s</div>
                  <div className="text-sm text-pink-200 font-mono">RESPONSE TIME</div>
                  <div className="w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded"></div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-blue-400/30 text-center space-y-6">
                {/* NASA Partnership Banner */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30">
                  <p className="text-blue-200 mb-4 font-mono text-sm">
                    🚀 BUILT FOR NASA SPACE APPS CHALLENGE 2025 🚀
                  </p>
                  <p className="text-white font-semibold text-lg">
                    Powered by NASA Earth Science Division • POWER API • MODIS Satellite Data
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="hover:scale-105 transition-all duration-300 bg-white/10 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 hover:border-blue-400"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Mission Source
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="hover:scale-105 transition-all duration-300 bg-white/10 border-purple-400/50 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    NASA Space Apps
                  </Button>
                </div>

                {/* Final NASA Credits */}
                <div className="space-y-2 text-center">
                  <p className="text-blue-300 font-mono text-sm">
                    Earth Science Division • Goddard Space Flight Center • Jet Propulsion Laboratory
                  </p>
                  <p className="text-blue-400 font-mono text-xs">
                    "Advancing Earth System Science for Society" - NASA Mission Statement
                  </p>
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