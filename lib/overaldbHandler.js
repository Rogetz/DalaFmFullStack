const mongoose = require("mongoose")
require("dotenv").config({path: "D:/PublishWebApps/InspireMe/.env"})

mongoose.connect(process.env.MONGODB_NEW_CONNECTION)

// I've created it however the disadvantage is that they are just the same as my previously created methods.
// Advantage is that they have a shorter syntax.
//overall creator, for all models.
async function create(model,data){
    await model.insertMany(data)
}
// overall delete for all models
async function deleteData(model,data){
    await model.deleteMany(data)
}
async function updator(model,data1,data2){
    await model.updateMany(data1,data2)
}