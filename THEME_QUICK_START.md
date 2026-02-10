# Theme System Quick Start

## Getting Started in 30 Seconds

### Files Added
- `C:\tmp\Claude Spielwiese\css\themes.css` - Theme-specific styling
- `C:\tmp\Claude Spielwiese\js\theme.js` - Theme management system
- `C:\tmp\Claude Spielwiese\theme-preview.html` - Preview all themes

### Files Modified
- `C:\tmp\Claude Spielwiese\index.html` - Added theme.js and themes.css references

## How to Use

### For Users

1. **Open the application:** `index.html`
2. **Log in** with credentials (check config.js)
3. **Find the theme selector** in the sidebar (bottom section)
4. **Click any theme button** or use the quick toggle (icon button)

### Keyboard Shortcuts
- `Tab` - Navigate between theme buttons
- `Enter` or `Space` - Activate selected theme
- Quick toggle cycles: Dark → Bright → Old School → Dark

## Three Themes

### 🌙 Dark Mode (Default)
- Professional dark interface
- Blue/teal color scheme
- Best for low-light use

### ☀️ Bright Mode
- Clean light interface
- High contrast
- Best for well-lit environments

### 🖥️ Old School
- Retro terminal style
- Green-on-black CRT aesthetic
- Scan lines & phosphor glow
- Monospace fonts
- Matrix-style effects

## Preview Page

Open `theme-preview.html` to see:
- All three themes side-by-side
- Color palettes
- Component examples
- Quick theme switcher (top-right)

## Quick Test

1. Open `index.html` in your browser
2. Click the theme quick-toggle button (🌙 icon in sidebar)
3. Watch the interface transform instantly
4. Refresh the page - your theme choice persists!

## Programmatic Control

```javascript
// Switch to specific theme
window.EscapeRoom.theme.apply('darkmode');
window.EscapeRoom.theme.apply('bright');
window.EscapeRoom.theme.apply('oldschool');

// Cycle to next theme
window.EscapeRoom.theme.cycleNext();

// Get current theme
var theme = window.EscapeRoom.theme.getCurrent();
```

## Customization

All theme colors are defined in `js/theme.js` in the `themes` object. To customize:

1. Open `js/theme.js`
2. Find the theme you want to modify
3. Change color values in the `properties` object
4. Refresh the page

## Browser Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- CSS Custom Properties support (all modern browsers)

## What Makes Old School Special?

The Old School theme isn't just green text - it's a complete retro experience:

- **CRT scan lines** - Animated horizontal lines like old monitors
- **Phosphor glow** - Text and elements glow with green light
- **Terminal borders** - Bold, crisp borders instead of rounded corners
- **Monospace everywhere** - Courier font throughout
- **Matrix scrolling** - Subtle background animation
- **Pixel-perfect** - Sharp, retro alignment
- **BUT** - 100% modern CSS, fully accessible, 60fps smooth

It's nostalgia meets modern web standards!

## Troubleshooting

**Theme selector not visible?**
- Ensure you're on the inbox screen (after login)
- Check browser console for errors

**Themes not switching?**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check browser console for JavaScript errors

**Old School effects missing?**
- Some effects require modern CSS support
- Check if browser supports CSS animations

## Next Steps

- Read `THEME_SYSTEM.md` for complete documentation
- Explore `theme-preview.html` for visual reference
- Customize themes in `js/theme.js`
- Add your own theme following the examples

---

Enjoy your newly themed Secure Mail interface!
