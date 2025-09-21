import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

export const AnimatedFloatingElements = () => {
  const weatherIcons = [
    { Icon: Sun, color: 'text-yellow-400', delay: '0s', position: { top: '20%', left: '15%' } },
    { Icon: Cloud, color: 'text-blue-300', delay: '2s', position: { top: '30%', right: '20%' } },
    { Icon: CloudRain, color: 'text-blue-500', delay: '4s', position: { bottom: '30%', left: '25%' } },
    { Icon: Wind, color: 'text-gray-400', delay: '1s', position: { top: '50%', right: '15%' } },
    { Icon: Thermometer, color: 'text-red-400', delay: '3s', position: { bottom: '40%', right: '30%' } },
    { Icon: Droplets, color: 'text-blue-400', delay: '5s', position: { top: '60%', left: '10%' } },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {weatherIcons.map(({ Icon, color, delay, position }, index) => (
        <div
          key={index}
          className="absolute transform-3d"
          style={{...position}}
        >
          <div 
            className={`${color} opacity-20 animate-float transform-3d`}
            style={{ 
              animationDelay: delay,
              animationDuration: '6s',
            }}
          >
            <Icon size={48} />
          </div>
        </div>
      ))}

      {/* Holographic Weather Data Points */}
      <div className="absolute top-1/4 left-1/3 animate-hologram-flicker">
        <div className="space-card p-3 text-xs text-primary/80">
          <div>28°C</div>
          <div>Humidity: 65%</div>
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/4 animate-hologram-flicker" style={{ animationDelay: '1s' }}>
        <div className="space-card p-3 text-xs text-secondary/80">
          <div>Wind: 12 km/h</div>
          <div>Pressure: 1013 hPa</div>
        </div>
      </div>

      {/* Matrix-style data streams */}
      <div className="absolute left-5 top-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="text-primary/30 text-xs font-mono animate-matrix-rain"
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${i * 20}px`,
            }}
          >
            {['01011010', '11001100', '10101010'][i]}
          </div>
        ))}
      </div>
    </div>
  );
};