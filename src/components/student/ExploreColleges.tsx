import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Building2, Users, Calendar, ArrowRight } from 'lucide-react';
import { Input } from '../ui/input';
import { CyberpunkCard } from '../shared/CyberpunkCard';
import { useData } from '../../lib/context';
import { colleges } from '../../lib/mockData';
import { EventDetailsModal } from './EventDetailsModal';
import { Event } from '../../lib/mockData';

export function ExploreColleges() {
  const { clubs, events } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredColleges = searchQuery
    ? colleges.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    : colleges;

  const collegeClubs = selectedCollege
    ? clubs.filter(c => c.college === selectedCollege)
    : [];

  const clubEvents = selectedClub
    ? events.filter(e => e.club === selectedClub)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-2">
          <span className="gradient-text-cyan-magenta">Explore</span>
          <span className="text-white"> Colleges & Clubs</span>
        </h1>
        <p className="text-[#C5C6C7]">Discover events from colleges across the region</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FFFF]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a college..."
            className="pl-12 h-14 bg-[#1F2833]/60 border-[#00FFFF]/30 text-white placeholder:text-[#C5C6C7]/50 focus:border-[#00FFFF]"
          />
        </div>
      </motion.div>

      {!selectedCollege ? (
        /* College List */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredColleges.map((college, index) => {
            const collegeClubCount = clubs.filter(c => c.college === college).length;
            const collegeEventCount = events.filter(e => e.college === college && e.status === 'upcoming').length;

            return (
              <motion.div
                key={college}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <CyberpunkCard glowColor={index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'magenta' : 'purple'}>
                  <div className="p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8 text-[#0B0C10]" />
                    </div>
                    
                    <h3 className="text-xl text-white mb-2">{college}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <Users className="w-4 h-4 text-[#00FFFF]" />
                        <span>{collegeClubCount} Active Clubs</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <Calendar className="w-4 h-4 text-[#FF00FF]" />
                        <span>{collegeEventCount} Upcoming Events</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedCollege(college)}
                      className="w-full py-2 px-4 rounded-lg bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-colors flex items-center justify-center gap-2"
                    >
                      View Clubs
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CyberpunkCard>
              </motion.div>
            );
          })}
        </motion.div>
      ) : !selectedClub ? (
        /* Club List for Selected College */
        <div>
          <button
            onClick={() => setSelectedCollege(null)}
            className="flex items-center gap-2 text-[#00FFFF] hover:text-[#00D9FF] mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Colleges
          </button>

          <h2 className="text-2xl text-white mb-6">Clubs at {selectedCollege}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeClubs.map((club, index) => {
              const clubEventCount = events.filter(e => e.club === club.id && e.status === 'upcoming').length;

              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CyberpunkCard glowColor="cyan">
                    <div className="p-6">
                      <div className="text-5xl mb-4">{club.logo}</div>
                      <h3 className="text-xl text-white mb-2">{club.name}</h3>
                      <p className="text-sm text-[#00FFFF] mb-3">{club.tagline}</p>
                      <p className="text-[#C5C6C7] text-sm mb-4 line-clamp-3">{club.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7] mb-4">
                        <Calendar className="w-4 h-4 text-[#FF00FF]" />
                        <span>{clubEventCount} Upcoming Events</span>
                      </div>
                      
                      <button
                        onClick={() => setSelectedClub(club.id)}
                        className="w-full py-2 px-4 rounded-lg bg-[#FF00FF]/10 border border-[#FF00FF]/30 text-[#FF00FF] hover:bg-[#FF00FF]/20 transition-colors flex items-center justify-center gap-2"
                      >
                        View Events
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </CyberpunkCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Events List for Selected Club */
        <div>
          <button
            onClick={() => setSelectedClub(null)}
            className="flex items-center gap-2 text-[#00FFFF] hover:text-[#00D9FF] mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Clubs
          </button>

          <h2 className="text-2xl text-white mb-6">
            Events by {clubs.find(c => c.id === selectedClub)?.name}
          </h2>

          <div className="space-y-4">
            {clubEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CyberpunkCard glowColor="magenta">
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-white mb-2">{event.name}</h3>
                      <p className="text-[#C5C6C7] text-sm mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                          <Calendar className="w-4 h-4 text-[#00FFFF]" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                          <Users className="w-4 h-4 text-[#FF00FF]" />
                          <span>{event.type === 'team' ? 'Team Event' : 'Solo Event'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="px-4 py-2 rounded-lg bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-colors"
                      >
                        View Details & Register
                      </button>
                    </div>
                  </div>
                </CyberpunkCard>
              </motion.div>
            ))}

            {clubEvents.length === 0 && (
              <div className="text-center py-12 text-[#C5C6C7]">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No upcoming events for this club</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
