const dalaDb = require("./dalaDatabase")

/*
name,
show name,
time,
photo.
*/
// for creating a  presenter
exports.createPresenter = async function createPresenter({name,showName,time,photo}){
    return new Promise(async function(resolve,reject){
        try {
            await dalaDb.insertPresenter([{name,showName,time,photo}])
            resolve({err: null,object:"presenter created successfully"} )        
        } catch (error) {
            reject(error)
        }
    })
}
exports.findPresenter = async function findPresenter(){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findPresenter({})
            resolve({err: null,object:results} )        
        } catch (error) {
            reject(error)
        }
    })
}
// for deleting a presenter
exports.deletePresenter = async function deletePresenter({name,showName}){
    //at no point in time will two name sakes share the same showName.
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findPresenter({$and: [{name: {$regex: `${name}`}},{showName: {$regex: `${showName}`}}]})
            if(results.length >= 1){
                //delete the presenter
                await dalaDb.deletePresenter({name,showName})
                resolve({err: null,object:"presenter deleted successfully"}) 
            }
            else{
                resolve({err: "Invalid presenter or show name",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}
// for updating a presenter's details
exports.updatePresenter = async function updatePresenter({name,showName,time,photo}){
    return new Promise(async function(resolve,reject){
        try {
            if(!time && !photo){
                resolve({err: "provide the time and photo to update"}) 
            }
            let results = await dalaDb.findPresenter({$and: [{name: {$regex: `${name}`}},{showName: {$regex: `${showName}`}}]})  
            if(results.length >= 1){
                //update the presenter
                await dalaDb.updatePresenter({$and: [{name: {$regex: `${name}`}},{showName: {$regex: `${showName}`}}]},{$set: {name: name,showName:showName,time: time,photo:photo}})
                resolve({err: null,object:"presenter info updated successfully"}) 
            }
            else{
                resolve({err: "Invalid presenter or show name",object:null}) 
            }
        
        } catch (error) {
            reject(error)
        }
    })

}

exports.createAdmin = async function createAdmin({admin,email}){
    return new Promise(async function(resolve,reject){
        try {
            await dalaDb.insertAdmin([{admin,email}])
            resolve({err: null,object:"presenter created successfully"} )        
        } catch (error) {
            reject(error)
        }
    })
}
exports.findAdmin = async function findAdmin(){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findAdmin({})
            resolve({err: null,object:results} )        
        } catch (error) {
            reject(error)
        }
    })
}
// for deleting a presenter
exports.deleteAdmin = async function deleteAdmin({admin,email}){
    //at no point in time will two name sakes share the same showName.
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findAdmin({$and: [{admin: {$regex: `${admin}`}},{email: {$regex: `${email}`}}]})
            if(results.length >= 1){
                //delete the presenter
                await dalaDb.deletePresenter({admin,email})
                resolve({err: null,object:"presenter deleted successfully"}) 
            }
            else{
                resolve({err: "Invalid presenter or show name",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}
exports.updateAdmin = async function updateAdmin({admin,email}){
    return new Promise(async function(resolve,reject){
        try {
            if(!time && !photo){
                resolve({err: "provide the time and photo to update"}) 
            }
            let results = await dalaDb.findAdmin({$and: [{admin: {$regex: `${admin}`}},{email: {$regex: `${email}`}}]})  
            if(results.length >= 1){
                //update the presenter
                await dalaDb.updateAdmin({$and: [{email: {$regex: `${email}`}},{admin: {$regex: `${admin}`}}]},{$set: {admin: admin,email:email}})
                resolve({err: null,object:"presenter info updated successfully"}) 
            }
            else{
                resolve({err: "Invalid presenter or show name",object:null}) 
            }
        
        } catch (error) {
            reject(error)
        }
    })

}

/*
Trending Videos
hostName,
title,
catchPhrase
video
*/
// for creating a trendyVideo
exports.createTrendy = async function createTrendy({hostName,title,catchPhrase,video}){
    return new Promise(async function(resolve,reject){
        try {
            await dalaDb.insertTrendy([{hostName,title,catchPhrase,video}])
            resolve({err: null,object:"trendy video created successfully"})         
        } catch (error) {
            reject(error)
        }
    })
}
exports.findTrendy = async function findTrendy(){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findTrendy({})
            resolve({err: null,object:results} )        
        } catch (error) {
            reject(error)
        }
    })
}
// for deleting a trendyVideo
exports.deleteTrendy = async function deleteTrendy({hostName,title}){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findTrendy({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //delete the trendy
                await dalaDb.deleteTrendy({hostName,title})
                resolve({err: null,object:"presenter deleted successfully"}) 
            }
            else{
                resolve({err: "Invalid host name or title",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}
// for updating a trendy details
exports.updateTrendy = async function updateTrendy({hostName,title,catchPhrase,video}){
    return new Promise(async function(resolve,reject){
        try {
            if(!catchPhrase && !video){
                resolve({err: "provide the catchPhrase and video to update"}) 
            }
        
            let results = await dalaDb.findTrendy({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //update the trendy
                await dalaDb.updateTrendy({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]},{$set: {hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}})
                resolve({err: null,object:"trendy  info updated successfully"}) 
            }
            else{
                resolve({err: "Invalid host Name or title ",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}



/*
sports
hostName,
title,
catchPhrase
video
*/
exports.createSport = async function createSport({hostName,title,catchPhrase,video}){
    return new Promise(async function(resolve,reject){
        try {
            await dalaDb.insertSport([{hostName,title,catchPhrase,video}])
            resolve({err: null,object:"trendy video created successfully"})         
        } catch (error) {
            reject(error)
        }
    })
}
exports.findSport = async function findSport(){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findSport({})
            resolve({err: null,object:results} )        
        } catch (error) {
            reject(error)
        }
    })
}
// for deleting a sport
exports.deleteSport = async function deleteSport({hostName,title}){
    //at no point in time will two name sakes share the same showName.
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findSport({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //delete the sport
                await dalaDb.deleteSport({hostName,title})
                resolve({err: null,object:"presenter deleted successfully"}) 
            }
            else{
                resolve({err: "Invalid host name or title",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}
// for updating a sport details
exports.updateSport = async function updateSport({hostName,title,catchPhrase,video}){
    return new Promise(async function(resolve,reject){
        try {
            if(!catchPhrase && !video){
                resolve({err: "provide the catchPhrase and video to update"}) 
            }
        
            let results = await dalaDb.findSport({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //update the sport
                await dalaDb.updateSport({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]},{$set: {hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}})
                resolve({err: null,object:"trendy  info updated successfully"}) 
            }
            else{
                resolve({err: "Invalid host Name or title ",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}


/*
Hottest news
hostName,
title,
catchPhrase
video
*/
exports.createHottestNews = async function createHottestNews({hostName,title,catchPhrase,video}){
    return new Promise(async function(resolve,reject){
        try {
            await dalaDb.insertHottestNews([{hostName,title,catchPhrase,video}])
            resolve({err: null,object:"trendy video created successfully"})         
        } catch (error) {
            reject(error)
        }
    })
}
exports.findHottestNews = async function findHottestNews(){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findHottestNews({})
            resolve({err: null,object:results} )        
        } catch (error) {
            reject(error)
        }
    })
}
// for deleting a hot news
exports.deleteHottestNews = async function deleteHottestNews({hostName,title}){
    //at no point in time will two name sakes share the same showName.
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findHottestNews({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //delete the news
                await dalaDb.deleteHottestNews({hostName,title})
                resolve({err: null,object:"presenter deleted successfully"}) 
            }
            else{
                resolve({err: "Invalid host name or title",object:null}) 
            }           
        } catch (error) {
            reject(error)
        }
    })

}
// for updating a new's details
exports.updateHottestNews = async function updateHottestNews({hostName,title,catchPhrase,video}){
    return new Promise(async function(resolve,reject){
        try {
            if(!catchPhrase && !video){
                resolve({err: "provide the catchPhrase and video to update",object:null}) 
            }
        
            let results = await dalaDb.findHottestNews({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //update the news
                await dalaDb.updateHottestNews({$and: [{hostName: {$regex: `${hostName}`}},{title: {$regex: `${title}`}}]},{$set: {hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}})
                resolve({err: null,object:"trendy  info updated successfully"}) 
            }
            else{
                resolve({err: "Invalid host Name or title ",object:null}) 
            }        
        } catch (error) {
            reject(error)
        }
    })

}


/*
blogSection
author,
title,
catchPhrase,
details,
pictures
*/
// note that pictures is an array here
exports.createBlog = async function createBlog({author,title,catchPhrase,details,pictures}){
    // pictures here is an object cause I want a key to show where it belongs or rather the figure no, since I want to know where to place it.
    return new Promise(async function(resolve,reject){
        try {
            await dalaDb.insertBlog([{author,title,catchPhrase,details,pictures}])
            resolve({err: null,object:"blog created successfully"})         
        } catch (error) {
            reject(error)
        }
    })
}
exports.findBlog = async function findBlog(){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findBlog({})
            resolve({err: null,object:results} )        
        } catch (error) {
            reject(error)
        }
    })
}
// continue from here.
// for deleting a blog
exports.deleteBlog = async function deleteBlog({author,title}){
    return new Promise(async function(resolve,reject){
        try {
            let results = await dalaDb.findBlog({$and: [{author: {$regex: `${author}`}},{title: {$regex: `${title}`}}]})
    
            if(results.length >= 1){
                //delete the blog
                await dalaDb.deleteBlog({author,title})
                resolve({err: null,object:"blog deleted successfully"}) 
            }
            else{
                resolve({err: "Invalid author or title",object:null}) 
            }                    
        } catch (error) {
            reject(error)
        }
    })
}
// for updating a blog's details
exports.updateBlog = async function updateBlog({author,title,catchPhrase,details,pictures}){
    return new Promise(async function(resolve,reject){
        try {
            if(!catchPhrase && !video){
                resolve({err: "provide the catchPhrase and video to update",object:null})
            }
            let results = await dalaDb.findBlog({$and: [{author: {$regex: `${author}`}},{title: {$regex: `${title}`}}]})
            if(results.length >= 1){
                //update the blog
                await dalaDb.updateBlog({$and: [{author: {$regex: `${author}`}},{title: {$regex: `${title}`}}]},{$set: {author:author,title:title,catchPhrase:catchPhrase,details:details,pictures:pictures}})
                resolve({err: null,object:"blog  info updated successfully"}) 
            }
            else{
                resolve({err: "Invalid author or title ",object:null}) 
            }                    
        } catch (error) {
            reject(error)            
        }
    })
}

