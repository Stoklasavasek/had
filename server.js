const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); 

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Endpoint pro uložení skóre
app.post('/api/scores', (req, res) => {
    const { name, score } = req.body; // Získání jména a skóre z požadavku

    // Načtení existujících výsledků
    let scores = [];
    try {
        const data = fs.readFileSync('scores.json', 'utf8');
        scores = JSON.parse(data);
    } catch (err) {
        console.error('Error reading scores file:', err);
    }

    // Přidání nového skóre
    scores.push({ name, score });

    // Seřazení výsledků od nejvyššího k nejnižšímu
    scores.sort((a, b) => b.score - a.score);

    // Omezení počtu výsledků na prvních 5
    scores = scores.slice(0, 5);

    // Uložení aktualizovaných výsledků
    try {
        fs.writeFileSync('scores.json', JSON.stringify(scores), 'utf8');
        console.log('Scores successfully saved.');
    } catch (err) {
        console.error('Error writing scores file:', err);
    }

    res.status(201).send(scores);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Endpoint pro získání nejlepších skóre
app.get('/api/scores', (req, res) => {
    let scores = [];
    try {
        const data = fs.readFileSync('scores.json', 'utf8');
        scores = JSON.parse(data);
    } catch (err) {
        console.error('Error reading scores file:', err);
    }

    res.status(200).send(scores);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
