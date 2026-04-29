import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Clock, CheckCircle, Play, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth, useData } from '../../lib/context';
import { CyberpunkCard } from '../shared/CyberpunkCard';
import { GlowButton } from '../shared/GlowButton';
import { useState } from 'react';
import { EventDetailsDialog } from './EventDetailsDialog';
import { Event } from '../../lib/mockData';

export function CoordinatorHome() {
  const { coordinator } = useAuth();
  const { events, clubs, completeEvent } = useData();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const coordinatorClub = clubs.find(c => c.name === coordinator?.clubName);
  const myEvents = events.filter(e => e.club === coordinatorClub?.id);
  
  const upcomingEvents = myEvents.filter(e => e.status === 'upcoming');
  const ongoingEvents = myEvents.filter(e => e.status === 'ongoing');
  const completedEvents = myEvents.filter(e => e.status === 'completed');

  const handleCompleteEvent = (eventId: string) => {
    completeEvent(eventId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-2">
          <span className="gradient-text-cyan-magenta">{coordinator?.clubName}</span>
        </h1>
        <p className="text-[#C5C6C7]">Manage your club events and participants</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
      >
        <CyberpunkCard glowColor="cyan">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">{myEvents.length}</div>
            <p className="text-sm text-[#C5C6C7]">Total Events</p>
          </div>
        </CyberpunkCard>
        <CyberpunkCard glowColor="magenta">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">{upcomingEvents.length}</div>
            <p className="text-sm text-[#C5C6C7]">Upcoming</p>
          </div>
        </CyberpunkCard>
        <CyberpunkCard glowColor="purple">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">
              {myEvents.reduce((sum, e) => sum + (e.participants?.length || 0), 0)}
            </div>
            <p className="text-sm text-[#C5C6C7]">Registrations</p>
          </div>
        </CyberpunkCard>
        <CyberpunkCard glowColor="cyan">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">{completedEvents.length}</div>
            <p className="text-sm text-[#C5C6C7]">Completed</p>
          </div>
        </CyberpunkCard>
      </motion.div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#00FFFF]" />
            <h2 className="text-2xl text-white">Upcoming Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <CyberpunkCard glowColor="cyan">
                  <div className="relative h-40 overflow-hidden">
                    <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/50 to-transparent" />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl text-white mb-2">{event.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <Calendar className="w-4 h-4 text-[#00FFFF]" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <Users className="w-4 h-4 text-[#FF00FF]" />
                        <span>{event.participants?.length || 0} Registered</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <MapPin className="w-4 h-4 text-[#6A0DAD]" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <GlowButton
                        onClick={() => setSelectedEvent(event)}
                        variant="outline"
                        className="flex-1 text-sm py-2"
                      >
                        View Details
                      </GlowButton>
                    </div>
                  </div>
                </CyberpunkCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#FF00FF]" />
          <h2 className="text-2xl text-white">All Events</h2>
        </div>
        
        <div className="space-y-3">
          {myEvents.map((event) => (
            <CyberpunkCard key={event.id} glowColor="magenta">
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl text-white mb-1">{event.name}</h3>
                      <p className="text-sm text-[#C5C6C7]">{coordinator?.college}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        event.status === 'completed'
                          ? 'bg-[#00FF00]/10 border-[#00FF00]/30 text-[#00FF00]'
                          : event.status === 'ongoing'
                          ? 'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]'
                          : 'bg-[#00FFFF]/10 border-[#00FFFF]/30 text-[#00FFFF]'
                      }`}
                    >
                      {event.status === 'completed' ? 'Completed' : event.status === 'ongoing' ? 'Ongoing' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <Calendar className="w-4 h-4 text-[#00FFFF]" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <Clock className="w-4 h-4 text-[#FF00FF]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <Users className="w-4 h-4 text-[#6A0DAD]" />
                      <span>{event.participants?.length || 0} Registered</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                      <MapPin className="w-4 h-4 text-[#00D9FF]" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <GlowButton
                      onClick={() => setSelectedEvent(event)}
                      variant="outline"
                      className="text-sm py-2"
                    >
                      View Details
                    </GlowButton>
                    {event.status === 'upcoming' && (
                      <GlowButton
                        onClick={() => handleCompleteEvent(event.id)}
                        variant="magenta"
                        className="text-sm py-2"
                      >
                        <CheckCircle className="w-4 h-4 mr-1 inline" />
                        Mark Complete
                      </GlowButton>
                    )}
                  </div>
                </div>
              </div>
            </CyberpunkCard>
          ))}

          {myEvents.length === 0 && (
            <CyberpunkCard glowColor="purple">
              <div className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
                <p className="text-[#C5C6C7] text-lg mb-2">No events created yet</p>
                <p className="text-[#C5C6C7] text-sm">
                  Create your first event to get started
                </p>
              </div>
            </CyberpunkCard>
          )}
        </div>
      </motion.div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <EventDetailsDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
