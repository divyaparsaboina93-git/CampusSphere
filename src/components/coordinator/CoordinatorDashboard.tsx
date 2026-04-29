import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Plus, Users, LogOut, Calendar, QrCode } from 'lucide-react';
import { useAuth } from '../../lib/context';
import { CoordinatorHome } from './CoordinatorHome';
import { CreateEvent } from './CreateEvent';
import { ManageParticipants } from './ManageParticipants';
import { FloatingOrbs } from '../FloatingOrbs';

export function CoordinatorDashboard() {
  const { coordinator, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'participants'>('home');

  const tabs = [
    { id: 'home', label: 'Events', icon: Home },
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'participants', label: 'Manage', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10] relative">
      <FloatingOrbs />
      
      {/* Top Navigation Bar */}
      <nav className="relative z-20 bg-[#1F2833]/80 backdrop-blur-xl border-b border-[#FF00FF]/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF00FF] to-[#FF1493] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#0B0C10]" />
              </div>
              <span className="gradient-text-cyan-magenta text-xl hidden sm:block">CampusSphere</span>
              <span className="hidden md:inline text-[#C5C6C7] text-sm">• Coordinator</span>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-white text-sm">{coordinator?.name}</p>
                <p className="text-[#C5C6C7] text-xs">{coordinator?.clubName}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B0C10]/50 border border-[#FF00FF]/30 text-[#FF00FF] hover:bg-[#FF00FF]/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-[#FF00FF] to-[#FF1493] text-[#0B0C10]'
                      : 'text-[#C5C6C7] hover:bg-[#0B0C10]/50 border border-transparent hover:border-[#FF00FF]/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <CoordinatorHome />}
            {activeTab === 'create' && <CreateEvent onComplete={() => setActiveTab('home')} />}
            {activeTab === 'participants' && <ManageParticipants />}
          </motion.div>
        </AnimatePresence>
      </div>


    </div>
  );
}
