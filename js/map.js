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
    // Wire up speech-bubble close controls once the DOM is ready
    var closeBtn = document.getElementById('bubble-close');
    var backdrop = document.getElementById('bubble-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMarkerBubble);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeMarkerBubble);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMarkerBubble();
      }
    });

    // Close when the user scrolls (bubble is fixed, scrolling the map looks odd)
    document.addEventListener('scroll', closeMarkerBubble, true);
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
          readCount + '/' + totalMarkers + ' Orte besucht' +
        '</span>' +
        '<div class="map-progress-bar">' +
          '<div class="map-progress-fill" id="map-progress-fill" style="width:' +
            (totalMarkers > 0 ? (readCount / totalMarkers * 100) : 0) + '%"></div>' +
        '</div>' +
      '</div>';

    // Map container with image and markers
    var mapHtml =
      '<div class="map-container" id="map-container">' +
        '<img src="' + escapeAttr(config.image) + '" alt="Karte" ' +
          'onerror="this.style.display=\'none\';this.parentNode.insertAdjacentHTML(\'beforeend\',\'<div class=map-placeholder>Kartenbild nicht gefunden – lege deine Karte ab unter: ' + escapeAttr(config.image) + '</div>\')">' +
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
      '<span class="marker-check">\u2713</span>';

    el.addEventListener('click', function (e) {
      e.stopPropagation();
      var bubble = document.getElementById('marker-bubble');
      // Toggle: clicking the same marker again closes the bubble
      if (bubble && bubble.classList.contains('active') && bubble.dataset.markerId === String(markerData.id)) {
        closeMarkerBubble();
        return;
      }
      openMarkerBubble(markerData, el);
    });

    return el;
  }

  /**
   * Open a speech-bubble popup anchored to the clicked marker element.
   * The bubble automatically flips above/below the marker depending on
   * available viewport space, and the tail always points at the marker.
   */
  function openMarkerBubble(markerData, markerEl) {
    var state = ER.state;
    var isConfirmed = state.readMarkers.indexOf(markerData.id) !== -1;

    var bubble = document.getElementById('marker-bubble');
    var content = document.getElementById('bubble-content');
    var backdrop = document.getElementById('bubble-backdrop');

    var btnText = isConfirmed ? 'Ort besucht' : 'Als besucht markieren';

    content.innerHTML =
      '<h3 class="sheet-title">' + escapeHtml(markerData.title) + '</h3>' +
      '<p class="sheet-description">' + escapeHtml(markerData.description) + '</p>' +
      '<button class="btn-confirm" id="btn-sheet-confirm"' +
        (isConfirmed ? ' disabled' : '') + '>' + btnText + '</button>';

    // Tag the bubble with which marker it belongs to (for toggle detection)
    bubble.dataset.markerId = String(markerData.id);

    // Position bubble relative to the marker, respecting viewport edges
    positionBubble(bubble, markerEl);

    bubble.classList.add('active');
    backdrop.classList.add('active');

    // Confirm button handler
    var confirmBtn = document.getElementById('btn-sheet-confirm');
    if (!isConfirmed) {
      confirmBtn.addEventListener('click', function () {
        confirmMarker(markerData.id);
        closeMarkerBubble();
      });
    }
  }

  /**
   * Close the speech bubble.
   */
  function closeMarkerBubble() {
    var bubble = document.getElementById('marker-bubble');
    var backdrop = document.getElementById('bubble-backdrop');
    if (bubble) {
      bubble.classList.remove('active');
      bubble.dataset.markerId = '';
    }
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  }

  /**
   * Calculate and apply the best position for the speech bubble relative to
   * the given marker element.  The bubble prefers opening ABOVE the marker;
   * if there is not enough room it opens BELOW.  It is then clamped
   * horizontally so it never overflows the viewport.  Finally the tail arrow
   * is shifted to still point at the marker's centre.
   */
  function positionBubble(bubble, markerEl) {
    var TAIL_GAP = 10;      // px gap between bubble edge and marker
    var MARGIN = 14;        // min distance from any viewport edge
    var TAIL_HALF = 6;      // half of the 12 px tail element
    var TAIL_CLAMP = 18;    // min distance of tail centre from bubble corners

    var rect = markerEl.getBoundingClientRect();
    // Horizontal anchor: centre of the marker pin
    var anchorX = rect.left + rect.width / 2;

    // Read bubble dimensions (content already set, opacity 0, still in layout)
    var bw = bubble.offsetWidth;
    var bh = bubble.offsetHeight;

    // --- Vertical direction ---
    var spaceAbove = rect.top - TAIL_GAP - MARGIN;
    var spaceBelow = window.innerHeight - rect.bottom - TAIL_GAP - MARGIN;
    // Prefer above; fall back to below; if neither fits pick the larger side
    var openAbove = (spaceAbove >= bh) || (spaceAbove >= spaceBelow && spaceAbove >= bh * 0.5);

    var bubbleTop;
    if (openAbove) {
      bubbleTop = rect.top - bh - TAIL_GAP;
      bubble.className = 'marker-bubble tail-bottom';
    } else {
      bubbleTop = rect.bottom + TAIL_GAP;
      bubble.className = 'marker-bubble tail-top';
    }

    // Clamp vertically so the bubble never goes off the top/bottom edge
    bubbleTop = Math.max(MARGIN, Math.min(bubbleTop, window.innerHeight - bh - MARGIN));

    // --- Horizontal position: centre on marker, then clamp ---
    var bubbleLeft = anchorX - bw / 2;
    bubbleLeft = Math.max(MARGIN, Math.min(bubbleLeft, window.innerWidth - bw - MARGIN));

    // --- Tail position ---
    // The tail's visual centre should align with anchorX
    var tailCenterX = anchorX - bubbleLeft;
    // Clamp so the tail never runs into the rounded corners
    tailCenterX = Math.max(TAIL_CLAMP, Math.min(tailCenterX, bw - TAIL_CLAMP));

    // --- Set transform-origin so the scale animation grows from the tail ---
    var originY = openAbove ? bh : 0;
    bubble.style.transformOrigin = tailCenterX + 'px ' + originY + 'px';

    // Apply position
    bubble.style.left = bubbleLeft + 'px';
    bubble.style.top  = bubbleTop  + 'px';

    // Move the tail element
    var tailEl = bubble.querySelector('.bubble-tail');
    tailEl.style.left = (tailCenterX - TAIL_HALF) + 'px';
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
      progressText.textContent = readCount + '/' + totalMarkers + ' Orte besucht';
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
