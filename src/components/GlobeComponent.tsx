import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';
import { EraData, MigrationFlow } from '../data/mockMigrationData';

interface GlobeComponentProps {
  activeEra: EraData;
}

export default function GlobeComponent({ activeEra }: GlobeComponentProps) {
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Auto-rotate the globe slowly
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = true;
      // Zoom in to make the globe larger
      setTimeout(() => {
        if (globeEl.current) globeEl.current.pointOfView({ altitude: 1.6 }, 0);
      }, 0);
    }
  }, []);

  // Format data for react-globe.gl arcs
  const arcsData = activeEra.flows.map(flow => ({
    startLat: flow.startLat,
    startLng: flow.startLng,
    endLat: flow.endLat,
    endLng: flow.endLng,
    color: ['rgba(0, 255, 255, 0.1)', flow.color],
    stroke: flow.magnitude * 0.5,
    name: flow.label
  }));

  // Format data for react-globe.gl rings (hubs)
  const ringsData = activeEra.hubs.map(hub => ({
    lat: hub.lat,
    lng: hub.lng,
    maxR: hub.size * 3,
    propagationSpeed: 1,
    repeatPeriod: 1000,
    color: '#00f2fe'
  }));

  // Format data for HTML labels (hubs)
  const htmlElementsData = activeEra.hubs.map(hub => ({
    lat: hub.lat,
    lng: hub.lng,
    name: hub.name
  }));

  // Custom wireframe material
  const globeMaterial = new THREE.MeshPhongMaterial({
    color: '#0a192f',
    transparent: true,
    opacity: 0.9,
    wireframe: false,
  });

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#050a10"
        
        // Globe styling
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor="#00f2fe"
        atmosphereAltitude={0.15}
        globeMaterial={globeMaterial}
        
        // Country Boundaries
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={() => 'rgba(0, 242, 254, 0.4)'}
        
        // Rings (Hubs)
        ringsData={ringsData}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"

        // Arcs (Migration paths)
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke="stroke"
        
        // Labels
        htmlElementsData={htmlElementsData}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          el.innerHTML = `
            <div style="
              background: rgba(10, 25, 47, 0.8);
              border: 1px solid rgba(0, 242, 254, 0.3);
              color: #00f2fe;
              padding: 4px 8px;
              border-radius: 4px;
              font-family: 'Outfit', sans-serif;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              white-space: nowrap;
              box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
            ">
              ${d.name}
            </div>
          `;
          return el;
        }}
        htmlAltitude={0.05}
      />
    </div>
  );
}
