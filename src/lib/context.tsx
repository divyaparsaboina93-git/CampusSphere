import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Student, Coordinator, Event, mockEvents, mockClubs, mockNotifications, Club } from './mockData';

interface AuthContextType {
  userType: 'student' | 'coordinator' | null;
  student: Student | null;
  coordinator: Coordinator | null;
  login: (type: 'student' | 'coordinator', data: Student | Coordinator) => void;
  logout: () => void;
}

interface DataContextType {
  events: Event[];
  clubs: Club[];
  notifications: typeof mockNotifications;
  registerForEvent: (eventId: string, teamData: any) => string;
  createEvent: (eventData: Omit<Event, 'id' | 'participants'>) => void;
  markAttendance: (eventId: string, participantId: string) => void;
  completeEvent: (eventId: string) => void;
  getEventsByClub: (clubId: string) => Event[];
  getStudentEvents: (studentId: string) => Event[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DataContext = createContext<DataContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<'student' | 'coordinator' | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [coordinator, setCoordinator] = useState<Coordinator | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUserType = localStorage.getItem('userType');
    const savedStudent = localStorage.getItem('student');
    const savedCoordinator = localStorage.getItem('coordinator');

    if (savedUserType === 'student' && savedStudent) {
      setUserType('student');
      setStudent(JSON.parse(savedStudent));
    } else if (savedUserType === 'coordinator' && savedCoordinator) {
      setUserType('coordinator');
      setCoordinator(JSON.parse(savedCoordinator));
    }
  }, []);

  const login = (type: 'student' | 'coordinator', data: Student | Coordinator) => {
    setUserType(type);
    if (type === 'student') {
      setStudent(data as Student);
      localStorage.setItem('userType', 'student');
      localStorage.setItem('student', JSON.stringify(data));
    } else {
      setCoordinator(data as Coordinator);
      localStorage.setItem('userType', 'coordinator');
      localStorage.setItem('coordinator', JSON.stringify(data));
    }
  };

  const logout = () => {
    setUserType(null);
    setStudent(null);
    setCoordinator(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('student');
    localStorage.removeItem('coordinator');
  };

  return (
    <AuthContext.Provider value={{ userType, student, coordinator, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : mockEvents;
  });
  
  const [clubs] = useState<Club[]>(mockClubs);
  const [notifications] = useState(mockNotifications);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const registerForEvent = (eventId: string, teamData: any) => {
    const newParticipant = {
      id: `participant-${Date.now()}`,
      teamName: teamData.teamName,
      members: teamData.members,
      college: teamData.college,
      qrCode: `QR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      attended: false,
    };
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: [...(event.participants || []), newParticipant],
        };
      }
      return event;
    }));
    return newParticipant.id;
  };

  const createEvent = (eventData: Omit<Event, 'id' | 'participants'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      participants: [],
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const markAttendance = (eventId: string, participantId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: event.participants?.map(p =>
            p.id === participantId ? { ...p, attended: true } : p
          ),
        };
      }
      return event;
    }));
  };

  const completeEvent = (eventId: string) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, status: 'completed' as const } : event
    ));
  };

  const getEventsByClub = (clubId: string) => {
    return events.filter(event => event.club === clubId);
  };

  const getStudentEvents = (studentId: string) => {
    return events.filter(event =>
      event.participants?.some(p =>
        p.members.some(m => m.email.includes(studentId))
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        events,
        clubs,
        notifications,
        registerForEvent,
        createEvent,
        markAttendance,
        completeEvent,
        getEventsByClub,
        getStudentEvents,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}