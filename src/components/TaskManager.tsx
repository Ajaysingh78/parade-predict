import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Phone, 
  AlertTriangle, 
  CheckCircle, 
  PhoneCall,
  Plus,
  Trash2,
  X,
  PhoneIncoming,
  Volume2,
  AlertCircle,
  MapPin,
  Zap,
  Activity,
  Target,
  Shield,
  Star,
  Thermometer,
  Droplets,
  Wind,
  Brain
} from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Outdoor Wedding Ceremony',
      date: '2025-10-15',
      time: '18:00',
      location: 'Mumbai, India',
      priority: 'high',
      phoneNumber: '+91-9876543210',
      weatherThreshold: 60,
      weatherScore: 45,
      autoCallEnabled: true,
      aiConfidence: 92,
      temp: 28,
      humidity: 85,
      precipitation: 70,
      wind: 15
    },
    {
      id: 2,
      title: 'Corporate Tech Summit',
      date: '2025-10-12',
      time: '14:00',
      location: 'Bangalore, India',
      priority: 'medium',
      phoneNumber: '+91-9876543211',
      weatherThreshold: 70,
      weatherScore: 75,
      autoCallEnabled: true,
      aiConfidence: 88,
      temp: 24,
      humidity: 60,
      precipitation: 20,
      wind: 8
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showCallLogs, setShowCallLogs] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  
  const [newTask, setNewTask] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    priority: 'medium',
    phoneNumber: '',
    weatherThreshold: 60,
    autoCallEnabled: true
  });

  const callLogs = [
    {
      id: 1,
      taskTitle: 'Outdoor Wedding',
      phoneNumber: '+91-9876543210',
      timestamp: '2025-10-04 14:30',
      duration: '2:45',
      status: 'completed',
      weatherAlert: 'High precipitation risk - 70% rain chance',
      userResponse: 'Will reschedule to backup venue'
    },
    {
      id: 2,
      taskTitle: 'Marathon Event',
      phoneNumber: '+91-9876543212',
      timestamp: '2025-10-03 09:15',
      duration: '3:12',
      status: 'completed',
      weatherAlert: 'Extreme heat warning - 38°C expected',
      userResponse: 'Event postponed to next week'
    }
  ];

  const handleAddTask = () => {
    if (!newTask.title || !newTask.date || !newTask.time || !newTask.phoneNumber) {
      alert('Please fill all required fields');
      return;
    }

    const weatherScore = Math.floor(Math.random() * 100);
    const task = {
      id: tasks.length + 1,
      ...newTask,
      weatherScore,
      aiConfidence: Math.floor(85 + Math.random() * 15),
      temp: Math.floor(20 + Math.random() * 15),
      humidity: Math.floor(40 + Math.random() * 50),
      precipitation: Math.floor(Math.random() * 100),
      wind: Math.floor(5 + Math.random() * 20)
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      date: '',
      time: '',
      location: '',
      priority: 'medium',
      phoneNumber: '',
      weatherThreshold: 60,
      autoCallEnabled: true
    });
    setShowAddTask(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const triggerManualCall = (task) => {
    alert('AI Call Initiated for ' + task.phoneNumber);
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { gradient: 'from-red-500 to-pink-500', bg: 'bg-red-500/10', text: 'text-red-300' },
      medium: { gradient: 'from-yellow-500 to-orange-400', bg: 'bg-yellow-500/10', text: 'text-yellow-300' },
      low: { gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10', text: 'text-green-300' }
    };
    return configs[priority] || configs.medium;
  };

  const filteredTasks = filterPriority === 'all' ? tasks : tasks.filter(t => t.priority === filterPriority);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden py-8">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-blue-400/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Mission Control
                    </h1>
                    <p className="text-blue-300 text-sm font-medium mt-1 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      AI Weather Intelligence System
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-300">AI Online</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-400/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-blue-300">Weather API Active</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCallLogs(!showCallLogs)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl border border-purple-400/30 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-purple-300" />
                    <span className="font-bold text-purple-200">Call Logs</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowAddTask(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl shadow-xl group"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
                    <span className="font-bold text-white">New Mission</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-5 border border-blue-400/20">
                <Calendar className="w-5 h-5 text-blue-400 mb-2" />
                <div className="text-3xl font-black text-white">{tasks.length}</div>
                <div className="text-xs font-semibold text-blue-300">Active Missions</div>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-5 border border-red-400/20">
                <AlertTriangle className="w-5 h-5 text-red-400 mb-2 animate-pulse" />
                <div className="text-3xl font-black text-white">
                  {tasks.filter(t => t.weatherScore < t.weatherThreshold).length}
                </div>
                <div className="text-xs font-semibold text-red-300">Weather Alerts</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-5 border border-green-400/20">
                <PhoneCall className="w-5 h-5 text-green-400 mb-2" />
                <div className="text-3xl font-black text-white">{callLogs.length}</div>
                <div className="text-xs font-semibold text-green-300">Calls Made</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-5 border border-purple-400/20">
                <Target className="w-5 h-5 text-purple-400 mb-2" />
                <div className="text-3xl font-black text-white">97%</div>
                <div className="text-xs font-semibold text-purple-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span className="text-blue-200 text-sm font-semibold">Filter:</span>
          {['all', 'high', 'medium', 'low'].map(priority => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                filterPriority === priority
                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-blue-400/50'
                  : 'bg-white/5 text-blue-300 hover:bg-white/10'
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>

        {showCallLogs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-pink-900/90 backdrop-blur-2xl rounded-3xl p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto border border-purple-400/30">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl">
                    <PhoneCall className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white">AI Call History</h2>
                    <p className="text-purple-200 text-sm">Automated communications</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCallLogs(false)}
                  className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {callLogs.map((log) => (
                  <div key={log.id} className="bg-white/5 rounded-2xl p-6 border border-purple-400/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                          {log.taskTitle}
                          <Star className="w-4 h-4 text-yellow-400" />
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-blue-200">
                          <span>{log.phoneNumber}</span>
                          <span>•</span>
                          <span>{log.timestamp}</span>
                          <span>•</span>
                          <span>{log.duration}</span>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                        <span className="text-green-300 font-bold text-sm">✓ {log.status}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                        <div className="text-red-300 font-bold text-sm mb-1">Weather Alert:</div>
                        <p className="text-white text-sm">{log.weatherAlert}</p>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                        <div className="text-blue-300 font-bold text-sm mb-1">User Response:</div>
                        <p className="text-white text-sm">{log.userResponse}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showAddTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-2xl rounded-3xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-blue-400/30">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-white">Create Mission</h2>
                  <p className="text-blue-200 text-sm">Add event with AI monitoring</p>
                </div>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block font-semibold">Task Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full bg-white/10 border border-blue-400/30 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:border-blue-400 focus:outline-none"
                    placeholder="Outdoor Wedding Ceremony"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block font-semibold">Date *</label>
                    <input
                      type="date"
                      value={newTask.date}
                      onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                      className="w-full bg-white/10 border border-blue-400/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block font-semibold">Time *</label>
                    <input
                      type="time"
                      value={newTask.time}
                      onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                      className="w-full bg-white/10 border border-blue-400/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block font-semibold">Location *</label>
                  <input
                    type="text"
                    value={newTask.location}
                    onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                    className="w-full bg-white/10 border border-blue-400/30 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:border-blue-400 focus:outline-none"
                    placeholder="Mumbai, India"
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    value={newTask.phoneNumber}
                    onChange={(e) => setNewTask({...newTask, phoneNumber: e.target.value})}
                    className="w-full bg-white/10 border border-blue-400/30 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:border-blue-400 focus:outline-none"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block font-semibold">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full bg-white/10 border border-blue-400/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="low" className="bg-gray-900">Low</option>
                    <option value="medium" className="bg-gray-900">Medium</option>
                    <option value="high" className="bg-gray-900">High</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block font-semibold">
                    Weather Threshold: {newTask.weatherThreshold}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newTask.weatherThreshold}
                    onChange={(e) => setNewTask({...newTask, weatherThreshold: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-3 bg-blue-500/10 rounded-xl p-4 border border-blue-400/20">
                  <input
                    type="checkbox"
                    checked={newTask.autoCallEnabled}
                    onChange={(e) => setNewTask({...newTask, autoCallEnabled: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">Enable Auto-Call</div>
                    <div className="text-blue-200 text-xs">AI calls if weather uncertain</div>
                  </div>
                </div>

                <button
                  onClick={handleAddTask}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-bold text-lg"
                >
                  Create Mission
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {filteredTasks.map(task => {
            const config = getPriorityConfig(task.priority);
            const isAlert = task.weatherScore < task.weatherThreshold;
            
            return (
              <div
                key={task.id}
                className="bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`bg-gradient-to-r ${config.gradient} p-3 rounded-xl`}>
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{task.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-blue-200">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {task.date} at {task.time}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {task.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-bold">Weather Score</span>
                        <span className={`text-2xl font-black ${isAlert ? 'text-red-400' : 'text-green-400'}`}>
                          {task.weatherScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                        <div
                          className={`h-3 rounded-full ${isAlert ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                          style={{ width: task.weatherScore + '%' }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        <div className="text-center">
                          <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                          <div className="text-white text-sm font-bold">{task.temp}°C</div>
                          <div className="text-xs text-gray-400">Temp</div>
                        </div>
                        <div className="text-center">
                          <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                          <div className="text-white text-sm font-bold">{task.humidity}%</div>
                          <div className="text-xs text-gray-400">Humidity</div>
                        </div>
                        <div className="text-center">
                          <AlertCircle className="w-4 h-4 text-red-400 mx-auto mb-1" />
                          <div className="text-white text-sm font-bold">{task.precipitation}%</div>
                          <div className="text-xs text-gray-400">Rain</div>
                        </div>
                        <div className="text-center">
                          <Wind className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                          <div className="text-white text-sm font-bold">{task.wind}</div>
                          <div className="text-xs text-gray-400">km/h</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-400/20">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm font-mono">{task.phoneNumber}</span>
                      </div>
                      
                      {isAlert && task.autoCallEnabled && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-400/40 animate-pulse">
                          <PhoneIncoming className="w-4 h-4 text-red-400" />
                          <span className="text-red-300 text-sm font-bold">Call Scheduled</span>
                        </div>
                      )}
                      
                      <div className={`px-4 py-2 rounded-lg ${config.bg}`}>
                        <span className={`text-sm font-bold ${config.text}`}>{task.priority.toUpperCase()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-400/20">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-bold">{task.aiConfidence}% AI</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-3">
                    <button
                      onClick={() => triggerManualCall(task)}
                      disabled={!task.autoCallEnabled}
                      className={`flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex flex-col items-center justify-center ${
                        task.autoCallEnabled
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                          : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <PhoneCall className="w-5 h-5 mb-1" />
                      <span className="text-sm">Call</span>
                    </button>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-1 lg:flex-none px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl font-bold transition-all flex flex-col items-center justify-center"
                    >
                      <Trash2 className="w-5 h-5 mb-1" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>

                {isAlert && task.autoCallEnabled && (
                  <div className="mt-4 bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-red-400 animate-pulse" />
                      <div>
                        <div className="text-red-300 font-semibold text-sm mb-1">
                          Automated Call Scheduled
                        </div>
                        <div className="text-red-200 text-xs">
                          AI will call {task.phoneNumber} to notify about weather conditions
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-purple-400/20">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Volume2 className="w-6 h-6 text-purple-400" />
            n8n Automation Workflow
          </h3>
          
          <div className="space-y-4">
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-400/20">
              <div className="text-purple-300 font-semibold mb-3">How AI Calling Works:</div>
              <ol className="text-sm text-white space-y-2 list-decimal list-inside">
                <li>Weather API monitors comfort scores continuously</li>
                <li>When score drops below threshold, n8n workflow triggers</li>
                <li>AI agent initiates call using Twilio/VoIP service</li>
                <li>Conversational AI informs user about conditions</li>
                <li>User responds via voice to reschedule/proceed</li>
                <li>System logs call and updates task status</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/20">
                <div className="text-blue-400 font-semibold mb-2">Voice Provider</div>
                <div className="text-white">Twilio / Vonage</div>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-400/20">
                <div className="text-green-400 font-semibold mb-2">AI Engine</div>
                <div className="text-white">OpenAI GPT-4</div>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-400/20">
                <div className="text-orange-400 font-semibold mb-2">Automation</div>
                <div className="text-white">n8n Workflow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;