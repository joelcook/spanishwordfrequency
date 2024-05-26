const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, './')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Uncomment if you want to edit the code and save a new word frequency file
// app.post('/save-words', (req, res) => {
//     const data = req.body;
//     const tsvData = Object.entries(data).map(([word, frequency]) => `${word}\t${frequency}`).join('\n');
//     const filePath = path.join(__dirname, 'word-frequencies.tsv');
//     fs.writeFile(filePath, tsvData, (err) => {
//         if (err) {
//             console.error('Failed to save data to file:', err);
//             res.status(500).send('Failed to save data');
//         } else {
//             res.status(200).send('Data successfully saved');
//         }
//     });
// });
