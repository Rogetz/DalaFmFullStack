import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect,useReducer} from "react"
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
    // for storing the streams received.
    const liveComponentsRef = useRef([])
    const currentViewerStream = useRef()
    //
    const [viewComponents,dispatch] = useReducer(liveReducer,LiveComponents)

    //use a reducer to trigger the render of the viewComponents from the liveComponentsRef
    useEffect(function(){ 
        const socket1 = io("ws://localhost:4037")
        socket1.emit("admin-join","")
        socket1.on("presenter-joined",function({socketId}){
            // create a new socket and peer and send admin details there
            // make the live components an array snd add an item to it.

            // this will be set each time to enable dispatches and change in  the liveStreamRef
            setLiveComponents(<LiveComponent key={(Math.random(10000))} data={{socketId:socketId,currentViewerStream:currentViewerStream,liveComponentsRef:liveComponentsRef,dispatch:dispatch}}/>)

            /*if(LiveComponents == undefined || LiveComponents == null){
                console.log("the liveComponents is null here.")
                setLiveComponents(<LiveComponent key={(Math.random(10000))} data={{socketId:socketId,currentViewerStream:currentViewerStream,liveComponentsRef:liveComponentsRef}}/>)
            }
            else{
                console.log("the liveComponents is not null here.")
                // find an alternative way of doing this considering we don't want new creations of the peer, so here I simply put a single div as well.
                /*let newArray = [`<${LiveComponent} key={{${(Math.random(10000))}}} data={{socketId:${socketId}}}/>`]
                let newestArray = newArray.concat(LiveComponents)
                setLiveComponents(newestArray)*/
                /*
                setLiveComponents(<LiveComponent key={(Math.random(10000))} data={{socketId:socketId,currentViewerStream:currentViewerStream,liveComponentsRef:liveComponentsRef}}/>)
            }*/
        })
        
    },[])
    let liveReducer = function(state,action){
        if(action.type == "state-change"){
            let newArray =liveComponentsRef.current.map(function(stream,index){
                return <ViewComponent key={(Math.random(10000))} data={{stream:stream}}/>
            })        
            return newArray
        }
    }
    return (
        <>
            <div className="main-div">
                {/*try creating new gui views for the videos through the states and see what happens.*/}
                {LiveComponents}
                {viewComponents}
            </div>   
        </>
    )
}

// I need to make this a functional component that works as an array that the view component derives from
// I want to see if the useRef can work perfectly with componnts.
function LiveComponent(props){
    const socketId = props.data.socketId
    const dispatch = props.data.dispatch
    const currentViewerStream = props.data.currentViewerStream
    const liveComponentsRef = props.data.liveComponentsRef
    const liveStreamReceivedRef = useRef()
    const [liveStreamReceived,setLiveStreamReceived] = useState() 
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
            liveStreamReceivedRef.current = stream
            // add it to the collection of streams in the main component.
            liveComponentsRef.current.push(stream)
            //create a videoRef for saving the stream into the video element
            // videoRefs will be an array. so you'll be pointing to them via their indexes.
            videoRef.current.srcObject = stream
            // dispatch so that it can updat the liveComponentsRef
            dispatch("state-change")
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

        socket.on("viewer-joined",function({socketId}){
            if(currentViewerStream.current != null || currentViewerStream.current != undefined){
                const socket = io("ws://localhost:4037")
                let callingPeerId = null
                socket.emit("viewer-accept",{to:socketId})
                // try making it the initiator in the next instance
                const peer = new Peer({initiator:false,trickle:true,stream:currentViewerStream.current})
                peer.on('signal',function(signal){
                    socket.emit("answering-viewer",{to:callingPeerId,signal:signal})
                })
                socket.on("viewer-called",function({socketId,signal}){
                    peer.signal(signal)
                    callingPeerId = socketId
                })
                peer.on("connect",function(){
                    console.log("connection to viewer established")
                    // removed this since there's no internet connection
                    //peer.addStream(currentViewerStream.current)
                })    
                peer.on("close",function(){
                    console.log("connection closed")
                })
                peer.on("end",function(){
                    console.log("connection ended")
                })
                // to send the presnter the right id for sending the data in the server..    
            }
        })
    },[])

    let broadcastHandler = function() {
        // sets the current liveStream that should be sent to the viewer
        currentViewerStream.current = liveStreamReceived
    }
}

function ViewComponent(props){
    const videoRef = useRef()
    useEffect(function(){
        videoRef.current.srcObject = props.data.stream    
    },[])
    return (
        <div className="admin-live-video">
            <div className="station-tag"><img id="live-logo" src={dalaFmRounded} alt=""/> <span>DALA FM</span></div>
            <div className="live-tag"><button className="broadcast-button">broadcast</button> </div>
            <button className="hostName">Tom Okwiri</button>
            <video ref={videoRef} className="actual-video" autoPlay={true}></video>
            <div className="bottom-slide-wrapper">
                <div className="current-show-name">Mos Gi Tich</div>
                <marquee className="sliding-highlights" behavior="scroll" loop="infinite" direction="right" hspace="10%">Kenya National swimming team competing for the world cup finally.Reportedly ther have been 20 mend found dancing in the rain. New stock market statistics to watch. Harrambee stars the nwe world cup qualifiers.</marquee>
            </div>
        </div> 
    )
}

