import { useState, useEffect } from 'react';
import GlobeComponent from './components/GlobeComponent';
import InfoPanel from './components/InfoPanel';
import TimelineOverlay from './components/TimelineOverlay';
import { migrationEras } from './data/mockMigrationData';
import { motion } from 'framer-motion';

function App() {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeEra = migrationEras[activeEraIndex];

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setActiveEraIndex((prev) => (prev + 1) % migrationEras.length);
      }, 8000); // 8 seconds per era
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#050a10' }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, rgba(5, 10, 16, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <GlobeComponent activeEra={activeEra} />
      
      <InfoPanel activeEra={activeEra} />
      
      <TimelineOverlay 
        activeEra={activeEra} 
        setActiveEra={(era) => {
          setIsPlaying(false); // Pause auto-play when user manually selects
          setActiveEraIndex(migrationEras.findIndex(e => e.id === era.id));
        }}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* Header / Brand */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        zIndex: 10,
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'right'
      }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#fff'
          }}>
            Terra<span style={{ color: '#00f2fe' }}>Flux</span>
          </h1>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '1px'
          }}>
            Historical Migration Mapping
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
