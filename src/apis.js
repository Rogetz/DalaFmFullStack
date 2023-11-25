

// authentication apis.
export function login(userName,password){
    return new Promise(function(resolve,reject){
        fetch(process.env.API_LINK,
        {
            body: JSON.stringify({
                //query : `{login(userName:${userName},password:${password})}`,
                query : `query loginQuery($userName:String,$password:String){login(userName:$userName,password:$password){err,object}}`,
                variables : {
                    userName : userName,
                    password : password
                }
            }),
            headers : {
                "Content-Type": "application/json",
                "Authentication" : "null"
            },
            method: "POST",
            mode: "cors"
        }).then(function(response){
            /*console.log(response)
            console.log(JSON.stringify(response))*/
            // always remember to return something.
            return response.json()
        }).then(function(result){
            /*console.log(`the data here is : ${result}`)
            console.log(`the stringified data is: ${JSON.stringify(result)}`)
            console.log(`the shortened result from login is: ${result.data.login}`)
            // simply resolve whatever is returned.
            // I've created some dummy "valid" string for testing.
            console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
            */
            resolve(result.data.login)
        }).catch(function(err){
            resolve({err:"some error occured during login"})
        })
    })
}

export function forgot(userName){
    return new Promise(function(resolve,reject){
        fetch(process.env.API_LINK,
            {
                body: JSON.stringify({
                    // change this to a forgot query.
                    query : `query forgotPassword($userName:String,$password:String){forgotPassword(userName:$userName,password:$password){err,object}}`,
                    variables : {
                        userName : userName,
                        password : password
                    }
                }),
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                mode: "cors"
            }).then(function(response){
                // always remember to return something.
                return response.json()
            }).then(function(result){
                resolve(result.data.forgotPassword)
            }).catch((err) => {
                resolve({err: "error while processin your request"})
            })
    
    })
}

export function otpSender(userName){
    return new Promise(function(resolve,reject){
        // remember that fetch api is also a promise
        fetch(process.env.API_LINK,
            {
                body: JSON.stringify({
                    // change this to a forgot query.
                    query : `query otpSender($userName:String){otpSender(userName:$userName){err,object}}`,
                    variables : {
                        userName : userName
                    }
                }),
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                mode: "cors"
            }).then(function(response){
                // always remember to return something.
                return response.json()
            }).then(function(result){
                resolve(result.data.otpSender)
            }).catch(function(err){
                resolve({err: "internal server error"}) 
            })
    })
}

export function otpVerifier(otp){
    return new Promise(function(resolve,reject){
        // remember that fetch api is also a promise
        fetch(process.env.API_LINK,
            {
                body: JSON.stringify({
                    // change this to a forgot query.
                    query : `query otpConfirmation($otpPin:Int){otpConfirmation(otpPin:$otpPin){err,object}}`,
                    variables : {
                        otpPin : otpPin
                    }
                }),
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                mode: "cors"
            }).then(function(response){
                // always remember to return something.
                return response.json()
            }).then(function(result){
                resolve(result.data.otpConfirmation)
            }).catch(function(err){
                resolve({err: "error during verification"}) 
            })
    })
}

export function signupApi(user){
    return new Promise(function(resolve,reject){
        if((user.userName && user.password) && (user.email && user.fullName)){
            // remember that fetch api is also a promise
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        // change this to a forgot query.
                        query : `query signupQuery($userName:String,$password:String,$fullName:String,$email:String){signup(userName:$userName,password:$password,fullName:$fullName,email:$email){err,object}}`,
                        variables : {
                            userName : user.userName,
                            password : user.password,
                            fullName: user.fullName,
                            email: user.email
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    resolve(result.data.signup)
                }).catch(function(err){
                    resolve({err: "error during sign up"}) 
                })
        }
        else{
            // resolve an err in the obj "all field must be filled."
            resolve({err: "all fields must be filled"})
        }
    })
}
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

/*
name,
show name,
time,
photo.
*/
// presenter apis
export function findPresenter(){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        query : `presenterFind{err,object}`
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    //console.log(`the data here is : ${result}`)
                    //console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    //console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    //console.log(`the err: ${result.data.presenterFind.err} and object: ${result.data.presenterFind.object}`)
                    resolve(result.data.presenterFind)
                })
        } catch(err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function createPresenter({name,showName,time,photo}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query presenterCreateQuery($name:String,$showName:String,$time:String,$photo:String){presenterCreate(name:$name,showName:$showName,time:$time,photo:$photo){err,object}}`,
                        variables : {
                            name:name,
                            showName:showName,
                            time:time,
                            photo:photo
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.presenterCreate)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })


}
export function deletePresenter({name,showName,time,photo}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query presenterDeleteQuery($name:String,$showName:String,$time:String,$photo:String){presenterDelete(name:$name,showName:$showName,time:$time,photo:$photo){err,object}}`,
                        variables : {
                            name:name,
                            showName:showName,
                            time:time,
                            photo:photo
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.presenterDelete)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function updatePresenter({name,showName,time,photo}){
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query presenterUpdateQuery($name:String,$showName:String,$time:String,$photo:String){presenterUpdate(name:$name,showName:$showName,time:$time,photo:$photo){err,object}}`,
                        variables : {
                            name:name,
                            showName:showName,
                            time:time,
                            photo:photo
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.presenterUpdate)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
// presenter apis

// for the admin
export function findAdmin(){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        query : `findAdmin{err,object}`
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    //console.log(`the data here is : ${result}`)
                    //console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    //console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    //console.log(`the err: ${result.data.presenterFind.err} and object: ${result.data.presenterFind.object}`)
                    resolve(result.data.findAdmin)
                })
        } catch(err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function createAdmin({admin,email}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query createAdminQuery($admin:String,$email:String){createAdmin(admin:$admin,email:$email){err,object}}`,
                        variables : {
                            admin: admin,
                            email: email
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)*/
                    resolve(result.data.createAdmin)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })


}
export function deleteAdmin({admin,email}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query deleteAdminQuery($admin:String,$email:String){deleteAdmin(admin:$admin,email:$email){err,object}}`,
                        variables : {
                            admin:admin,
                            email:email   
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.deleteAdmin)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function updateAdmin({admin,email}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query updateAdminQuery($admin:String,$email:String){updateAdmin(admin:$admin,email:$email){err,object}}`,
                        variables : {
                            admin:admin,
                            email:email
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.updateAdmin)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })


}

