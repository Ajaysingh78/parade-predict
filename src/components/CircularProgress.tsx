import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  animated?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 200,
  strokeWidth = 12,
  className,
  animated = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = score / 60; // Animation duration: 1 second
        const interval = setInterval(() => {
          current += increment;
          if (current >= score) {
            current = score;
            clearInterval(interval);
          }
          setAnimatedScore(Math.round(current));
        }, 16); // 60fps
        
        return () => clearInterval(interval);
      }, 500); // Start animation after 500ms
      
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(score);
    }
  }, [score, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = () => {
    if (animatedScore >= 70) return 'text-success';
    if (animatedScore >= 40) return 'text-warning';
    return 'text-danger';
  };

  const getStrokeColor = () => {
    if (animatedScore >= 70) return 'stroke-success';
    if (animatedScore >= 40) return 'stroke-warning';
    return 'stroke-danger';
  };

  const getGlowClass = () => {
    if (animatedScore >= 70) return 'comfort-perfect';
    if (animatedScore >= 40) return 'comfort-good';
    return 'comfort-poor';
  };

  return (
    <div className={cn("relative flex items-center justify-center perspective-1000", className)}>
      {/* Orbital rings around the main progress */}
      <div className="absolute inset-0 animate-earth-rotate opacity-20">
        <svg width={size + 60} height={size + 60} className="absolute -top-8 -left-8">
          <circle
            cx={(size + 60) / 2}
            cy={(size + 60) / 2}
            r={(size + 60 - 4) / 2}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            strokeDasharray="8,8"
            opacity={0.4}
          />
        </svg>
      </div>

      {/* Satellite indicators orbiting */}
      <div className="absolute inset-0">
        <div className="orbital-container w-full h-full">
          <div className="satellite-path animate-satellite-orbit bg-primary" />
        </div>
        <div className="orbital-container w-5/6 h-5/6 absolute top-4 left-4">
          <div 
            className="satellite-path animate-satellite-orbit bg-secondary"
            style={{ animationDelay: '3s', animationDuration: '10s' }}
          />
        </div>
      </div>

      {/* Glow Effect Background with enhanced NASA styling */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full opacity-40 blur-xl space-card animate-pulse-glow",
          getGlowClass()
        )}
        style={{ 
          width: size, 
          height: size,
        }}
      />
      
      {/* SVG Progress Ring with holographic effects */}
      <svg
        width={size}
        height={size}
        className="progress-ring animate-hologram-flicker"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.4))' }}
      >
        {/* Outer glow ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 8}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="transparent"
          opacity={0.3}
          className="animate-pulse-glow"
        />

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.2}
        />
        
        {/* Progress Circle with enhanced animation */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#nasaGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1500 ease-out"
          style={{
            filter: `drop-shadow(0 0 15px ${animatedScore >= 70 ? 'hsl(var(--success))' : animatedScore >= 40 ? 'hsl(var(--warning))' : 'hsl(var(--danger))'})`,
          }}
        />

        {/* Enhanced gradient with color animation */}
        <defs>
          <linearGradient id="nasaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={animatedScore >= 70 ? 'hsl(var(--success))' : animatedScore >= 40 ? 'hsl(var(--warning))' : 'hsl(var(--danger))'} stopOpacity="1">
              <animate attributeName="stop-opacity" 
                values="1;0.7;1" 
                dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8">
              <animate attributeName="stop-color" 
                values="hsl(var(--primary));hsl(var(--secondary));hsl(var(--tertiary));hsl(var(--primary))" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor={animatedScore >= 70 ? 'hsl(var(--success))' : animatedScore >= 40 ? 'hsl(var(--warning))' : 'hsl(var(--danger))'} stopOpacity="1">
              <animate attributeName="stop-opacity" 
                values="1;0.9;1" 
                dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Enhanced Score Display with 3D effects */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center transform-3d">
        <div className="animate-scale-in-3d">
          <div className={cn(
            "text-5xl font-heading font-bold transition-all duration-300 text-glow animate-hologram-flicker",
            getScoreColor()
          )}>
            {animatedScore}
          </div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Comfort Score
          </div>
          <div className="px-3 py-1 rounded-full glass-card text-xs font-medium holographic-border">
            {animatedScore >= 70 ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></span>
                Perfect Day
              </span>
            ) : animatedScore >= 40 ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-warning rounded-full animate-pulse-glow"></span>
                Plan Backup
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-danger rounded-full animate-pulse-glow"></span>
                Reschedule
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Data points orbiting around */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-satellite-orbit opacity-70"
            style={{
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularProgress;