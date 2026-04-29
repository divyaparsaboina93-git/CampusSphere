import { motion } from 'motion/react';
import { User, Mail, Phone, Building2, BookOpen, Calendar, MapPin, Award, CalendarPlus } from 'lucide-react';
import { useAuth, useData } from '../../lib/context';
import { CyberpunkCard } from '../shared/CyberpunkCard';
import { GlowButton } from '../shared/GlowButton';
import { Event } from '../../lib/mockData';
import { QRCodeSVG } from 'qrcode.react';

export function ProfilePage() {
  const { student } = useAuth();
  const { events } = useData();

  const generateGoogleCalendarUrl = (event: Event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.name,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `${event.description}\n\nOrganized by: ${event.clubName}\n\nEvent Type: ${event.type === 'team' ? 'Team Event' : 'Solo Event'}`,
      location: event.venue,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const registeredEvents = events.filter(e =>
    e.participants?.some(p =>
      p.members.some(m => m.email === student?.email)
    )
  );

  const completedEvents = registeredEvents.filter(e => e.status === 'completed');
  const upcomingEvents = registeredEvents.filter(e => e.status === 'upcoming');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] flex items-center justify-center">
            <span className="text-3xl text-[#0B0C10]">{student?.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl text-white mb-1">{student?.name}</h1>
            <p className="text-[#C5C6C7]">Student Profile</p>
          </div>
        </div>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl text-white mb-4">Personal Information</h2>
        <CyberpunkCard glowColor="cyan">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00FFFF]" />
              <div>
                <p className="text-xs text-[#C5C6C7]">Email</p>
                <p className="text-white">{student?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#FF00FF]" />
              <div>
                <p className="text-xs text-[#C5C6C7]">Phone</p>
                <p className="text-white">{student?.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#6A0DAD]" />
              <div>
                <p className="text-xs text-[#C5C6C7]">College</p>
                <p className="text-white">{student?.college.split('-')[0].trim()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#00D9FF]" />
              <div>
                <p className="text-xs text-[#C5C6C7]">Branch</p>
                <p className="text-white">{student?.branch}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#00FFFF]" />
              <div>
                <p className="text-xs text-[#C5C6C7]">Year of Graduation</p>
                <p className="text-white">{student?.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#FF00FF]" />
              <div>
                <p className="text-xs text-[#C5C6C7]">Address</p>
                <p className="text-white">{student?.address}</p>
              </div>
            </div>
          </div>
        </CyberpunkCard>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <CyberpunkCard glowColor="cyan">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">
              {registeredEvents.length}
            </div>
            <p className="text-sm text-[#C5C6C7]">Total Events</p>
          </div>
        </CyberpunkCard>
        <CyberpunkCard glowColor="magenta">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">
              {upcomingEvents.length}
            </div>
            <p className="text-sm text-[#C5C6C7]">Upcoming</p>
          </div>
        </CyberpunkCard>
        <CyberpunkCard glowColor="purple">
          <div className="p-4 text-center">
            <div className="text-3xl gradient-text-cyan-magenta mb-1">
              {completedEvents.length}
            </div>
            <p className="text-sm text-[#C5C6C7]">Completed</p>
          </div>
        </CyberpunkCard>
      </motion.div>

      {/* Registered Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl text-white mb-4">My Registered Events</h2>
        
        {registeredEvents.length > 0 ? (
          <div className="space-y-3">
            {registeredEvents.map((event) => {
              const participant = event.participants?.find(p =>
                p.members.some(m => m.email === student?.email)
              );

              return (
                <CyberpunkCard key={event.id} glowColor="magenta">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl text-white mb-1">{event.name}</h3>
                        <p className="text-sm text-[#C5C6C7]">{event.clubName}</p>
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <Calendar className="w-4 h-4 text-[#00FFFF]" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <MapPin className="w-4 h-4 text-[#FF00FF]" />
                        <span>{event.venue}</span>
                      </div>
                      {participant && (
                        <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                          <Award className="w-4 h-4 text-[#6A0DAD]" />
                          <span>
                            {participant.attended ? 'Attended ✓' : 'Not Attended'}
                          </span>
                        </div>
                      )}
                    </div>

                    {participant && event.status === 'upcoming' && (
                      <>
                        <div className="p-4 bg-[#0B0C10]/50 rounded-lg border border-[#00FFFF]/20 mb-3">
                          <p className="text-xs text-[#C5C6C7] mb-3 text-center">QR Code for Attendance</p>
                          <div className="flex justify-center">
                            <div className="p-3 bg-white rounded-lg">
                              <QRCodeSVG 
                                value={participant.qrCode} 
                                size={120}
                                level="H"
                                includeMargin={false}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-[#C5C6C7] mt-3 text-center">
                            Show this QR code to mark attendance
                          </p>
                        </div>
                        <GlowButton
                          onClick={() => window.open(generateGoogleCalendarUrl(event), '_blank')}
                          variant="outline"
                          className="w-full"
                        >
                          <CalendarPlus className="w-4 h-4 mr-2 inline" />
                          Add to Google Calendar
                        </GlowButton>
                      </>
                    )}
                  </div>
                </CyberpunkCard>
              );
            })}
          </div>
        ) : (
          <CyberpunkCard glowColor="purple">
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
              <p className="text-[#C5C6C7] text-lg mb-2">No registered events yet</p>
              <p className="text-[#C5C6C7] text-sm">
                Explore events and register to see them here
              </p>
            </div>
          </CyberpunkCard>
        )}
      </motion.div>
    </div>
  );
}