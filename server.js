
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const wisataRouter = require('./routes/wisataRoutes.js');
const ulasanRouter = require('./routes/ulasanRoutes.js');
const authRouter = require('./routes/authRoutes.js');
const eventRouter = require('./routes/eventRoutes.js');
const artikelRouter = require('./routes/artikelRoutes.js');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/api', wisataRouter);
app.use('/ulasan', ulasanRouter);
app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/artikel', artikelRouter);

app.use((err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(3999,() => console.log('Server is running on port 3999'));
