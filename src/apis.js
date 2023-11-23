

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
            console.log(response)
            console.log(JSON.stringify(response))
            // always remember to return something.
            return response.json()
        }).then(function(result){
            console.log(`the data here is : ${result}`)
            console.log(`the stringified data is: ${JSON.stringify(result)}`)
            console.log(`the shortened result from login is: ${result.data.login}`)
            // simply resolve whatever is returned.
            // I've created some dummy "valid" string for testing.
            console.log(`the err: ${result.data.login.err} and object: ${result.data.login.object}`)
            resolve(result.data.login)
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
                resolve({err: "internal server error"}) 
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
                    resolve({err: "internal server error"}) 
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
}
export function createPresenter(name,showName,time,photo){
    // must return a promise.

}
export function deletePresenter(name,showName,time,photo){
    // must return a promise.
}
export function updatePresenter(name,showName,time,photo)

