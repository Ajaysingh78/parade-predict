import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Trophy, Heart, PartyPopper, Settings } from 'lucide-react';

interface EventProfile {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  theme: string;
  gradientFrom: string;
  gradientTo: string;
}

const eventProfiles: EventProfile[] = [
  {
    id: 'cricket',
    name: 'Cricket Match',
    icon: Trophy,
    description: 'Outdoor sports event with sun exposure',
    theme: 'sporty',
    gradientFrom: 'from-tertiary/20',
    gradientTo: 'to-primary/20',
  },
  {
    id: 'wedding',
    name: 'Wedding Event',
    icon: Heart,
    description: 'Elegant celebration requiring perfect conditions',
    theme: 'elegant',
    gradientFrom: 'from-secondary/20',
    gradientTo: 'to-warning/20',
  },
  {
    id: 'festival',
    name: 'Festival',
    icon: PartyPopper,
    description: 'Cultural celebration with crowds',
    theme: 'vibrant',
    gradientFrom: 'from-primary/20',
    gradientTo: 'to-secondary/20',
  },
  {
    id: 'custom',
    name: 'Custom Profile',
    icon: Settings,
    description: 'Personalize your weather preferences',
    theme: 'tech',
    gradientFrom: 'from-muted/20',
    gradientTo: 'to-accent/20',
  },
];

interface EventProfileSelectorProps {
  selectedProfile: string | null;
  onProfileSelect: (profileId: string) => void;
  className?: string;
}

const EventProfileSelector: React.FC<EventProfileSelectorProps> = ({
  selectedProfile,
  onProfileSelect,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {eventProfiles.map((profile) => {
        const Icon = profile.icon;
        const isSelected = selectedProfile === profile.id;
        
        return (
          <div
            key={profile.id}
            onClick={() => onProfileSelect(profile.id)}
            className={cn(
              "relative group cursor-pointer transition-all duration-300",
              "interactive-card"
            )}
          >
            <div className={cn(
              "glass-card rounded-2xl p-6 text-center border-2 transition-all duration-300",
              isSelected 
                ? "border-primary shadow-glow-primary bg-primary/5" 
                : "border-transparent hover:border-primary/30 hover:shadow-card",
              `bg-gradient-to-br ${profile.gradientFrom} ${profile.gradientTo}`
            )}>
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                  <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                </div>
              )}
              
              {/* Icon Container */}
              <div className={cn(
                "mx-auto mb-4 p-3 rounded-full transition-all duration-300",
                isSelected 
                  ? "bg-primary/20 text-primary shadow-glow-primary" 
                  : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <Icon className="w-8 h-8" />
              </div>
              
              {/* Profile Info */}
              <h3 className={cn(
                "font-heading font-semibold mb-2 transition-colors duration-300",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {profile.name}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
              
              {/* Hover Indicator */}
              <div className={cn(
                "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-2xl transition-all duration-300",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              )} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventProfileSelector;