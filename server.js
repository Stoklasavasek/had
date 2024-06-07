const express = require('express'); // Importuje Express framework
const bodyParser = require('body-parser'); // Importuje body-parser middleware
const fs = require('fs'); // Importuje modul pro práci se souborovým systémem
const path = require('path'); // Importuje modul pro práci s cestami

const app = express(); // Vytvoří novou instanci Express aplikace
const port = 3000; // Nastaví port, na kterém bude server naslouchat

// Nastaví statický adresář pro servírování statických souborů
app.use(express.static(path.join(__dirname, 'public')));

// Nastaví body-parser middleware pro parsování JSON požadavků
app.use(bodyParser.json());

// Endpoint pro uložení skóre
app.post('/api/scores', (req, res) => {
    const { name, score } = req.body; // Získá jméno a skóre z těla požadavku

    // Načtení existujících výsledků ze souboru
    let scores = [];
    try {
        const data = fs.readFileSync('scores.json', 'utf8'); // Čte obsah souboru scores.json
        scores = JSON.parse(data); // Parsuje JSON data do JavaScript pole
    } catch (err) {
        console.error('Error reading scores file:', err); // Zaznamená chybu při čtení souboru
    }

    // Přidání nového skóre do pole
    scores.push({ name, score });

    // Seřazení výsledků od nejvyššího k nejnižšímu podle skóre
    scores.sort((a, b) => b.score - a.score);

    // Omezení počtu výsledků na prvních 5
    scores = scores.slice(0, 5);

    // Uložení aktualizovaných výsledků zpět do souboru
    try { // try = zkusí zapsat score
        fs.writeFileSync('scores.json', JSON.stringify(scores), 'utf8'); // Píše JSON data do scores.json
        console.log('Scores successfully saved.'); // Zaznamená úspěšné uložení
    } catch (err) {
        console.error('Error writing scores file:', err); // Zaznamená chybu při zápisu do souboru
    }

    res.status(201).send(scores); // Odesílá odpověď s aktualizovanými výsledky a status kódem 201 (Created)
});

// Endpoint pro servírování hlavní HTML stránky
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Odesílá index.html soubor jako odpověď
});

// Endpoint pro získání nejlepších skóre
app.get('/api/scores', (req, res) => {
    let scores = [];
    try {
        const data = fs.readFileSync('scores.json', 'utf8'); // Čte obsah souboru scores.json
        scores = JSON.parse(data); // Parsuje JSON data do JavaScript pole
    } catch (err) {
        console.error('Error reading scores file:', err); // Zaznamená chybu při čtení souboru
    }

    res.status(200).send(scores); // Odesílá odpověď s výsledky a status kódem 200 (OK)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`); // Zaznamená spuštění serveru a port, na kterém naslouchá
});
