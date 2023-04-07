import { Router } from "express";

const logoutApi = new Router();


logoutApi.get('', (req, res) => {

    console.log('logout api fired')
    res.clearCookie();
    req.session.destroy();

    res.json({ logout: true, user: null })


})


export default logoutApi;