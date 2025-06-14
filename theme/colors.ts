const baseColors = {
  black: '#000000',
  white: '#FFFFFF'
};

const accentColors = {
  primary: '#36877F',
  secondary: '#6AA67C'
};

export const colors = {
  background1: '#FFFFFF',
  background2: '#F4F5F6',
  background3: '#DDE2E3',
  background4: '#9AA1A4',

  foreground1: '#000000',
  foreground2: '#323335',
  foreground3: '#414344',
  foreground4: '#8A8D90',

  ...baseColors,
  ...accentColors
} as const;
