import { motion } from 'motion/react';

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Large cyan orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, rgba(0,255,255,0) 70%)',
          filter: 'blur(60px)',
          top: '10%',
          left: '10%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Large magenta orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, rgba(255,0,255,0) 70%)',
          filter: 'blur(60px)',
          bottom: '10%',
          right: '10%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Medium purple orb */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(106,13,173,0.2) 0%, rgba(106,13,173,0) 70%)',
          filter: 'blur(50px)',
          top: '50%',
          right: '20%',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small cyan accent */}
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.25) 0%, rgba(0,217,255,0) 70%)',
          filter: 'blur(40px)',
          top: '30%',
          left: '60%',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
