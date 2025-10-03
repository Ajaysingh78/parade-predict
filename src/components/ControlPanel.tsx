import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Activity, Star, Satellite, Zap } from 'lucide-react';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';
import EventProfileSelector from '@/components/EventProfileSelector';
import CircularProgress from '@/components/CircularProgress';

interface ControlPanelProps {
  location: string;
  setLocation: (loc: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedProfile: string;
  setSelectedProfile: (profile: string) => void;
  handleCheckWeather: () => void;
  showResults: boolean;
  comfortScore: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  location,
  setLocation,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedProfile,
  setSelectedProfile,
  handleCheckWeather,
  showResults,
  comfortScore
}) => {
  return (
    <div className="nasa-control-panel glass-morphism rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 max-w-6xl mx-auto shadow-2xl backdrop-blur-xl border border-blue-400/30 animate-scale-in bg-black/30">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">

        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">

          {/* Location */}
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

          {/* Date & Time */}
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

          {/* Profile */}
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

          {/* Analyze Button */}
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
  );
};

export default ControlPanel;
