import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface WeatherRiskCardProps {
  icon: LucideIcon;
  title: string;
  risk: number;
  description: string;
  details: string;
  className?: string;
}

const WeatherRiskCard: React.FC<WeatherRiskCardProps> = ({
  icon: Icon,
  title,
  risk,
  description,
  details,
  className,
}) => {
  const getRiskLevel = () => {
    if (risk < 30) return 'low';
    if (risk < 60) return 'medium';
    return 'high';
  };

  const getRiskColor = () => {
    const level = getRiskLevel();
    switch (level) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-danger bg-danger/10 border-danger/20';
      default: return 'text-muted bg-muted/10 border-muted/20';
    }
  };

  const getIconColor = () => {
    const level = getRiskLevel();
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn(
      "flip-card group cursor-pointer h-48",
      className
    )}>
      <div className="flip-card-inner relative w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front absolute inset-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border transition-all duration-300 group-hover:shadow-premium">
          <div className={cn(
            "p-3 rounded-full mb-4",
            getRiskColor()
          )}>
            <Icon className={cn("w-8 h-8", getIconColor())} />
          </div>
          
          <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className={cn(
              "text-2xl font-bold",
              getIconColor()
            )}>
              {risk}%
            </div>
            <span className="text-sm text-muted-foreground">risk</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {description}
          </p>

          {/* Risk Level Indicator */}
          <div className="mt-4 w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                getRiskLevel() === 'low' ? 'bg-success' : 
                getRiskLevel() === 'medium' ? 'bg-warning' : 'bg-danger'
              )}
              style={{ width: `${risk}%` }}
            />
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back absolute inset-0 glass-premium rounded-2xl p-6 border">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Icon className={cn("w-6 h-6", getIconColor())} />
              <h4 className="font-heading font-semibold text-foreground">
                {title} Details
              </h4>
            </div>
            
            <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
              {details}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Risk Level
                </span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  getRiskColor()
                )}>
                  {getRiskLevel().toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherRiskCard;