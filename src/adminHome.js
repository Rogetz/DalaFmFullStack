import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect} from "react"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter} from "react-icons/fa"
import "./adminHome.css"
import { Link } from "react-router-dom";
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"
import {io} from "socket.io-client"
import Peer from "simple-peer"

export function AdminHome(){
    const [LiveComponents,setLiveComponents] = useState()
    const [currentViewerStream,setCurrentViewerStream] = useState()
    useEffect(function(){ 
        const socket1 = io("ws://localhost:4037")
        socket1.on("presenter-joined",function({socketId}){
            // create a new socket and peer and send admin details there
            // make the live components an array snd add an item to it.
            if(LiveComponents == undefined){
                let newArray = [`<${LiveComponent} key={${(Math.random(10000))}} data={socketId:${socketId}}/>`]
                setLiveComponents(newArray)
            }
            else{
                let newArray = [`<${LiveComponent} key={${(Math.random(10000))}} data={socketId:${socketId}}/>`]
                let newestArray = newArray.concat(LiveComponents)
                setLiveComponents(newestArray)
            }
        })
        
        socket1.on("viewer-joined",function({socketId}){
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


    })
    return (
        <>
        <div className="main-div">
            {/*try creating new gui views for the videos through the states and see what happens.*/}
            {LiveComponents}
        </div>   
        </>
    )
}

function LiveComponent(){
    const socketId = props.data.socketId
    const videoRef = useRef()
    useEffect(function(){
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
            //create a videoRef for saving the stream into the video element
            // videoRefs will be an array. so you'll be pointing to them via their indexes.
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
    },[])

    return (
        <div className="live-video">
            <div className="station-tag"><img id="live-logo" src={dalaFmRounded} alt=""/> <span>DALA FM</span></div>
            <div className="live-tag"><button className="broadcast-button">broadcast</button> </div>
            <button className="hostName">Tom Okwiri</button>
            <video ref={videoRef} src="" className="actual-video" autoPlay="true"></video>
            <div className="bottom-slide-wrapper">
                <div className="current-show-name">Mos Gi Tich</div>
                <marquee className="sliding-highlights" behavior="scroll" loop="infinite" direction="right" hspace="10%">Kenya National swimming team competing for the world cup finally.Reportedly ther have been 20 mend found dancing in the rain. New stock market statistics to watch. Harrambee stars the nwe world cup qualifiers.</marquee>
            </div>
        </div> 
    )
}

