const {ApolloServer} = require("@apollo/server")
const {startStandaloneServer} = require("@apollo/server/standalone")
const jwt = require("jsonwebtoken")
require("dotenv").config

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
        presenterCreate(name:String,showName:String,time:String,photo:String): Result,
        presenterUpdate(name:String,showName:String,time:String,photo:String) : Result,
        presenterDelete(name:String,showName:String,time:String,photo:String): Result
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
                                    return {err:"internal server error"}
                                }
                            }).catch(function(err){
                                console.log(err)
                                return {err :"internal server error"}
                            })
        
                        }
                        else{
                            // return a user not found error, I'm not directly returning from the server since it might leak some sensitive information
                            return {err: "user not found"}
                        }
                    }).catch(function(err){
                        console.log(err)
                        return({err: "internal server error"})
                    })
                }
            }).catch(function(err){
                console.log(err)
                return {err:"internal server error"}
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
                return {err:"internal server error"}
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
    presenterCreate : (root,args) => {
        let name = args.name
        let showName = args.showName
        let time = args.time
        let photo = args.photo
        // call the moethod fro creating the presenter Data
        presenter.createPresenter({name:name,showName:showName,time:time,photo:photo}).then(function(result){
            return(result)
        }).catch(function(err){
            console.log(`an error occured:\n ${err}`)
            return {obj:null,err:"internal server error"}
        })
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: [authenticationResolvers,tokenResolver],
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
            origin : "http://localhost:9500",
            // to enable a server to send cookies.
            credentials: true
        }
    })
    return console.log(`server ready at ${url}`)
}
serverCall()
