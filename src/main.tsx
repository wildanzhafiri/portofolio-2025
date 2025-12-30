import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';
import { initThemeFromStorage } from './app/store/ui.store';

initThemeFromStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
