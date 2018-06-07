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