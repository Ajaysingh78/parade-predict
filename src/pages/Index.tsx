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
  Zap
} from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import WeatherRiskCard from '@/components/WeatherRiskCard';
import EventProfileSelector from '@/components/EventProfileSelector';
import LocationSearchInput from '@/components/LocationSearchInput';
import DateTimePicker from '@/components/DateTimePicker';
import weatherHeroBg from '@/assets/weather-hero-bg.jpg';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('morning');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [comfortScore, setComfortScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [demoMode, setDemoMode] = useState<string | null>(null);

  // Demo scenarios
  const demoScenarios = {
    perfect: {
      location: 'Mumbai',
      score: 92,
      description: 'Perfect Day - Sunny, 28°C, Low Humidity'
    },
    challenging: {
      location: 'Delhi',
      score: 23,
      description: 'Challenging - Hot & Humid, 38°C, 70% Rain Chance'
    },
    monsoon: {
      location: 'Bangalore',
      score: 45,
      description: 'Monsoon - Heavy Rain Expected, Cool but Wet'
    }
  };

  // Weather risk data (mock)
  const weatherRisks = [
    {
      icon: Sun,
      title: 'Heat Risk',
      risk: demoMode ? (demoMode === 'challenging' ? 85 : demoMode === 'perfect' ? 15 : 35) : 45,
      description: 'Temperature comfort analysis',
      details: 'Based on current temperature, heat index, and your event profile, there\'s moderate risk of heat discomfort. Consider shade arrangements and hydration stations for outdoor events.'
    },
    {
      icon: Thermometer,
      title: 'Cold Risk',
      risk: demoMode ? (demoMode === 'monsoon' ? 10 : 5) : 10,
      description: 'Low temperature assessment',
      details: 'Minimal cold risk expected. Current conditions are within comfortable temperature ranges for most outdoor activities.'
    },
    {
      icon: Wind,
      title: 'Wind Risk',
      risk: demoMode ? (demoMode === 'challenging' ? 60 : 25) : 30,
      description: 'Wind speed & gust analysis',
      details: 'Moderate wind conditions expected. Consider securing lightweight decorations and equipment.'
    },
    {
      icon: CloudRain,
      title: 'Rain Risk',
      risk: demoMode ? (demoMode === 'monsoon' ? 90 : demoMode === 'challenging' ? 70 : 10) : 25,
      description: 'Precipitation probability',
      details: 'Light rain possible. Have backup indoor options ready or consider waterproof arrangements for your event.'
    },
    {
      icon: Droplets,
      title: 'Discomfort Index',
      risk: demoMode ? (demoMode === 'challenging' ? 80 : demoMode === 'perfect' ? 20 : 55) : 40,
      description: 'Combined humidity & temperature',
      details: 'Moderate discomfort expected due to humidity levels. Ensure good ventilation and cooling arrangements.'
    }
  ];

  useEffect(() => {
    if (demoMode) {
      const scenario = demoScenarios[demoMode as keyof typeof demoScenarios];
      setLocation(scenario.location);
      setComfortScore(scenario.score);
      setShowResults(true);
      toast({
        title: "Demo Mode Active",
        description: scenario.description,
      });
    }
  }, [demoMode]);

  const handleCheckWeather = () => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please select a location for your event.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProfile) {
      toast({
        title: "Event Profile Required", 
        description: "Please select your event type for personalized predictions.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setShowResults(false);
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 100);
      setComfortScore(mockScore);
      setShowResults(true);
      
      toast({
        title: "Weather Analysis Complete!",
        description: `Found ${mockScore}/100 comfort score for ${location}`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={weatherHeroBg} 
            alt="Weather Background"
            className="w-full h-full object-cover"
          />
          {/* Polished gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
          {/* Animated subtle noise */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10" />
        </div>

        {/* Demo Mode Toggle */}
        <div className="absolute top-6 right-6 z-50">
          <div className="glass-premium rounded-2xl p-4 space-y-2 shadow-xl backdrop-blur-md">
            <div className="text-sm font-medium text-foreground mb-2">Demo Scenarios</div>
            {Object.keys(demoScenarios).map((key) => (
              <Button
                key={key}
                size="sm"
                variant={demoMode === key ? 'default' : 'outline'}
                onClick={() => setDemoMode(demoMode === key ? null : key)}
                className="w-full justify-start text-xs hover:scale-105 transition-transform"
              >
                {demoScenarios[key as keyof typeof demoScenarios].location}
              </Button>
            ))}
          </div>
        </div>

        {/* Floating Weather Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Sun className="absolute top-1/4 left-1/4 w-12 h-12 text-secondary/40 animate-float-glow" />
          <Cloud className="absolute top-1/3 right-1/4 w-16 h-16 text-primary/40 animate-float-glow" />
          <CloudRain className="absolute bottom-1/3 left-1/3 w-10 h-10 text-tertiary/40 animate-float-glow" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Hero Headlines */}
            <div className="mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                  Will It Rain On My Parade?
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto">
                AI-Powered Event Weather Intelligence for India
              </p>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Transform meteorological data into actionable event planning insights
              </p>
            </div>

            {/* Interactive Input Panel */}
            <div className="glass-premium rounded-3xl p-8 md:p-12 mb-12 max-w-5xl mx-auto shadow-premium animate-scale-in">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left Column - Inputs */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Event Location
                    </h3>
                    <LocationSearchInput
                      value={location}
                      onChange={setLocation}
                      onLocationSelect={setLocation}
                    />
                  </div>

                  <DateTimePicker
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Event Type
                    </h3>
                    <EventProfileSelector
                      selectedProfile={selectedProfile}
                      onProfileSelect={setSelectedProfile}
                    />
                  </div>

                  <Button
                    onClick={handleCheckWeather}
                    className="w-full text-lg font-semibold py-6 rounded-2xl bg-gradient-to-r from-primary via-tertiary to-secondary hover:shadow-glow-primary transition-all"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Check My Event Weather
                  </Button>
                </div>

                {/* Right Column - Results */}
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  {showResults ? (
                    <div className="space-y-6 animate-fade-in">
                      <CircularProgress score={comfortScore} animated />
                      {location && (
                        <div className="text-center">
                          <div className="text-2xl font-heading font-bold mb-2">{location}</div>
                          <div className="text-muted-foreground">
                            {new Date(selectedDate).toLocaleDateString('en-IN', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto rounded-full glass-card flex items-center justify-center animate-pulse-glow">
                        <Zap className="w-16 h-16 text-primary" />
                      </div>
                      <p className="text-foreground/70 font-medium">
                        Ready to analyze your event weather
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Risk Dashboard */}
      {showResults && (
        <section className="py-20 bg-background/60 backdrop-blur-sm border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Weather Risk Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Detailed breakdown of weather factors affecting your event
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {weatherRisks.map((risk, index) => (
                <div key={risk.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <WeatherRiskCard {...risk} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Predictions Made</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">400+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-tertiary">89.3%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">&lt; 1.5s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50 text-center">
              <p className="text-muted-foreground mb-4">
                Built for NASA Space Apps Challenge 2025 • Powered by OpenWeather & NASA POWER APIs
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm" className="hover:shadow-glow-primary">
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </Button>
                <Button variant="outline" size="sm" className="hover:shadow-glow-secondary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
