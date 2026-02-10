# Theme System Documentation

## Overview

The Secure Mail interface now includes a comprehensive theme system with three distinct themes that can be toggled on-the-fly. The system is built using CSS custom properties (CSS variables) for maximum flexibility and performance.

## Available Themes

### 1. Dark Mode (Default)
- **Icon:** 🌙
- **Design Philosophy:** Professional, modern dark interface
- **Color Scheme:** Deep blues and teals with high contrast
- **Best For:** Low-light environments, extended use, professional appearance
- **Key Features:**
  - Reduced eye strain in dark environments
  - Modern gradient backgrounds
  - Subtle shadows and elevation
  - Professional color palette

### 2. Bright Mode
- **Icon:** ☀️
- **Design Philosophy:** Clean, light, contemporary
- **Color Scheme:** Light backgrounds with vibrant blue accents
- **Best For:** Well-lit environments, daytime use, high clarity
- **Key Features:**
  - High contrast for excellent readability
  - Clean, minimal aesthetic
  - Soft shadows for depth
  - Optimized for outdoor/bright viewing

### 3. Old School
- **Icon:** 🖥️
- **Design Philosophy:** Retro terminal aesthetic with modern technical implementation
- **Color Scheme:** Classic green-on-black CRT monitor style
- **Best For:** Nostalgic experience, unique visual identity, retro gaming aesthetic
- **Key Features:**
  - CRT monitor effects (scan lines)
  - Phosphor glow on text and elements
  - Monospace font throughout
  - Terminal-style borders
  - Pixel-perfect design elements
  - Matrix-style background animations
  - Green text glow effects
  - Sharp, crisp edges instead of rounded corners

## Technical Implementation

### Architecture

The theme system uses a multi-layered approach:

1. **CSS Custom Properties** (`style.css`)
   - Base variables defined in `:root`
   - All colors, shadows, and spacing use variables
   - Enables instant theme switching without page reload

2. **Theme Manager** (`js/theme.js`)
   - JavaScript module that manages theme state
   - Applies theme by updating CSS custom properties
   - Persists theme choice to localStorage
   - Provides public API for theme control

3. **Theme-Specific Styles** (`css/themes.css`)
   - Additional styling per theme (e.g., CRT effects for Old School)
   - Body class modifiers (`theme-darkmode`, `theme-bright`, `theme-oldschool`)
   - Responsive adjustments
   - Accessibility enhancements

### File Structure

```
C:\tmp\Claude Spielwiese\
├── css/
│   ├── style.css         # Base styles with CSS variables
│   └── themes.css        # Theme-specific overrides and UI
├── js/
│   ├── theme.js          # Theme management system
│   ├── app.js            # Main application
│   ├── login.js          # Login functionality
│   ├── inbox.js          # Email inbox
│   └── map.js            # Map interactions
├── index.html            # Main application
└── theme-preview.html    # Theme showcase page
```

## User Interface

### Theme Selector Location

The theme selector is integrated into the sidebar navigation:

```
┌─────────────────────────┐
│ 🔒 SecureMail           │
├─────────────────────────┤
│ 📧 Inbox            [3] │
├─────────────────────────┤
│                         │
│ [Account Info]          │
├─────────────────────────┤
│ THEME             [🌙]  │ ← Quick toggle
│ ┌─────────────────────┐ │
│ │ 🌙 Dark Mode       │ │ ← Radio button style
│ │ ☀️ Bright Mode     │ │
│ │ 🖥️ Old School      │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

### Controls

1. **Quick Toggle Button** - Top-right of theme section
   - Cycles through themes in sequence
   - Shows current theme icon
   - Keyboard accessible

2. **Individual Theme Buttons**
   - Direct selection of any theme
   - Visual indication of active theme
   - Fully accessible with ARIA labels

## Usage

### For End Users

#### Changing Themes

**Method 1: Quick Toggle**
- Click the icon button (🌙/☀️/🖥️) in the theme section
- Cycles through: Dark → Bright → Old School → Dark

**Method 2: Direct Selection**
- Click any theme button to switch immediately
- Active theme is highlighted with border

**Persistence**
- Your theme choice is saved automatically
- Returns to your preferred theme on reload

### For Developers

#### Programmatic Theme Control

```javascript
// Apply a specific theme
window.EscapeRoom.theme.apply('darkmode');
window.EscapeRoom.theme.apply('bright');
window.EscapeRoom.theme.apply('oldschool');

// Get current theme
var currentTheme = window.EscapeRoom.theme.getCurrent();
// Returns: 'darkmode', 'bright', or 'oldschool'

// Get all available themes
var allThemes = window.EscapeRoom.theme.getAll();
// Returns: ['darkmode', 'bright', 'oldschool']

