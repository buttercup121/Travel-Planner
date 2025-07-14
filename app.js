const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Enable Cross-Origin Requests (CORS)
app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML page)
app.use(express.static('public')); // Assuming your HTML file is inside a "public" folder

// Variable to store user data in memory
let userData = {}; // This will hold the user data temporarily

app.post('/submit', (req, res) => {
    userData = req.body; // Store the received form data in userData
    console.log('Received form data:', userData);

    // Write the received form data to a file (appending)
    fs.appendFile('data.txt', JSON.stringify(userData) + '\n', (err) => {
        if (err) {
            console.log('Error writing to file:', err);
            res.status(500).json({ message: 'Error saving data' }); // Send JSON error response
        } else {
            res.status(200).json({ message: 'Data saved successfully' }); // Send JSON success response
        }
    });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
