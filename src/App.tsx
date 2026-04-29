import { useState } from 'react';
import { motion } from 'motion/react';
import { AuthProvider, DataProvider, useAuth } from './lib/context';
import { ParticleBackground } from './components/ParticleBackground';
import { FloatingOrbs } from './components/FloatingOrbs';
import { GraduationCap, Users, Sparkles, Calendar, Trophy, Zap } from 'lucide-react';
import { Button } from './components/ui/button';
import { LoginPage } from './components/auth/LoginPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { CoordinatorDashboard } from './components/coordinator/CoordinatorDashboard';
import { Toaster as SonnerToaster } from 'sonner@2.0.3';

function LandingPage({ onSelectUserType }: { onSelectUserType: (type: 'student' | 'coordinator') => void }) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10] overflow-hidden relative">
      {/* Animated Background Elements */}
      <FloatingOrbs />
      <ParticleBackground />
      
      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          zIndex: 2
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* Logo/Icon Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #00FFFF, #FF00FF, #6A0DAD, #00FFFF)',
                filter: 'blur(20px)',
                opacity: 0.3,
              }}
            />
            <div className="relative bg-[#0B0C10]/80 backdrop-blur-xl rounded-full p-6 border border-[#00FFFF]/30">
              <Sparkles className="w-16 h-16 text-[#00FFFF]" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight">
            <span className="gradient-text-cyan-magenta animate-gradient-shift inline-block">
              CampusSphere
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-block"
          >
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#6A0DAD] rounded-full animate-gradient-shift" />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#C5C6C7] text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl text-center px-4"
        >
          Connecting Students, Clubs & Events — All in One Place
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-12 px-4"
        >
          {[
            { icon: Calendar, text: 'Smart Events' },
            { icon: Users, text: 'Club Management' },
            { icon: Trophy, text: 'Competitions' },
            { icon: Zap, text: 'Instant Updates' },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2833]/50 border border-[#00FFFF]/20 backdrop-blur-sm"
            >
              <feature.icon className="w-4 h-4 text-[#00FFFF]" />
              <span className="text-[#C5C6C7] text-sm">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-md px-4"
        >
          {/* Student Login Button */}
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton('student')}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <Button
              onClick={() => onSelectUserType('student')}
              className="w-full h-14 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #00FFFF 0%, #00D9FF 100%)',
                border: 'none',
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: hoveredButton === 'student' ? '200% 0' : '0% 0',
                }}
                transition={{ duration: 0.6 }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2 text-[#0B0C10]">
                <GraduationCap className="w-5 h-5" />
                Student Login
              </span>
            </Button>
          </motion.div>

          {/* Coordinator Login Button */}
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton('coordinator')}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <Button
              onClick={() => onSelectUserType('coordinator')}
              className="w-full h-14 relative overflow-hidden group bg-transparent"
              style={{
                border: '2px solid #FF00FF',
                color: '#FF00FF',
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: hoveredButton === 'coordinator' ? 0.2 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, #FF00FF 0%, #FF1493 100%)',
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Coordinator Login
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap gap-8 justify-center text-center"
        >
          {[
            { label: 'Active Clubs', value: '150+' },
            { label: 'Events Monthly', value: '500+' },
            { label: 'Students Connected', value: '50K+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
              className="px-6"
            >
              <div className="gradient-text-cyan-magenta text-3xl mb-1">{stat.value}</div>
              <div className="text-[#C5C6C7] text-sm opacity-70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[#00FFFF]/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Radial gradient overlays for depth */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(11,12,16,0.8) 100%)',
          zIndex: 0
        }}
      />
    </div>
  );
}

function AppContent() {
  const { userType } = useAuth();
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'coordinator' | null>(null);

  // Show landing page if not logged in and no user type selected
  if (!userType && !selectedUserType) {
    return <LandingPage onSelectUserType={setSelectedUserType} />;
  }

  // Show login page if user type selected but not logged in
  if (!userType && selectedUserType) {
    return (
      <LoginPage
        onBack={() => setSelectedUserType(null)}
        userType={selectedUserType}
      />
    );
  }

  // Show appropriate dashboard based on user type
  if (userType === 'student') {
    return <StudentDashboard />;
  }

  if (userType === 'coordinator') {
    return <CoordinatorDashboard />;
  }

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
        <SonnerToaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1F2833',
              color: '#fff',
              border: '1px solid rgba(0, 255, 255, 0.3)',
            },
          }}
        />
      </DataProvider>
    </AuthProvider>
  );
}
