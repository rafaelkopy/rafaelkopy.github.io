# Escape Room Tablet Webapp

A self-contained email inbox simulator for escape room games. Runs fully offline — just open `index.html` in a browser.

## Quick Start

1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
2. Log in with the credentials defined in `data/config.js` (default: `agent` / `topsecret`)
3. Players browse emails, find the mission briefing, examine map locations, and unlock the final email

## How It Works

1. **Login** — Players enter credentials to access the "secure" email system
2. **Inbox** — A fake email inbox with filler emails and one mission-critical email
3. **Map** — The mission email contains an interactive map with location markers
4. **Markers** — Players tap each marker, read the intel, and confirm they've examined it
5. **Final Email** — Once all markers are confirmed, a new email arrives with a notification sound

## Editing the Game Content

All game content lives in **`data/config.js`**. Open it in any text editor to customize. Only edit the content between `window.EscapeRoomConfig = {` and the closing `};` — the rest is just JSON:

### Login Credentials

```json
"login": {
  "username": "agent",
  "password": "topsecret",
  "title": "Secure Login",
  "subtitle": "Enter your credentials to access the system",
  "errorMessage": "Invalid credentials. Try again."
}
```

### Account Display

```json
"inbox": {
  "accountName": "Agent Smith",
  "accountEmail": "smith@agency.org"
}
```

### Emails

Add, remove, or edit emails in the `emails` array. Each email needs:

| Field       | Description                                              |
|-------------|----------------------------------------------------------|
| `id`        | Unique identifier (any text, no spaces)                  |
| `from`      | Sender, format: `"Name <email@example.org>"`            |
| `subject`   | Email subject line                                       |
| `date`      | Display date, format: `"YYYY-MM-DD HH:MM"`              |
| `body`      | Email body text (use `\n` for line breaks)               |
| `isMapEmail`| Set to `true` for exactly ONE email to show the map      |

### Map & Markers

```json
"map": {
  "image": "assets/map.svg",
  "markers": [
    {
      "id": "marker1",
      "x": 25,
      "y": 40,
      "label": "Site Alpha",
      "title": "Abandoned Warehouse",
      "description": "Long description text..."
    }
  ]
}
```

- **`image`** — Path to your map image (SVG, PNG, JPG all work)
- **`x`** and **`y`** — Marker position as a percentage (0–100) from the top-left corner
- **`label`** — Short label shown below the pin on the map
- **`title`** — Heading shown when the marker is tapped
- **`description`** — Full text shown in the popup

You can have any number of markers. All must be confirmed before the final email arrives.

### Final Email

```json
"finalEmail": {
  "from": "Director <director@agency.org>",
  "subject": "Mission Update: New Intel Received",
  "date": "2024-03-15 08:45",
  "body": "The conclusion text..."
}
```

This email appears automatically after all map markers are confirmed.

## Replacing the Map Image

1. Place your image file in the `assets/` folder
2. Update `"image"` in `config.js` to match the filename (e.g., `"assets/my-map.png"`)
3. Adjust marker `x`/`y` coordinates to match locations on your new map

**Tip:** Open the map in an image editor, note the pixel position of each location, then convert to percentages: `x% = (pixel_x / image_width) * 100`

## Replacing the Notification Sound

Replace `assets/notification.wav` with any audio file. Update the `src` in `index.html` if you change the filename or format.

## File Structure

```
├── index.html          # Main page (open this in browser)
├── css/style.css       # All styling
├── js/
│   ├── app.js          # App initialization & state
│   ├── login.js        # Login screen
│   ├── inbox.js        # Email list & detail views
│   └── map.js          # Map, markers & bottom sheet
├── data/config.js      # ALL editable game content (edit this!)
└── assets/
    ├── map.svg         # Map image
    └── notification.wav # Notification sound
```

## Troubleshooting

- **Blank screen?** Check the browser console (F12) for errors. Most likely `config.js` has a syntax error — validate it at [jsonlint.com](https://jsonlint.com)
- **Map not showing?** Verify the image path in `config.js` matches the actual file in `assets/`
- **No sound?** Some browsers block autoplay. The player should interact with the page first (which they do by logging in and clicking markers)
- **Want to reset?** Just refresh the page (F5). All state resets on reload
