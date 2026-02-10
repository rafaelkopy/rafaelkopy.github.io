/**
 * map.js — Map viewer, markers, bottom-sheet modals
 */
(function () {
  'use strict';

  var ER = window.EscapeRoom;

  // SVG for the map pin marker
  var PIN_SVG =
    '<svg viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">' +
      '<path class="marker-pin-fill" d="M16 0C7.2 0 0 7.2 0 16c0 12 16 26 16 26s16-14 16-26C32 7.2 24.8 0 16 0z"/>' +
      '<circle cx="16" cy="14" r="6" fill="rgba(0,0,0,0.25)"/>' +
    '</svg>';

  window.EscapeRoom.initMap = function () {
    // Map module ready — renderMap will be called when the map email is opened
  };

  /**
   * Render the interactive map into a container element
   */
  window.EscapeRoom.renderMap = function (container) {
    var config = ER.config.map;
    var state = ER.state;

    if (!container) return;

    // Progress indicator
    var totalMarkers = config.markers.length;
    var readCount = state.readMarkers.length;

    var progressHtml =
      '<div class="map-progress">' +
        '<span class="map-progress-text" id="map-progress-text">' +
          readCount + '/' + totalMarkers + ' sites examined' +
        '</span>' +
        '<div class="map-progress-bar">' +
          '<div class="map-progress-fill" id="map-progress-fill" style="width:' +
            (totalMarkers > 0 ? (readCount / totalMarkers * 100) : 0) + '%"></div>' +
        '</div>' +
      '</div>';

    // Map container with image and markers
    var mapHtml =
      '<div class="map-container" id="map-container">' +
        '<img src="' + escapeAttr(config.image) + '" alt="Mission Map" ' +
          'onerror="this.style.display=\'none\';this.parentNode.insertAdjacentHTML(\'beforeend\',\'<div class=map-placeholder>Map image not found — place your map at ' + escapeAttr(config.image) + '</div>\')">' +
      '</div>';

    container.innerHTML = progressHtml + mapHtml;

    // Add markers to the map container
    var mapContainer = document.getElementById('map-container');

    for (var i = 0; i < config.markers.length; i++) {
      var marker = config.markers[i];
      var markerEl = createMarkerElement(marker);
      mapContainer.appendChild(markerEl);
    }
  };

  /**
   * Create a marker DOM element
   */
  function createMarkerElement(markerData) {
    var state = ER.state;
    var isConfirmed = state.readMarkers.indexOf(markerData.id) !== -1;

    var el = document.createElement('div');
    el.className = 'map-marker' + (isConfirmed ? ' confirmed' : '');
    el.style.left = markerData.x + '%';
    el.style.top = markerData.y + '%';
    el.dataset.markerId = markerData.id;

    el.innerHTML =
      '<div class="marker-pulse"></div>' +
      '<div class="marker-pin">' + PIN_SVG + '</div>' +
      '<span class="marker-check">\u2713</span>' +
      '<span class="marker-label">' + escapeHtml(markerData.label) + '</span>';

    el.addEventListener('click', function (e) {
      e.stopPropagation();
      openBottomSheet(markerData);
    });

    return el;
  }

  /**
   * Open the bottom sheet modal for a marker
   */
  function openBottomSheet(markerData) {
    var state = ER.state;
    var isConfirmed = state.readMarkers.indexOf(markerData.id) !== -1;

    var overlay = document.getElementById('bottom-sheet-overlay');
    var content = document.getElementById('bottom-sheet-content');

    var btnText = isConfirmed ? 'Site Examined' : 'Mark as Examined';

    content.innerHTML =
      '<h3 class="sheet-title">' + escapeHtml(markerData.title) + '</h3>' +
      '<div class="sheet-label">' + escapeHtml(markerData.label) + '</div>' +
      '<p class="sheet-description">' + escapeHtml(markerData.description) + '</p>' +
      '<button class="btn-confirm" id="btn-sheet-confirm"' +
        (isConfirmed ? ' disabled' : '') + '>' + btnText + '</button>';

    // Show overlay
    overlay.classList.add('active');

    // Confirm button handler
    var confirmBtn = document.getElementById('btn-sheet-confirm');
    if (!isConfirmed) {
      confirmBtn.addEventListener('click', function () {
        confirmMarker(markerData.id);
        closeBottomSheet();
      });
    }

    // Close on overlay tap (outside the sheet)
    overlay.addEventListener('click', function handler(e) {
      if (e.target === overlay) {
        closeBottomSheet();
        overlay.removeEventListener('click', handler);
      }
    });
  }

  /**
   * Close the bottom sheet
   */
  function closeBottomSheet() {
    var overlay = document.getElementById('bottom-sheet-overlay');
    overlay.classList.remove('active');
  }

  /**
   * Confirm a marker as examined
   */
  function confirmMarker(markerId) {
    var state = ER.state;
    var config = ER.config.map;

    if (state.readMarkers.indexOf(markerId) !== -1) return;

    state.readMarkers.push(markerId);

    // Update marker appearance on the map
    var markerEl = document.querySelector('.map-marker[data-marker-id="' + markerId + '"]');
    if (markerEl) {
      markerEl.classList.add('confirmed');
    }

    // Update progress
    var totalMarkers = config.markers.length;
    var readCount = state.readMarkers.length;

    var progressText = document.getElementById('map-progress-text');
    var progressFill = document.getElementById('map-progress-fill');

    if (progressText) {
      progressText.textContent = readCount + '/' + totalMarkers + ' sites examined';
    }
    if (progressFill) {
      progressFill.style.width = (readCount / totalMarkers * 100) + '%';
    }

    ER.emit('marker-read', { markerId: markerId });

    // Check if all markers are confirmed
    if (readCount >= totalMarkers) {
      // Small delay for the animation to settle before triggering the final email
      setTimeout(function () {
        ER.emit('all-markers-read');
      }, 600);
    }
  }

  /**
   * Escape HTML
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Escape for use in HTML attributes
   */
  function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
