# Al-Medina Bremen: Website

Fertige statische Website für Al-Medina, Restaurant und Fleischerei in Bremen-Vegesack. Reines HTML, CSS und Bilder, ohne Build-Schritt. Die Seiten werden in einem separaten Projekt aus den Speisekarten-Daten erzeugt, hier liegt nur das Ergebnis.

## Auf Vercel veröffentlichen

1. Dieses Repository ins eigene GitHub-Konto übernehmen (forken oder klonen und als neues Repository hochladen).
2. Auf vercel.com: **Add New**, **Project**, das Repository importieren.
3. Framework Preset **Other**, Build Command und Output Directory leer lassen, **Deploy**.

`vercel.json` setzt Sicherheits-Header, lange Cache-Zeiten für Bilder und Schriften und leitet zum Beispiel `/allergene` auf `/allergene/` um. Links, Sitemap und QR-Codes zeigen auf `https://www.al-medina-bremen.de`. Die Domain kann in Vercel unter **Settings**, **Domains** verbunden werden.

## Hinweise

- Impressum und Datenschutz enthalten noch rot markierte Platzhalter (E-Mail-Adresse, Hoster). Vor dem Livegang ergänzen lassen.
- Änderungen nicht hier vornehmen, sondern im Ursprungsprojekt neu erzeugen und diesen Ordner ersetzen.
- Schriften: Big Shoulders Display, Figtree und IBM Plex Mono unter der SIL Open Font License, Lizenztexte in `fonts/lizenzen/`.
