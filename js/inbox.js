/**
 * inbox.js — Email inbox rendering & interaction
 */
(function () {
  'use strict';

  var ER = window.EscapeRoom;

  window.EscapeRoom.initInbox = function () {
    var config = ER.config;
    var state = ER.state;

    // Populate account info
    var accountSection = config.Einträge || config.inbox;
    var accountName = accountSection.accountName;
    document.getElementById('account-name').textContent = accountName;
    document.getElementById('account-email').textContent = accountSection.accountEmail;
    document.getElementById('account-avatar').textContent = accountName.charAt(0).toUpperCase();

    var emailListEl = document.getElementById('email-list');
    var emailListView = document.getElementById('email-list-view');
    var emailDetailView = document.getElementById('email-detail-view');
    var emailDetailContent = document.getElementById('email-detail-content');
    var btnBack = document.getElementById('btn-back');
    var unreadBadge = document.getElementById('unread-badge');

    /**
     * Render the email list
     */
    function renderEmailList() {
      emailListEl.innerHTML = '';

      var emails = getVisibleEmails();

      for (var i = 0; i < emails.length; i++) {
        var email = emails[i];
        var row = createEmailRow(email);
        emailListEl.appendChild(row);
      }

      updateUnreadBadge();
    }

    /**
     * Get all emails that should be visible
     */
    function getVisibleEmails() {
      return config.emails.slice();
    }

    /**
     * Create a single email row element
     */
    function createEmailRow(email) {
      var row = document.createElement('div');
      row.className = 'email-row';
      row.dataset.emailId = email.id;

      var isRead = state.readEmails.indexOf(email.id) !== -1;
      if (!isRead) {
        row.classList.add('unread');
      }

      row.innerHTML =
        '<div class="unread-dot"></div>' +
        '<div class="email-content">' +
          '<div class="email-subject">' + escapeHtml(email.subject) + '</div>' +
        '</div>' +
        '<div class="email-date">' + formatDate(email.date) + '</div>';

      row.addEventListener('click', function () {
        openEmail(email);
      });

      return row;
    }

    /**
     * Open an email in detail view
     */
    function openEmail(email) {
      state.openEmailId = email.id;

      // Mark as read
      if (state.readEmails.indexOf(email.id) === -1) {
        state.readEmails.push(email.id);
      }

      // Render detail view
      var html =
        '<h1 class="detail-subject">' + escapeHtml(email.subject) + '</h1>' +
        '<div class="detail-meta">' +
          '<div class="detail-date">' + formatDateLong(email.date) + '</div>' +
        '</div>' +
        '<div class="detail-body">' + escapeHtml(email.body) + '</div>';

      // If this is the map email, add map container placeholder
      if (email.isMapEmail) {
        html += '<div class="map-section" id="map-section"></div>';
      }

      emailDetailContent.innerHTML = html;

      // Switch views
      emailListView.classList.remove('active');
      emailDetailView.classList.add('active');

      // If map email, render the map
      if (email.isMapEmail && ER.renderMap) {
        ER.renderMap(document.getElementById('map-section'));
      }

      // Update the list in background (to remove unread styling)
      renderEmailList();

      ER.emit('email-opened', { emailId: email.id });
    }

    /**
     * Go back to email list
     */
    function closeEmail() {
      state.openEmailId = null;
      emailDetailView.classList.remove('active');
      emailListView.classList.add('active');
    }

    btnBack.addEventListener('click', closeEmail);

    // Sidebar "Inbox" link always returns to the email list
    document.getElementById('nav-inbox').addEventListener('click', function () {
      if (state.openEmailId) {
        closeEmail();
      }
    });

    /**
     * Update unread badge count
     */
    function updateUnreadBadge() {
      var emails = getVisibleEmails();
      var unreadCount = 0;
      for (var i = 0; i < emails.length; i++) {
        if (state.readEmails.indexOf(emails[i].id) === -1) {
          unreadCount++;
        }
      }

      if (unreadCount > 0) {
        unreadBadge.textContent = unreadCount;
        unreadBadge.classList.add('visible');
      } else {
        unreadBadge.classList.remove('visible');
      }
    }

    /**
     * Show newspaper popup (called when all markers are read)
     */
    ER.on('all-markers-read', function () {
      if (state.finalEmailDelivered) return;
      state.finalEmailDelivered = true;

      // Play notification sound
      var audio = document.getElementById('notification-sound');
      if (audio) {
        audio.play().catch(function () {
          // Ignore autoplay restrictions
        });
      }

      // Show newspaper popup with final entry text
      var popup = document.getElementById('newspaper-popup');
      var textEl = document.getElementById('newspaper-text');
      if (popup && textEl) {
        textEl.textContent = config.news_story.body;
        popup.classList.add('active');
      }

      // Reveal the sidebar link for revisiting the popup
      if (navNewspaper) {
        navNewspaper.style.display = '';
      }
    });

    // Newspaper popup close button and nav link
    var newspaperClose = document.getElementById('newspaper-close');
    var newspaperPopup = document.getElementById('newspaper-popup');
    var navNewspaper = document.getElementById('nav-newspaper');

    function openNewspaperPopup() {
      if (newspaperPopup) newspaperPopup.classList.add('active');
    }

    if (newspaperClose && newspaperPopup) {
      newspaperClose.addEventListener('click', function () {
        newspaperPopup.classList.remove('active');
      });
      newspaperPopup.addEventListener('click', function (e) {
        if (e.target === newspaperPopup) {
          newspaperPopup.classList.remove('active');
        }
      });
    }

    if (navNewspaper) {
      navNewspaper.addEventListener('click', openNewspaperPopup);
    }

    // Initial render after login
    ER.on('login-success', function () {
      renderEmailList();
    });
  };

  var WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  /**
   * Format date string for display in list (date + time)
   */
  function formatDate(dateStr) {
    var parts = dateStr.split(' ');
    if (parts.length < 2) return dateStr;
    var dateParts = parts[0].split('-');
    var d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    return d.getDate() + '. ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + ', ' + parts[1];
  }

  /**
   * Format date string as "Mittwoch, 1. Juli 2026"
   */
  function formatDateLong(dateStr) {
    var parts = dateStr.split(' ');
    var dateParts = parts[0].split('-');
    var d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    return WEEKDAYS[d.getDay()] + ', ' + d.getDate() + '. ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
