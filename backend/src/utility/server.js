const express = require("express");
const cors = require('cors');
const router = require("../routes");
const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);
const compression = require('compression');
const mongoose = require("mongoose");
const { initial } = require('./helper');
const path = require("path");
const { customLogger } = require("./logger");

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    let corsOptions = {
        origin : config.ORIGIN
    };
    app.use(cors(corsOptions));
    app.use(compression());
    app.use('/api', router);
    app.use(express.static(path.join(__dirname, "/../../../frontend/build")));

    /** 
     * DB connection
     */
    mongoose.connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
        customLogger.log('info', 'Grow10x Database connected successfully!!');
        initial();
    });

    app.get("/", (req, res) => {
    res.json({ message: "Welcome to Grow10x Portal." });
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../../../frontend/build/index.html'));
    })
    return app;
}

module.exports = { createServer };