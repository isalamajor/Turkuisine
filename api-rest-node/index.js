const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");


// Connect to database
connection();

// Create node server
const app = express();
const port = 3090;

// Configure CORS
app.use(cors());

// Convert body to JS object
app.use(express.json()); 

// Convertir cada propiedad del body en una propiedad de objeto json (form-url-encoded)
app.use(express.urlencoded({extended:true}));

// Paths
const paths_article = require("./paths/Article");

// Charge paths
app.use("/api", paths_article);


// Create paths
app.get("/testing", (req, res) => {
    console.log("Testing endpoint executed");

    // Status es el código HTTP que devuelve, 200 =  correcto
    return res.status(200).send(`
        <div>Creando ruta nodeJS</div>
    `);
})
app.get("/testing2", (req, res) => {
    console.log("Testing endpoint executed");

    // Status es el código HTTP que devuelve, 200 =  correcto
    return res.status(200).json([{
        nombre: "isa",
        edad:21
    }]);
})


// Create server and listen http petitions
app.listen(port, () => { console.log("Server running in port " + port); });