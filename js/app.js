/**
 * app.js — Main entry point, config loading, state management
 */
(function () {
  'use strict';

  // Global namespace
  window.EscapeRoom = {
    config: null,
    state: {
      loggedIn: false,
      currentView: 'login',     // 'login' | 'inbox'
      readEmails: [],            // IDs of opened emails
      readMarkers: [],           // IDs of confirmed markers
      finalEmailDelivered: false,
      openEmailId: null
    }
  };

  /**
   * Load config from the global variable set by data/config.js
   */
  function loadConfig() {
    if (!window.EscapeRoomConfig) {
      return null;
    }
    return window.EscapeRoomConfig;
  }

  /**
   * Show a specific screen
   */
  window.EscapeRoom.showScreen = function (screenId) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    var target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
    }
    window.EscapeRoom.state.currentView = screenId;
  };

  /**
   * Dispatch a custom event on the document
   */
  window.EscapeRoom.emit = function (eventName, detail) {
    document.dispatchEvent(new CustomEvent(eventName, { detail: detail || {} }));
  };

  /**
   * Listen for a custom event on the document
   */
  window.EscapeRoom.on = function (eventName, handler) {
    document.addEventListener(eventName, handler);
  };

  // Initialize app when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    var config = loadConfig();
    if (!config) {
      document.body.innerHTML = '<div style="padding:40px;color:#e63946;font-family:sans-serif;">' +
        '<h2>Konfigurationsfehler</h2><p>Konfiguration konnte nicht geladen werden.</p>' +
        '<p>Stelle sicher, dass <code>data/config.js</code> existiert und gültige Daten enthält.</p></div>';
      return;
    }

    window.EscapeRoom.config = config;

    // Initialize modules
    if (window.EscapeRoom.initLogin) window.EscapeRoom.initLogin();
    if (window.EscapeRoom.initInbox) window.EscapeRoom.initInbox();
    if (window.EscapeRoom.initMap) window.EscapeRoom.initMap();
  });
})();
