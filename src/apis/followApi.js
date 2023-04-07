import { Router } from "express";
import { Service } from "../models/model.js";
import authorizationFun from "../units/authorization.js";

///////////////////////////////////
const followApi = new Router();
followApi.use(authorizationFun)
followApi.get('/:title/:level', (req, res) => {
    console.log('you are in follow up api ')
    const title = req.params.title
    const level = req.params.level;
    console.log(title, level)
    if (req.session.authLevel === 1)
        Service.find({ owner: req.session.currentId, title }, { updates: 0 })
        .then(result => res.json(result))
        .catch(err => res.json(err))

    else if (req.session.authLevel > 1)
        Service.find({ lastUpdate: level, title })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

followApi.get('/:id', (req, res) => {
    console.log('find by id ')
    const id = req.params.id;
    console.log(id)
    if (id) Service.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json({ dbErr: true }))
    else res.json({ wrongId: true })
        // else Service.find({ lastUpdate })
        //     .then(result => res.json(result))
        //     .catch(err => res.json({ dbErr: true }))


})



export default followApi;