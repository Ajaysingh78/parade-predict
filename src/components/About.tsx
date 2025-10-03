import React, { useEffect } from 'react';
import { ArrowLeft, FileText, MapPin, Users, Rocket, Building2, Globe2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    { name: 'Aman  kumar', role: 'Project Lead & AI Specialist' },
    { name: 'Ajay Rathore ', role: 'Frontend Developer' },
    { name: 'Omprakash Meena', role: 'Backend Developer' },
    { name: 'Anuradha ', role: 'UI/UX Designer' },
    { name: 'Rudraksha Mishra', role: 'Data Scientist' },
    { name: 'Aniket kumar', role: 'DevOps Engineer' }
  ];

  const offices = [
    {
      title: 'The Heart of Space Innovation: NASA Headquarters',
      location: 'Washington D.C., USA',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      description: 'Welcome to the NASA Headquarters, the epicenter of humanity\'s journey into the cosmos. Nestled in the vibrant city of Washington, D.C., NASA\'s headquarters plays a pivotal role in advancing space exploration, scientific discovery, and shaping the future of space travel. As you explore our platform, you\'ll discover how NASA Headquarters serves as the gateway to the stars. It is here that key decisions are made, missions are planned, and breakthrough technologies are developed.'
    },
    {
      title: 'India\'s Space Travel Center',
      location: 'ISRO Headquarters, Bangalore',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      description: 'Nestled in the vibrant city of Bangalore, India\'s Space Research Organization is a pioneering initiative that\'s redefining space exploration. This visionary endeavor opens the doors of the universe to all. It\'s where dreams of venturing beyond our world become reality, inviting people from around the globe to experience the marvels of space. Welcome to a future where the stars are within reach for every adventurer and explorer.'
    },
    {
      title: 'Australia\'s Space Travel Center',
      location: 'Australian Space Agency, Adelaide',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
      description: 'Amidst the breathtaking landscapes of Australia, a new era in space exploration is unfolding at the Australian Space Travel Center. Spearheaded by visionary leaders and cutting-edge technology, this center is set to become the ultimate gateway to the cosmos. From the heart of Australia\'s stunning outback, we invite you to embark on journeys beyond Earth\'s atmosphere.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-blue-400 animate-bounce" />
              <span className="text-blue-300 font-mono text-sm tracking-widest">NASA SPACE APPS CHALLENGE 2025</span>
              <Rocket className="w-8 h-8 text-blue-400 animate-bounce" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                About SkySure
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Pioneering the Future of Weather Intelligence
            </p>

            <Button
              onClick={() => document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-white/20"
            >
              <FileText className="w-5 h-5 mr-2" />
              View Brochure
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Company Section */}
      <section id="company" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="glass-morphism rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-blue-400/30 bg-gradient-to-br from-black/50 to-blue-950/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Our Company
                </h2>
              </div>

              <div className="space-y-6 text-lg text-blue-100 leading-relaxed">
                <p>
                  Founded in 2025 as part of the <span className="text-blue-400 font-semibold">NASA Space Apps Challenge</span>, SkySure is a revolutionary weather intelligence platform dedicated to providing transformative and accurate weather comfort predictions.
                </p>
                <p>
                  Our mission is to make advanced meteorological analysis accessible to everyone, fostering a new era of weather-aware event planning and outdoor activity optimization. We leverage NASA's Earth observation satellites, POWER API, and cutting-edge machine learning to deliver unprecedented accuracy.
                </p>
                <p className="text-xl font-semibold text-white">
                  We are not just a platform; we are the gateway to weather intelligence, offering a visually stunning and scientifically accurate weather prediction experience powered by space technology.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-blue-400/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2025</div>
                  <div className="text-sm text-blue-200">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
                  <div className="text-sm text-purple-200">Predictions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">99.9%</div>
                  <div className="text-sm text-pink-200">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-purple-300 font-mono text-sm tracking-widest">SPACE STALKERS TEAM</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
            <p className="text-xl text-purple-200">The brilliant minds behind SkySure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group glass-morphism rounded-2xl p-6 backdrop-blur-xl border border-purple-400/30 bg-gradient-to-br from-black/50 to-purple-950/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/20">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-purple-200">{member.role}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-purple-400/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-purple-300">TEAM MEMBER</span>
                  <Sparkles className="w-4 h-4 text-pink-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe2 className="w-8 h-8 text-blue-400" />
              <span className="text-blue-300 font-mono text-sm tracking-widest">GLOBAL PRESENCE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Our Offices
              </span>
            </h2>
            <p className="text-xl text-blue-200">Powered by space agencies worldwide</p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <div
                key={office.title}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="glass-morphism rounded-2xl overflow-hidden border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                    <img
                      src={office.image}
                      alt={office.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="glass-morphism rounded-2xl p-8 backdrop-blur-xl border border-blue-400/30 bg-gradient-to-br from-black/50 to-blue-950/30">
                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-mono">{office.location}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {office.title}
                    </h3>
                    
                    <p className="text-blue-100 leading-relaxed">
                      {office.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-blue-400/20 flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300">OPERATIONAL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-blue-300">LIVE DATA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-morphism rounded-3xl p-12 backdrop-blur-xl border border-purple-400/30 bg-gradient-to-br from-black/50 via-purple-950/30 to-pink-950/30">
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-bounce" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                  Ready to Experience Weather Intelligence?
                </span>
              </h2>
              
              <p className="text-xl text-purple-200 mb-8">
                Join thousands of users who trust SkySure for accurate, NASA-powered weather predictions
              </p>

              <Button
                onClick={onBack}
                className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 border-2 border-white/20"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .bg-grid-white {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default About;