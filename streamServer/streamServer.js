const {Server} = require("socket.io")

const socketServer = new Server({
    cors: {
        allowedHeaders : ["Access-Control-Allow-Origin"]
    }
})
let serverPort = 4037

let socketIds = []
let adminId = null
let clientIds = []

function arrayCreator(arr,element){
    let finalArr = []

    let indexF = arr.indexOf(element)    
    let firstPart = arr.slice(0,indexF)
    let secondPart = arr.slice((indexF+1))    

    firstPart.forEach(function(str){
        finalArr.push(str)
    })
    secondPart.forEach(function(str){
        finalArr.push(str)    
    })
    return finalArr
}


socketServer.on("connection",function(socket){
    // the old bunch of code.
    /*if(adminId != null){
        console.log('admin Id not null')
        socket.emit("admin-join",adminId)
    }*/
    /*console.log('socket connected,adding to the list of socketIds')
    socketIds.push(socket.id)

    socket.emit("me-id",socket.id)
    socket.on("admin-joining",function(){
       // adminId = socket.id
        socket.broadcast.emit("admin-join",socket.id)
    })
    // the admind should not be freely available, it should be available.


    //call request
    socket.on("calling-peer",function({to,from,signal}){
        console.log(`calling peer with: to: ${to},from: ${from},signal:${signal}`)
        socketServer.to(to).emit("peer-call",{from,signal})
    })*/


    /*new server data */
    socket.on("presenter-join",function(){
        // broadcast to all channels, notice that only the admin will be able to interpret this.
        socket.broadcast("presenter-joined",{socketId: socket.id})
    })
    socket.on("admin-accept",function({to}){
        // send the presenter the admin Id that he can use to communicate.
        socketServer.to(to).emit("admin-accepted",{socketId:socket.id})
    })
    socket.on("peer-call",function({to,signal}){
        socketServer.to(to).emit("peer-called",{socketId:socket.id,signal:signal})
    })
    socket.on("answering-peer",function({to,signal}){
        socketServer.to(to).emit("answered-peer",{socketId:socket.id,signal:signal})
    })
    socket.on("viewer-join",function(){
        socket.broadcast("viewer-joined",{socketId:socket.id})
    })
    socket.on("viewer-accept",function({to}){
        socketServer.to(to)("viewer-accepted",{socketId:socket.id})
    })
    socket.on("viewer-call",function({to,signal}){
        socketServer.to(to).emit("viewer-called",{socketId:socket.id,signal:signal})
    })
    socket.on("answering-viewer",function({to,signal}){
        socketServer.to(to).emit("answered-viewer",{socketId:socket.id,signal:signal}))
    })
    // the frontend part of the viewer
    /*
        socket.emit("viewer-join","")
        socket.on("viewer-accepted",function({socketId}){
            // so for each request that comes with an admin-accepted a new peer is created,
            //and it must come with the particular socketId to send the request.
            const peer = new Peer({initiator: true,trickle:true})
            let currentPeerToCall = socketId
        
            peer.on("signal",function(signal){
                socket.emit("viewer-call",{to:currentPeerToCall,signal:signal})
            })
            socket.on("answered-viewer",function({socketId,signal}){
                peer.signal(signal)
                currentPeerToCall = socketId
            })
            peer.on("connect",function(){
                console.log("connection to admin established")
            })
            peer.on("stream",function(stream){
                videoRef.current.srcObject = stream
            })
            peer.on("close",function(){
                console.log("connection closed")
            })
            peer.on("end",function(){
                console.log("connection ended")
            })    
        })
    */
    // the frontend part of the admin here is this
    /*
        // for the viewer
        
        socket.on("viewer-joined",function({socketId}){
            const socket = io("ws://localhost:4037")
            let callingPeerId = null
            socket.emit("viewer-accept",{to:socketId})
            // try making it the initiator in the next instance
            const peer = new Peer({initiator:false,trickle:true})
            peer.on('signal',function(signal){
                socket.emit("answering-viewer",{to:callingPeerId,signal:signal})
            })
            socket.on("viewer-called",function({socketId,signal}){
                peer.signal(signal)
                callingPeerId = socketId
            })
            peer.on("connect",function(){
                console.log("connection to viewer established")
                peer.addStream(currentViewerStream.current)
            })    
            peer.on("close",function(){
                console.log("connection closed")
            })
            peer.on("end",function(){
                console.log("connection ended")
            })
            // to send the presnter the right id for sending the data in the server..
        })


        socket.on("presenter-joined",function({socketId}){
            // create a new socket and peer and send admin details there
            const socket = io("ws://localhost:4037")
            let callingPeerId = null
            // to send the presnter the right id for sending the data in the server..
            socket.emit("admin-accept",{to:socketId})
            // try making it the initiator in the next instance
            const peer = new Peer({initiator:false,trickle:true})
            peer.on('signal',function(signal){
                socket.emit("answering-peer",{to:callingPeerId,signal:signal})
            })
            socket.on("peer-called",function({socketId,signal}){
                peer.signal(signal)
                callingPeerId = socketId
            })
            peer.on("stream",function(stream){
                console.log("stream received")
                create a videoRef for saving the stream into the video element
                videoRef.current.srcObject = stream
            })
            peer.on("connect",function(){
                console.log("connection to presenter established")
            })    
            peer.on("close",function(){
                console.log("connection closed")
            })
            peer.on("end",function(){
                console.log("connection ended")
            })
        })
    */
   // the presenter frontend.
   /*
    const socket = io("ws://localhost:4037")
    // immediately announce presenter-join, share its Id to the admin that is present
    // remember that in this case there should be no more than one admin since that will cause an error.
    socket.emit("presenter-join","")
    socket.on("admin-accepted",function({socketId}){
        // so for each request that comes with an admin-accepted a new peer is created,
        and it must come with the particular socketId to send the request.
        const peer = new Peer({initiator: true,trickle:true})
        let currentPeerToCall = socketId

        peer.on("signal",function(signal){
            socket.emit("peer-call",{to:currentPeerToCall,signal:signal})
        })
        socket.on("answered-peer",function({socketId,signal}){
            peer.signal(signal)
            currentPeerToCall = socketId
        })
        peer.on("connect",function(){
            console.log("connection to admin established")
            // currentStream Ref should be a ref as it is.
            peer.addStream(currentStreamRef.current)
        })
        peer.on("close",function(){
            console.log("connection closed")
        })
        peer.on("end",function(){
            console.log("connection ended")
        })

    })
   */


    // answering peer request
    /*socket.on("answering-peer",function({to,from,signal}){
        if(socket.id == to){
            console.log("socket error, the to sockets are the same.")
        }
        console.log(`answering the peer to: ${to} from: ${from} signal: ${JSON.stringify(signal)}`)
        socketServer.to(to).emit("answered-peer",{from,signal:signal})
    })*/

    /*socket.on("disconnect",function(){
        if((socket.id).trim().toLowerCase == adminId){
            socketServer.emit("admin-left")
        }
        // delete the socket id from list
        socketIds = arrayCreator(socketIds,socket.id)
        console.log(`received a socket disconnect from socket id:${socket.id} \n deleting socket id...`)
    })*/

})

socketServer.listen(serverPort)
console.log(`server running at port: ${serverPort}`)