import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Search, Bell, User, LogOut, Calendar, Users as UsersIcon } from 'lucide-react';
import { useAuth, useData } from '../../lib/context';
import { StudentHome } from './StudentHome';
import { ExploreColleges } from './ExploreColleges';
import { NotificationsPage } from './NotificationsPage';
import { ProfilePage } from './ProfilePage';
import { FloatingOrbs } from '../FloatingOrbs';
import { Input } from '../ui/input';

export function StudentDashboard() {
  const { student, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'notifications' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10] relative">
      <FloatingOrbs />
      
      {/* Top Navigation Bar */}
      <nav className="relative z-20 bg-[#1F2833]/80 backdrop-blur-xl border-b border-[#00FFFF]/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#0B0C10]" />
              </div>
              <span className="gradient-text-cyan-magenta text-xl hidden sm:block">CampusSphere</span>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-white text-sm">{student?.name}</p>
                <p className="text-[#C5C6C7] text-xs">{student?.college.split('-')[0].trim()}</p>
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

          {/* Navigation Tabs and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
                        ? 'bg-gradient-to-br from-[#00FFFF] to-[#00D9FF] text-[#0B0C10]'
                        : 'text-[#C5C6C7] hover:bg-[#0B0C10]/50 border border-transparent hover:border-[#00FFFF]/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Search Bar */}
            {activeTab === 'home' && (
              <div className="flex-1 sm:max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FFFF]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="pl-10 h-10 bg-[#0B0C10]/50 border-[#00FFFF]/30 text-white placeholder:text-[#C5C6C7]/50 focus:border-[#00FFFF]"
                />
              </div>
            )}
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
            {activeTab === 'home' && <StudentHome searchQuery={searchQuery} />}
            {activeTab === 'explore' && <ExploreColleges />}
            {activeTab === 'notifications' && <NotificationsPage />}
            {activeTab === 'profile' && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </div>


    </div>
  );
}
