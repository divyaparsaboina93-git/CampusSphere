import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Search, QrCode, CheckCircle, Calendar, Mail, Phone, Building2, Camera, X } from 'lucide-react';
import { useAuth, useData } from '../../lib/context';
import { Input } from '../ui/input';
import { CyberpunkCard } from '../shared/CyberpunkCard';
import { GlowButton } from '../shared/GlowButton';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { QRScanner } from './QRScanner';

export function ManageParticipants() {
  const { coordinator } = useAuth();
  const { events, clubs, markAttendance } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [scanningFor, setScanningFor] = useState<{ eventId: string; participantId: string } | null>(null);
  const [qrInput, setQrInput] = useState('');
  const [useCameraScanner, setUseCameraScanner] = useState(true);

  const coordinatorClub = clubs.find(c => c.name === coordinator?.clubName);
  const myEvents = events.filter(e => e.club === coordinatorClub?.id);
  const selectedEventData = myEvents.find(e => e.id === selectedEvent);

  const participants = selectedEventData?.participants || [];
  const filteredParticipants = searchQuery
    ? participants.filter(
        p =>
          p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.members.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : participants;

  const handleScanQR = (scannedCode: string) => {
    if (!scanningFor) return;
    
    const participant = participants.find(p => p.qrCode === scannedCode);
    
    if (participant) {
      markAttendance(scanningFor.eventId, participant.id);
      toast.success(
        <div>
          <p className="font-semibold">Attendance Marked!</p>
          <p className="text-sm">Team: {participant.teamName}</p>
        </div>
      );
      setScanningFor(null);
      setQrInput('');
      setUseCameraScanner(true);
    } else {
      toast.error('Invalid QR code - Team not found');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF00FF] to-[#FF1493] flex items-center justify-center">
            <Users className="w-6 h-6 text-[#0B0C10]" />
          </div>
          <h1 className="text-4xl">
            <span className="gradient-text-cyan-magenta">Manage Participants</span>
          </h1>
        </div>
        <p className="text-[#C5C6C7]">View registrations and mark attendance</p>
      </motion.div>

      {/* Event Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Label className="text-[#C5C6C7] mb-2 block">Select Event</Label>
        <Select value={selectedEvent} onValueChange={setSelectedEvent}>
          <SelectTrigger className="bg-[#1F2833]/60 border-[#FF00FF]/30 text-white h-12">
            <SelectValue placeholder="Choose an event to view participants" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2833] border-[#FF00FF]/30">
            {myEvents.map((event) => (
              <SelectItem key={event.id} value={event.id} className="text-white">
                {event.name} ({event.participants?.length || 0} participants)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {selectedEventData && (
        <>
          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <CyberpunkCard glowColor="magenta">
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl gradient-text-cyan-magenta mb-1">
                      {participants.length}
                    </div>
                    <p className="text-sm text-[#C5C6C7]">Total Registrations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl gradient-text-cyan-magenta mb-1">
                      {participants.filter(p => p.attended).length}
                    </div>
                    <p className="text-sm text-[#C5C6C7]">Attended</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl gradient-text-cyan-magenta mb-1">
                      {participants.filter(p => !p.attended).length}
                    </div>
                    <p className="text-sm text-[#C5C6C7]">Pending</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl gradient-text-cyan-magenta mb-1">
                      {participants.reduce((sum, p) => sum + p.members.length, 0)}
                    </div>
                    <p className="text-sm text-[#C5C6C7]">Total Members</p>
                  </div>
                </div>
              </div>
            </CyberpunkCard>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FFFF]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by team name, college, or member..."
                className="pl-12 h-12 bg-[#1F2833]/60 border-[#00FFFF]/30 text-white placeholder:text-[#C5C6C7]/50"
              />
            </div>
          </motion.div>

          {/* Participants List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {filteredParticipants.map((participant, index) => (
              <CyberpunkCard key={participant.id} glowColor="cyan">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl text-white mb-1">{participant.teamName}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#C5C6C7]">
                        <Building2 className="w-4 h-4 text-[#00FFFF]" />
                        <span>{participant.college}</span>
                      </div>
                    </div>
                    {participant.attended ? (
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full text-[#00FF00]">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Attended</span>
                      </div>
                    ) : (
                      <GlowButton
                        onClick={() => setScanningFor({ eventId: selectedEventData.id, participantId: participant.id })}
                        variant="magenta"
                        className="text-sm py-2"
                      >
                        <QrCode className="w-4 h-4 mr-1 inline" />
                        Mark Attendance
                      </GlowButton>
                    )}
                  </div>

                  {/* Team Members */}
                  <div className="mb-4">
                    <h4 className="text-sm text-[#C5C6C7] mb-2">Team Members ({participant.members.length})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {participant.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#0B0C10]/30 rounded-lg border border-[#00FFFF]/10"
                        >
                          <p className="text-white text-sm mb-1">{member.name}</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-[#C5C6C7]">
                              <Mail className="w-3 h-3" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#C5C6C7]">
                              <Phone className="w-3 h-3" />
                              <span>{member.phone}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="p-3 bg-[#0B0C10]/50 rounded-lg border border-[#FF00FF]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#C5C6C7] mb-1">QR Code</p>
                        <p className="text-sm text-[#FF00FF] font-mono">{participant.qrCode}</p>
                      </div>
                      <QrCode className="w-12 h-12 text-[#FF00FF]/30" />
                    </div>
                  </div>
                </div>
              </CyberpunkCard>
            ))}

            {filteredParticipants.length === 0 && (
              <CyberpunkCard glowColor="purple">
                <div className="p-12 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
                  <p className="text-[#C5C6C7] text-lg">No participants found</p>
                </div>
              </CyberpunkCard>
            )}
          </motion.div>
        </>
      )}

      {!selectedEventData && myEvents.length > 0 && (
        <CyberpunkCard glowColor="purple">
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
            <p className="text-[#C5C6C7] text-lg">Select an event to view participants</p>
          </div>
        </CyberpunkCard>
      )}

      {myEvents.length === 0 && (
        <CyberpunkCard glowColor="purple">
          <div className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
            <p className="text-[#C5C6C7] text-lg mb-2">No events created yet</p>
            <p className="text-[#C5C6C7] text-sm">Create an event first to manage participants</p>
          </div>
        </CyberpunkCard>
      )}

      {/* QR Scanner Dialog */}
      {scanningFor && (
        <Dialog open={!!scanningFor} onOpenChange={() => {
          setScanningFor(null);
          setUseCameraScanner(true);
        }}>
          <DialogContent className="bg-[#1F2833] border-[#00FFFF]/30 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl gradient-text-cyan-magenta">
                {useCameraScanner ? 'Scan QR Code' : 'Enter QR Code'}
              </DialogTitle>
              <DialogDescription className="text-sm text-[#C5C6C7]">
                {useCameraScanner ? 'Point your camera at the QR code to scan it.' : 'Enter the QR code manually to mark attendance.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {useCameraScanner ? (
                <>
                  <QRScanner 
                    onScan={handleScanQR} 
                    onClose={() => setScanningFor(null)} 
                  />
                  <button
                    onClick={() => setUseCameraScanner(false)}
                    className="w-full text-sm text-[#00FFFF] hover:text-[#00D9FF] transition-colors"
                  >
                    Having trouble? Enter code manually
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[#C5C6C7]">
                    Enter the QR code manually to mark attendance
                  </p>
                  <Input
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    placeholder="Enter QR code..."
                    className="bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                  />
                  <div className="flex gap-3">
                    <GlowButton
                      onClick={() => setUseCameraScanner(true)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Camera className="w-4 h-4 mr-2 inline" />
                      Use Camera
                    </GlowButton>
                    <GlowButton
                      onClick={() => handleScanQR(qrInput)}
                      variant="cyan"
                      className="flex-1"
                      disabled={!qrInput}
                    >
                      Verify & Mark
                    </GlowButton>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}