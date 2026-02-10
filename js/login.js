/**
 * login.js — Login screen logic
 */
(function () {
  'use strict';

  window.EscapeRoom.initLogin = function () {
    var config = window.EscapeRoom.config.login;

    // Populate login UI from config
    document.getElementById('login-title').textContent = config.title;
    document.getElementById('login-subtitle').textContent = config.subtitle;

    var form = document.getElementById('login-form');
    var usernameInput = document.getElementById('login-username');
    var passwordInput = document.getElementById('login-password');
    var errorEl = document.getElementById('login-error');
    var card = document.querySelector('.login-card');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var username = usernameInput.value.trim();
      var password = passwordInput.value;

      if (username === config.username && password === config.password) {
        // Success
        errorEl.hidden = true;
        window.EscapeRoom.state.loggedIn = true;
        window.EscapeRoom.showScreen('inbox');
        window.EscapeRoom.emit('login-success');
      } else {
        // Failure — show error + shake animation
        errorEl.textContent = config.errorMessage;
        errorEl.hidden = false;

        card.classList.remove('shake');
        // Force reflow to restart animation
        void card.offsetWidth;
        card.classList.add('shake');

        passwordInput.value = '';
        passwordInput.focus();
      }
    });

    // Focus username on start
    usernameInput.focus();
  };
})();
