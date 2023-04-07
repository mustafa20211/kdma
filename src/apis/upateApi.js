import { Router } from "express";
import { Service } from "../models/model.js";
import authorizationFun from "../units/authorization.js"
import checkPermission from "../units/checkPermission.js"
import { Types } from "mongoose";
///////////////////////////////////////////////////////
const updateApi = new Router();
updateApi.use(authorizationFun);
updateApi.use(checkPermission);
updateApi.post('/:id', (req, res) => {
    console.log('you are in update module ')
    const updateToken = {...req.body };
    const id = req.params.id

    let requirements;
    let coastEstTok;
    let technicalStudy;
    const lastUpdate = Number(updateToken.lastUpdate);
    if (lastUpdate === 3) {
        let req0 = Number(updateToken.req0);
        let req1 = Number(updateToken.req1);
        let req2 = Number(updateToken.req2);
        requirements = [req0, req1, req2];
        technicalStudy = updateToken.techStudy;
        coastEstTok = 50 + (req0 * 10) + (req1 * 15) + (req2 * 20);

    } else {
        requirements = [];
        coastEstTok = 0;
    }
    //console.log(requirements, coastEst, technicalStudy)
    const comment = updateToken.comment;
    const level = [Number(updateToken.from), lastUpdate]
    console.log('all data is ', updateToken)
    console.log('id is ', id)
    Service.findByIdAndUpdate(id, {

            $set: { lastUpdate, requirements, technicalStudy },
            $inc: { coastEst: coastEstTok },
            $push: {
                updates: {
                    comment,
                    level,
                    employee: req.session.currentName,
                }
            }
        })
        .then(re => res.json({ update: true, id: re.id, result: re }))
        .catch(re => res.json({ update: false, id: re.id }))
})


export default updateApi;