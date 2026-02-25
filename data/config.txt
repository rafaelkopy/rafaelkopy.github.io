/**
 * Escape Room Configuration
 * Edit the values below to customize the game.
 * Keep the "window.EscapeRoomConfig =" line and the closing ";" — only edit the content between them.
 */
window.EscapeRoomConfig = {
  "login": {
    "username": "agent",
    "password": "topsecret",
    "title": "Secure Login",
    "subtitle": "Enter your credentials to access the system",
    "errorMessage": "Invalid credentials. Try again."
  },
  "inbox": {
    "accountName": "Agent Smith",
    "accountEmail": "smith@agency.org"
  },
  "emails": [
    {
      "id": "filler1",
      "from": "HR Department <hr@agency.org>",
      "subject": "Team Building Event",
      "date": "2024-03-14 09:30",
      "body": "Dear Team,\n\nThis is a friendly reminder that our annual team building event is scheduled for next Friday. Please confirm your attendance by Wednesday.\n\nActivities include trust falls, escape rooms (ironic, right?), and a barbecue lunch.\n\nBest regards,\nHR Department",
      "isMapEmail": false
    },
    {
      "id": "filler2",
      "from": "IT Support <it@agency.org>",
      "subject": "System Maintenance Notice",
      "date": "2024-03-14 14:15",
      "body": "Hello,\n\nPlease be advised that scheduled system maintenance will occur this Sunday from 02:00 to 06:00. During this time, internal systems may be temporarily unavailable.\n\nWe recommend saving all work before the maintenance window.\n\nThank you,\nIT Support Team",
      "isMapEmail": false
    },
    {
      "id": "mission",
      "from": "Director <director@agency.org>",
      "subject": "URGENT: Mission Briefing",
      "date": "2024-03-15 08:00",
      "body": "Agent,\n\nWe have identified three locations of interest that require immediate reconnaissance. Review each site on the map below and report your findings.\n\nThis is a time-sensitive operation. Examine all sites thoroughly before proceeding.\n\nGood luck.",
      "isMapEmail": true
    }
  ],
  "map": {
    "image": "assets/map.svg",
    "markers": [
      {
        "id": "marker1",
        "x": 25,
        "y": 40,
        "label": "Site Alpha",
        "title": "Abandoned Warehouse",
        "description": "An old industrial warehouse on the outskirts of the district. Satellite imagery shows recent activity — tire tracks leading to the loading dock and lights observed at night. Local records indicate the building was decommissioned in 2019, yet power consumption data suggests otherwise. Approach with caution."
      },
      {
        "id": "marker2",
        "x": 60,
        "y": 30,
        "label": "Site Beta",
        "title": "Old Radio Tower",
        "description": "A decommissioned radio transmission tower on Miller's Hill. Our signals intelligence team has detected encrypted shortwave broadcasts originating from this location at irregular intervals. The tower was officially shut down in 2015, but the antenna array appears to have been recently modified. The surrounding area is fenced off with new security equipment."
      },
      {
        "id": "marker3",
        "x": 75,
        "y": 65,
        "label": "Site Gamma",
        "title": "Underground Bunker",
        "description": "A Cold War-era underground bunker beneath the old municipal building. Official records claim it was sealed in 1991, but thermal imaging reveals heat signatures consistent with active ventilation systems. A confidential informant reported seeing supply deliveries to the site within the last 48 hours. This may be the primary operations center."
      }
    ]
  },
  "finalEmail": {
    "from": "Director <director@agency.org>",
    "subject": "Mission Update: New Intel Received",
    "date": "2024-03-15 08:45",
    "body": "Well done, Agent.\n\nYour reconnaissance has been invaluable. Based on the intelligence you gathered from all three sites, our analysts have triangulated the target's location.\n\nThe primary operations center is confirmed at the Underground Bunker (Site Gamma). A tactical team is being assembled for immediate deployment.\n\nYour next instructions will follow shortly. Stand by.\n\n— Director"
  }
};
