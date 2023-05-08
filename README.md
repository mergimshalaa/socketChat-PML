# socketChat-PML

## Lab 3 - Socket Chatt
I den här inlämningen skall ni skapa en chatt-baserad app som låter användare chatta med varandra i realtid. Kommunikationen skall sättas upp och göras med socket.io. En användare skall kunna skapa ett nytt rum. Skapade rum skall visas i en lista som användare kan klicka på för att gå med i önskat rum. Väl inne i ett rum ska det vara möjligt att chatta med varandra.
Ni väljer själva om ni vill använda en utökad utvecklings-stack i projektet, notera att detta inte är ett krav. Exempel på ramverk ni kan lägga till i er stack är: Typescript, React, mm. Låt kreativiteten flöda!
För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub. Inlämningen sker som vanligt via läroplattformen där lämnar in er projektmapp som en zip-fil. I projektmappen ska det finnas (utöver all kod) en README.md fil som innehåller en titel, beskrivning av uppgiften och vad som krävs för att bygga och starta projektet. Notera att om instruktioner för hur projektet byggs och startas inte finns eller om instruktionerna är felaktiga kommer uppgiften bli underkänd.

Utöver koden ska en muntligt presentation skall genomföras per grupp där ni demar applikationen ni har skapat. Ni ska även ta upp reflektioner om projektet.
Para ihop er i grupp om tre - ni väljer själva vem ni jobbar med.

Läs noga igenom hela uppgiftsbeskrivningen tillsammans innan ni börjar.
 
 **Krav för godkänt:**
- [x] Användaren får börja med att välja ett eget visningsnamn när den besöker sidan.
- [x] Det ska gå att skapa ett rum (och samtidigt gå med i rummet).
- [ ] Det ska gå att lämna ett rum (tomma rum ska automatiskt försvinna).
- [x] Samtliga rum skall vara synligt i en lista.
- [ ] De går att gå med i ett rum genom att klicka på det i listan.
- [ ] När en användare går med i ett nytt rum ska befintligt rum lämnas automatiskt.
- [x] Användare ska kunna skicka och läsa nya meddelanden i rummet de har gått med i
- [ ] När en användare håller på att skriva ett meddelande skall det synas för alla andra i
rummet.
- [x] Git & GitHub har använts.
- [x] Projektmappen innehåller en README.md fil (läs ovan för mer info).
- [ ] Uppgiften lämnas in i tid!

**Krav för väl godkänt:**
- [ ] Alla punkter för godkänt är uppfyllda.
- [ ] Varje rum i listan skall även visa vilka användare som finns i rummet .
- [ ] Det ska gå att ha privata konversationer med enskilda användare (DM’s).
- [ ] Historik ska sparas för skickade meddelanden och visas när en konversation öppnas
(gäller både för Rum och för DM’s).
- [ ] När sidan laddas om ska användaren behålla sitt användarnamn, läggas tillbaka i
konversationen som den befann sig i (Rum eller DM) och kunna sina läsa tidigare DM’s.