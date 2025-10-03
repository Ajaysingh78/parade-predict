import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Satellite, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Wind,
  Droplets,
  Sun,
  CloudRain,
  Thermometer,
  Gauge,
  BarChart3,
  PieChart,
  Zap,
  Eye,
  Shield,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherDashboard = ({ 
  comfortScore = 75, 
  location = "Kennedy Space Center, FL",
  selectedDate = "2025-10-15",
  selectedTime = "Morning (6AM-12PM)",
  selectedProfile = { name: "Rocket Launch", icon: "🚀" }
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate comfort score on load
  useEffect(() => {
    let start = 0;
    const end = comfortScore;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [comfortScore]);

  // Generate realistic data based on comfort score
  const generateWeatherData = () => {
    const baseTemp = comfortScore > 70 ? 25 : comfortScore > 50 ? 30 : 35;
    const baseHumidity = comfortScore > 70 ? 50 : comfortScore > 50 ? 65 : 80;
    const baseWind = comfortScore > 70 ? 10 : comfortScore > 50 ? 20 : 30;
    
    return {
      hourlyForecast: Array.from({ length: 24 }, (_, i) => ({
        time: `${i.toString().padStart(2, '0')}:00`,
        temperature: baseTemp + Math.sin(i / 3) * 5 + (Math.random() - 0.5) * 2,
        humidity: baseHumidity + Math.cos(i / 4) * 10 + (Math.random() - 0.5) * 5,
        windSpeed: baseWind + Math.sin(i / 2) * 8 + (Math.random() - 0.5) * 3,
        comfort: comfortScore + Math.sin(i / 3) * 10 + (Math.random() - 0.5) * 5
      })),
      weeklyForecast: Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        high: baseTemp + 5 + (Math.random() - 0.5) * 3,
        low: baseTemp - 5 + (Math.random() - 0.5) * 3,
        comfort: comfortScore + (Math.random() - 0.5) * 15,
        precipitation: Math.random() * (comfortScore > 70 ? 20 : 60)
      })),
      riskBreakdown: [
        { name: 'Solar Radiation', value: comfortScore > 70 ? 15 : comfortScore > 50 ? 45 : 75, color: '#fbbf24' },
        { name: 'Wind Shear', value: comfortScore > 70 ? 20 : comfortScore > 50 ? 40 : 65, color: '#3b82f6' },
        { name: 'Precipitation', value: comfortScore > 70 ? 10 : comfortScore > 50 ? 30 : 85, color: '#8b5cf6' },
        { name: 'Humidity', value: comfortScore > 70 ? 25 : comfortScore > 50 ? 50 : 80, color: '#06b6d4' },
        { name: 'Temperature', value: comfortScore > 70 ? 12 : comfortScore > 50 ? 35 : 70, color: '#ef4444' }
      ],
      radarData: [
        { metric: 'Visibility', value: comfortScore > 70 ? 90 : comfortScore > 50 ? 60 : 40, fullMark: 100 },
        { metric: 'Air Quality', value: comfortScore > 70 ? 85 : comfortScore > 50 ? 65 : 45, fullMark: 100 },
        { metric: 'Stability', value: comfortScore > 70 ? 88 : comfortScore > 50 ? 55 : 35, fullMark: 100 },
        { metric: 'Safety', value: comfortScore > 70 ? 92 : comfortScore > 50 ? 70 : 30, fullMark: 100 },
        { metric: 'Comfort', value: comfortScore, fullMark: 100 },
        { metric: 'Reliability', value: comfortScore > 70 ? 87 : comfortScore > 50 ? 62 : 38, fullMark: 100 }
      ],
      atmosphericLayers: [
        { layer: 'Surface', pressure: 1013, temperature: baseTemp, humidity: baseHumidity },
        { layer: '850mb', pressure: 850, temperature: baseTemp - 10, humidity: baseHumidity - 15 },
        { layer: '700mb', pressure: 700, temperature: baseTemp - 18, humidity: baseHumidity - 25 },
        { layer: '500mb', pressure: 500, temperature: baseTemp - 30, humidity: baseHumidity - 40 },
        { layer: '300mb', pressure: 300, temperature: baseTemp - 45, humidity: baseHumidity - 55 }
      ]
    };
  };

  const data = generateWeatherData();

  // Status determination
  const getStatus = () => {
    if (comfortScore >= 80) return { text: 'OPTIMAL', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400/50', icon: CheckCircle };
    if (comfortScore >= 60) return { text: 'ACCEPTABLE', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400/50', icon: AlertTriangle };
    return { text: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-400/50', icon: AlertTriangle };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  const COLORS = ['#fbbf24', '#3b82f6', '#8b5cf6', '#06b6d4', '#ef4444'];

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 py-8">
      {/* Main Header */}
      <div className="glass-morphism rounded-3xl p-6 md:p-8 mb-6 border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-purple-950/40 to-black/60 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Satellite className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Mission Weather Analysis</h1>
                <p className="text-blue-300 font-mono text-sm">NASA Earth Science Division • Real-Time Telemetry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-blue-400/20">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-xs text-blue-300">Location</div>
                  <div className="text-sm font-semibold text-white truncate">{location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-purple-400/20">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-xs text-purple-300">Mission Date</div>
                  <div className="text-sm font-semibold text-white">{selectedDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-pink-400/20">
                <Clock className="w-5 h-5 text-pink-400" />
                <div>
                  <div className="text-xs text-pink-300">Time Slot</div>
                  <div className="text-sm font-semibold text-white">{selectedTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-yellow-400/20">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-xs text-yellow-300">Event Type</div>
                  <div className="text-sm font-semibold text-white">{selectedProfile?.icon} {selectedProfile?.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comfort Score Display */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative glass-morphism rounded-2xl p-6 border-2 border-blue-400/50 bg-black/50 min-w-[200px]">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <StatusIcon className={`w-6 h-6 ${status.color}`} />
                  <span className={`text-xs font-mono font-bold ${status.color}`}>{status.text}</span>
                </div>
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {animatedScore}%
                </div>
                <div className="text-sm text-blue-200">Mission Readiness Score</div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {animatedScore >= 80 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <span className={animatedScore >= 80 ? 'text-green-400' : 'text-red-400'}>
                    {animatedScore >= 80 ? 'Favorable' : 'Monitor Closely'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass-morphism rounded-2xl p-2 mb-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'hourly', label: '24-Hour Forecast', icon: Clock },
            { id: 'weekly', label: '7-Day Outlook', icon: Calendar },
            { id: 'atmospheric', label: 'Atmospheric Analysis', icon: Gauge },
            { id: 'risks', label: 'Risk Assessment', icon: Shield }
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-white/5 text-blue-300 hover:bg-white/10'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution */}
            <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <PieChart className="w-6 h-6 text-purple-400" />
                Risk Factor Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={data.riskBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.riskBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {data.riskBreakdown.map((risk, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }}></div>
                    <span className="text-xs text-gray-300">{risk.name}: {risk.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                Multi-Parameter Assessment
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data.radarData}>
                  <PolarGrid stroke="#3b82f6" strokeOpacity={0.3} />
                  <PolarAngleAxis dataKey="metric" stroke="#93c5fd" tick={{ fill: '#93c5fd', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#3b82f6" tick={{ fill: '#93c5fd' }} />
                  <Radar name="Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Current Conditions */}
            <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-red-400" />
                Current Atmospheric Conditions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-4 border border-red-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Thermometer className="w-8 h-8 text-red-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{data.hourlyForecast[0].temperature.toFixed(1)}°C</div>
                      <div className="text-xs text-red-200">Temperature</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{data.hourlyForecast[0].humidity.toFixed(0)}%</div>
                      <div className="text-xs text-blue-200">Humidity</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Wind className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{data.hourlyForecast[0].windSpeed.toFixed(1)} km/h</div>
                      <div className="text-xs text-green-200">Wind Speed</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{(comfortScore > 70 ? 15 : comfortScore > 50 ? 8 : 5)} km</div>
                      <div className="text-xs text-purple-200">Visibility</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hourly' && (
          <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              24-Hour Detailed Forecast
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.hourlyForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="#93c5fd" 
                  tick={{ fill: '#93c5fd', fontSize: 12 }}
                  interval={2}
                />
                <YAxis stroke="#93c5fd" tick={{ fill: '#93c5fd', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature (°C)" dot={false} />
                <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity (%)" dot={false} />
                <Line type="monotone" dataKey="windSpeed" stroke="#10b981" strokeWidth={2} name="Wind Speed (km/h)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'weekly' && (
          <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-400" />
              7-Day Mission Planning Outlook
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.weeklyForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" strokeOpacity={0.3} />
                <XAxis dataKey="day" stroke="#93c5fd" tick={{ fill: '#93c5fd' }} />
                <YAxis stroke="#93c5fd" tick={{ fill: '#93c5fd' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Bar dataKey="high" fill="#ef4444" name="High Temp (°C)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="low" fill="#3b82f6" name="Low Temp (°C)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="comfort" fill="#8b5cf6" name="Comfort Score" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'atmospheric' && (
          <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gauge className="w-6 h-6 text-yellow-400" />
              Atmospheric Layer Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-400/30">
                    <th className="text-left py-3 px-4 text-blue-300">Layer</th>
                    <th className="text-left py-3 px-4 text-blue-300">Pressure (mb)</th>
                    <th className="text-left py-3 px-4 text-blue-300">Temperature (°C)</th>
                    <th className="text-left py-3 px-4 text-blue-300">Humidity (%)</th>
                    <th className="text-left py-3 px-4 text-blue-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.atmosphericLayers.map((layer, idx) => (
                    <tr key={idx} className="border-b border-blue-400/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-semibold">{layer.layer}</td>
                      <td className="py-3 px-4 text-gray-300">{layer.pressure}</td>
                      <td className="py-3 px-4 text-gray-300">{layer.temperature.toFixed(1)}</td>
                      <td className="py-3 px-4 text-gray-300">{layer.humidity.toFixed(1)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          layer.humidity < 40 ? 'bg-green-500/20 text-green-400' : 
                          layer.humidity < 60 ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {layer.humidity < 40 ? 'Stable' : layer.humidity < 60 ? 'Moderate' : 'Unstable'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                Risk Level Timeline
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.hourlyForecast.slice(0, 12)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" strokeOpacity={0.3} />
                  <XAxis dataKey="time" stroke="#93c5fd" tick={{ fill: '#93c5fd', fontSize: 12 }} />
                  <YAxis stroke="#93c5fd" tick={{ fill: '#93c5fd', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="comfort" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Comfort Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-morphism rounded-2xl p-6 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Mission Recommendations
              </h3>
              <div className="space-y-3">
                {comfortScore >= 80 ? (
                  <>
                    <div className="flex items-start gap-3 bg-green-500/10 border border-green-400/30 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-green-400 font-semibold text-sm">GO FOR MISSION</div>
                        <div className="text-gray-300 text-xs mt-1">Clear skies expected with visibility exceeding 15km throughout mission window.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-400/30 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-purple-400 font-semibold text-sm">Stable Conditions</div>
                        <div className="text-gray-300 text-xs mt-1">Minimal weather variability predicted. Ideal for precision operations.</div>
                      </div>
                    </div>
                  </>
                ) : comfortScore >= 60 ? (
                  <>
                    <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-yellow-400 font-semibold text-sm">PROCEED WITH CAUTION</div>
                        <div className="text-gray-300 text-xs mt-1">Some atmospheric parameters showing moderate risk levels. Monitor continuously.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-400/30 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-blue-400 font-semibold text-sm">Backup Plan Required</div>
                        <div className="text-gray-300 text-xs mt-1">Have contingency measures ready for weather deterioration scenarios.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-400/30 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-purple-400 font-semibold text-sm">Enhanced Monitoring</div>
                        <div className="text-gray-300 text-xs mt-1">Real-time satellite tracking recommended throughout mission duration.</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-red-400 font-semibold text-sm">MISSION HOLD RECOMMENDED</div>
                        <div className="text-gray-300 text-xs mt-1">Critical weather parameters outside safe operational limits. Postponement advised.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-400/30 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-orange-400 font-semibold text-sm">High Risk Conditions</div>
                        <div className="text-gray-300 text-xs mt-1">Multiple weather factors showing elevated risk. Safety protocols must be prioritized.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-yellow-400 font-semibold text-sm">Indoor Alternative</div>
                        <div className="text-gray-300 text-xs mt-1">Consider relocating event to controlled environment until conditions improve.</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats Bar */}
      <div className="glass-morphism rounded-2xl p-4 mt-6 border border-blue-400/30 bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-pink-950/40 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">TERRA</div>
            <div className="text-xs text-blue-200">Satellite Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">AQUA</div>
            <div className="text-xs text-purple-200">Satellite Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">MODIS</div>
            <div className="text-xs text-green-200">Sensor Online</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">GPM</div>
            <div className="text-xs text-yellow-200">Precipitation Data</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-400">POWER</div>
            <div className="text-xs text-pink-200">API Connected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">99.9%</div>
            <div className="text-xs text-cyan-200">Data Accuracy</div>
          </div>
        </div>
      </div>

      {/* Data Source Attribution */}
      <div className="mt-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-xs text-blue-300 font-mono">Data Sources:</span>
          <span className="text-xs text-gray-400">NASA POWER API</span>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-400">MODIS Terra & Aqua</span>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-400">GPM Satellite</span>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-400">Earth Science Division</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          Last Updated: {new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC • Refresh Rate: 2 seconds
        </div>
      </div>
    </div>
  );
};

// Demo wrapper to show the dashboard
const DemoWrapper = () => {
  const [scenario, setScenario] = useState('optimal');

  const scenarios = {
    optimal: {
      comfortScore: 92,
      location: "Kennedy Space Center, Florida",
      selectedDate: "2025-10-15",
      selectedTime: "Morning (6AM-12PM)",
      selectedProfile: { name: "Rocket Launch", icon: "🚀" }
    },
    moderate: {
      comfortScore: 65,
      location: "Mumbai, Maharashtra, India",
      selectedDate: "2025-10-20",
      selectedTime: "Afternoon (12PM-6PM)",
      selectedProfile: { name: "Cricket Match", icon: "🏏" }
    },
    critical: {
      comfortScore: 35,
      location: "Cherrapunji, Meghalaya, India",
      selectedDate: "2025-11-05",
      selectedTime: "Evening (6PM-11PM)",
      selectedProfile: { name: "Outdoor Concert", icon: "🎵" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      {/* Scenario Selector */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="glass-morphism rounded-2xl p-4 border border-blue-400/30 bg-black/30 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Satellite className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Select Demo Scenario:</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setScenario('optimal')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  scenario === 'optimal'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                🚀 Optimal (92%)
              </button>
              <button
                onClick={() => setScenario('moderate')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  scenario === 'moderate'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                ⚠️ Moderate (65%)
              </button>
              <button
                onClick={() => setScenario('critical')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  scenario === 'critical'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                🛑 Critical (35%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <WeatherDashboard {...scenarios[scenario]} />
    </div>
  );
};

export default DemoWrapper;