import React from "react"
import "./presenter.css"
import portrait2 from "./portrait2removed.png"
import dalaRemoved from "./dalaFmActualRemoved.png"
// link the peer from the kcsetrackers.
import {io} from "socket.io-client"
import Peer from "simple-peer"

export function Presenter(){

    const videoRef = useRef()
    const connectionRef = useRef()
    const currentSocket = useRef()
    const currentStreamRef = useRef()
    const userToAnswerRef = useRef()
    const answeringUserRef = useRef()
    const shareRef = useRef()
    const [userToAnswer,setUserToAnswer] = useState()
    const [answeringUser,setAnsweringUser] = useState()
    const [currentStream,setCurrentStream] = useState(null)

    let leaveCallHandler = function(e){
        e.preventDefault()
        connectionRef.current.destroy()        
    }
    useEffect(function(){
        // right now I've createed a ccommunication channel for both peers.
        /*socket.on("peer-call",function({from,signal}){
            console.log(`peer call received from :${from}`)
            setUserToAnswer(from)
        })*/
        window.navigator.mediaDevices.getDisplayMedia({video: true,audio:true}).then(function(stream){
            shareRef.current.srcObject = stream
        }).catch(function(err){
            console.log("error loading the share screen.")
        })
        window.navigator.mediaDevices.getUserMedia({video: true,audio:false}).then(function(stream){
            //videoRef.current.srcObject = stream 
            //setCurrentStream(stream)
            // the test of the treaty
            currentStreamRef.current = stream
            // testing to see if setting the stream to this works amd using the ref works perfectly fine,lets see what's wrong.
            videoRef.current.srcObject = currentStreamRef.current
        }).catch(function(err){
            console.log("some error occured during streaming")
        })

         /*The new streaming code */
         const socket = io("ws://localhost:4037")
         // immediately announce presenter-join, share its Id to the admin that is present
         // remember that in this case there should be no more than one admin since that will cause an error.
         socket.emit("presenter-join","")
         socket.on("admin-accepted",function({socketId}){
             // so for each request that comes with an admin-accepted a new peer is created,
             //and it must come with the particular socketId to send the request.
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
     

    },[])

    let liveStreamHandler = function(e){
        window.navigator.mediaDevices.getUserMedia({video: true,audio:false}).then(function(stream){
            //videoRef.current.srcObject = stream 
            //setCurrentStream(stream)
            // the test of the treaty
            currentStreamRef.current = stream
            // testing to see if setting the stream to this works amd using the ref works perfectly fine,lets see what's wrong.
            videoRef.current.srcObject = currentStreamRef.current
        }).catch(function(err){
            console.log("some error occured during streaming")
        })
    }


    return (
        <>
        <h2>Director's note</h2>
        <div className="director-div">
            <div className="director-left">
                <img src={dalaRemoved} alt="" className="director-pic"/>
            </div>
            <div className="director-right">
                <div className="director-name">Seth Oloo Mbaka</div>
                <h2 className="welcome-intro">welcome note</h2>
                <div className="welcome-note">
                    Welcome to Dala Fm our highly esteemed viewers and listeners. We are the modern local | international radio station for the engluo nation. Here at Dala Fm we air it just as you want it, when you want it and wherever you want it. Feel at home far from home.
                </div>
            </div>
        </div>
        <h2>DALA FM presenters</h2>
        <div className="presenters-wrapper">
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
        </div>
        </>
    )
}