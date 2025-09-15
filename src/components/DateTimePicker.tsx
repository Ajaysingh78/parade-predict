import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Sun, Sunset, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  className?: string;
}

const timeSlots = [
  { id: 'morning', label: 'Morning', icon: Sun, time: '06:00-12:00', description: 'Cool & Fresh' },
  { id: 'afternoon', label: 'Afternoon', icon: Sun, time: '12:00-17:00', description: 'Peak Heat' },
  { id: 'evening', label: 'Evening', icon: Sunset, time: '17:00-20:00', description: 'Golden Hour' },
  { id: 'night', label: 'Night', icon: Moon, time: '20:00-06:00', description: 'Cool & Calm' },
];

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  className,
}) => {
  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-IN', { month: 'short' }),
        isToday: i === 0,
      });
    }
    return days;
  };

  const days = getNextDays();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Date Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Select Date
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => onDateChange(day.date)}
              className={cn(
                "p-3 rounded-xl text-center transition-all duration-300 group",
                "glass-card border-2",
                selectedDate === day.date
                  ? "border-primary bg-primary/10 shadow-glow-primary text-primary"
                  : "border-transparent hover:border-primary/30 hover:bg-primary/5 text-foreground"
              )}
            >
              <div className="text-xs font-medium mb-1 text-muted-foreground">
                {day.dayName}
              </div>
              <div className={cn(
                "text-lg font-bold font-heading transition-colors",
                day.isToday && "text-secondary"
              )}>
                {day.dayNumber}
              </div>
              <div className="text-xs text-muted-foreground">
                {day.month}
              </div>
              {day.isToday && (
                <div className="mt-1 w-2 h-2 bg-secondary rounded-full mx-auto"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Select Time
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            const isSelected = selectedTime === slot.id;
            
            return (
              <button
                key={slot.id}
                onClick={() => onTimeChange(slot.id)}
                className={cn(
                  "p-4 rounded-xl text-center transition-all duration-300 group",
                  "glass-card border-2",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-glow-primary"
                    : "border-transparent hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 mx-auto mb-2 transition-colors",
                  isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                
                <div className={cn(
                  "font-medium mb-1 transition-colors",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {slot.label}
                </div>
                
                <div className="text-xs text-muted-foreground mb-1">
                  {slot.time}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {slot.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;