import { json, Router } from "express";
import { Customer, Employee } from "../models/model.js";
const loginApi = new Router();
loginApi.post('/:client', (req, res) => {
    const client = req.params.client;
    const { userName, password } = req.body
    console.log('login api')
    console.log(password, userName)
    if (client === 'customer') {
        Customer.findOne({ password, userName })
            .then(customer => {
                if (customer) {
                    req.session.currentId = customer.id;
                    req.session.currentName = customer.name;
                    req.session.authLevel = customer.authLevel
                    res.redirect('/home')
                } else {
                    console.log('you are not user')
                    res.json({ notUser: true, login: false, notcustomer: true })

                }
            })
    } else if (client === 'employee') {
        Employee.findOne({ password, userName })
            .then(emp => {
                if (emp) {
                    req.session.currentId = emp.id;
                    req.session.currentName = emp.name
                    req.session.authLevel = emp.authLevel

                    res.redirect('/home')
                } else {
                    console.log('you are not employee')
                    res.json({ login: false, notEmp: true, notUser: true })
                }
            })
    }

})


export default loginApi;