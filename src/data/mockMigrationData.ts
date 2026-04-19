export interface MigrationFlow {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  label: string;
  magnitude: number;
}

export interface EraData {
  id: string;
  name: string;
  year: string;
  description: string;
  flows: MigrationFlow[];
  hubs: { lat: number; lng: number; name: string; size: number }[];
}

const colors = {
  cyan: '#00f2fe',
  teal: '#4facfe',
  neonBlue: '#0033ff',
  green: '#00f260',
  orange: '#ff6a00',
  magenta: '#ff0844'
};

export const migrationEras: EraData[] = [
  {
    id: 'out_of_africa',
    name: 'Out of Africa',
    year: '~60,000 BCE',
    description: 'Early human expansion from the African continent into Eurasia, marking the beginning of global human presence.',
    hubs: [
      { lat: 9.145, lng: 40.4897, name: 'East Africa', size: 1.5 },
      { lat: 31.0461, lng: 34.8516, name: 'Levant', size: 1 },
      { lat: 20.5937, lng: 78.9629, name: 'South Asia', size: 0.8 },
      { lat: -25.2744, lng: 133.7751, name: 'Australia', size: 0.8 },
      { lat: 48.8566, lng: 2.3522, name: 'Europe', size: 0.8 }
    ],
    flows: [
      { startLat: 9.145, startLng: 40.4897, endLat: 31.0461, endLng: 34.8516, color: colors.cyan, magnitude: 2, label: 'To Levant' },
      { startLat: 31.0461, startLng: 34.8516, endLat: 20.5937, endLng: 78.9629, color: colors.teal, magnitude: 1.5, label: 'To Asia' },
      { startLat: 20.5937, startLng: 78.9629, endLat: -25.2744, endLng: 133.7751, color: colors.teal, magnitude: 1, label: 'To Australia' },
      { startLat: 31.0461, startLng: 34.8516, endLat: 48.8566, endLng: 2.3522, color: colors.cyan, magnitude: 1.2, label: 'To Europe' }
    ]
  },
  {
    id: 'neolithic',
    name: 'Neolithic Expansion',
    year: '~10,000 BCE',
    description: 'The spread of agriculture led to significant population movements, particularly from the Fertile Crescent across Europe and Asia.',
    hubs: [
      { lat: 33.3152, lng: 44.3661, name: 'Fertile Crescent', size: 1.5 },
      { lat: 39.0742, lng: 21.8243, name: 'Greece/Balkans', size: 1 },
      { lat: 51.1657, lng: 10.4515, name: 'Central Europe', size: 0.8 },
      { lat: 35.8617, lng: 104.1954, name: 'East Asia', size: 1.2 },
      { lat: 15.8700, lng: 100.9925, name: 'SE Asia', size: 0.8 }
    ],
    flows: [
      { startLat: 33.3152, startLng: 44.3661, endLat: 39.0742, endLng: 21.8243, color: colors.green, magnitude: 1.5, label: 'To Europe' },
      { startLat: 39.0742, startLng: 21.8243, endLat: 51.1657, endLng: 10.4515, color: colors.green, magnitude: 1.2, label: 'Further Europe' },
      { startLat: 35.8617, startLng: 104.1954, endLat: 15.8700, endLng: 100.9925, color: colors.cyan, magnitude: 1.5, label: 'Austronesian Expansion' }
    ]
  },
  {
    id: 'age_of_discovery',
    name: 'Age of Discovery',
    year: '15th - 17th Century',
    description: 'Extensive overseas exploration and colonization by European powers, leading to massive transatlantic and global migrations.',
    hubs: [
      { lat: 40.4168, lng: -3.7038, name: 'Iberia', size: 1.5 },
      { lat: 51.5074, lng: -0.1278, name: 'Britain', size: 1.2 },
      { lat: -14.2350, lng: -51.9253, name: 'South America', size: 1 },
      { lat: 39.3210, lng: -111.0937, name: 'North America', size: 1 },
      { lat: 10.4828, lng: -66.9036, name: 'Caribbean', size: 0.8 }
    ],
    flows: [
      { startLat: 40.4168, startLng: -3.7038, endLat: -14.2350, endLng: -51.9253, color: colors.orange, magnitude: 2, label: 'To South America' },
      { startLat: 51.5074, startLng: -0.1278, endLat: 39.3210, endLng: -111.0937, color: colors.orange, magnitude: 1.8, label: 'To North America' },
      { startLat: 40.4168, startLng: -3.7038, endLat: 10.4828, endLng: -66.9036, color: colors.teal, magnitude: 1.5, label: 'To Caribbean' },
      // Slave trade
      { startLat: 9.0820, startLng: 8.6753, endLat: -14.2350, endLng: -51.9253, color: colors.magenta, magnitude: 2.5, label: 'Transatlantic Trade' },
      { startLat: 9.0820, startLng: 8.6753, endLat: 10.4828, endLng: -66.9036, color: colors.magenta, magnitude: 2, label: 'Transatlantic Trade' }
    ]
  },
  {
    id: 'modern_era',
    name: 'Modern & Industrial Era',
    year: '19th Century - Present',
    description: 'Mass migrations driven by industrialization, world wars, economic opportunities, and globalization.',
    hubs: [
      { lat: 51.1657, lng: 10.4515, name: 'Europe', size: 1.5 },
      { lat: 39.3210, lng: -111.0937, name: 'North America', size: 1.8 },
      { lat: 20.5937, lng: 78.9629, name: 'South Asia', size: 1.5 },
      { lat: 35.8617, lng: 104.1954, name: 'East Asia', size: 1.5 },
      { lat: 23.6345, lng: -102.5528, name: 'Latin America', size: 1 }
    ],
    flows: [
      { startLat: 51.1657, startLng: 10.4515, endLat: 39.3210, endLng: -111.0937, color: colors.cyan, magnitude: 3, label: 'European Migration to US' },
      { startLat: 20.5937, startLng: 78.9629, endLat: 25.2048, endLng: 55.2708, color: colors.teal, magnitude: 1.5, label: 'South Asia to Gulf' },
      { startLat: 23.6345, startLng: -102.5528, endLat: 39.3210, endLng: -111.0937, color: colors.green, magnitude: 2, label: 'Latin America to US' },
      { startLat: 35.8617, startLng: 104.1954, endLat: 39.3210, endLng: -111.0937, color: colors.orange, magnitude: 1.8, label: 'East Asia to US' },
      { startLat: 20.5937, startLng: 78.9629, endLat: 51.5074, endLng: -0.1278, color: colors.cyan, magnitude: 1.2, label: 'South Asia to UK' }
    ]
  }
];
