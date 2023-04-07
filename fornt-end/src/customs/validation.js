import Joi from "joi"


const validateFun = (form, schema) => {

    return schema.validate(form, { abortEarly: false })

}


const signUpSchema = Joi.object({
    name: Joi.string().required(),
    natId: Joi.number().required(),
    phone: Joi.number().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    repassword: Joi.ref("password"),


})

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
})


const newOrderShema = Joi.object({

    ownerName: Joi.string().required(),
    ownerId: Joi.number().required(),
    phone: Joi.number().required(),
    adress: Joi.string().required(),
    doc1: Joi.string().required().pattern(/(.jpg|.png)$/),
    doc2: Joi.string().required().pattern(/(.jpg|.png)$/),
})


export { validateFun, loginSchema, newOrderShema, signUpSchema };