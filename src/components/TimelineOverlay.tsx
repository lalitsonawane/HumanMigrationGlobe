import { EraData, migrationEras } from '../data/mockMigrationData';
import { Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';

interface TimelineOverlayProps {
  activeEra: EraData;
  setActiveEra: (era: EraData) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function TimelineOverlay({ activeEra, setActiveEra, isPlaying, setIsPlaying }: TimelineOverlayProps) {
  const currentIndex = migrationEras.findIndex(e => e.id === activeEra.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % migrationEras.length;
    setActiveEra(migrationEras[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + migrationEras.length) % migrationEras.length;
    setActiveEra(migrationEras[prevIndex]);
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      background: 'rgba(5, 10, 16, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '30px',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={handlePrev}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            color: '#00f2fe',
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.2)'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(0, 242, 254, 0.2)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 242, 254, 0.4)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.2)';
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
        </button>
        <button 
          onClick={handleNext}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

      <div style={{ display: 'flex', gap: '4px', position: 'relative' }}>
        {migrationEras.map((era, index) => (
          <button
            key={era.id}
            onClick={() => setActiveEra(era)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              height: '30px',
              padding: '0 16px',
              color: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.4)',
              fontWeight: currentIndex === index ? 600 : 400,
              fontSize: '14px',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.3s'
            }}
          >
            {era.name}
            {currentIndex === index && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                background: '#00f2fe',
                boxShadow: '0 0 10px #00f2fe',
                borderRadius: '2px'
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
