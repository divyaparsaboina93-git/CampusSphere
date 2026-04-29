import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth, useData } from '../../lib/context';
import { CyberpunkCard } from '../shared/CyberpunkCard';
import { GlowButton } from '../shared/GlowButton';
import { EventDetailsModal } from './EventDetailsModal';
import { Event } from '../../lib/mockData';

interface StudentHomeProps {
  searchQuery: string;
}

export function StudentHome({ searchQuery }: StudentHomeProps) {
  const { student } = useAuth();
  const { events } = useData();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const upcomingEvents = events
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recommendedEvents = upcomingEvents.filter(
    e => e.college === student?.college || e.openTo === 'all'
  );

  const filteredEvents = searchQuery
    ? upcomingEvents.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.college.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : upcomingEvents;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-2">
          <span className="text-white">Welcome back, </span>
          <span className="gradient-text-cyan-magenta">{student?.name.split(' ')[0]}</span>
        </h1>
        <p className="text-[#C5C6C7]">Discover exciting events and connect with clubs</p>
      </motion.div>

      {/* Featured/Trending Events Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#FF00FF]" />
          <h2 className="text-2xl text-white">Featured Events</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <CyberpunkCard glowColor={index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'magenta' : 'purple'}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.poster}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/50 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-[#00FFFF]/20 backdrop-blur-sm border border-[#00FFFF]/50 rounded-full text-[#00FFFF] text-xs">
                      {event.type === 'team' ? 'Team Event' : 'Solo Event'}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl text-white mb-2">{event.name}</h3>
                  <p className="text-[#C5C6C7] text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <Calendar className="w-4 h-4 text-[#00FFFF]" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <MapPin className="w-4 h-4 text-[#FF00FF]" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <Users className="w-4 h-4 text-[#6A0DAD]" />
                      <span className="line-clamp-1">{event.clubName}</span>
                    </div>
                  </div>
                  
                  <GlowButton
                    onClick={() => setSelectedEvent(event)}
                    variant="cyan"
                    className="w-full"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </GlowButton>
                </div>
              </CyberpunkCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#00FFFF]" />
          <h2 className="text-2xl text-white">Recommended for You</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedEvents.slice(0, 4).map((event) => (
            <CyberpunkCard key={event.id} glowColor="cyan">
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg text-white mb-1">{event.name}</h3>
                  <p className="text-sm text-[#C5C6C7] mb-2 line-clamp-1">{event.clubName}</p>
                  <div className="flex items-center gap-2 text-xs text-[#C5C6C7]">
                    <Calendar className="w-3 h-3 text-[#00FFFF]" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-[#00FFFF] hover:text-[#00D9FF]"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </CyberpunkCard>
          ))}
        </div>
      </motion.div>

      {/* All Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl text-white mb-4">
          {searchQuery ? 'Search Results' : 'All Upcoming Events'}
        </h2>
        
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <CyberpunkCard key={event.id} glowColor="magenta">
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl text-white mb-1">{event.name}</h3>
                      <p className="text-sm text-[#C5C6C7]">{event.college}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#FF00FF]/20 border border-[#FF00FF]/50 rounded-full text-[#FF00FF] text-xs whitespace-nowrap">
                      {event.openTo === 'all' ? 'Open to All' : event.openTo === 'own' ? 'Own College' : 'Selected Colleges'}
                    </span>
                  </div>
                  <p className="text-[#C5C6C7] text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <Calendar className="w-4 h-4 text-[#00FFFF]" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <MapPin className="w-4 h-4 text-[#FF00FF]" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  <GlowButton onClick={() => setSelectedEvent(event)} variant="outline" className="mt-2">
                    View Details & Register
                  </GlowButton>
                </div>
              </div>
            </CyberpunkCard>
          ))}
        </div>
      </motion.div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
