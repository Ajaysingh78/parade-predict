import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect: (location: string) => void;
  className?: string;
}

const indianCities = [
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Surat', state: 'Gujarat' },
  { name: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Kanpur', state: 'Uttar Pradesh' },
  { name: 'Nagpur', state: 'Maharashtra' },
  { name: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Thane', state: 'Maharashtra' },
  { name: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  { name: 'Patna', state: 'Bihar' },
  { name: 'Vadodara', state: 'Gujarat' },
  { name: 'Ghaziabad', state: 'Uttar Pradesh' },
];

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  value,
  onChange,
  onLocationSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState(indianCities);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    
    if (inputValue.length > 0) {
      const filtered = indianCities.filter(city =>
        city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        city.state.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsOpen(true);
    } else {
      setFilteredCities(indianCities);
      setIsOpen(false);
    }
  };

  const handleCitySelect = (cityName: string) => {
    onChange(cityName);
    onLocationSelect(cityName);
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          const mockCity = 'Mumbai'; // Mock current location
          onChange(mockCity);
          onLocationSelect(mockCity);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <MapPin className="w-5 h-5" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => value.length > 0 && setIsOpen(true)}
          placeholder="Search Indian cities..."
          className={cn(
            "w-full pl-12 pr-12 py-4 glass-card rounded-2xl border-2 border-transparent",
            "focus:border-primary focus:outline-none focus:shadow-glow-primary",
            "placeholder:text-muted-foreground text-foreground font-medium",
            "transition-all duration-300"
          )}
        />
        
        <Button
          onClick={handleCurrentLocation}
          size="sm"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/10 hover:text-primary"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-premium rounded-2xl border shadow-premium z-50 max-h-64 overflow-y-auto">
          {filteredCities.slice(0, 8).map((city, index) => (
            <div
              key={`${city.name}-${city.state}`}
              onClick={() => handleCitySelect(city.name)}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer transition-colors duration-200",
                "hover:bg-primary/10 hover:text-primary",
                "first:rounded-t-2xl last:rounded-b-2xl",
                index > 0 && "border-t border-border/50"
              )}
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium text-foreground">{city.name}</div>
                <div className="text-sm text-muted-foreground">{city.state}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LocationSearchInput;