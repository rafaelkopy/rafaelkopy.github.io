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
    "subtitle": "Nur wer seinen Ur-Opa schätzt, kommt hier weiter",
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
      "body": "Heute waren wir wieder im alten Haus von Opa. Es steht schon lange leer, seit er gestorben ist. Mama sagt immer, man müsse sich von Dingen trennen, aber dieses Haus fühlt sich an, als würde es noch atmen. Ich war auf dem Dachboden. Es roch nach Holz und Staub. Zwischen alten Werkzeugkisten und einem kaputten Stuhl habe ich eine kleine Holzkiste gefunden. Darin lagen vergilbte Seiten. Handschrift.\nOben stand ein Name: Friedrich Wilhelm Bergmann. Mein Ururgroßvater. Ich wusste gar nicht, dass er Tagebuch geführt hat. In seinen Worten ging es um Arbeit, Zweifel und um einen Preis, den er nie bekommen hat. Ich habe mich lange auf den Boden gesetzt und gelesen. Irgendwie war es, als würde er endlich jemandem seine Geschichte erzählen.",
      "isMapEmail": false
    },
    {
      "id": "filler2",
      "subject": "In Erinnerung",
      "date": "2026-07-01 14:15",
      "body": "Ich habe die Notizen jetzt mehrmals gelesen. Er schreibt, dass er knapp verloren hat. Dass sein Handwerk gut war – aber nicht gut genug für den Preis. Er war nicht wütend. Nur traurig.\nAm meisten berührte mich, dass er nur ein Jahr später verstorben ist und nie mehr die Chance bekam, den Preis zu gewinnen.\nNiemand kennt meinen Ururgroßvater. Ich habe mich gefragt:\nWas, wenn der Preis einmal zu ihm zurückkehrt?\nNicht für immer.\nNur für einen Moment. Vielleicht, damit jemand seine Geschichte hört.",
      "isMapEmail": false
    },
    {
      "id": "mission",
      "subject": "Der Plan",
      "date": "2026-07-02 08:00",
      "body": "Heute ist der Tag. Die Werkzeugkiste ist voll. Viele Menschen. Viel Lärm. Der Preis steht direkt hinter der großen Bühne am Ehrenmal. Ich weiß, dass ich nichts kaputt machen will. Ich will niemandem schaden. Ich habe mir einen Plan gemacht:\nIch bringe den Preis zuerst zum alten Haus meines Ururgroßvaters. Und dann zum Friedhof. Anlässlich seines 100. Todestages möchte ich ihm auch einmal diesen Preis überreichen.\nDanach recherchiere ich kurz etwas in der Bibliothek, bevor ich ihn zurückbringe. Versprochen!\nWenn alles gut geht,\nwird der Preis am Ende wieder dort stehen,\nwo er hingehört.",
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
  "finalEmail": {
    "subject": "Presseartikel WZ einen Tag später",
    "date": "2026-07-05 08:45",
    "body": "Cronenberg - Am vergangenen Sonntag, dem 04.07.2026, sorgte das kurzzeitige Verschwinden des Preises des Handwerks für Aufregung auf dem Festgelände der Werkzeugkiste. Wie sich nun herausstellte, wurde der Preis nicht gestohlen, sondern von einem 12-jährigen Jungen vorübergehend an andere Orte in Cronenberg gebracht. Hintergrund war der Fund alter Tagebücher seines Ururgroßvaters, eines Handwerkers, der um 1900 in Cronenberg tätig war und knapp an der Auszeichnung vorbeigegangen war. Der Junge handelte laut Polizei weder aus Boshaftigkeit noch mit Bereicherungsabsicht. Der Preis wurde unversehrt zurückgebracht.\n„Es ging ihm darum, eine vergessene Geschichte sichtbar zu machen“, so ein Sprecher. Eine Anzeige wurde nicht erstattet. Stattdessen wurde die Aktion als Anlass genommen, über die Bedeutung von Handwerk und seine vielen stillen Vertreter zu sprechen.\nDer letzte Code lautet: 42349 Herzlichen Glückwunsch!"
  }
};