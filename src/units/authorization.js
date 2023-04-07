const authorizationFun = (req, res, next) => {

    console.log(req.session.authLevel)
    if (req.session.authLevel) { next() } else res.json({ auth: false, user: false, level: null })

}


export default authorizationFun;