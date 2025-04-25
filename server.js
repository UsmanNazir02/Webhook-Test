
const http = require("http");
const PORT = process.env.PORT || 3021;
const express = require("express");
const cors = require("cors");
const app = express();

const httpServer = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "250mb" }));

app.get('/', (req, res) => res.json({ message: `Welcome to the Webhook Test Project` }));

const data = [];

app.get('/items', (req, res) => {
    res.json({ items: data });
});

// POST endpoint to add a new item
app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const newItem = { id: data.length + 1, name };
    data.push(newItem);
    res.status(201).json({ message: "Item added", item: newItem });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});