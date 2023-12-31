import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(cors())
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const uri = "mongodb+srv://bhairavs0227:Bhairav221@mernstack.trytbup.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose schema and model
const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
    // Add more fields as needed
});

const Data = mongoose.model('Data', dataSchema);

// Endpoint to handle POST requests
app.post('/api/submit', (req, res) => {
    const newData = new Data(req.body);

    newData.save()
    .then(savedData => {
        res.status(200).json(savedData);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
