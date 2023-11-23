

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
export function findPresenters(){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
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
                            name,
                            showName,
                            time,
                            photo
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
export function deletePresenter(name,showName,time,photo){
    // must return a promise.
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query presenterDeleteQuery($name:String,$showName:String,$time:String,$photo:String){presenterDelete(name:$name,showName:$showName,time:$time,photo:$photo){err,object}}`,
                        variables : {
                            name,
                            showName,
                            time,
                            photo
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
export function updatePresenter(name,showName,time,photo){
    return new Promise(function(resolve,reject){
        try{
            fetch(process.env.API_LINK,
                {
                    body: JSON.stringify({
                        //query : `{login(userName:${userName},password:${password})}`,
                        query : `query presenterUpdateQuery($name:String,$showName:String,$time:String,$photo:String){presenterUpdate(name:$name,showName:$showName,time:$time,photo:$photo){err,object}}`,
                        variables : {
                            name,
                            showName,
                            time,
                            photo
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

