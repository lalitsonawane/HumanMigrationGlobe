import { EraData } from '../data/mockMigrationData';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoPanelProps {
  activeEra: EraData;
}

export default function InfoPanel({ activeEra }: InfoPanelProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '40px',
      left: '40px',
      zIndex: 10,
      width: '350px',
      background: 'rgba(5, 10, 16, 0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '32px',
      color: 'white',
      fontFamily: "'Outfit', sans-serif",
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '20px',
            color: '#00f2fe',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px'
          }}>
            {activeEra.year}
          </div>
          
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '32px',
            fontWeight: 600,
            lineHeight: 1.2,
            background: 'linear-gradient(to right, #ffffff, #a0aec0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {activeEra.name}
          </h2>
          
          <p style={{
            margin: 0,
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            {activeEra.description}
          </p>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Key Hubs
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeEra.hubs.map((hub, i) => (
                <span key={i} style={{
                  fontSize: '12px',
                  padding: '4px 10px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {hub.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
