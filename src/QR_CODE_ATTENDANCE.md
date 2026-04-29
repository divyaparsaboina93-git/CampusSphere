# QR Code Attendance System

## Overview
Implemented a real QR code system for event registration and attendance tracking. Students receive scannable QR codes when they register for events, and coordinators can scan these QR codes using their device camera to mark attendance.

## Features Implemented

### Student Side

#### 1. **Registration Success Modal**
- After registering for an event, students see a success confirmation
- Message indicates QR code will be sent via email
- Option to add event to Google Calendar

#### 2. **Profile Page QR Codes**
- Students can view all their registered events
- For upcoming events, a visual QR code is displayed
- QR code is rendered as a scannable image (not just text)
- Instructions to show QR code for attendance marking
- QR code is displayed in a white background for better scanning

### Coordinator Side

#### 1. **Mark Attendance Button**
- Each participant card has a "Mark Attendance" button (if not already attended)
- Attended participants show a green "Attended" badge with checkmark

#### 2. **QR Code Scanner Dialog**
- Opens when coordinator clicks "Mark Attendance"
- Two scanning modes:
  - **Camera Scanner (Default)**: Uses device camera to scan QR codes
  - **Manual Entry**: Fallback option to enter QR code manually

#### 3. **Camera Scanner**
- Uses @zxing/browser library for QR code scanning
- Displays live camera feed
- Shows scanning frame overlay
- Automatic detection and scanning
- Handles camera permissions and errors gracefully

#### 4. **Attendance Tracking**
- Real-time statistics showing:
  - Total Registrations
  - Attended count
  - Pending count
  - Total Members
- Success toast notification when attendance is marked
- Visual feedback with team name confirmation

## Technical Implementation

### Libraries Used
- **qrcode.react**: For generating visual QR codes (student side)
- **@zxing/browser**: For scanning QR codes via camera (coordinator side)

### Data Flow
1. **Registration**: 
   - When a team registers, a unique QR code string is generated
   - Format: `QR-{timestamp}-{random}`
   - Stored in participant data

2. **Display**:
   - QR code string is converted to visual QR code using QRCodeSVG component
   - Displayed in student profile for upcoming events

3. **Scanning**:
   - Coordinator opens scanner dialog
   - Camera scans QR code
   - Scanned string is matched against participant QR codes
   - If match found, attendance is marked

4. **Verification**:
   - QR code must exactly match participant's stored QR code
   - Validates participant belongs to selected event
   - Updates attendance status in real-time

### Components Created/Modified

#### New Components:
- `/components/coordinator/QRScanner.tsx`: Camera-based QR scanner component

#### Modified Components:
- `/components/student/EventDetailsModal.tsx`: Added QR code generation import
- `/components/student/ProfilePage.tsx`: Added visual QR code display
- `/components/coordinator/ManageParticipants.tsx`: Added scanner dialog with camera/manual modes
- `/lib/context.tsx`: Updated registerForEvent to return participant ID

## User Flow

### Student Flow:
1. Register for an event
2. See success confirmation
3. View QR code in Profile page
4. Show QR code to coordinator at event
5. Attendance is marked when QR is scanned

### Coordinator Flow:
1. Navigate to Manage Participants
2. Select event from dropdown
3. View all registered participants
4. Click "Mark Attendance" for a participant
5. Scan QR code with camera OR enter manually
6. See success confirmation
7. Participant shows as "Attended"

## Features

### Camera Scanner Features:
- Automatic camera access request
- Live video preview
- Visual scanning frame
- Scanning status indicator
- Error handling for no camera/permission denied
- Fallback to manual entry

### QR Code Features:
- High error correction level (H)
- Optimal size for scanning (120px in profile)
- White background for better contrast
- Unique identifier per registration
- Persistent across page reloads (localStorage)

## Security & Validation:
- QR codes are unique per registration
- Cannot be reused for different events
- Validated against specific event's participants
- Immediate feedback on invalid QR codes
- No duplicate attendance marking

## Browser Compatibility:
- Camera scanner works on modern browsers with getUserMedia API
- Fallback to manual entry for unsupported browsers
- Mobile-friendly camera interface
- Works on both desktop and mobile devices
