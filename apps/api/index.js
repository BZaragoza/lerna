// const http = require('http');
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import "./src/config/config.js"; 

import pool from './src/database.js'
import declareRoutes from './src/routes/index.js'

const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));

const app = express();
declareRoutes(app, pool)

app.use(express.static(path.join(__dirname, 'client/')));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const index = path.join(__dirname, 'client', 'index.html');
    res.sendFile(index);
})

http.createServer(app).listen(process.env.PORT, function () {
    console.log(`Running on port ${process.env.PORT}`);
});
