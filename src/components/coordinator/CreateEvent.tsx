import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Calendar, MapPin, Users, Upload, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { GlowButton } from '../shared/GlowButton';
import { CyberpunkCard } from '../shared/CyberpunkCard';
import { useAuth, useData } from '../../lib/context';
import { colleges } from '../../lib/mockData';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CreateEventProps {
  onComplete: () => void;
}

export function CreateEvent({ onComplete }: CreateEventProps) {
  const { coordinator } = useAuth();
  const { createEvent, clubs } = useData();
  
  const coordinatorClub = clubs.find(c => c.name === coordinator?.clubName);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    poster: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    organizers: [''],
    mentors: [''],
    type: 'team' as 'solo' | 'team',
    openTo: 'all' as 'own' | 'specific' | 'all',
    specificColleges: [] as string[],
    rounds: [{ name: '', description: '' }],
  });

  const addOrganizer = () => {
    setFormData({ ...formData, organizers: [...formData.organizers, ''] });
  };

  const removeOrganizer = (index: number) => {
    setFormData({
      ...formData,
      organizers: formData.organizers.filter((_, i) => i !== index),
    });
  };

  const updateOrganizer = (index: number, value: string) => {
    const updated = [...formData.organizers];
    updated[index] = value;
    setFormData({ ...formData, organizers: updated });
  };

  const addMentor = () => {
    setFormData({ ...formData, mentors: [...formData.mentors, ''] });
  };

  const removeMentor = (index: number) => {
    setFormData({
      ...formData,
      mentors: formData.mentors.filter((_, i) => i !== index),
    });
  };

  const updateMentor = (index: number, value: string) => {
    const updated = [...formData.mentors];
    updated[index] = value;
    setFormData({ ...formData, mentors: updated });
  };

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [...formData.rounds, { name: '', description: '' }],
    });
  };

  const removeRound = (index: number) => {
    setFormData({
      ...formData,
      rounds: formData.rounds.filter((_, i) => i !== index),
    });
  };

  const updateRound = (index: number, field: 'name' | 'description', value: string) => {
    const updated = [...formData.rounds];
    updated[index][field] = value;
    setFormData({ ...formData, rounds: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!coordinatorClub) {
      toast.error('Club not found');
      return;
    }

    createEvent({
      name: formData.name,
      description: formData.description,
      club: coordinatorClub.id,
      clubName: coordinatorClub.name,
      college: coordinator?.college || '',
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      poster: formData.poster,
      organizers: formData.organizers.filter(o => o.trim()),
      mentors: formData.mentors.filter(m => m.trim()),
      type: formData.type,
      openTo: formData.openTo,
      specificColleges: formData.specificColleges,
      rounds: formData.rounds.filter(r => r.name && r.description),
      status: 'upcoming',
    });

    toast.success('Event created successfully!');
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#0B0C10]" />
          </div>
          <h1 className="text-4xl">
            <span className="gradient-text-cyan-magenta">Create New Event</span>
          </h1>
        </div>
        <p className="text-[#C5C6C7]">Fill in the details to create an exciting event</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <CyberpunkCard glowColor="cyan">
            <div className="p-6 space-y-4">
              <h2 className="text-xl text-white mb-4">Basic Information</h2>
              
              <div>
                <Label className="text-[#C5C6C7]">Event Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                  placeholder="Enter event name"
                />
              </div>

              <div>
                <Label className="text-[#C5C6C7]">Description</Label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white min-h-[100px]"
                  placeholder="Describe your event..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#C5C6C7]">Date</Label>
                  <Input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-[#C5C6C7]">Time</Label>
                  <Input
                    required
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#C5C6C7]">Venue</Label>
                <Input
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                  placeholder="Event location"
                />
              </div>

              <div>
                <Label className="text-[#C5C6C7]">Poster URL</Label>
                <Input
                  value={formData.poster}
                  onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                  className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
            </div>
          </CyberpunkCard>

          {/* Organizers & Mentors */}
          <CyberpunkCard glowColor="magenta">
            <div className="p-6 space-y-4">
              <h2 className="text-xl text-white mb-4">Organizers & Mentors</h2>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-[#C5C6C7]">Organizers</Label>
                  <button
                    type="button"
                    onClick={addOrganizer}
                    className="text-[#00FFFF] text-sm hover:text-[#00D9FF]"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.organizers.map((org, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={org}
                        onChange={(e) => updateOrganizer(index, e.target.value)}
                        className="bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                        placeholder="Organizer name"
                      />
                      {formData.organizers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOrganizer(index)}
                          className="text-[#FF00FF] hover:text-[#FF1493]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-[#C5C6C7]">Mentors</Label>
                  <button
                    type="button"
                    onClick={addMentor}
                    className="text-[#00FFFF] text-sm hover:text-[#00D9FF]"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.mentors.map((mentor, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={mentor}
                        onChange={(e) => updateMentor(index, e.target.value)}
                        className="bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                        placeholder="Mentor name"
                      />
                      {formData.mentors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMentor(index)}
                          className="text-[#FF00FF] hover:text-[#FF1493]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CyberpunkCard>

          {/* Event Configuration */}
          <CyberpunkCard glowColor="purple">
            <div className="p-6 space-y-4">
              <h2 className="text-xl text-white mb-4">Event Configuration</h2>
              
              <div>
                <Label className="text-[#C5C6C7]">Event Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'solo' | 'team') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2833] border-[#00FFFF]/30">
                    <SelectItem value="solo" className="text-white">Solo Event</SelectItem>
                    <SelectItem value="team" className="text-white">Team Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#C5C6C7]">Open To</Label>
                <Select
                  value={formData.openTo}
                  onValueChange={(value: 'own' | 'specific' | 'all') =>
                    setFormData({ ...formData, openTo: value })
                  }
                >
                  <SelectTrigger className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2833] border-[#00FFFF]/30">
                    <SelectItem value="own" className="text-white">Own College Only</SelectItem>
                    <SelectItem value="specific" className="text-white">Specific Colleges</SelectItem>
                    <SelectItem value="all" className="text-white">All Colleges</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.openTo === 'specific' && (
                <div>
                  <Label className="text-[#C5C6C7]">Select Colleges</Label>
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto p-2 bg-[#0B0C10]/30 rounded border border-[#00FFFF]/20">
                    {colleges.map((college) => (
                      <label key={college} className="flex items-center gap-2 text-[#C5C6C7] hover:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.specificColleges.includes(college)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                specificColleges: [...formData.specificColleges, college],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                specificColleges: formData.specificColleges.filter(c => c !== college),
                              });
                            }
                          }}
                          className="accent-[#00FFFF]"
                        />
                        <span className="text-sm">{college}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CyberpunkCard>

          {/* Rounds/Timeline */}
          <CyberpunkCard glowColor="cyan">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-white">Event Rounds</h2>
                <button
                  type="button"
                  onClick={addRound}
                  className="text-[#00FFFF] text-sm hover:text-[#00D9FF]"
                >
                  + Add Round
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.rounds.map((round, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#0B0C10]/30 rounded-lg border border-[#00FFFF]/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white">Round {index + 1}</span>
                      {formData.rounds.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRound(index)}
                          className="text-[#FF00FF] hover:text-[#FF1493]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Input
                        value={round.name}
                        onChange={(e) => updateRound(index, 'name', e.target.value)}
                        className="bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                        placeholder="Round name"
                      />
                      <Textarea
                        value={round.description}
                        onChange={(e) => updateRound(index, 'description', e.target.value)}
                        className="bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white"
                        placeholder="Round description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CyberpunkCard>

          {/* Submit Button */}
          <div className="flex gap-4">
            <GlowButton
              type="button"
              onClick={onComplete}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </GlowButton>
            <GlowButton type="submit" variant="magenta" className="flex-1">
              <Plus className="w-5 h-5 mr-2 inline" />
              Create Event
            </GlowButton>
          </div>
        </div>
      </form>
    </div>
  );
}
