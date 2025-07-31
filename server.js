const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const placesFilePath = path.join(__dirname, 'places.json'); // ✅ Define once here

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/places', (req, res) => {
    fs.readFile(placesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading places data' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/add-place', (req, res) => {
    const newPlace = req.body;
    console.log("Received new place:", newPlace);

    fs.readFile(placesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read places.json:', err);
            return res.status(500).send('Error reading data');
        }

        let placesData;
        try {
            placesData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Invalid JSON in places.json:', parseErr);
            return res.status(500).send('Invalid JSON structure');
        }

        placesData.places.push(newPlace);

        fs.writeFile(placesFilePath, JSON.stringify(placesData, null, 2), (err) => {
            if (err) {
                console.error('Failed to write to places.json:', err);
                return res.status(500).send('Error writing data');
            }
            console.log("Successfully saved new place.");
            res.send({ success: true });
        });
    });
});

const reportsFilePath = path.join(__dirname, 'reports.json');

app.post('/report', (req, res) => {
  const reportData = req.body;

  // Read existing reports
  fs.readFile(reportsFilePath, 'utf8', (err, data) => {
    let reports = [];
    if (!err) {
      try {
        reports = JSON.parse(data);
      } catch {
        reports = [];
      }
    }

    reports.push({
      ...reportData,
      reportedAt: new Date().toISOString()
    });

    // Write back updated reports
    fs.writeFile(reportsFilePath, JSON.stringify(reports, null, 2), err => {
      if (err) {
        console.error("Failed to save report:", err);
        return res.status(500).send('Error saving report');
      }
      res.status(200).send('Report saved');
    });
  });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});