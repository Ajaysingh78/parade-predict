import React from 'react';

export const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Orbital Paths */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="orbital-container w-96 h-96">
          <div className="satellite-path animate-satellite-orbit" />
        </div>
        <div className="orbital-container w-80 h-80 absolute top-8 left-8">
          <div 
            className="satellite-path animate-satellite-orbit bg-secondary"
            style={{ animationDelay: '5s', animationDuration: '12s' }}
          />
        </div>
        <div className="orbital-container w-64 h-64 absolute top-16 left-16">
          <div 
            className="satellite-path animate-satellite-orbit bg-tertiary"
            style={{ animationDelay: '10s', animationDuration: '8s' }}
          />
        </div>
      </div>

      {/* Meteor Shower */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-white to-transparent animate-meteor-shower"
            style={{
              left: `${20 + i * 30}%`,
              top: '10%',
              animationDelay: `${i * 2}s`,
              transform: 'rotate(45deg)',
            }}
          />
        ))}
      </div>

      {/* Data Streams */}
      <div className="absolute right-10 top-1/4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 h-16 bg-gradient-to-t from-primary to-transparent animate-data-stream ml-2"
            style={{
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Holographic Grid */}
      <div className="absolute inset-0 nasa-grid opacity-20" />

      {/* Radar Sweep */}
      <div className="absolute bottom-10 right-10 w-32 h-32">
        <div className="relative w-full h-full border border-primary/30 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/60 animate-radar-sweep" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Floating Space Debris */}
      <div className="absolute top-20 left-20">
        <div className="w-3 h-3 bg-secondary/60 rounded animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-40 right-32">
        <div className="w-2 h-2 bg-tertiary/60 rounded animate-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="absolute bottom-32 left-40">
        <div className="w-4 h-4 bg-primary/60 rounded animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};