import { motion } from 'motion/react';
import { Bell, CheckCircle, Calendar, Sparkles, Trophy } from 'lucide-react';
import { useData } from '../../lib/context';
import { CyberpunkCard } from '../shared/CyberpunkCard';

export function NotificationsPage() {
  const { notifications } = useData();

  const getIcon = (type: string) => {
    switch (type) {
      case 'event-start':
        return <Calendar className="w-5 h-5 text-[#00FFFF]" />;
      case 'registration':
        return <CheckCircle className="w-5 h-5 text-[#00FF00]" />;
      case 'shortlist':
        return <Trophy className="w-5 h-5 text-[#FFD700]" />;
      case 'new-event':
        return <Sparkles className="w-5 h-5 text-[#FF00FF]" />;
      default:
        return <Bell className="w-5 h-5 text-[#C5C6C7]" />;
    }
  };

  const getTimeAgo = (time: string) => {
    const now = new Date();
    const notifTime = new Date(time);
    const diffMs = now.getTime() - notifTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
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
            <Bell className="w-6 h-6 text-[#0B0C10]" />
          </div>
          <h1 className="text-4xl">
            <span className="gradient-text-cyan-magenta">Notifications</span>
          </h1>
        </div>
        <p className="text-[#C5C6C7]">Stay updated with your events and activities</p>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <CyberpunkCard
              glowColor={notification.read ? 'purple' : 'cyan'}
              hover={true}
            >
              <div className={`p-4 ${!notification.read ? 'border-l-4 border-[#00FFFF]' : ''}`}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white">{notification.title}</h3>
                      <span className="text-xs text-[#C5C6C7] whitespace-nowrap">
                        {getTimeAgo(notification.time)}
                      </span>
                    </div>
                    <p className="text-[#C5C6C7] text-sm">{notification.message}</p>
                    {!notification.read && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded text-[#00FFFF] text-xs">
                          <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse" />
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CyberpunkCard>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Bell className="w-20 h-20 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
            <p className="text-[#C5C6C7] text-lg">No notifications yet</p>
            <p className="text-[#C5C6C7] text-sm mt-2">
              You'll see updates about your registered events here
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
