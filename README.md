# LuminosCity Website

Statische Projektseite fuer LuminosCity Experience.

## Nutzung

Die Website besteht aus reinen HTML-, CSS- und JavaScript-Dateien und kann direkt im Browser geoeffnet werden:

- `index.html` ist die Hauptseite.
- `regelwerk.html` enthaelt das vollstaendige Regelwerk.
- `style.css` enthaelt das gemeinsame Design.
- `script.js` enthaelt Countdown, Navigation und Scroll-Animationen.

## Deployment

Die Domain wird ueber `CNAME` gesetzt. Fuer GitHub Pages oder einen anderen Static-Host muessen alle Dateien im Repository-Root ausgeliefert werden.

## Animationen

Die Website nutzt CSS-Animationen fuer Hero-Hintergrund, Kartenlinien, Buttons, Cards, Statistiken und Logo-Elemente. Fuer Nutzer mit reduzierter Bewegungs-Praeferenz greift `prefers-reduced-motion`.

## Slideshow

Die Startseite enthaelt unter `#einblicke` eine Slideshow fuer Server-Eindruecke. Bilder, Titel und Beschreibungen werden direkt in `index.html` gepflegt; die Steuerung liegt in `script.js`, das Styling in `style.css`.

## Rechtliche Asset-Hinweise

Die aktive Website nutzt wieder das vorhandene Logo in Navbar und Favicon. Hero und Community-CTA bleiben ohne alte PNG-Keyvisuals. Die folgenden Dateien liegen weiterhin im Repository:

- `bannerlumi.png` (aktive Navbar-Wortmarke)
- `hintergrundlumi.png`
- `LumiLogo.png` (aktives Footer- und Touch-Icon)
- `tx_discord_lumi_thumbnail.png`
- `tx_discord_lumi_thumbnail500x500.png`
- `favicon.png` (aktives Favicon)

Neue visuelle Hero- und CTA-Elemente bestehen aus eigenem HTML/CSS.

## Externe Links

- Discord-Einladung: `https://discord.gg/mZbZmxQd2Q`
- Server-Join-Link: `https://play.luminoscity.de` bzw. `https://cfx.re/join/3eoy9y`
