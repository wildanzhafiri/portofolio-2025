import { create } from 'zustand';

type Theme = 'light' | 'dark';

type UiState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const THEME_KEY = 'theme';

function applyThemeToDom(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', t === 'dark');
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: 'light',
  setTheme: (t) => {
    localStorage.setItem(THEME_KEY, t);
    applyThemeToDom(t);
    set({ theme: t });
  },
  toggleTheme: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyThemeToDom(next);
    set({ theme: next });
  },
}));

export function initThemeFromStorage() {
  const t = getInitialTheme();
  useUiStore.getState().setTheme(t);
}
