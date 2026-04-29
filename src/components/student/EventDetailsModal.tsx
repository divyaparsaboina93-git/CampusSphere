import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Users, User, Award, Clock, ArrowRight, CheckCircle, CalendarPlus } from 'lucide-react';
import { Event } from '../../lib/mockData';
import { useAuth, useData } from '../../lib/context';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { GlowButton } from '../shared/GlowButton';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { QRCodeSVG } from 'qrcode.react';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

export function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const { student } = useAuth();
  const { registerForEvent } = useData();
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    teamName: '',
    members: [{ name: student?.name || '', email: student?.email || '', phone: student?.phone || '' }],
  });

  const generateGoogleCalendarUrl = () => {
    const startDate = new Date(event.date);
    // Assuming event is 2 hours long (you can adjust this)
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

  const handleRegister = () => {
    if (event.type === 'team' && registrationData.members.length < 2) {
      toast.error('Team events require at least 2 members');
      return;
    }

    registerForEvent(event.id, {
      ...registrationData,
      college: student?.college,
    });

    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-[#00FFFF]" />
        <div>
          <p className="font-semibold">Registration Successful!</p>
          <p className="text-sm text-[#C5C6C7]">Check your email for QR code</p>
        </div>
      </div>
    );
    
    setShowRegistration(false);
    setRegistrationComplete(true);
  };

  const addMember = () => {
    setRegistrationData({
      ...registrationData,
      members: [...registrationData.members, { name: '', email: '', phone: '' }],
    });
  };

  const removeMember = (index: number) => {
    setRegistrationData({
      ...registrationData,
      members: registrationData.members.filter((_, i) => i !== index),
    });
  };

  const updateMember = (index: number, field: string, value: string) => {
    const updatedMembers = [...registrationData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setRegistrationData({ ...registrationData, members: updatedMembers });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1F2833] border-[#00FFFF]/30 text-white">
        {registrationComplete ? (
          <>
            {/* Registration Success */}
            <DialogHeader>
              <DialogTitle className="text-3xl gradient-text-cyan-magenta text-center">
                Registration Successful!
              </DialogTitle>
              <DialogDescription className="sr-only">
                Your registration for {event.name} has been confirmed. You can now add it to your Google Calendar.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#00FF00] flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-[#0B0C10]" />
              </motion.div>

              <div>
                <h3 className="text-2xl text-white mb-2">You're all set for</h3>
                <p className="text-xl gradient-text-cyan-magenta">{event.name}</p>
              </div>

              <div className="p-4 bg-[#0B0C10]/50 rounded-lg border border-[#00FFFF]/20">
                <p className="text-[#C5C6C7] mb-2">Event Details</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Calendar className="w-4 h-4 text-[#00FFFF]" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {event.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white">
                    <MapPin className="w-4 h-4 text-[#FF00FF]" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#00FFFF]/10 to-[#FF00FF]/10 rounded-lg border border-[#00FFFF]/30">
                <p className="text-sm text-[#C5C6C7] mb-3">
                  📧 Check your email for your attendance QR code
                </p>
                <p className="text-sm text-[#C5C6C7]">
                  💡 Don't forget to add this event to your calendar!
                </p>
              </div>

              <div className="flex gap-3">
                <GlowButton
                  onClick={() => {
                    window.open(generateGoogleCalendarUrl(), '_blank');
                  }}
                  variant="cyan"
                  className="flex-1"
                >
                  <CalendarPlus className="w-5 h-5 mr-2 inline" />
                  Add to Google Calendar
                </GlowButton>
              </div>

              <button
                onClick={onClose}
                className="text-[#C5C6C7] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </>
        ) : !showRegistration ? (
          <>
            {/* Event Details */}
            <DialogHeader>
              <DialogTitle className="text-3xl gradient-text-cyan-magenta">{event.name}</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed information about {event.name} event. View event details and register to participate.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Event Poster */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2833] via-transparent to-transparent" />
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[#0B0C10]/50 rounded-lg border border-[#00FFFF]/20">
                  <Calendar className="w-5 h-5 text-[#00FFFF]" />
                  <div>
                    <p className="text-xs text-[#C5C6C7]">Date & Time</p>
                    <p className="text-white">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0B0C10]/50 rounded-lg border border-[#FF00FF]/20">
                  <MapPin className="w-5 h-5 text-[#FF00FF]" />
                  <div>
                    <p className="text-xs text-[#C5C6C7]">Venue</p>
                    <p className="text-white">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0B0C10]/50 rounded-lg border border-[#6A0DAD]/20">
                  <Users className="w-5 h-5 text-[#6A0DAD]" />
                  <div>
                    <p className="text-xs text-[#C5C6C7]">Organized by</p>
                    <p className="text-white">{event.clubName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0B0C10]/50 rounded-lg border border-[#00D9FF]/20">
                  <Award className="w-5 h-5 text-[#00D9FF]" />
                  <div>
                    <p className="text-xs text-[#C5C6C7]">Event Type</p>
                    <p className="text-white">{event.type === 'team' ? 'Team Event' : 'Solo Event'}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl text-white mb-2">About This Event</h3>
                <p className="text-[#C5C6C7] leading-relaxed">{event.description}</p>
              </div>

              {/* Organizers & Mentors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg text-white mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00FFFF]" />
                    Organizers
                  </h3>
                  <ul className="space-y-1">
                    {event.organizers.map((org, i) => (
                      <li key={i} className="text-[#C5C6C7]">• {org}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg text-white mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FF00FF]" />
                    Mentors
                  </h3>
                  <ul className="space-y-1">
                    {event.mentors.map((mentor, i) => (
                      <li key={i} className="text-[#C5C6C7]">• {mentor}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rounds/Timeline */}
              <div>
                <h3 className="text-xl text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#6A0DAD]" />
                  Event Timeline
                </h3>
                <div className="space-y-3">
                  {event.rounds.map((round, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-[#0B0C10]/30 rounded-lg border border-[#00FFFF]/10"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] flex items-center justify-center">
                          <span className="text-[#0B0C10]">{index + 1}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white mb-1">{round.name}</h4>
                        <p className="text-[#C5C6C7] text-sm">{round.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div className="p-4 bg-[#0B0C10]/30 rounded-lg border border-[#FF00FF]/20">
                <h3 className="text-lg text-white mb-2">Eligibility</h3>
                <p className="text-[#C5C6C7]">
                  {event.openTo === 'all' && 'Open to all colleges'}
                  {event.openTo === 'own' && `Only for ${event.college}`}
                  {event.openTo === 'specific' && `Open to: ${event.specificColleges?.join(', ')}`}
                </p>
              </div>

              {/* Register Button */}
              <GlowButton
                onClick={() => setShowRegistration(true)}
                variant="cyan"
                className="w-full h-14"
              >
                Register Now
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </GlowButton>
            </div>
          </>
        ) : (
          <>
            {/* Registration Form */}
            <DialogHeader>
              <DialogTitle className="text-2xl gradient-text-cyan-magenta">
                Register for {event.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Fill out the registration form to participate in {event.name}. {event.type === 'team' ? 'Provide your team name and member details.' : 'Provide your details to register.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {event.type === 'team' && (
                <div>
                  <Label className="text-[#C5C6C7]">Team Name</Label>
                  <Input
                    required
                    value={registrationData.teamName}
                    onChange={(e) => setRegistrationData({ ...registrationData, teamName: e.target.value })}
                    className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                    placeholder="Enter your team name"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-[#C5C6C7]">Team Members</Label>
                  {event.type === 'team' && (
                    <button
                      onClick={addMember}
                      className="text-[#00FFFF] text-sm hover:text-[#00D9FF]"
                    >
                      + Add Member
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {registrationData.members.map((member, index) => (
                    <div key={index} className="p-4 bg-[#0B0C10]/30 rounded-lg border border-[#00FFFF]/20">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white">Member {index + 1}</h4>
                        {index > 0 && (
                          <button
                            onClick={() => removeMember(index)}
                            className="text-[#FF00FF] text-sm hover:text-[#FF1493]"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-[#C5C6C7] text-sm">Name</Label>
                          <Input
                            required
                            value={member.name}
                            onChange={(e) => updateMember(index, 'name', e.target.value)}
                            className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/20 text-white"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <Label className="text-[#C5C6C7] text-sm">Email</Label>
                          <Input
                            required
                            type="email"
                            value={member.email}
                            onChange={(e) => updateMember(index, 'email', e.target.value)}
                            className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/20 text-white"
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <Label className="text-[#C5C6C7] text-sm">Phone</Label>
                          <Input
                            required
                            type="tel"
                            value={member.phone}
                            onChange={(e) => updateMember(index, 'phone', e.target.value)}
                            className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/20 text-white"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <GlowButton
                  onClick={() => setShowRegistration(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </GlowButton>
                <GlowButton onClick={handleRegister} variant="cyan" className="flex-1">
                  Complete Registration
                </GlowButton>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}