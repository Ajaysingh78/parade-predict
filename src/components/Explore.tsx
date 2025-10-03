import React, { useState, useEffect } from 'react';
import { ArrowLeft, Satellite, Globe, Cloud, Thermometer, Wind, Droplets, Sun, CloudRain, Zap, Activity, Map, Layers, Info, Play, Pause, TrendingUp, MapPin, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Explore = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('satellites');
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const satellites = [
    {
      id: 1,
      name: 'Terra',
      status: 'Active',
      orbit: 'Sun-synchronous',
      altitude: '705 km',
      instruments: 'MODIS, ASTER, CERES',
      dataTypes: ['Temperature', 'Cloud Cover', 'Radiation'],
      launched: '1999',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Aqua',
      status: 'Active',
      orbit: 'Sun-synchronous',
      altitude: '705 km',
      instruments: 'MODIS, AIRS, AMSU',
      dataTypes: ['Humidity', 'Precipitation', 'Temperature'],
      launched: '2002',
      color: 'cyan'
    },
    {
      id: 3,
      name: 'GPM Core',
      status: 'Active',
      orbit: 'Non-sun-synchronous',
      altitude: '407 km',
      instruments: 'DPR, GMI',
      dataTypes: ['Precipitation', 'Rain Rate', 'Snow'],
      launched: '2014',
      color: 'purple'
    },
    {
      id: 4,
      name: 'GOES-16',
      status: 'Active',
      orbit: 'Geostationary',
      altitude: '35,786 km',
      instruments: 'ABI, GLM',
      dataTypes: ['Storm Tracking', 'Lightning', 'Cloud Motion'],
      launched: '2016',
      color: 'yellow'
    }
  ];

  const indianCities = [
    { name: 'Delhi', lat: 28.6, lon: 77.2, temp: 32, humidity: 65, risk: 'Moderate' },
    { name: 'Mumbai', lat: 19.0, lon: 72.8, temp: 29, humidity: 78, risk: 'High' },
    { name: 'Bangalore', lat: 12.9, lon: 77.6, temp: 26, humidity: 55, risk: 'Low' },
    { name: 'Chennai', lat: 13.0, lon: 80.2, temp: 31, humidity: 72, risk: 'Moderate' },
    { name: 'Kolkata', lat: 22.5, lon: 88.3, temp: 33, humidity: 80, risk: 'High' },
    { name: 'Hyderabad', lat: 17.3, lon: 78.4, temp: 30, humidity: 58, risk: 'Low' }
  ];

  const weatherParams = [
    { 
      icon: Thermometer, 
      name: 'Temperature', 
      value: '18-35°C', 
      source: 'Terra MODIS',
      color: 'red',
      description: 'Real-time surface temperature from NASA satellites'
    },
    { 
      icon: Droplets, 
      name: 'Humidity', 
      value: '45-85%', 
      source: 'Aqua AIRS',
      color: 'blue',
      description: 'Atmospheric moisture levels and dewpoint analysis'
    },
    { 
      icon: Wind, 
      name: 'Wind Speed', 
      value: '5-25 km/h', 
      source: 'POWER API',
      color: 'cyan',
      description: 'Surface and upper-atmosphere wind patterns'
    },
    { 
      icon: CloudRain, 
      name: 'Precipitation', 
      value: '0-45%', 
      source: 'GPM DPR',
      color: 'purple',
      description: 'Rain probability and intensity forecasting'
    },
    { 
      icon: Sun, 
      name: 'UV Index', 
      value: '3-9', 
      source: 'POWER API',
      color: 'yellow',
      description: 'Solar radiation and UV exposure levels'
    },
    { 
      icon: Cloud, 
      name: 'Cloud Cover', 
      value: '20-70%', 
      source: 'GOES-16',
      color: 'gray',
      description: 'Satellite cloud imaging and movement tracking'
    }
  ];

  const scenarios = [
    {
      title: 'Wedding Planning',
      icon: '💒',
      location: 'Udaipur, Rajasthan',
      date: 'December 2025',
      weather: 'Perfect',
      score: 92,
      details: 'Clear skies, optimal temperature (18-22°C), low humidity'
    },
    {
      title: 'Cricket Match',
      icon: '🏏',
      location: 'Mumbai, Maharashtra',
      date: 'October 2025',
      weather: 'Challenging',
      score: 58,
      details: 'Monsoon risk, high humidity, potential rain interruptions'
    },
    {
      title: 'Outdoor Concert',
      icon: '🎵',
      location: 'Bangalore, Karnataka',
      date: 'March 2026',
      weather: 'Excellent',
      score: 88,
      details: 'Pleasant weather, moderate temperature, minimal rain risk'
    },
    {
      title: 'Marathon Event',
      icon: '🏃',
      location: 'Delhi NCR',
      date: 'January 2026',
      weather: 'Good',
      score: 75,
      details: 'Cool morning, low UV, good air quality expected'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .bg-grid-white {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }

        @keyframes orbit-0 {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        @keyframes orbit-1 {
          from { transform: rotate(90deg) translateX(120px) rotate(-90deg); }
          to { transform: rotate(450deg) translateX(120px) rotate(-450deg); }
        }

        @keyframes orbit-2 {
          from { transform: rotate(180deg) translateX(140px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(140px) rotate(-540deg); }
        }

        @keyframes orbit-3 {
          from { transform: rotate(270deg) translateX(160px) rotate(-270deg); }
          to { transform: rotate(630deg) translateX(160px) rotate(-630deg); }
        }

        .satellite-orbit-0,
        .satellite-orbit-1,
        .satellite-orbit-2,
        .satellite-orbit-3 {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -12px 0 0 -12px;
        }
      `}</style>

      <div className="relative overflow-hidden border-b border-blue-400/30 bg-gradient-to-r from-blue-950/50 via-purple-950/50 to-pink-950/50 backdrop-blur-xl">
        <div className="absolute inset-0 bg-grid-white bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-blue-400 animate-spin-slow" />
              <span className="text-blue-300 font-mono text-sm tracking-widest">NASA WEATHER INTELLIGENCE HUB</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Explore Earth's Atmosphere
              </span>
            </h1>

            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Real-time satellite data, weather patterns, and predictive intelligence powered by NASA Earth Science
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { id: 'satellites', label: 'Satellites', icon: Satellite },
              { id: 'parameters', label: 'Weather Data', icon: Activity },
              { id: 'regions', label: 'India Map', icon: Map },
              { id: 'scenarios', label: 'Event Planning', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-blue-200 border border-white/20'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {activeTab === 'satellites' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">NASA Earth Observation Satellites</h2>
              <p className="text-blue-200 text-lg">Active satellites providing real-time weather intelligence</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {satellites.map((satellite, index) => (
                <div
                  key={satellite.id}
                  className="glass-morphism rounded-2xl p-6 backdrop-blur-xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-xl">
                        <Satellite className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{satellite.name}</h3>
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-300 font-medium">{satellite.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono bg-blue-500/20 px-2 py-1 rounded border border-blue-400/30 text-blue-300">
                      {satellite.launched}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Orbit Type:</span>
                      <span className="text-white font-medium">{satellite.orbit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Altitude:</span>
                      <span className="text-white font-medium">{satellite.altitude}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Instruments:</span>
                      <span className="text-white font-medium text-right">{satellite.instruments}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-400/20">
                    <div className="text-xs text-gray-400 mb-2">Data Types:</div>
                    <div className="flex flex-wrap gap-2">
                      {satellite.dataTypes.map(type => (
                        <span key={type} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs border border-blue-400/30">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono">
                    <span className="text-green-400">TRANSMITTING</span>
                    <span className="text-blue-400">LIVE DATA</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-morphism rounded-2xl p-8 backdrop-blur-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/30 to-blue-950/30 mt-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Live Satellite Tracking</h3>
                <p className="text-purple-200">Real-time orbital positions and coverage areas</p>
              </div>

              <div className="relative h-64 bg-black/30 rounded-xl overflow-hidden border border-purple-400/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-32 h-32 text-blue-400/20" />
                </div>
                
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`satellite-orbit-${i}`}
                    style={{
                      animation: `orbit-${i} ${8 + i * 2}s linear infinite`,
                      animationPlayState: isAnimating ? 'running' : 'paused'
                    }}
                  >
                    <Satellite className="w-6 h-6 text-blue-400" />
                  </div>
                ))}

                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="absolute bottom-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all"
                >
                  {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Real-Time Weather Parameters</h2>
              <p className="text-blue-200 text-lg">Live atmospheric data from NASA sensors across India</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weatherParams.map((param, index) => (
                <div
                  key={param.name}
                  className="glass-morphism rounded-2xl p-6 backdrop-blur-xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-800 p-3 rounded-xl group-hover:scale-110 transition-transform">
                      <param.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{param.name}</h3>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
                    {param.value}
                  </div>

                  <p className="text-sm text-gray-300 mb-4">{param.description}</p>

                  <div className="pt-4 border-t border-blue-400/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Data Source:</span>
                      <span className="text-blue-300 font-mono">{param.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-morphism rounded-2xl p-8 backdrop-blur-xl border border-green-400/30 bg-gradient-to-br from-green-950/30 to-blue-950/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Live Data Stream</h3>
                  <p className="text-green-200">Real-time weather measurements updating every 15 minutes</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 font-mono text-sm">LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Temp', value: '28.5°C', change: '+1.2°' },
                  { label: 'Humidity', value: '62%', change: '-3%' },
                  { label: 'Wind', value: '12 km/h', change: '+2 km/h' },
                  { label: 'Pressure', value: '1013 hPa', change: '+2 hPa' }
                ].map(item => (
                  <div key={item.label} className="bg-black/30 rounded-xl p-4 border border-green-400/30">
                    <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                    <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-xs text-green-400">{item.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regions' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">India Weather Map</h2>
              <p className="text-blue-200 text-lg">Interactive weather conditions across major Indian cities</p>
            </div>

            <div className="glass-morphism rounded-2xl p-8 backdrop-blur-xl border border-blue-400/30">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {indianCities.map(city => (
                  <button
                    key={city.name}
                    onClick={() => setSelectedRegion(city)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedRegion?.name === city.name
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-blue-400 scale-105'
                        : 'bg-white/5 border-blue-400/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{city.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{city.lat}°N, {city.lon}°E</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        city.risk === 'Low' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                        city.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                        'bg-red-500/20 text-red-300 border border-red-400/30'
                      }`}>
                        {city.risk}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400 text-xs">Temperature</div>
                        <div className="text-white font-bold">{city.temp}°C</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs">Humidity</div>
                        <div className="text-white font-bold">{city.humidity}%</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedRegion && (
                <div className="bg-gradient-to-br from-purple-950/50 to-blue-950/50 rounded-xl p-6 border border-purple-400/30">
                  <h3 className="text-xl font-bold mb-4">Detailed Analysis: {selectedRegion.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Current Temperature:</span>
                        <span className="text-white font-bold">{selectedRegion.temp}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Humidity Level:</span>
                        <span className="text-white font-bold">{selectedRegion.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Weather Risk:</span>
                        <span className="text-white font-bold">{selectedRegion.risk}</span>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 border border-blue-400/30">
                      <div className="text-sm text-gray-300 mb-2">Satellite Coverage:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Terra</span>
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">Aqua</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">GPM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Event Planning Scenarios</h2>
              <p className="text-blue-200 text-lg">Real-world weather predictions for different event types</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {scenarios.map((scenario, index) => (
                <div
                  key={scenario.title}
                  className="glass-morphism rounded-2xl p-6 backdrop-blur-xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{scenario.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{scenario.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{scenario.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>{scenario.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {scenario.score}
                      </div>
                      <div className="text-xs text-gray-400">Comfort Score</div>
                    </div>
                  </div>

                  <div className={`px-4 py-2 rounded-lg mb-4 ${
                    scenario.weather === 'Perfect' || scenario.weather === 'Excellent' ? 'bg-green-500/20 border border-green-400/30' :
                    scenario.weather === 'Good' ? 'bg-blue-500/20 border border-blue-400/30' :
                    'bg-yellow-500/20 border border-yellow-400/30'
                  }`}>
                    <div className="text-sm font-medium text-white">{scenario.weather} Conditions</div>
                    <div className="text-xs text-gray-300 mt-1">{scenario.details}</div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Analysis
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;