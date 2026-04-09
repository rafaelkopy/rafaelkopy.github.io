/**
 * Escape Room Configuration
 * Edit the values below to customize the game.
 * Keep the "window.EscapeRoomConfig =" line and the closing ";" — only edit the content between them.
 */
window.EscapeRoomConfig = {
  "login": {
    "username": "FWB",
    "password": "1926",
    "title": "Geheimes Tagebuch Karl Justus Bergmann",
    "subtitle": "Nur wer seinen Ur-Ur-Opa schätzt, kommt hier weiter",
    "errorMessage": "Falsche Zugangsdaten, versuche es erneut."
  },
  "Einträge": {
    "accountName": "Geheimes Tagebuch Karl Justus Bergmann",
    "accountEmail": "liebedashandwerk@cronenberg.org"
  },
  "emails": [
    {
      "id": "filler1",
      "subject": "Der Fund",
      "date": "2026-06-29 09:30",
      "body": "Im alten, leerstehenden Haus meines Opas habe ich auf dem Dachboden eine kleine Holzkiste entdeckt.\nDarin: vergilbte Seiten, handgeschrieben.\nDer Name darauf: Friedrich Wilhelm Bergmann – mein Ururgroßvater.\nEr schrieb über Arbeit, Zweifel\nund einen Preis, den er nie bekommen hat.\nBeim Lesen fühlte es sich an,\nals würde er endlich gehört.",
      "isMapEmail": false
    },
    {
      "id": "filler2",
      "subject": "In Erinnerung",
      "date": "2026-07-01 14:15",
      "body": "Ich habe seine Worte immer wieder gelesen.\nEr verlor den Preis nur knapp.\nEin Satz blieb mir im Kopf:\n\u201eVielleicht war meine Arbeit richtig, aber zur falschen Zeit.\u201c\nHeute kennt niemand mehr seinen Namen.\nDer Preis wird gefeiert \u2013\nseine Geschichte nicht.",
      "isMapEmail": false
    },
    {
      "id": "mission",
      "subject": "Der Plan",
      "date": "2026-07-04 08:00",
      "body": "Der Preis steht glänzend in der Vitrine.\nIch will ihn nicht stehlen.\nIch will nur an meinen Ururopa erinnern.\nIch bringe ihn an drei Orte:\nzum alten Haus, zur Bibliothek,\nzum Friedhof und dann zurück.\nDer Preis soll bleiben.\nAber mit einer Geschichte mehr.",
      "isMapEmail": true
    }
  ],
  "map": {
    "image": "assets/cronenberg_map.jpeg",
    "markers": [
      {
        "id": "marker1",
        "x": 69.9,
        "y": 30.9,
        "label": "Wohnhaus Friedrich Wilhelm Bergmann",
        "title": "Wohnhaus Friedrich Wilhelm Bergmann",
        "description": "In diesem Fachwerkhaus lebte und arbeitete Friedrich Wilhelm Bergmann um 1900. Werkstatt und Zuhause waren eins. Viele seiner Werkzeuge entstanden hier – lange bevor große Firmen Cronenberg prägten."
      },
      {
        "id": "marker2",
        "x": 49.3,
        "y": 52.0,
        "label": "Haus des Großvaters (Fundort Tagebuch)",
        "title": "Haus des Großvaters (Fundort Tagebuch)",
        "description": "Nach dem Tod des Großvaters wurde das Haus leer. Auf dem Dachboden fand Karl Justus die Tagebücher seines Ururgroßvaters. Dieser Fund brachte eine fast vergessene Geschichte wieder ans Licht."
      },
      {
        "id": "marker3",
        "x": 44.3,
        "y": 40.5,
        "label": "Werkzeugkiste Ehrenmal",
        "title": "Werkzeugkiste Ehrenmal",
        "description": "Am 04.07.2026 wurde der Preis des Handwerks im Rahmen der Werkzeugkiste ausgestellt. Von hier aus begann die ungewöhnliche Geschichte rund um den verschwundenen Preis."
      },
      {
        "id": "marker4",
        "x": 44.3,
        "y": 44,
        "label": "Stadtteilbibliothek Cronenberg (Fundort)",
        "title": "Stadtteilbibliothek Cronenberg (Fundort)",
        "description": "In der Bibliothek suchte Karl Justus nach Informationen über den Preis des Handwerks. Er ließ den Preis für einen kurzen Moment aus den Augen. Diesen Moment habt ihr genutzt und den Preis an euch genommen."
      }
    ]
  },
  "news_story": {
    "subject": "Presseartikel WZ einen Tag später",
    "date": "2026-07-05 08:45",
    "body": "Cronenberg - Am vergangenen Samstag, den 04.07.2026, sorgte das kurzzeitige Verschwinden des Preises des Handwerks für Aufregung auf dem Festgelände der Werkzeugkiste. Wie sich nun herausstellte, wurde der Preis nicht gestohlen, sondern von einem 12-jährigen Jungen vorübergehend an andere Orte in Cronenberg gebracht. Hintergrund war der Fund alter Tagebücher seines Ururgroßvaters, eines Handwerkers, der Anfang des 20. Jahrhunderts in Cronenberg tätig war und knapp an der Auszeichnung vorbeigegangen war. Der Junge handelte laut Polizei weder aus Boshaftigkeit noch mit Bereicherungsabsicht. Der Preis wurde unversehrt zurückgebracht.\n\u201eEs ging ihm darum, eine vergessene Geschichte sichtbar zu machen\u201c, so ein Sprecher. Eine Anzeige wurde nicht erstattet. Stattdessen wurde die Aktion als Anlass genommen, über die Bedeutung von Handwerk und seine vielen stillen Vertreter zu sprechen.\nAn dem Preis wurde ein Zettel mit einer Zahlenfolge gefunden, welche sich die Polizei bisher nicht erklären konnte, 0407. Die Polizei bittet darum, sachdienliche Hinweise an die nächste Polizeidienststelle zu melden oder das Rätsel selbst zu lösen ;)"
  }
};