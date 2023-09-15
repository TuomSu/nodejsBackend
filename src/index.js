"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var logger_js_1 = require("./utils/logger.js");
var index_js_1 = require("./routes/index.js");
var app = (0, express_1.default)();
var port = 3335;
dotenv_1.default.config({}); // Reads the .env values from disk
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api", index_js_1.default);
app.listen(port, function () {
    logger_js_1.default.log('info', "Backend starting on port ".concat(port));
});
