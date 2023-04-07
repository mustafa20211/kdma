import Joi from "joi";

const signUpshema = Joi.object({
    name: Joi.string().min(10).required(),
    natId: Joi.number().min(1).max(99999999999999).required(),
    phone: Joi.number().min(1).max(999999999999).required(),
    userName: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
    authLevel: Joi.number().min(1).max(10).required(),

})

const applicationSchema = Joi.object({

    owner: Joi.string().required(), // ref to customer  
    title: Joi.string().required(),
    ownerName: Joi.string().min(5).required(),
    phone: Joi.number().required(),
    adress: Joi.string().min(5).required(),
    ownerId: Joi.number().required(),



})


export { signUpshema, applicationSchema };