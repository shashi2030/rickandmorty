const express = require('express');
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => { 
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})