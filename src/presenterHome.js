import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect} from "react"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter} from "react-icons/fa"
import "./presenterHome.css"
import { Link } from "react-router-dom";
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"
import {io} from "socket.io-client"
import Peer from "simple-peer"

export function PresenterHome(){
    const [currentLiveComponent,setCurrentLiveComponent] = useState()


    return (
        <div className="main-div">
            <LivePresenter/>
            <div className="current-presenter-portfolio">
                <h2 className="presentation-title">current presenter profile</h2>
                <div className="actual-presenter-wrapper">
                    <div className="img-wrapper">
                        <img src={musicStudio} alt="" className="background-div"/>
                        <img src={presenter2} alt="" className="presenter-img"/>
                    </div>
                    <div className="bottom-div">
                        <div className="presenter-title">Tony Okwiri</div>
                        <div className="presenter-bio">Tony Okwiri is a renowned presenter who has a passion for journalism. He hosts the daily show here at Dala Fm with his co-host Fred Abuya. Apparently they are the award winning journalists.</div>    
                    </div>    
                </div>
            </div>  
        </div>
    )
}


function LivePresenter(){
    const videoRef = useRef()
    const currentStreamRef = useRef()
    const connectionRef = useRef()

    useEffect(function(){
        window.navigator.mediaDevices.getUserMedia({video: true,audio:false}).then(function(stream){
            //videoRef.current.srcObject = stream 
            //setCurrentStream(stream)
            // the test of the treaty
            currentStreamRef.current = stream
            // testing to see if setting the stream to this works amd using the ref works perfectly fine,lets see what's wrong.
            videoRef.current.srcObject = stream
        }).catch(function(err){
            console.log("some error occured during streaming")
            console.log(err)
        })  
        const socket = io("ws://localhost:4037")
        // immediately announce presenter-join, share its Id to the admin that is present
        // remember that in this case there should be no more than one admin since that will cause an error.
        socket.emit("presenter-join","")
        socket.on("admin-joined",function(){
            socket.emit("presenter-join","")
        })
        socket.on("admin-accepted",function({socketId}){
            // so for each request that comes with an admin-accepted a new peer is created,
            //and it must come with the particular socketId to send the request.
            const peer = new Peer({initiator: true,trickle:true,stream:currentStreamRef.current})
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
                // I intend to use this peer.addStream when there's an internet connection since I feel it only works when there's internet connection.
                //peer.addStream(currentStreamRef.current)
            })
            peer.on("close",function(){
                console.log("connection closed")
            })
            peer.on("end",function(){
                console.log("connection ended")
            })    
        })
    },[])

    let leaveCallHandler = function(e){
        e.preventDefault()
        connectionRef.current.destroy()        
    }

    let liveStreamHandler = function(e){
        window.navigator.mediaDevices.getUserMedia({video: true,audio:false}).then(function(stream){
            //videoRef.current.srcObject = stream 
            //setCurrentStream(stream)
            // the test of the treaty
            currentStreamRef.current = stream
            // testing to see if setting the stream to this works amd using the ref works perfectly fine,lets see what's wrong.
            videoRef.current.srcObject = stream
        }).catch(function(err){
            console.log("some error occured during streaming")
            console.log(err)
        })
        const socket = io("ws://localhost:4037")
        // immediately announce presenter-join, share its Id to the admin that is present
        // remember that in this case there should be no more than one admin since that will cause an error.
        socket.emit("presenter-join","")
        socket.on("admin-joined",function(){
            socket.emit("presenter-join","")
        })
        socket.on("admin-accepted",function({socketId}){
            // so for each request that comes with an admin-accepted a new peer is created,
            //and it must come with the particular socketId to send the request.
            const peer = new Peer({initiator: true,trickle:true,stream:currentStreamRef.current})
            let currentPeerToCall = socketId
            connectionRef.current = peer
        
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
                // I intend to use this peer.addStream when there's an internet connection since I feel it only works when there's internet connection.
                //peer.addStream(currentStreamRef.current)
            })
            peer.on("close",function(){
                console.log("connection closed")
            })
            peer.on("end",function(){
                console.log("connection ended")
            })    
        })
    }

    return (
        <div className="live-video">
            <div className="presenter-station-tag"><img id="live-logo" src={dalaFmRounded} alt=""/> <span>DALA FM</span></div>
            <div className="live-tag" onClick={liveStreamHandler}><button className="broadcast-button">share screen</button> </div>
            <button className="hostName">Tom Okwiri</button>
            <video ref={videoRef} className="actual-video" autoPlay={true}></video>
            <div className="bottom-slide-wrapper">
                <div className="current-show-name">Mos Gi Tich</div>
                <marquee className="sliding-highlights" behavior="scroll" loop="infinite" direction="right" hspace="10%">Kenya National swimming team competing for the world cup finally.Reportedly ther have been 20 mend found dancing in the rain. New stock market statistics to watch. Harrambee stars the nwe world cup qualifiers.</marquee>
            </div>
        </div> 
    )
}
