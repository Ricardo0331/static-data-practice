const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");


app.get("/users", (req, res) => {
    res.json({ data: users });
});

app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId; 
    const user = users.find((user) => user.id === Number(userId));
    
    if (user) {
        res.json({ data: user})
    } else {
        res.status(404).send(`User ID not found: ${userId}`);
    }
});

app.get("/states", (req, res) => {
    res.json({ data: states});
})

app.get("/states/:stateCode", (req, res) => {
    const stateCode = req.params.stateCode;
    const stateName = states[stateCode];

    if (stateName) {
        res.json({ data: {stateCode, name: stateName} })
    } else {
        res.status(404).send(`State code not found: ${stateCode}`)
    }
});

app.use((req, res) => {
    res.status(404).send(`Not found: ${req.originalUrl}`);
});


// 404 Not Found handler
app.use((req, res) => {
    res.status(404).send(`Not found: ${req.originalUrl}`);
  });
  
  // Custom error handler
  app.use((err, req, res, next) => {
    console.error(err); // Log the error
    res.status(500).send('Something went wrong!');
  });
  

module.exports = app;
