const checkPermission = (req, res, next) => {

    console.log('check for permission');
    const updateLevel = req.body.update;
    const cuurntPerm = req.session.authLevel;
    console.log()
    if (cuurntPerm >= 1) next();
    else res.json({ perm: false })

}



export default checkPermission;