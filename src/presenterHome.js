import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect} from "react"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter} from "react-icons/Fa"
import "./presenterHome.css"
import { Link } from "react-router-dom";
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"

export function PresenterHome(){

    return (
        <div className="main-div">
            <div className="live-video">
                <div className="station-tag"><img id="live-logo" src={dalaFmRounded} alt=""/> <span>DALA FM</span></div>
                <div className="live-tag"><button className="broadcast-button">share screen</button> </div>
                <button className="hostName">Tom Okwiri</button>
                <video src="" className="actual-video" autoPlay="true"></video>
                <div className="bottom-slide-wrapper">
                    <div className="current-show-name">Mos Gi Tich</div>
                    <marquee className="sliding-highlights" behavior="scroll" loop="infinite" direction="right" hspace="10%">Kenya National swimming team competing for the world cup finally.Reportedly ther have been 20 mend found dancing in the rain. New stock market statistics to watch. Harrambee stars the nwe world cup qualifiers.</marquee>
                </div>
            </div> 
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

