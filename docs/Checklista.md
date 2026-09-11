# Projektets ansvarsområden — Checklista

## Ansvarsområde 1 — Users, registrering och inloggning

### API

- [ ] Skapa modellen för users med fälten som står i uppgiften
- [ ] Bygg endpointen som registrerar en användare
  - [ ] Kontrollera att både användarnamn och lösenord kommit med i anropet
  - [ ] Hasha lösenordet med bcrypt och spara användaren med hashen
  - [ ] Kolla om användarnamnet redan är taget innan ny användare sparas → returnera 409 med felmeddelande, ex. "Username is already taken"
  - [ ] Se till att svaret inte innehåller lösenordshashen (bygg svaret för hand med bara de fält som ska visas)
- [ ] Bygg endpointen som loggar in en användare
  - [ ] Hämta användaren efter username
  - [ ] Jämför lösenordet mot hashen med bcrypt
  - [ ] Signera en token och lägg den i en httpOnly-cookie
- [ ] Skapa hanteringen för `POST /auth/logout`, som rensar cookien
- [ ] Testa steg 2–4 i Insomnia innan klienten rörs
- [ ] Bygg endpointen för att hämta alla användare och en enskild användare (båda skyddade via `verifyToken`)
  - [ ] Plocka bort lösenordsfältet ur svaret: `User.find().select('-password')`
- [ ] Bygg uppdatera och radera (båda skyddade via `verifyToken`)
  - [ ] Vid uppdatering: bara de fält som faktiskt skickats med ska ändras (PATCH ska inte nollställa resten)
  - [ ] Byts lösenord måste det hashas om innan det sparas

### Klient

- [ ] Bygg registrera-sidan med formulär
- [ ] Bygg login-sidan med formulär
  - [ ] Ta med `credentials: "include"` i varje anrop
- [ ] Bygg den lösenordsskyddade sidan
  - [ ] Fråga servern om något skyddat och titta på statuskoden (kan inte läsa httpOnly-cookien från JS)
  - [ ] Vid 401/403 → skicka användaren till inloggningssidan
  - [ ] Vid behörighet → visa lista av alla användare i adminpanelen

---

## Ansvarsområde 2 — Books

### API

- [x] Skapa modellen för books med fälten som står i uppgiften
  - [x] Stäm av med ansvarsområde 3 — boken ska kunna hämtas tillsammans med sina reviews
- [x] Bygg endpointen som hämtar alla böcker (öppen, ej inloggning krävs)
- [x] Bygg endpointen som hämtar en enskild bok med tillhörande reviews (samma mönster som todos/subtasks)
- [x] Kontrollera att skapa, uppdatera och radera ligger bakom `verifyToken`
- [x] Vid radering av en bok: radera även bokens reviews (MongoDB gör inte detta automatiskt)
- [ ] Om separat adminsida för bokhantering: lägg till skyddad route, med rätt ordning
  ```
  router.get('/', fetchAllBooks)               // öppen
  router.get('/admin', verifyToken, fetchAllBooks) // skyddad
  router.get('/:id', fetchBook)
  ```
  `/admin` måste ligga före `/:id`

### Klient

- [x] Bygg besökarnas boklista, där varje bok länkar vidare till sin egen sida (bokens id i adressfältet)
- [ ] Bygg listan över böcker i adminpanelen
- [ ] Bygg formuläret för att skapa en ny bok
  - [ ] Hantera att `genres` är en array i databasen men ett textfält i formuläret — dela upp texten innan den sparas

---

## Ansvarsområde 3 — Reviews

### API

- [X] Skapa modellen för reviews (kopplingen till boken fungerar som `todo_id` på subtasks — barnet håller förälderns id)
- [X] Koppla ihop bok och reviews så en bok kan hämtas med alla sina reviews i ett anrop (görs tillsammans med ansvarsområde 2)
- [X] Bygg endpoints för att hämta alla reviews och en enskild review (båda öppna)
- [X] Bygg endpointen för att skapa en review (öppen — inget konto krävs)
  - [X] Kontrollera att betyget ligger mellan 1 och 5
  - [X] Kontrollera att boken faktiskt finns innan reviewen sparas
- [X] Bygg uppdatera och radera (båda bakom `verifyToken`)

### Klient

- [X] Bygg boksidan (läser bokens id ur adressfältet, samma mönster som todo.html)
  - [X] Del 1: bokens uppgifter med en tillbaka-länk
  - [X] Del 2: formulär för en ny review
  - [X] Del 3: lista med bokens reviews
- [X] När en ny review sparats: hämta boken igen med tillhörande reviews så listan uppdateras

---

## Att tänka på

- [X] Ansvarsområde 2 och 3 måste komma överens om kopplingen mellan bok och review — görs tillsammans
- [X] Under väntetid: bygg klart API-delarna och bygg klienten med hårdkodad testdata i HTML:en
