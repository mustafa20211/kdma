import { Router } from "express";
import path from "path";
import formValidation from "../units/formValidation.js";
import { applicationSchema } from "../units/formSchema.js";
import { Service } from "../models/model.js";
import multer, { MulterError } from "multer";
import authorizationFun from "../units/authorization.js";
//////////////////////////////////////////// storage 
const storage = multer.diskStorage({
    destination: 'src/assets',
    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname)

        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
        cb(null, '' + file.fieldname + "-" + unique)
    }
})

/////////////////////////////// upload function
const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 mega
        files: 2
    },
    fileFilter: (req, file, cb) => {
        const applicationForm = {...req.body }
        const formValidationError = formValidation(applicationForm, applicationSchema)
        const type = file.mimetype
        if (!formValidationError) {

            if (type == 'image/png' || type == "image/jpg" || type == "image/jpeg") cb(null, true)

            else cb(new MulterError('type error'))

        } else cb(new Error('formvalidation Error'))
    }
})

/////////////////////////////////////// creater
const serviceApplyApi = new Router();
//////////////////////////////////////////// midllware fun 
serviceApplyApi.use(authorizationFun)

serviceApplyApi.use(upload.fields([{ maxCount: 1, name: "doc1" }, { maxCount: 1, name: "doc2" }]))
serviceApplyApi.use((err, req, res, next) => {
    console.log(err)
    if (err instanceof(multer.MulterError)) {
        console.log('upload err' + err.code)
        res.json({ created: false, error: err.code })
    } else {
        console.log(' not   another err is >> ')
        res.json({ created: false, error: 'formValidation' })
    }

});

////////////////////////////////////// main router handler
serviceApplyApi.post('', (req, res) => {
    console.log('you are in apply to service api ')
    const doc1 = '/assets/' + req.files['doc1'][0].filename
    const doc2 = '/assets/' + req.files['doc2'][0].filename
    const dbForm = {...req.body,
        doc1,
        doc2,
        lastUpdate: 1,
        updates: [{
            level: 1,
            employee: '',
        }]
    }
    console.log(dbForm)

    Service.insertMany([dbForm])
        .then(result => res.json({ created: true, regst: result.id }))
        .catch(err => res.json({ created: false, err: 'db error ' }))


})


export default serviceApplyApi;