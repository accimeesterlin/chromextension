// Load Packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load External Files
const handler = require('./server.js/handler/errorHelper');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
    // TODO
    res.json({
        status: 'success',
        statusCode: 200,
        message: 'It works'
    });
});

app.use(handler.error);

app.listen(PORT, () => {
    console.log(`App is starting at port ${PORT}`);
});

app.post("/api/MgrCreateAccount", function (req, res) {
    console.log("req.body = ", req.body);
    db.Manager.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            organization_name: req.body.organization_name,
            city: req.body.city,
            password: req.body.password,
            // passwordConf: req.body.passwordConf    
        })
        .then(function (dbManager) {
            console.log("event is through the API-ROUTE");
            res.redirect("/MgrLogIn"); //this does not cause an error
        });
});

// VIEW ROUTE

app.get("/MgrLogIn", function (req, res) {
    console.log('MANGER LOGIN GET FIRED!')
    res.render("MgrLogIn");
});
}