// Cycle to next theme
window.EscapeRoom.theme.cycleNext();
```

#### Listening for Theme Changes

```javascript
window.EscapeRoom.on('theme-changed', function(event) {
  console.log('Theme changed to:', event.detail.theme);
  // Perform additional actions...
});
```

#### Adding a New Theme

1. **Define theme in `js/theme.js`:**

```javascript
var themes = {
  // ... existing themes ...

  mytheme: {
    name: 'My Theme',
    icon: '🎨',
    properties: {
      '--color-bg': '#yourcolor',
      '--color-primary': '#yourcolor',
      // ... all other variables
    }
  }
};
```

2. **Add theme-specific overrides in `css/themes.css`:**

```css
body.theme-mytheme {
  /* Special effects or overrides */
}
```

#### CSS Variables Reference

All themeable properties:

**Colors:**
- `--color-bg` - Main background
- `--color-bg-light` - Lighter background variant
- `--color-surface` - Card/surface backgrounds
- `--color-surface-hover` - Hover state for surfaces
- `--color-primary` - Primary brand color
- `--color-primary-dark` - Darker primary variant
- `--color-accent` - Accent color
- `--color-danger` - Error/danger color
- `--color-success` - Success color
- `--color-text` - Primary text color
- `--color-text-secondary` - Secondary text
- `--color-text-muted` - Muted/disabled text
- `--color-border` - Border color
- `--color-unread` - Unread indicator color
- `--color-marker` - Map marker color
- `--color-marker-done` - Completed marker color

**Shadows:**
- `--shadow-sm` - Small shadow
- `--shadow-md` - Medium shadow
- `--shadow-lg` - Large shadow
- `--shadow-xl` - Extra large shadow

**Other:**
- `--radius-sm` - Small border radius
- `--radius-md` - Medium border radius
- `--radius-lg` - Large border radius
- `--radius-xl` - Extra large border radius
- `--transition-fast` - Fast transition timing
- `--transition-normal` - Normal transition timing
- `--transition-slow` - Slow transition timing

## Design Decisions

### Why CSS Custom Properties?

1. **Performance** - No page reload required for theme changes
2. **Maintainability** - Single source of truth for colors
3. **Flexibility** - Easy to add new themes
4. **Modern** - Native browser support, no preprocessor needed

### Old School Theme Philosophy

The Old School theme achieves a retro aesthetic while remaining technically modern:

**Retro Elements:**
- CRT scan line effects
- Phosphor green glow
- Monospace typography
- Terminal-style borders
- Pixel-perfect alignment

**Modern Implementation:**
- CSS animations (not image-based)
- Smooth, hardware-accelerated effects
- Fully responsive
- Accessible (proper contrast ratios maintained)
- Performant (60fps animations)

### Accessibility Considerations

All themes maintain:
- **WCAG AA contrast ratios** (4.5:1 minimum for text)
- **Keyboard navigation** (all controls are keyboard accessible)
- **Focus indicators** (visible focus states)
- **ARIA labels** (screen reader friendly)
- **Reduced motion support** (respects prefers-reduced-motion)

## Browser Support

- **Modern browsers:** Full support (Chrome, Firefox, Safari, Edge)
- **CSS Custom Properties:** Required (IE11 not supported)
- **localStorage:** Used for persistence (graceful fallback if unavailable)

## Performance

- **No runtime overhead** - Themes are CSS-based
- **Instant switching** - No loading or delay
- **Optimized animations** - GPU-accelerated where possible
- **Small footprint** - ~15KB total (theme.js + themes.css)

## Testing

### Test the Theme System

1. **Open the preview page:**
   ```
   theme-preview.html
   ```
   View all three themes side-by-side with component examples.

2. **Test in the main app:**
   ```
   index.html
   ```
   Full integration with login, inbox, and map features.

3. **Test persistence:**
   - Switch themes
   - Refresh the page
   - Theme should persist

4. **Test responsiveness:**
   - Resize browser window
   - Theme selector adapts on mobile (icon-only view)

## Future Enhancements

Possible additions to the theme system:

- [ ] Custom theme creator (user-defined colors)
- [ ] Theme import/export
- [ ] More preset themes (high contrast, sepia, etc.)
- [ ] System preference detection (auto dark/light mode)
- [ ] Per-component theme overrides
- [ ] Animation intensity controls
- [ ] Font size controls

## Troubleshooting

**Theme doesn't persist:**
- Check localStorage is enabled in browser
- Check browser console for errors

**Old School effects not showing:**
- Ensure `themes.css` is loaded after `style.css`
- Check browser supports CSS animations

**Theme selector not appearing:**
- Verify `theme.js` is loaded before other scripts
- Check console for JavaScript errors
- Ensure `.sidebar-nav` element exists

## Credits

Theme system designed and implemented with focus on:
- User experience and accessibility
- Performance and modern web standards
- Nostalgic aesthetics with technical excellence
- Flexibility and extensibility

---

**Version:** 1.0
**Last Updated:** 2026-02-10
