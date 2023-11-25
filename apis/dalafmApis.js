const {ApolloServer} = require("@apollo/server")
const {startStandaloneServer} = require("@apollo/server/standalone")
const jwt = require("jsonwebtoken")
// this will be useless outside this app since they offer ther own environment for setting the variables.
require("dotenv").config({path: "D:/PublishWebApps/DalaFm/fullStack/.env"})

//custom packages
// I'll have to shift to using the es6 syntax since modules exported in commonjs seem not to work well with destructuring.
// authentication methods
const logIn = require("../lib/auth").logIn
const signUp = require("../lib/auth").signUp
const forgotPassword = require("../lib/auth").forgotPassword
const randomizer = require("../lib/nodemailer").randomizerInt
const otpSender = require("../lib/nodemailer").sendOTP
const otpVerifier = require("../lib/nodemailer").otpVerifier
const emailFinder = require("../lib/auth").emailFinder

// presenter methods
const presenter = require("../lib/dalaDbHandler")



// so all the other apis will be checking to see if the token is null for them to provide the services.
// if the token ain't null thats when data is sent.


// note that I am using the jwt interface for authentication, such that each individual item will require someone to implement the Jwt interface.
// I can also use the context value that I set each time an apollo server is called and that is shared by each resolver.

let typeDefs = `
    type Query{
        signup(userName: String,password:String,fullName: String,email: String): Result,
        login(userName: String,password:String) : Result,
        forgotPassword(userName: String,password: String): Result,
        otpSender(userName:String): Result,
        otpConfirmation(otpPin: Int): Result,
    }
    type Query{
        presenterFind: Result,
        presenterCreate(name:String,showName:String,time:String,photo:String): Result,
        presenterUpdate(name:String,showName:String,time:String,photo:String) : Result,
        presenterDelete(name:String,showName:String,time:String,photo:String): Result,
    }
    type Query{
        createTrendy(hostName:String,title:String,catchPhrase:String,video:String):Result,
        findTrendy:Result,
        updateTrendy(hostName:String,title:String,catchPhrase:String,video:String):Result,
        deleteTrendy(hostName:String,title:String,catchPhrase:String,video:String):Result,
    }
    type Query{
        createSport(hostName:String,title:String,catchPhrase:String,video:String): Result,
        findSport: Result,
        deleteSport(hostName:String,title:String,catchPhrase:String,video:String): Result,
        updateSport(hostName:String,title:String,catchPhrase:String,video:String): Result
    }
    type Query{
        createHottestNews(hostName:String,title:String,catchPhrase:String,video:String):Result,
        findHottestNews:Result,
        deleteHottestNews(hostName:String,title:String,catchPhrase:String,video:String):Result,
        updateHottestNews(hostName:String,title:String,catchPhrase:String,video:String): Result
    }
    type Query{
        createBlog(author:String,title:String,catchPhrase:String,details:String,pictures:String):Result,
        findBlog:Result,
        deleteBlog(author:String,title:String,catchPhrase:String,details:String,pictures:String):Result,
        updateBlog(author:String,title:String,catchPhrase:String,details:String,pictures:String): Result
    }
    type Query{
        createAdmin(admin:String,email:String):Result,
        findAdmin:Result,
        deleteAdmin(admin:String,email:String):Result,
        updateAdmin(admin:String,email:String):Result
    }
    type Result{
        err: String
        object: String
    }
    interface Jwt{
        token(token: String): String
    }
    type Query{
        token(token: String): String
        tokenRequest : String
    }
`

let authenticationResolvers = {
    Query : {
        signup: async (root,args) => {
            // only passed a callback since its needed
            let {err,result} = await signUp({userName:args.userName,fullName: args.fullName,email: args.email,password:args.password},function(err,result){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("no error guys successful signup")
                }
            })
            if(err){
                return {err:err}
            }
            else{
                return {object:"signed up successfully"}
            }
        },
        login: async (root,args) => {
           let user = {
                userName: args.userName,
                password: args.password
            }
            // remember that whatever I pass here is like part of a parameter and so It can not set anything within the larger project.
            // So the solution is to make the function passing parameters to the callback to return something apart from only passing values to the callback.
            let {err,documentFound} = await logIn(user,(err,user) => {
                if(err != null){
                    //whatever youre returning is only inside this async function but not in the larger function
                    // I'll be returning an object over here since I want to be able to test if the error object is null or not.

                    return err
                }
                else{
                    // Ok I want when the user is logged in a json web token to be returned.
                    return documentFound
                }
            })
            // so I can test for the values outside the callback for them to be returned as they should.
            if(err != null){   
                return {err: err}
            }
            else{
                // The object here can be set to a json web token.
                return {object: documentFound}
            }
        } ,
        forgotPassword: async (root,args) => {
            let {err,documentFound} = await forgotPassword({userName:args.userName,password:args.password})
            if(err){
                return {err: err}
            }
            else{
                return {object : "password changed successfuly"}
            }
        },
        otpSender: (root,args) => {
            console.log(args.userName)
            // for it to actually return what's returned by the functions.
            return randomizer().then(function(generatedNo){
                if(generatedNo != null){
                    return emailFinder(args.userName).then(function(result){
                        if(result.err == null){
                            let email = result.email
                            return otpSender(email).then(function(response){
                                if(response != "internal server error"){
                                    // this should't return no message, the message is in his email
                                    return {object: 'sent'}
                                }
                                else{
                                    console.log(response)
                                    return {err:"error on sending the email"}
                                }
                            }).catch(function(err){
                                console.log(err)
                                return {err :"error on sending the email"}
                            })
        
                        }
                        else{
                            // return a user not found error, I'm not directly returning from the server since it might leak some sensitive information
                            return {err: "user not found"}
                        }
                    }).catch(function(err){
                        console.log(err)
                        return({err: "error processing email data"})
                    })
                }
            }).catch(function(err){
                console.log(err)
                return {err:"email error"}
            }) 
        },
        otpConfirmation : (root,args) => {
            return otpVerifier(args.otpPin).then(function(response){
                if(response != "redirect"){
                    return {err:"invalid"}
                }
                else{
                    return {object:"correct"}
                }
            }).catch(function(err){
                console.log(err)
                return {err:"error verifying the email."}
            })
        }
    }
}

