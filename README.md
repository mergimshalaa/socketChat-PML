# SocketChat-PML

## Beskrivning 
En chatt-baserad app som låter användare chatta med varandra i realtid. Chatten är byggd med React, TypeScript, styled-components, Socket.io och Vite.

## Installation & Starta projektet
För att komma igång:

Öppna terminalen och skriv in följande:
- cd server
- npm install
- npm run dev
- En ny terminal
- cd ../client
- npm install
- npm run dev

OBS: Det är viktigt att starta servern först och sedan klienten. Om du startar klienten innan servern, kommer du att se felmeddelanden i terminalen.

 **Krav för godkänt:**
- [x] Användaren får börja med att välja ett eget visningsnamn när den besöker sidan.
- [x] Det ska gå att skapa ett rum (och samtidigt gå med i rummet).
- [x] Det ska gå att lämna ett rum (tomma rum ska automatiskt försvinna).
- [x] Samtliga rum skall vara synligt i en lista.
- [x] De går att gå med i ett rum genom att klicka på det i listan.
- [x] När en användare går med i ett nytt rum ska befintligt rum lämnas automatiskt.
- [x] Användare ska kunna skicka och läsa nya meddelanden i rummet de har gått med i
- [x] När en användare håller på att skriva ett meddelande skall det synas för alla andra i
rummet.
- [x] Git & GitHub har använts.
- [x] Projektmappen innehåller en README.md fil (läs ovan för mer info).
- [x] Uppgiften lämnas in i tid!

**Krav för väl godkänt:**
- [ ] Alla punkter för godkänt är uppfyllda.
- [ ] Varje rum i listan skall även visa vilka användare som finns i rummet .
- [ ] Det ska gå att ha privata konversationer med enskilda användare (DM’s).
- [ ] Historik ska sparas för skickade meddelanden och visas när en konversation öppnas
(gäller både för Rum och för DM’s).
- [ ] När sidan laddas om ska användaren behålla sitt användarnamn, läggas tillbaka i
konversationen som den befann sig i (Rum eller DM) och kunna sina läsa tidigare DM’s.