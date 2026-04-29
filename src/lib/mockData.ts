export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  address: string;
  registeredEvents: string[];
}

export interface Coordinator {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  clubName: string;
}

export interface Club {
  id: string;
  name: string;
  college: string;
  logo: string;
  tagline: string;
  description: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  club: string;
  clubName: string;
  college: string;
  date: string;
  time: string;
  venue: string;
  poster: string;
  organizers: string[];
  mentors: string[];
  type: 'solo' | 'team';
  openTo: 'own' | 'specific' | 'all';
  specificColleges?: string[];
  rounds: { name: string; description: string }[];
  status: 'upcoming' | 'ongoing' | 'completed';
  participants?: Participant[];
}

export interface Participant {
  id: string;
  teamName: string;
  members: { name: string; email: string; phone: string }[];
  college: string;
  qrCode: string;
  attended: boolean;
}

export const colleges = [
  'CBIT - Chaitanya Bharathi Institute of Technology',
  'JNTUH - Jawaharlal Nehru Technological University',
  'BITS Pilani - Hyderabad Campus',
  'IIT Hyderabad',
  'IIIT Hyderabad',
  'Osmania University',
  'VNR VJIET - VNR Vignana Jyothi Institute',
  'CVR College of Engineering',
  'Vasavi College of Engineering',
  'MGIT - Mahatma Gandhi Institute of Technology',
];

export const branches = [
  'Computer Science Engineering',
  'Electronics and Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'AI & Machine Learning',
  'Data Science',
];

