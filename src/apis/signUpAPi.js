import { Router } from "express";
import Joi from "joi";
import { Customer } from "../models/model.js";
import formValidation from "../units/formValidation.js";
import { signUpshema } from "../units/formSchema.js";
const signUpApi = new Router();

signUpApi.post('/customer', (req, res) => {
    console.log('your are in sign up page')
    const form = {...req.body, authLevel: 1 }
    console.log(form)
    const result = formValidation(form, signUpshema)
    console.log(result)
    if (!result) {
        Customer.insertMany([form])
            .then(result => res.json({ created: true, redirect: "login" }))
            .catch(result => res.json({ created: false, redirect: "home" }))

    } else {
        console.log('failed')
        res.json({ formValidationFaild: true })
    }





})

export default signUpApi;