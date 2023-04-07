const formValidation = (form, shema) => {
    const { error } = shema.validate(form, { abortEarly: false })
    return error;

}

export default formValidation;