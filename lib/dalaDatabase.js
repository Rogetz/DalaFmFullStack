// Ouline
// The presenters collection,the trendingVideos,the sports,the hottest news
//Presenter's shema
/*
name,
show name,
time,
photo.
*/
/*
Trending Videos
hostName,
title,
catchPhrase
video
*/
/*
sports
hostName,
title,
catchPhrase
video
*/
/*
Hottest news
hostName,
title,
catchPhrase
video
*/
/*
blogSection
author,
title,
catchPhrase,
details,
pictures
*/
const mongoose = require("mongoose")
require("dotenv").config({path: "D:/PublishWebApps/DalaFm/fullStack/.env"})

mongoose.connect(process.env.MONGODB_NEW_CONNECTION)

/*
name,
show name,
time,
photo.
*/
const presenterSchema = new mongoose.Schema({
    name: String,
    showName: String,
    time: String,
    photo: String
})
const presenterModel = mongoose.model("Presenter",presenterSchema)
exports.findPresenter = async function findPresenter(data){
    let presenters = await presenterModel.find(data)
    return presenters
}
exports.deletePresenter = async function deletePresenter(data){
    await presenterModel.deleteMany(data)
}
// updates done in the native mongodb syntax
// this method works for both the $push and the $set
exports.updatePresenter = async function updatePresenter(data1,data2){
    // PresenterModel.updateOne()
    // the data should atleast be more specific since that would help
    await presenterModel.updateMany(data1,data2)
}
// This method is the one called when adding a new Presenter data for the first time
exports.insertPresenter = async function insertItems(data){
    await presenterModel.insertMany(data)
}

const adminSchema = new mongoose.Schema({
    admin: String,
    email: String,
})
const adminModel = mongoose.model("admin",adminSchema)
// admin methods
exports.findAdmin = async function findAdmin(data){
    let admins = await adminModel.find(data)
    return admins
}
exports.deleteAdmin = async function deleteAdmin(data){
    await adminModel.deleteMany(data)
}
// updates done in the native mongodb syntax
// this method works for both the $push and the $set
exports.updateAdmin = async function updateAdmin(data1,data2){
    // PresenterModel.updateOne()
    // the data should atleast be more specific since that would help
    await adminModel.updateMany(data1,data2)
}
// This method is the one called when adding a new Presenter data for the first time
exports.insertAdmin = async function insertItems(data){
    await adminModel.insertMany(data)
}



/*
Trending Videos
hostName,
title,
catchPhrase
video
*/
let trendySchema = new mongoose.Schema({
    hostName: String,
    title: String,
    catchPhrase: String,
    video:String
})
// needs the insert,update and find methods
let trendyModel = mongoose.model("Trendy",trendySchema)

// find data from a Trendy
exports.findTrendy = async function findTrendy(data){
    let trendy = await trendyModel.find(data)
    return trendy
}
exports.deleteTrendy = async function deleteTrendy(data){
    await trendyModel.deleteMany(data)
}
// updates done in the native mongodb syntax
// this method works for both the $push and the $set
exports.updateTrendy = async function updateTrendy(data1,data2){
    // TrendyModel.updateOne()
    // the data should atleast be more specific since that would help
    await trendyModel.updateMany(data1,data2)
}
// This method is the one called when adding a new Trendy data for the first time
exports.insertTrendy = async function insertItems(data){
    await trendyModel.insertMany(data)
}

/*
sports
hostName,
title,
catchPhrase
video
*/
let sportSchema = new mongoose.Schema({
    hostName: String,
    title: String,
    catchPhrase: String,
    video: String
})
// needs the insert,update and find methods
let sportModel = mongoose.model("Sport",sportSchema)

// find data from a Sport
exports.findSport = async function findSport(data){
    let sports = await sportModel.find(data)
    return sports
}
exports.deleteSport = async function deleteSport(data){
    await sportModel.deleteMany(data)
}
// updates done in the native mongodb syntax
// this method works for both the $push and the $set
exports.updateSport = async function updateSport(data1,data2){
    await sportModel.updateMany(data1,data2)
}
exports.insertSport = async function insertItems(data){
    await sportModel.insertMany(data)
}

/*
Hottest news
hostName,
title,
catchPhrase
video
*/
let hottestNewsSchema = new mongoose.Schema({
    hostName: String,
    title: String,
    catchPhrase: String,
    video: String
})
// needs the insert,update and find methods
let hottestNewsModel = mongoose.model("HottestNews",hottestNewsSchema)

// find data from a HottestNews
exports.findHottestNews = async function findHottestNews(data){
    let hottestNews = await hottestNewsModel.find(data)
    return hottestNews
}
exports.deleteHottestNews = async function deleteHottestNews(data){
    await hottestNewsModel.deleteMany(data)
}
// updates done in the native mongodb syntax
// this method works for both the $push and the $set
exports.updateHottestNews = async function updateHottestNews(data1,data2){
    // HottestNewsModel.updateOne()
    // the data should atleast be more specific since that would help
    await hottestNewsModel.updateMany(data1,data2)
}
// This method is the one called when adding a new HottestNews data for the first time
exports.insertHottestNews = async function insertItems(data){
    await hottestNewsModel.insertMany(data)
}


/*
blogSection
author,
title,
catchPhrase,
details,
pictures
*/
let blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    catchPhrase: String,
    details: String,
    // let the pictures be an array of object with picture tag as the key but the actual picture as the value, so that you xan easily locate a specific image at the specific point its meant to be.
    pictures: Array
})
// needs the insert,update and find methods
let blogModel = mongoose.model("Blog",blogSchema)

// find data from a Blog
exports.findBlog = async function findBlog(data){
    let Blogs = await blogModel.find(data)
    return Blogs
}
exports.deleteBlog = async function deleteBlog(data){
    await blogModel.deleteMany(data)
}
// updates done in the native mongodb syntax
// this method works for both the $push and the $set
exports.updateBlog = async function updateBlog(data1,data2){
    // BlogModel.updateOne()
    // the data should atleast be more specific since that would help
    await blogModel.updateMany(data1,data2)
}
// This method is the one called when adding a new Blog data for the first time
exports.insertBlog = async function insertItems(data){
    await blogModel.insertMany(data)
}

