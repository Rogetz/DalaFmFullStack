import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect} from "react"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter} from "react-icons/fa"
import "./adminHome.css"
import { Link } from "react-router-dom";
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"

export function AdminHome(){
    let menuButton = useRef()
    let cancelButton = useRef()
    let options = useRef()

    let trendingVideos = useRef([])
    let leftButtons = useRef([])
    let rightButtons = useRef([])
    let menuHandler = function(e){
        options.current.classList.add("active")
        menuButton.current.classList.add("hidden")
        cancelButton.current.classList.remove("hidden")
    }
    let cancelHandler = function(e){
        options.current.classList.remove("active")
        cancelButton.current.classList.add("hidden")
        menuButton.current.classList.remove("hidden")  
    }
    useEffect(function(){ 

        leftButtons.current.forEach(function(leftButton,index){
            // there's a problem with the scrollBy method if am not wrong.
            leftButton.addEventListener("click",function(e){
                trendingVideos.current[index].scrollBy({left: 100,behavior: "smooth"})
            })
            // remember that th scrollBy left does not work if there's no more scroll space left.
            // to scroll by the left simply put the positive one since its the positive
        })
        rightButtons.current.forEach(function(rightButton,index){
            // there's a problem with the scrollBy method if am not wrong.
            rightButton.addEventListener("click",function(e){
                trendingVideos.current[index].scrollBy({left: -100,behavior: "smooth"})
            })
        })
    })
    return (
        <>
            <div className="main-div">
                <div className="live-video">
                    <div className="station-tag"><img id="live-logo" src={dalaFmRounded} alt=""/> <span>DALA FM</span></div>
                    <div className="live-tag"><button className="broadcast-button">broadcast</button> </div>
                    <button className="hostName">Tom Okwiri</button>
                    <video src="" className="actual-video" autoPlay="true"></video>
                    <div className="bottom-slide-wrapper">
                        <div className="current-show-name">Mos Gi Tich</div>
                        <marquee className="sliding-highlights" behavior="scroll" loop="infinite" direction="right" hspace="10%">Kenya National swimming team competing for the world cup finally.Reportedly ther have been 20 mend found dancing in the rain. New stock market statistics to watch. Harrambee stars the nwe world cup qualifiers.</marquee>
                    </div>
                </div> 
            </div>   

        </>
    )
}

