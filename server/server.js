var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var cors = require('cors');  // Import the CORS package

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());  // Enable CORS for all routes


// GET request to fetch all data
app.get('/', function (req, res) {
    const filePath = path.join(__dirname, '..', 'P-app', 'src', 'api', 'data.json');
    console.log("Attempting to read file from:", filePath); // Log the full path
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err); // Log the specific error
            res.status(500).send('Error reading file');
            return;
        }
        res.end(data);
    });
});

// GET request to fetch a specific project by id
app.get('/projects/:id', function (req, res) {
    const id = parseInt(req.params.id, 10); // Convert id to integer

    const filePath = path.join(__dirname, '..', 'P-app', 'src', 'api', 'data.json');
    
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err); // Log the specific error
            res.status(500).send('Error reading file');
            return;
        }

        let jsonData = JSON.parse(data);

        // Find the project with the specified id
        const project = jsonData.find(item => item.id === id);

        if (!project) {
            res.status(404).send('Project not found');
            return;
        }

        res.json(project);
    });
});




// POST request to add a new project
app.post('/api/projects', function (req, res) {
    const newProject = req.body;

    const filePath = path.join(__dirname, '..', 'P-app', 'src', 'api', 'data.json');
    
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }

        let jsonData = JSON.parse(data);

        // Generate a new id based on the existing ids
        const newId = jsonData.length ? Math.max(...jsonData.map(item => item.id)) + 1 : 1;
        newProject.id = newId;

        // Set creation and update timestamps
        const timestamp = new Date().toLocaleString();
        newProject.createdAt = timestamp;
        newProject.updatedAt = timestamp;

        // Add the new project to the data array
        jsonData.push(newProject);

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', function (err) {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error writing to file');
                return;
            }
            // Send the newly added project back in the response
            res.status(201).json(newProject);
        });
    });
});


// PUT request to edit data by id
app.put('/api/projects/:id', function (req, res) {
    const id = parseInt(req.params.id, 10); // Convert id to integer
    const updatedData = req.body;

    const filePath = path.join(__dirname, '..', 'P-app', 'src', 'api', 'data.json');
    
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err); // Log the specific error
            res.status(500).send('Error reading file');
            return;
        }

        let jsonData = JSON.parse(data);

        // Find the index of the item with the specified id
        const itemIndex = jsonData.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            res.status(404).send('Item not found');
            return;
        }

        // Update the item with new data
        jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedData };

        // Update the 'updatedAt' timestamp
        jsonData[itemIndex].updatedAt = new Date().toLocaleString();

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', function (err) {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error writing to file');
                return;
            }
            res.send('Data updated successfully');
        });
    });
});

// DELETE request to delete a project by id
app.delete('/api/projects/:id', function (req, res) {
    const id = parseInt(req.params.id, 10); // Convert id to integer

    const filePath = path.join(__dirname, '..', 'P-app', 'src', 'api', 'data.json');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err); // Log the specific error
            res.status(500).send('Error reading file');
            return;
        }

        let jsonData = JSON.parse(data);

        // Find the index of the item with the specified id
        const itemIndex = jsonData.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            res.status(404).send('Item not found');
            return;
        }

        // Remove the item from the data array
        jsonData.splice(itemIndex, 1);

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', function (err) {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error writing to file');
                return;
            }
            res.send('Project deleted successfully');
        });
    });
});

var server = app.listen(5000, function () {
    console.log("Express App running at http://127.0.0.1:5000/");
});