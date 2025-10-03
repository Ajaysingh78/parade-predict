import React, { useState } from "react";
import { auth } from "@/lib/firebase"; // Firebase config path
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Background3D from "@/components/Background3D";
import { Satellite, LogIn, UserPlus } from "lucide-react"; // 👈 added UserPlus
import CircularProgress from '@/components/CircularProgress';
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';

import Navbar from '@/components/Navbar';
import EnhancedControlPanel from '@/components/EnhancedControlPanel';


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
export default Signup;