let tokenResolver = {
    Query : {
        // for verifying the token.
        token : (root,args) => {
            let tokenReceived = args.token
            let secretKey = process.env.JWT_SECRET_KEY
            let data = jwt.verify(tokenReceived,secretKey)
            return JSON.stringify(data) 
        },
        // for signing new tokens. 
        // This shouldn't be a threat to security, since its only some dumb data that has no or some dumb data in my database.
        tokenRequest: (root,args,context) => {
            let data = {
                name: "Ronny",
                password: "test#24"
            }
            let secretKey = process.env.JWT_SECRET_KEY
            let token = jwt.sign(data,secretKey)
            return JSON.stringify({token: token,testToken:context.token})
        }
    }
} 

// for DalaFm presenters DATA
let presenterResolver = {
    Query : {
        presenterCreate : (root,args) => {
            let name = args.name
            let showName = args.showName
            let time = args.time
            let photo = args.photo
            // call the moethod fro creating the presenter Data
            return presenter.createPresenter({name:name,showName:showName,time:time,photo:photo}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createPresenter:\n ${err}`)
                return {object:null,err:"error creating the presenter"}
            })
        },
        presenterFind: (root,args) => {
            return presenter.findPresenter().then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at presenter find:\n ${err}`)
                return {object:null,err:"error searching for presenter"}
            })
        },
        presenterUpdate : (root,args) => {
            let name = args.name
            let showName = args.showName
            let time = args.time
            let photo = args.photo
    
            return presenter.updatePresenter({name:name,showName:showName,time:time,photo:photo}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at presenter update:\n ${err}`)
                return {object:null,err:"error updating the presenter"}
            })
        },
        presenterDelete : (root,args) => {
            let name = args.name
            let showName = args.showName
            let time = args.time
            let photo = args.photo
    
            return presenter.deletePresenter({name:name,showName:showName,time:time,photo:photo}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at presenter deletion:\n ${err}`)
                return {object:null,err:"error deleting the presenter"}
            })
        }    
    }
    
}

