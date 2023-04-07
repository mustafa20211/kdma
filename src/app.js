import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import homeApi from './apis/homeApi.js';
import loginApi from './apis/loginApi.js';
import signUpApi from './apis/signUpAPi.js';
import { Customer, Employee } from './models/model.js';
import multer from 'multer';
import followApi from './apis/followApi.js';
import serviceApplyApi from './apis/serviceApplyApi.js';
import updateApi from './apis/upateApi.js';
import logoutApi from './apis/logoutApi.js';
import { config } from 'dotenv';
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

config()
const port = process.env.PORT;
const db_uri = process.env.DB_URI;
////////////////////
const app = express();

///////////////////// main  midllware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../fornt-end/build')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(session({
    secret: "fe frjg ir n",
    saveUninitialized: false,
    resave: false,
}))

////////////////////// apis 
app.use('/home', homeApi)
app.use('/login', multer().none())
app.use('/login', loginApi)
app.use('/signup', multer().none())
app.use('/signup', signUpApi, )
app.use('/followup', followApi)
app.use('/apply', serviceApplyApi)
app.use('/logout', logoutApi)
app.use('/update', multer().none())
app.use('/update', updateApi)

//////////////////////////////////// serve all static forent in production mode
app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../fornt-end/build/index.html"))
    })
    ////////////////////// running on port

mongoose.connect(db_uri)
    .then(e => app.listen(port, e => { console.log(`running on port ${port}`) }))
    .catch(err => console.log('CAN NOT CONNECT TO DB '))