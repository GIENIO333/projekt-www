// theme.js - Rozszerzona wersja z pełną obsługą stanu
const THEME_KEY = 'jagiellonia_theme';
const THEME_CHANGE_EVENT = 'themeChanged';

class ThemeManager {
  constructor() {
    this.theme = null;
    this.systemPreference = null;
    this.init();
  }

  init() {
    // Inicjalizacja nasłuchiwania preferencji systemowych
    this.systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPreference.addEventListener('change', this.handleSystemPreferenceChange.bind(this));
    
    // Ładowanie początkowego motywu
    this.loadTheme();
  }

  loadTheme() {
    // Spróbuj załadować z localStorage
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    if (savedTheme) {
      this.setTheme(savedTheme, false);
    } else {
      // Jeśli nie ma zapisanego motywu, użyj preferencji systemowych
      this.setTheme(this.systemPreference.matches ? 'dark' : 'light', true);
    }
  }

  setTheme(theme, isSystemPreference = false) {
    if (!['light', 'dark'].includes(theme)) {
      console.error('Nieprawidłowy motyw:', theme);
      return;
    }

    this.theme = theme;
    
    // Aktualizacja DOM
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon(theme);

    // Zapisz tylko jeśli to wybór użytkownika, nie preferencja systemowa
    if (!isSystemPreference) {
      localStorage.setItem(THEME_KEY, theme);
    }

    // Wyślij zdarzenie o zmianie motywu
    this.dispatchThemeChangeEvent(theme);
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  handleSystemPreferenceChange(e) {
    // Aktualizuj tylko jeśli użytkownik nie wybrał ręcznie motywu
    if (!localStorage.getItem(THEME_KEY)) {
      this.setTheme(e.matches ? 'dark' : 'light', true);
    }
  }

  updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      icon.setAttribute('aria-label', theme === 'dark' ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny');
    }
  }

  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent(THEME_CHANGE_EVENT, {
      detail: { theme }
    });
    document.dispatchEvent(event);
  }

  getCurrentTheme() {
    return this.theme;
  }

  clearUserPreference() {
    localStorage.removeItem(THEME_KEY);
    this.setTheme(this.systemPreference.matches ? 'dark' : 'light', true);
  }
}

// Inicjalizacja menedżera motywów
const themeManager = new ThemeManager();

// Funkcje dla kompatybilności wstecznej
function applyTheme(theme) {
  themeManager.setTheme(theme);
}

function initializeTheme() {
  // Nowa inicjalizacja jest już w konstruktorze ThemeManager
  // Ta funkcja pozostaje dla kompatybilności
}

function updateThemeIcon(theme) {
  themeManager.updateThemeIcon(theme);
}

// Inicjalizacja przy załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  // Obsługa przycisku przełączania motywu
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    themeManager.toggleTheme();
  });

  // Przykładowe nasłuchiwanie zdarzenia zmiany motywu
  document.addEventListener(THEME_CHANGE_EVENT, (e) => {
    console.log('Motyw zmieniony na:', e.detail.theme);
    // Tutaj możesz dodać dodatkowe reakcje na zmianę motywu
  });
});

// Eksport dla modułów (jeśli używany jest system modułów)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    applyTheme,
    initializeTheme,
    updateThemeIcon
  };
}