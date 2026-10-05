// Identidade atual da marca (mesma da landing/painel web).
// Telas realinhadas usam BRAND; o COLORS antigo fica até a última tela legada migrar.
export const THEMES = {
  light: {
    bg: '#FBF6EC',
    card: '#FFFFFF',
    ink: '#0C2340',
    inkSoft: '#5A6B7E',
    blue: '#0151C8',
    navy: '#0B1E45',
    border: '#E5E0D3',
    success: '#2E7D4F',
    danger: '#C0392B',
    honey: '#FFC24B',
  },
  dark: {
    bg: '#0F172A',
    card: '#111827',
    ink: '#F3F7FF',
    inkSoft: '#B7C2D5',
    blue: '#68A2FF',
    navy: '#8AB4FF',
    border: '#2A3A4D',
    success: '#4ADE80',
    danger: '#F87171',
    honey: '#FBBF24',
  },
};

export const BRAND = {};
export let currentThemeMode = 'light';
const themeListeners = [];

const setBrandProperties = (palette) => {
  Object.keys(palette).forEach((key) => {
    Object.defineProperty(BRAND, key, {
      get: () => (THEMES[currentThemeMode] || THEMES.light)[key],
      set: (value) => {
        if (!THEMES[currentThemeMode]) {
          THEMES[currentThemeMode] = { ...THEMES.light };
        }
        THEMES[currentThemeMode][key] = value;
      },
      enumerable: true,
      configurable: true,
    });
  });
};

export const subscribeToTheme = (listener) => {
  themeListeners.push(listener);
  return () => {
    const index = themeListeners.indexOf(listener);
    if (index >= 0) {
      themeListeners.splice(index, 1);
    }
  };
};

export const applyTheme = (mode = 'light') => {
  const palette = THEMES[mode] || THEMES.light;
  currentThemeMode = mode;
  setBrandProperties(palette);

  themeListeners.forEach((listener) => listener(mode));
  return BRAND;
};

setBrandProperties(THEMES.light);

export const COLORS = {
  backgroundGradient: ['#001D4A', '#004AAD'], // Tons de azul do fundo
  white: '#FFFFFF',
  inputBackground: '#F5F5F5',
  inputText: '#8E8E8E',
  buttonPrimary: '#1A1A1A', // Botão "Entrar" quase preto
  link: '#00C2FF', // Azul claro dos links
  textMain: '#FFFFFF',
  border: '#FFFFFF40' // Linha do "OU" com transparência
};