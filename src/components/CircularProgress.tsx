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
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Glow Effect Background */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full opacity-30 blur-xl",
          getGlowClass()
        )}
        style={{ 
          width: size, 
          height: size,
        }}
      />
      
      {/* SVG Progress Ring */}
      <svg
        width={size}
        height={size}
        className="progress-ring"
        style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))' }}
      >
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
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(getStrokeColor(), "transition-all duration-1000 ease-out")}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 0 8px ${animatedScore >= 70 ? 'hsl(var(--success))' : animatedScore >= 40 ? 'hsl(var(--warning))' : 'hsl(var(--danger))'})`,
          }}
        />
      </svg>

      {/* Score Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className={cn(
          "text-5xl font-heading font-bold transition-all duration-300",
          getScoreColor()
        )}>
          {animatedScore}
        </div>
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Comfort Score
        </div>
        <div className="mt-2 px-3 py-1 rounded-full glass-card text-xs font-medium">
          {animatedScore >= 70 ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Perfect Day
            </span>
          ) : animatedScore >= 40 ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-warning rounded-full"></span>
              Plan Backup
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-danger rounded-full"></span>
              Reschedule
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;