export const mockClubs: Club[] = [
  {
    id: 'club-1',
    name: 'CodeSphere',
    college: 'CBIT - Chaitanya Bharathi Institute of Technology',
    logo: '💻',
    tagline: 'Coding | Hackathons | Development',
    description: 'A community of passionate coders and developers organizing hackathons, coding competitions, and workshops.',
  },
  {
    id: 'club-2',
    name: 'RoboTech',
    college: 'CBIT - Chaitanya Bharathi Institute of Technology',
    logo: '🤖',
    tagline: 'Robotics | Automation | Innovation',
    description: 'Building the future with robotics and automation. Join us for workshops and competitions.',
  },
  {
    id: 'club-3',
    name: 'AI Nexus',
    college: 'CBIT - Chaitanya Bharathi Institute of Technology',
    logo: '🧠',
    tagline: 'AI | ML | Data Science',
    description: 'Exploring artificial intelligence and machine learning through projects and research.',
  },
  {
    id: 'club-4',
    name: 'TechTalks',
    college: 'IIT Hyderabad',
    logo: '🎤',
    tagline: 'Seminars | Workshops | Speaker Series',
    description: 'Bringing industry experts and thought leaders to campus.',
  },
  {
    id: 'club-5',
    name: 'InnoHub',
    college: 'IIIT Hyderabad',
    logo: '💡',
    tagline: 'Innovation | Entrepreneurship | Startups',
    description: 'Fostering innovation and entrepreneurial spirit among students.',
  },
  {
    id: 'club-6',
    name: 'CyberSec Club',
    college: 'BITS Pilani - Hyderabad Campus',
    logo: '🔐',
    tagline: 'Cybersecurity | Ethical Hacking | CTF',
    description: 'Learn about cybersecurity, participate in CTFs, and ethical hacking challenges.',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'HackCBIT 2025',
    description: 'A 24-hour hackathon bringing together the brightest minds to solve real-world problems. Build innovative solutions, win exciting prizes, and network with industry leaders.',
    club: 'club-1',
    clubName: 'CodeSphere',
    college: 'CBIT - Chaitanya Bharathi Institute of Technology',
    date: '2025-11-15',
    time: '09:00 AM',
    venue: 'Main Auditorium, CBIT',
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    organizers: ['Rahul Sharma', 'Priya Patel'],
    mentors: ['Dr. Ramesh Kumar', 'Prof. Anjali Singh'],
    type: 'team',
    openTo: 'all',
    rounds: [
      { name: 'Idea Submission', description: 'Submit your innovative idea and project proposal' },
      { name: 'Prototype Development', description: '24-hour coding marathon' },
      { name: 'Final Presentation', description: 'Present your solution to judges' },
    ],
    status: 'upcoming',
    participants: [],
  },
  {
    id: 'event-2',
    name: 'RoboQuest 2025',
    description: 'Ultimate robotics competition featuring line following, obstacle avoidance, and autonomous navigation challenges.',
    club: 'club-2',
    clubName: 'RoboTech',
    college: 'CBIT - Chaitanya Bharathi Institute of Technology',
    date: '2025-11-08',
    time: '10:00 AM',
    venue: 'Robotics Lab, Block B',
    poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    organizers: ['Vikram Reddy', 'Sneha Gupta'],
    mentors: ['Dr. Tech Master'],
    type: 'team',
    openTo: 'specific',
    specificColleges: ['CBIT - Chaitanya Bharathi Institute of Technology', 'VNR VJIET - VNR Vignana Jyothi Institute'],
    rounds: [
      { name: 'Round 1: Line Following', description: 'Navigate a line-based track' },
      { name: 'Round 2: Obstacle Course', description: 'Avoid obstacles and reach destination' },
      { name: 'Finals: Autonomous Challenge', description: 'Complete complex autonomous tasks' },
    ],
    status: 'upcoming',
    participants: [],
  },
  {
    id: 'event-3',
    name: 'AI Summit 2025',
    description: 'Explore the latest trends in AI and machine learning. Workshops, talks, and hands-on sessions with industry experts.',
    club: 'club-3',
    clubName: 'AI Nexus',
    college: 'CBIT - Chaitanya Bharathi Institute of Technology',
    date: '2025-11-20',
    time: '09:30 AM',
    venue: 'Convention Center',
    poster: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    organizers: ['Aditya Verma'],
    mentors: ['Dr. ML Expert', 'Prof. AI Specialist'],
    type: 'solo',
    openTo: 'all',
    rounds: [
      { name: 'Workshop Session', description: 'Hands-on AI/ML workshop' },
      { name: 'Competition', description: 'ML model building competition' },
    ],
    status: 'upcoming',
    participants: [],
  },
  {
    id: 'event-4',
    name: 'TechSprint Coding Challenge',
    description: 'Fast-paced competitive programming challenge. Test your algorithmic skills and problem-solving abilities.',
    club: 'club-4',
    clubName: 'TechTalks',
    college: 'IIT Hyderabad',
    date: '2025-11-12',
    time: '02:00 PM',
    venue: 'Computer Lab 3',
    poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    organizers: ['Kavya Krishnan'],
    mentors: ['Prof. Algorithm Expert'],
    type: 'solo',
    openTo: 'all',
    rounds: [
      { name: 'Qualifier Round', description: 'Solve 5 problems in 2 hours' },
      { name: 'Finals', description: 'Advanced algorithmic challenges' },
    ],
    status: 'upcoming',
    participants: [],
  },
  {
    id: 'event-5',
    name: 'Startup Pitch Competition',
    description: 'Present your startup idea to investors and industry leaders. Win funding and mentorship opportunities.',
    club: 'club-5',
    clubName: 'InnoHub',
    college: 'IIIT Hyderabad',
    date: '2025-11-25',
    time: '11:00 AM',
    venue: 'Innovation Center',
    poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    organizers: ['Arjun Mehta', 'Divya Shah'],
    mentors: ['Industry Expert 1', 'VC Partner'],
    type: 'team',
    openTo: 'all',
    rounds: [
      { name: 'Initial Pitch', description: '3-minute elevator pitch' },
      { name: 'Q&A Round', description: 'Answer investor questions' },
      { name: 'Final Presentation', description: 'Detailed business plan presentation' },
    ],
    status: 'upcoming',
    participants: [],
  },
  {
    id: 'event-6',
    name: 'CTF Championship',
    description: 'Capture The Flag cybersecurity competition. Test your skills in web exploitation, cryptography, and more.',
    club: 'club-6',
    clubName: 'CyberSec Club',
    college: 'BITS Pilani - Hyderabad Campus',
    date: '2025-11-18',
    time: '01:00 PM',
    venue: 'Security Lab',
    poster: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    organizers: ['Rohan Das'],
    mentors: ['Security Expert'],
    type: 'team',
    openTo: 'all',
    rounds: [
      { name: 'Jeopardy Style CTF', description: 'Solve security challenges' },
      { name: 'Attack-Defense', description: 'Defend your server and attack others' },
    ],
    status: 'upcoming',
    participants: [],
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Event Starting Soon!',
    message: 'RoboQuest Round 1 starts in 30 minutes - Hall 3, 10 AM',
    time: '2025-10-30T09:30:00',
    type: 'event-start',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Registration Confirmed',
    message: 'You have successfully registered for HackCBIT 2025',
    time: '2025-10-29T14:20:00',
    type: 'registration',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Shortlisted!',
    message: 'Congratulations! You\'ve been shortlisted for Round 2 of TechSprint',
    time: '2025-10-28T16:45:00',
    type: 'shortlist',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'New Event Posted',
    message: 'AI Summit 2025 is now open for registration',
    time: '2025-10-27T11:00:00',
    type: 'new-event',
    read: true,
  },
];
