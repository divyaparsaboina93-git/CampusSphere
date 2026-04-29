import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Event } from '../../lib/mockData';
import { Calendar, MapPin, Users, Award, Clock } from 'lucide-react';

interface EventDetailsDialogProps {
  event: Event;
  onClose: () => void;
}

export function EventDetailsDialog({ event, onClose }: EventDetailsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1F2833] border-[#FF00FF]/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl gradient-text-cyan-magenta">{event.name}</DialogTitle>
          <DialogDescription className="sr-only">
            View complete details about {event.name} including date, venue, description, and event rounds.
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
                <p className="text-white">{new Date(event.date).toLocaleDateString()} • {event.time}</p>
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
                <p className="text-xs text-[#C5C6C7]">Registrations</p>
                <p className="text-white">{event.participants?.length || 0} Teams/Participants</p>
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
            <h3 className="text-xl text-white mb-2">Description</h3>
            <p className="text-[#C5C6C7] leading-relaxed">{event.description}</p>
          </div>

          {/* Rounds */}
          <div>
            <h3 className="text-xl text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#6A0DAD]" />
              Event Rounds
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
        </div>
      </DialogContent>
    </Dialog>
  );
}