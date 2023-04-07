import mongoose from "mongoose";

/////////////////// create schema

const customerSch = mongoose.Schema({

    name: String,
    natId: Number,
    phone: Number,
    password: String,
    userName: String,
    authLevel: { default: 0, type: Number }

})

const employeeSch = mongoose.Schema({

    name: String,
    natId: Number,
    phone: Number,
    userName: String,
    password: String,
    authLevel: Number,
})
const serviceSch = mongoose.Schema({
    owner: String, // ref to customer  
    title: String,
    lastUpdate: Number,
    updates: [{
        level: [],
        employee: String,
        date: {
            type: Date,
            default: Date.now
        },
        comment: String,
    }],
    doc1: String,
    doc2: String,
    ownerName: String,
    phone: Number,
    adress: String,
    ownerId: Number,
    requirements: [],
    technicalStudy: String,
    coastEst: Number, // coast estimation

})

/////////////////////////// models 


const Customer = mongoose.model('Customer', customerSch);
const Employee = mongoose.model('Employee', employeeSch);
const Service = mongoose.model('Service', serviceSch);
/////////////////////////// exporting 


export { Customer, Employee, Service };