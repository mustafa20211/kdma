import { json, Router } from "express";
import authorizationFun from "../units/authorization.js";

const homeApi = new Router();
homeApi.use(authorizationFun)
homeApi.get('', (req, res) => {
    console.log('home api')

    if (req.session.authLevel == 1) res.json({ user: req.session.currentName, level: req.session.authLevel, id: req.session.currentId })
    else if (req.session.authLevel > 1) {

        res.json({ user: req.session.currentName, level: req.session.authLevel, id: req.session.currentId })

    }


})



export default homeApi;