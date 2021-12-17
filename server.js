const express = require("express");
const bodyParser = require("body-parser"); // Parse the request and create the req.body object.
const cors = require("cors"); // Provides Express middleware to enable CORS with various options.
const db = require("./app/models");

const app = express();

// Connect mongodb.
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the database successfully.");
    }).catch(err => {
        console.log("Cannot connect to the database. \n", err);
        process.exit();
    });

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


// Parse requests of content-type - application/json.
// Present and transforms the text-based JSON input into JS-accessible variables under req.body.
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route.
app.get("/", (req, res) => {
    res.json({ message: "Welcome to arthur & ella application." });
});

require("./app/routes/user.routes")(app);

// Set port, listen for request.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
