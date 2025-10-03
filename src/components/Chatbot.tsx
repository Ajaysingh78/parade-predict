import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Satellite, Loader2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '🚀 Hello! I\'m your NASA Weather AI Assistant. Ask me anything about weather analysis, satellite data, or event planning!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Send message to Gemini API
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace 'YOUR_GEMINI_API_KEY' with your actual API key
      const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a NASA Weather AI Assistant specializing in meteorological analysis and event planning. Context: User is using SkySure, a NASA-grade weather comfort prediction system. Provide helpful, accurate weather-related advice. User question: ${input.trim()}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t process that. Please try again.';

      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: '⚠️ Connection error. Please check your API key or try again later.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <style>{`
        @keyframes chatbot-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes chatbot-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes chatbot-spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .chatbot-animate-slide-up {
          animation: chatbot-slide-up 0.3s ease-out;
        }

        .chatbot-animate-fade-in {
          animation: chatbot-fade-in 0.3s ease-out;
        }

        .chatbot-animate-spin-slow {
          animation: chatbot-spin-slow 3s linear infinite;
        }

        /* Custom Scrollbar for Chatbot */
        .chatbot-messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .chatbot-messages-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        .chatbot-messages-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>

      {/* Chat Button - Fixed Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
            
            {/* Button */}
            <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20">
              <MessageCircle className="w-8 h-8 text-white" />
              
              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
            </div>

            {/* AI Badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full px-2 py-1 text-xs font-bold text-white shadow-lg border border-white/30">
              AI
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm border border-white/20">
              Ask NASA AI Assistant
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] flex flex-col chatbot-animate-slide-up">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-2xl p-4 shadow-2xl border-2 border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30">
                    <Satellite className="w-5 h-5 text-white chatbot-animate-spin-slow" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    NASA Weather AI
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/90 font-medium">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stats Bar */}
            <div className="mt-3 flex items-center justify-around text-xs bg-white/10 backdrop-blur-sm rounded-lg py-2 border border-white/20">
              <div className="text-center">
                <div className="text-white font-bold">10K+</div>
                <div className="text-white/70">Queries</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-white font-bold">99.9%</div>
                <div className="text-white/70">Accuracy</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-white font-bold">&lt;1s</div>
                <div className="text-white/70">Response</div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-y-auto p-4 space-y-4 backdrop-blur-xl border-x-2 border-white/10 chatbot-messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} chatbot-animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-[75%] ${message.role === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border border-blue-400/30'
                        : 'bg-gray-800/90 backdrop-blur-sm text-white border border-gray-700/50'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 px-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start chatbot-animate-fade-in">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-sm text-gray-300">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-b-2xl p-4 border-2 border-t-0 border-white/10 shadow-2xl">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about weather, satellites, events..."
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm"
                  rows={1}
                  disabled={isLoading}
                  style={{ maxHeight: '80px' }}
                />
                <Sparkles className="absolute right-3 top-3 w-5 h-5 text-purple-400 opacity-50" />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {['Weather today?', 'Best event time?', 'Satellite data?'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 text-xs bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;