// for dalafm admins
let adminResolvers = {
    // finish on this
    Query : {
        createAdmin : (root,args) => {
            let admin = args.admin
            let email = args.email
            console.log(`admin received here is ${admin}`)
            return presenter.createAdmin({admin:admin,email:email}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at create admin:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        findAdmin : (root,args) => {
            return presenter.findAdmin().then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at find Admin:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        deleteAdmin : (root,args) => {
            let admin = args.admin
            let email = args.email
    
            return presenter.deleteAdmin({admin:admin,email:email}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at deleting admin:\n ${err}`)
                return {object:null,err:"error deleteing the video"}
            })
        },
        updateAdmin : (root,args) => {
            let admin = args.admin
            let email = args.email
    
            return presenter.updateAdmin({admin:admin,email:email}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at update admin:\n ${err}`)
                return {object:null,err:"error updating the video"}
            })
        }        
    }
}

// for Dalafm trendy
/*
hostName,
title,
catchPhrase
video
*/
let trendyResolver = {
    // finish on this
    Query : {
        createTrendy : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.createTrendy({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createTrendy:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        findTrendy : (root,args) => {
            return presenter.findTrendy().then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createTrendy:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        deleteTrendy : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.deleterendy({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createTrendy:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        updateTrendy : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.updateTrendy({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createTrendy:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        }    
    }
}

/*
sports
hostName,
title,
catchPhrase
video
*/
let sportResolver = {
    Query : {
        createSport : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.createSport({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createTrendy:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        findSport : (root,args) => {
            return presenter.findSport().then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at findSport:\n ${err}`)
                return {object:null,err:"error finding the video"}
            })
        },
        deleteSport : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.deleteSport({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at delete sport:\n ${err}`)
                return {object:null,err:"error deleting the video"}
            })
        },
        updateSport : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.updateSport({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at updating sport:\n ${err}`)
                return {object:null,err:"error updating the video"}
            })
        }    
    }

}
let hottestNewsResolver = {
    Query : {
        createHottestNews : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.createHottestNews({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at createTrendy:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        findHottestNews : (root,args) => {
            return presenter.findHottestNews().then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at find news:\n ${err}`)
                return {object:null,err:"error finding the video"}
            })
        },
        deleteHottestNews : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.deleteHottestNews({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at delete news:\n ${err}`)
                return {object:null,err:"error deleting the video"}
            })
        },
        updateHottestNews : (root,args) => {
            let hostName = args.hostName
            let title = args.title
            let catchPhrase = args.catchPhrase
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let video = args.video
            // call the moethod fro creating the presenter Data
            return presenter.updateHottestNews({hostName:hostName,title:title,catchPhrase:catchPhrase,video:video}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at updating news:\n ${err}`)
                return {object:null,err:"error updating the video"}
            })
        }    
    }

}

/*
author,
title,
catchPhrase,
details,
pictures
*/
// remember that here the pictures comes as a json string however its upon you to convert it into an object
let blogResolver = {
    Query : {
        createBlog : (root,args) => {
            let author = args.author
            let title = args.title
            let catchPhrase = args.catchPhrase
            let details = args.details
            // remember that this video is a string url probably or something else enabling us identify the youtube url/video api.
            let pictures = JSON.parse(args.pictures)
            console.log(`pictures received is an object, if null or undefined then there's an eror: ${JSON.stringify(pictures)}`)
            // call the moethod fro creating the presenter Data
            return presenter.createBlog({author:author,title:title,catchPhrase:catchPhrase,details:details,pictures:pictures}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at create Blog:\n ${err}`)
                return {object:null,err:"error creating the video"}
            })
        },
        findBlog : (root,args) => {
            return presenter.findBlog().then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at find blog:\n ${err}`)
                return {object:null,err:"error finding the video"}
            })
        },
        deleteBlog : (root,args) => {
            let author = args.author
            let title = args.title
            let catchPhrase = args.catchPhrase
            let details = args.details
            let pictures = JSON.parse(args.pictures)
    
            return presenter.deleteBlog({author:author,title:title,catchPhrase:catchPhrase,details:details,pictures:pictures}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at delete blog:\n ${err}`)
                return {object:null,err:"error deleting the video"}
            })
        },
        updateBlog : (root,args) => {
            let author = args.author
            let title = args.title
            let catchPhrase = args.catchPhrase
            let details = args.details
            let pictures = JSON.parse(args.pictures)
    
            return presenter.updateBlog({author:author,title:title,catchPhrase:catchPhrase,details:details,pictures:pictures}).then(function(result){
                return result
            }).catch(function(err){
                console.log(`an error occured at updating blog:\n ${err}`)
                return {object:null,err:"error updating the video"}
            })
        }    
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: [authenticationResolvers,tokenResolver,presenterResolver,trendyResolver,blogResolver,sportResolver,hottestNewsResolver,adminResolvers],
    graphiql: true
})

async function  serverCall (){
    const {url} = await startStandaloneServer(apolloServer,{
        listen: {port: 4002},
        context: async({req,res}) => {
            // note that the context is called for each request so you can set it for each request.
            // However note that when the token is sent, its supposed to be sent with Authorization in title casing.
            let authorizationHeader = req.headers.authorization
            // using the simple string to array conversion hahaha
            if(authorizationHeader != null || authorizationHeader != undefined){
                let token = authorizationHeader.split(" ")[1]
                if(token != null){
                    //verify the token using JWT
                    try {
                        // note that an error is emmited if its an invalid jwt.i.e not signed by the same key.
                        let user = jwt.verify(token,process.env.JWT_SECRET_KEY)
                        // test for the validity of the token.
                        // if no exception is thrown it means it was signed by my secret key
                        if(user){
                            return {
                                token : token
                            }
                        }                    
                    } catch (error) {
                        return {token: null}
                    }
                    // if it's verified then return the token, else return an error.
                }   
                else {
                    // if the token is not there, then also return the error same as if the token is invalid
                    return {
                        token: null
                    }
                }    
            }
            // check the Authorization header, the token should be next to the Bearer field in that header. 
            // to set the attribute to share ensure you return something that's maybe am object
            // best way is to return an object.

        },
        // Do note however that apollo server uses the * wildcard for access-control-allow-origin
        cors: {
            // I can change it later perhabs
            origin : process.env.APOLLO_ORIGIN,
            // to enable a server to send cookies.
            credentials: true
        }
    })
    return console.log(`server ready at ${url}`)
}
serverCall()