/*
hostName,
title,
catchPhrase
video
*/
export function createTrendy({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query createTrendyQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){createTrendy(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.createTrendy)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function updateTrendy({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query updateTrendyQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){updateTrendy(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.updateTrendy)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function deleteTrendy({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query deleteTrendyQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){deleteTrendy(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.deleteTrendy)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function findTrendy(){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `findTrendy{err,object}`,
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.findTrendy)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}

// for the sports apis
export function updateSport({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query updateSportQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){updateSport(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.updateSport)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function createSport({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query createSportQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){createSport(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.createSport)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function deleteSport({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query deleteSportQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){deleteSport(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.deleteSport)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function findSport(){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `findSport{err,object}`,
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.findSport)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}

//for the hottestNews
export function updateHottestNews({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query updateHottestNewsQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){updateHottestNews(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.updateHottestNews)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function createHottestNews({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query createHottestNewsQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){createHottestNews(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.createHottestNews)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function deleteHottestNews({hostName,title,catchPhrase,video}){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query deleteHottestNewsQuery($hostName:String,$title:String,$catchPhrase:String,$video:String){deleteHottestNews(hostName:$hostName,title:$title,catchPhrase:$catchPhrase,video:$video){err,object}}`,
                        variables : {
                            hostName:hostName,
                            title:title,
                            catchPhrase:catchPhrase,
                            video:video                            
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    //console.log(response)
                    //console.log(JSON.stringify(response))
                    // always remember to return something.
                    return response.json()
                }).then(function(result){
                    /*console.log(`the data here is : ${result}`)
                    console.log(`the stringified data is: ${JSON.stringify(result)}`)
                    console.log(`the shortened result from login is: ${result.data.login}`)
                    // simply resolve whatever is returned.
                    // I've created some dummy "valid" string for testing.
                    console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
                    */
                    resolve(result.data.deleteHottestNews)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
export function findHottestNews(){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `findHottestNews{err,object}`,
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.findHottestNews)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}


/*
author,
title,
catchPhrase,
details,
pictures
*/
// ensure that the pictures is brought as it is since in my final request I'm converting everything to json before submitting them to the graphQl
export function updateBlog({author,title,catchPhrase,details,pictures}){
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        query : `query updateBlogQuery($author:String,$title:String,$catchPhrase:String,$details:String,$pictures:String){updateBlog(author:$author,title:$title,catchPhrase:$catchPhrase,details:$details,pictures:$pictures){err,object}}`,
                        variables : {
                            author:author,
                            title:title,
                            catchPhrase:catchPhrase,
                            details:details,
                            pictures:pictures
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.updateBlog)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}
// I hope that the pictures object will be read as is supposed
export function createBlog({author,title,catchPhrase,details,pictures}){
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        query : `query createBlogQuery($author:String,$title:String,$catchPhrase:String,$details:String,$pictures:String){createBlog(author:$author,title:$title,catchPhrase:$catchPhrase,details:$details,pictures:$pictures){err,object}}`,
                        variables : {
                            author:author,
                            title:title,
                            catchPhrase:catchPhrase,
                            details:details,
                            pictures:pictures
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.createBlog)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}


export function findBlog(){
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        // test if an empty query needs some data or not.
                        query : `findBlog{err,object}`
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.findBlog)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}

export function deleteBlog({author,title,catchPhrase,details,pictures}){
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        query : `query blogDeleteQuery($author:String,$title:String,$catchPhrase:String,$details:String,$pictures:String){deleteBlog(author:$author,title:$title,catchPhrase:$catchPhrase,details:$details,pictures:$pictures){err,object}}`,
                        variables : {
                            author:author,
                            title:title,
                            catchPhrase:catchPhrase,
                            details:details,
                            pictures:pictures
                        }
                    }),
                    headers : {
                        "Content-Type": "application/json",
                        "Authentication" : "null"
                    },
                    method: "POST",
                    mode: "cors"
                }).then(function(response){
                    return response.json()
                }).then(function(result){
                    resolve(result.data.deleteBlog)
                })        
        } catch (err){
            resolve({err: "error occured while processing request"})
        }
    })
}



