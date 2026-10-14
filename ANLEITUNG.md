# Hausaufgabenheft – Einrichtung

Dauer: etwa 20 Minuten. Du brauchst dein GitHub-Konto und ein Google-Konto für Firebase.

## Teil 1: Firebase einrichten (Login und Datenbank)

1. **Projekt anlegen**
   Gehe auf <https://console.firebase.google.com> und klicke auf „Projekt erstellen“.
   Name zum Beispiel `hausaufgabenheft`. Google Analytics kannst du ausschalten.

2. **Web-App registrieren**
   In der Projektübersicht auf das Symbol `</>` (Web) klicken.
   App-Name: `Hausaufgabenheft`. Firebase Hosting **nicht** anhaken.
   Danach zeigt Firebase einen Codeblock mit `const firebaseConfig = { … }`.
   Kopiere die sechs Werte (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)
   in die Datei **`firebase-config.js`** und ersetze dort jeweils `HIER_EINFUEGEN`.
   Später findest du die Werte unter ⚙️ → Projekteinstellungen → Allgemein → Meine Apps.

3. **Login aktivieren**
   Linkes Menü → Erstellen → **Authentication** → „Jetzt starten“.
   Reiter „Anmeldemethode“ → **E-Mail-Adresse/Passwort** → aktivieren → Speichern.
   (Nur den ersten Schalter, „E-Mail-Link“ bleibt aus.)

4. **Datenbank anlegen**
   Linkes Menü → Erstellen → **Firestore Database** → „Datenbank erstellen“.
   Standort: `europe-west3 (Frankfurt)`. Modus: **Produktionsmodus**.

5. **Sicherheitsregeln eintragen**
   In Firestore den Reiter **Regeln** öffnen, den gesamten Inhalt löschen,
   den Inhalt der Datei `firestore.rules` einfügen und auf **Veröffentlichen** klicken.
   Damit kann jede Person nur ihre eigenen Aufgaben lesen und ändern.

## Teil 2: Auf GitHub hochladen

1. Auf GitHub ein neues Repository anlegen, z. B. `hausaufgabenheft` (Public).
2. „Add file“ → „Upload files“ und **alle Dateien und den Ordner `icons`** hochladen
   (index.html, sw.js, manifest.webmanifest, firebase-config.js, icons/…).
   `ANLEITUNG.md` und `firestore.rules` dürfen mit hoch, stören nicht.
3. Repository → Settings → **Pages** → Source: „Deploy from a branch“,
   Branch: `main`, Ordner: `/ (root)` → Save.
4. Nach ein bis zwei Minuten ist die App erreichbar unter
   `https://DEIN-NAME.github.io/hausaufgabenheft/`

5. **Domain in Firebase freigeben:** Authentication → Einstellungen → **Autorisierte Domains**
   → „Domain hinzufügen“ → `DEIN-NAME.github.io`.

Öffne den Link einmal selbst. Es sollte die Anmeldeseite erscheinen.
Steht dort „Noch nicht eingerichtet“, fehlen noch Werte in `firebase-config.js`.

## Teil 3: Auf ihren Geräten installieren

**Google Pixel (Chrome)**
Link öffnen → Menü ⋮ → **„App installieren“** (oder „Zum Startbildschirm hinzufügen“).

**iPad (Safari)**
Link in **Safari** öffnen → Teilen-Symbol → **„Zum Home-Bildschirm“** → Hinzufügen.

**Konto anlegen:** Auf dem ersten Gerät „Neues Konto erstellen“ antippen,
E-Mail und Passwort (mind. 6 Zeichen) eingeben. Auf dem zweiten Gerät mit denselben Daten anmelden.
Ab dann sind beide Geräte synchron. Ohne Internet funktioniert die App weiter
und gleicht ab, sobald wieder Verbindung da ist.

## Teil 4: Neue Registrierungen sperren

Sobald ihr Konto existiert:
Firebase → Authentication → **Einstellungen** → **Nutzeraktionen** →
Haken bei **„Registrierung aktivieren“** (Enable create / sign-up) entfernen → Speichern.
Danach kann niemand sonst ein Konto anlegen, auch wenn er den Link kennt.

## Später etwas ändern

1. Geänderte Dateien auf GitHub hochladen (gleicher Name überschreibt die alte Datei).
2. In `sw.js` die Zeile `const VERSION = "heft-v1";` hochzählen (`heft-v2`, …).
3. Die App lädt die neue Version beim nächsten Öffnen. Die Aufgaben bleiben erhalten.

## Wenn etwas nicht klappt

- **„E-Mail oder Passwort stimmt nicht“**: Tippfehler prüfen oder „Passwort vergessen?“ nutzen.
- **„Neue Konten können … nicht mehr erstellt werden“**: Registrierung ist gesperrt (Teil 4). Zum Anlegen kurz wieder einschalten.
- **Aufgaben erscheinen nicht auf dem anderen Gerät**: Auf beiden Geräten mit derselben E-Mail angemeldet? Firestore-Regeln veröffentlicht?
- **„Daten konnten nicht geladen werden“**: Meist fehlen die Regeln aus `firestore.rules` oder die Datenbank wurde nicht angelegt.
