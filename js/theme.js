/**
 * theme.js — Theme management system
 */
(function () {
  'use strict';

  // Set to true to show all theme options in the sidebar; false = notebook only
  var SHOW_ALL_THEMES = false;

  var THEME_KEY = 'escaperoomTheme';
  var currentTheme = 'notebook';

  /**
   * Theme definitions with all CSS custom property values
   */
  var themes = {
    darkmode: {
      name: 'Dark Mode',
      icon: '🌙',
      properties: {
        '--color-bg': '#0f1923',
        '--color-bg-light': '#1a2733',
        '--color-surface': '#1e3044',
        '--color-surface-hover': '#253d54',
        '--color-primary': '#00b4d8',
        '--color-primary-dark': '#0096b7',
        '--color-accent': '#48cae4',
        '--color-danger': '#e63946',
        '--color-success': '#2a9d8f',
        '--color-text': '#e8eaed',
        '--color-text-secondary': '#9aa0a6',
        '--color-text-muted': '#5f6368',
        '--color-border': '#2a3f52',
        '--color-unread': '#00b4d8',
        '--color-marker': '#e63946',
        '--color-marker-done': '#2a9d8f',
        '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.3)',
        '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        '--shadow-lg': '0 8px 30px rgba(0, 0, 0, 0.5)',
        '--shadow-xl': '0 16px 50px rgba(0, 0, 0, 0.6)'
      }
    },

    bright: {
      name: 'Bright Mode',
      icon: '☀️',
      properties: {
        '--color-bg': '#f8f9fa',
        '--color-bg-light': '#ffffff',
        '--color-surface': '#ffffff',
        '--color-surface-hover': '#f1f3f5',
        '--color-primary': '#0096c7',
        '--color-primary-dark': '#007ea7',
        '--color-accent': '#00b4d8',
        '--color-danger': '#d62828',
        '--color-success': '#38b000',
        '--color-text': '#1a1a1a',
        '--color-text-secondary': '#495057',
        '--color-text-muted': '#868e96',
        '--color-border': '#dee2e6',
        '--color-unread': '#0096c7',
        '--color-marker': '#d62828',
        '--color-marker-done': '#38b000',
        '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.12)',
        '--shadow-lg': '0 8px 30px rgba(0, 0, 0, 0.16)',
        '--shadow-xl': '0 16px 50px rgba(0, 0, 0, 0.2)'
      }
    },

    notebook: {
      name: 'Notizbuch',
      icon: '📓',
      properties: {
        '--color-bg': '#f2ece0',
        '--color-bg-light': '#faf6ee',
        '--color-surface': '#faf6ee',
        '--color-surface-hover': '#ede7d9',
        '--color-primary': '#2a5298',
        '--color-primary-dark': '#1e3d7a',
        '--color-accent': '#3a6fd4',
        '--color-danger': '#c0392b',
        '--color-success': '#27ae60',
        '--color-text': '#1a1008',
        '--color-text-secondary': '#5a4a3a',
        '--color-text-muted': '#9a8a7a',
        '--color-border': '#c8b99a',
        '--color-unread': '#2a5298',
        '--color-marker': '#c0392b',
        '--color-marker-done': '#27ae60',
        '--shadow-sm': '0 1px 3px rgba(60, 40, 10, 0.1)',
        '--shadow-md': '0 4px 12px rgba(60, 40, 10, 0.15)',
        '--shadow-lg': '0 8px 30px rgba(60, 40, 10, 0.18)',
        '--shadow-xl': '0 16px 50px rgba(60, 40, 10, 0.22)'
      }
    },

    oldschool: {
      name: 'Old School',
      icon: '🖥️',
      properties: {
        '--color-bg': '#2b2b2b',
        '--color-bg-light': '#3a3a3a',
        '--color-surface': '#4a4a4a',
        '--color-surface-hover': '#555555',
        '--color-primary': '#00ff00',
        '--color-primary-dark': '#00cc00',
        '--color-accent': '#00ffff',
        '--color-danger': '#ff3333',
        '--color-success': '#00ff00',
        '--color-text': '#00ff00',
        '--color-text-secondary': '#00cc00',
        '--color-text-muted': '#008800',
        '--color-border': '#00ff00',
        '--color-unread': '#00ffff',
        '--color-marker': '#ff3333',
        '--color-marker-done': '#00ff00',
        '--shadow-sm': '0 0 0 1px #00ff00',
        '--shadow-md': '0 0 0 2px #00ff00',
        '--shadow-lg': '0 0 10px #00ff00',
        '--shadow-xl': '0 0 20px #00ff00'
      }
    }
  };

  /**
   * Apply a theme to the document
   */
  function applyTheme(themeName) {
    var theme = themes[themeName];
    if (!theme) {
      console.warn('Theme not found:', themeName);
      return;
    }

    var root = document.documentElement;
    var props = theme.properties;

    // Apply each property
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        root.style.setProperty(prop, props[prop]);
      }
    }

    // Add theme-specific class to body for additional styling
    document.body.className = document.body.className
      .replace(/\btheme-\w+\b/g, '')
      .trim();
    document.body.classList.add('theme-' + themeName);

    currentTheme = themeName;

    // Save to localStorage
    try {
      localStorage.setItem(THEME_KEY, themeName);
    } catch (e) {
      // Ignore localStorage errors
    }

    // Update UI
    updateThemeButtons();

    // Emit event
    if (window.EscapeRoom && window.EscapeRoom.emit) {
      window.EscapeRoom.emit('theme-changed', { theme: themeName });
    }
  }

  /**
   * Load saved theme from localStorage
   */
  function loadSavedTheme() {
    if (!SHOW_ALL_THEMES) return 'notebook';
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved && themes[saved]) {
        return saved;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return 'notebook';
  }

  /**
   * Get the next theme in sequence
   */
  function getNextTheme() {
    var themeKeys = Object.keys(themes);
    var currentIndex = themeKeys.indexOf(currentTheme);
    var nextIndex = (currentIndex + 1) % themeKeys.length;
    return themeKeys[nextIndex];
  }

  /**
   * Update theme button UI to reflect current theme
   */
  function updateThemeButtons() {
    var buttons = document.querySelectorAll('.theme-button');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var themeName = btn.dataset.theme;

      if (themeName === currentTheme) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    }

    // Update quick toggle button
    var quickToggle = document.getElementById('theme-toggle-quick');
    if (quickToggle) {
      var theme = themes[currentTheme];
      quickToggle.textContent = theme.icon;
      quickToggle.setAttribute('aria-label', 'Current theme: ' + theme.name + '. Click to cycle themes.');
    }
  }

  /**
   * Initialize theme system
   */
  function initThemeSystem() {
    // Create theme selector UI in sidebar
    createThemeSelector();

    // Load and apply saved theme
    var savedTheme = loadSavedTheme();
    applyTheme(savedTheme);
  }

  /**
   * Create theme selector UI
   */
  function createThemeSelector() {
    if (!SHOW_ALL_THEMES) return;
    var sidebar = document.querySelector('.sidebar-nav');
    if (!sidebar) return;

    var container = document.createElement('div');
    container.className = 'theme-selector';
    container.innerHTML =
      '<div class="theme-selector-header">' +
        '<span class="theme-selector-label">Theme</span>' +
        '<button id="theme-toggle-quick" class="theme-toggle-quick" ' +
          'aria-label="Cycle themes">' +
          themes[currentTheme].icon +
        '</button>' +
      '</div>' +
      '<div class="theme-buttons">' +
        Object.keys(themes).map(function(key) {
          var theme = themes[key];
          return '<button class="theme-button" data-theme="' + key + '" ' +
            'role="radio" aria-checked="false" ' +
            'title="' + theme.name + '">' +
            '<span class="theme-icon">' + theme.icon + '</span>' +
            '<span class="theme-name">' + theme.name + '</span>' +
          '</button>';
        }).join('') +
      '</div>';

    sidebar.appendChild(container);

    // Add event listeners
    var buttons = container.querySelectorAll('.theme-button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(e) {
        var themeName = this.dataset.theme;
        applyTheme(themeName);
      });
    }

    // Quick toggle button cycles through themes
    var quickToggle = document.getElementById('theme-toggle-quick');
    if (quickToggle) {
      quickToggle.addEventListener('click', function() {
        var nextTheme = getNextTheme();
        applyTheme(nextTheme);
      });
    }
  }

  /**
   * Public API
   */
  window.EscapeRoom = window.EscapeRoom || {};
  window.EscapeRoom.theme = {
    apply: applyTheme,
    getCurrent: function() { return currentTheme; },
    getAll: function() { return Object.keys(themes); },
    cycleNext: function() { applyTheme(getNextTheme()); }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
  } else {
    initThemeSystem();
  }
})();
