import React, { useState } from "react";
import { auth } from "@/lib/firebase"; // Firebase config path
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Background3D from "@/components/Background3D";
import { Satellite, LogIn } from "lucide-react";
import CircularProgress from '@/components/CircularProgress';
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';

import Navbar from '@/components/Navbar';
import EnhancedControlPanel from '@/components/EnhancedControlPanel';

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
            New to the mission?{" "}
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

export default Login;   // 👈 ye line missing thi
