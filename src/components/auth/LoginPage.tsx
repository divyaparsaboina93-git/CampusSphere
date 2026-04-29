import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { GlowButton } from '../shared/GlowButton';
import { ArrowLeft, GraduationCap, Users } from 'lucide-react';
import { ParticleBackground } from '../ParticleBackground';
import { useAuth } from '../../lib/context';
import { colleges, branches, mockClubs } from '../../lib/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface LoginPageProps {
  onBack: () => void;
  userType: 'student' | 'coordinator';
}

export function LoginPage({ onBack, userType }: LoginPageProps) {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '',
    address: '',
    clubName: '',
  });

  // Filter clubs based on selected college
  const availableClubs = useMemo(() => {
    if (!formData.college) return [];
    return mockClubs.filter(club => club.college === formData.college);
  }, [formData.college]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'student') {
      login('student', {
        id: `student-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        address: formData.address,
        registeredEvents: [],
      });
    } else {
      login('coordinator', {
        id: `coordinator-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        clubName: formData.clubName,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10] relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-[#00FFFF] hover:text-[#00D9FF] transition-colors"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1F2833]/60 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] p-0.5 mb-4">
                <div className="w-full h-full bg-[#1F2833] rounded-full flex items-center justify-center">
                  {userType === 'student' ? (
                    <GraduationCap className="w-8 h-8 text-[#00FFFF]" />
                  ) : (
                    <Users className="w-8 h-8 text-[#FF00FF]" />
                  )}
                </div>
              </div>
              <h2 className="text-3xl gradient-text-cyan-magenta mb-2">
                {userType === 'student' ? 'Student Portal' : 'Coordinator Portal'}
              </h2>
              <p className="text-[#C5C6C7]">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <>
                  <div>
                    <Label className="text-[#C5C6C7]">Full Name</Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label className="text-[#C5C6C7]">Email</Label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                      placeholder="your.email@college.edu"
                    />
                  </div>

                  <div>
                    <Label className="text-[#C5C6C7]">Phone Number</Label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <Label className="text-[#C5C6C7]">College</Label>
                    <Select
                      value={formData.college}
                      onValueChange={(value) => setFormData({ ...formData, college: value, clubName: '' })}
                    >
                      <SelectTrigger className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2833] border-[#00FFFF]/30">
                        {colleges.map((college) => (
                          <SelectItem key={college} value={college} className="text-white">
                            {college}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {userType === 'student' ? (
                    <>
                      <div>
                        <Label className="text-[#C5C6C7]">Branch</Label>
                        <Select
                          value={formData.branch}
                          onValueChange={(value) => setFormData({ ...formData, branch: value })}
                        >
                          <SelectTrigger className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white">
                            <SelectValue placeholder="Select your branch" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1F2833] border-[#00FFFF]/30">
                            {branches.map((branch) => (
                              <SelectItem key={branch} value={branch} className="text-white">
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-[#C5C6C7]">Year of Graduation</Label>
                        <Input
                          required
                          type="number"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                          placeholder="2028"
                          min="2024"
                          max="2030"
                        />
                      </div>

                      <div>
                        <Label className="text-[#C5C6C7]">Address</Label>
                        <Input
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                          placeholder="Your address"
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <Label className="text-[#C5C6C7]">Club Name</Label>
                      <Select
                        value={formData.clubName}
                        onValueChange={(value) => setFormData({ ...formData, clubName: value })}
                        disabled={!formData.college}
                      >
                        <SelectTrigger className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue placeholder={formData.college ? "Select your club" : "Select college first"} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1F2833] border-[#00FFFF]/30">
                          {availableClubs.length > 0 ? (
                            availableClubs.map((club) => (
                              <SelectItem key={club.id} value={club.name} className="text-white">
                                <div className="flex items-center gap-2">
                                  <span>{club.logo}</span>
                                  <span>{club.name}</span>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-clubs" disabled className="text-[#C5C6C7]">
                              No clubs available for this college
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {formData.college && availableClubs.length > 0 && (
                        <p className="text-xs text-[#C5C6C7] mt-1">
                          {availableClubs.length} club{availableClubs.length !== 1 ? 's' : ''} available
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {!isSignup && (
                <>
                  <div>
                    <Label className="text-[#C5C6C7]">Email</Label>
                    <Input
                      required
                      type="email"
                      className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                      placeholder="your.email@college.edu"
                    />
                  </div>
                  <div>
                    <Label className="text-[#C5C6C7]">Password</Label>
                    <Input
                      required
                      type="password"
                      className="mt-1 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white focus:border-[#00FFFF]"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              )}

              <GlowButton
                type="submit"
                variant={userType === 'student' ? 'cyan' : 'magenta'}
                className="w-full h-12 mt-6"
              >
                {isSignup ? 'Create Account' : 'Sign In'}
              </GlowButton>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-[#00FFFF] hover:text-[#00D9FF] text-sm transition-colors"
              >
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
