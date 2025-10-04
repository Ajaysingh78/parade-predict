import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Rocket, 
  Home, 
  Compass, 
  Info, 
  Mail, 
  LogIn, 
  UserPlus, 
  User, 
  LogOut,
  Calendar
} from 'lucide-react';

const Navbar = ({ user, onLoginClick, onSignupClick, onLogout, currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'taskmanager', label: 'Task Manager', icon: Calendar },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism backdrop-blur-xl border-b border-blue-400/30 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SkySure
              </h1>
              <p className="text-[10px] md:text-xs text-blue-300 font-mono -mt-1">NASA POWERED</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/50 shadow-lg shadow-blue-500/20' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="glass-morphism px-4 py-2 rounded-full border border-green-400/30 bg-green-500/20">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm font-mono max-w-[120px] truncate">
                      {user}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="glass-morphism border-red-400/50 text-red-300 hover:bg-red-500/20 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={onLoginClick}
                  variant="outline"
                  size="sm"
                  className="glass-morphism border-blue-400/50 text-blue-300 hover:bg-blue-500/20 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={onSignupClick}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50"
                  size="sm"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass-morphism p-2 rounded-lg border border-blue-400/30 text-blue-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism border-t border-blue-400/30 bg-black/50 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/50' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-blue-400/20 space-y-3">
              {user ? (
                <>
                  <div className="glass-morphism px-4 py-3 rounded-lg border border-green-400/30 bg-green-500/20">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 text-sm font-mono truncate">
                        {user}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full glass-morphism border-red-400/50 text-red-300 hover:bg-red-500/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full glass-morphism border-blue-400/50 text-blue-300 hover:bg-blue-500/20"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      onSignupClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;