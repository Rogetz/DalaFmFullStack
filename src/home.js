import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect} from "react"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter} from "react-icons/fa"
import "./home.css"
import { Link } from "react-router-dom";
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"

export function Home(){
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
            <div className="live-stream">
                <div className="watch-now"><span className="fa fa-tv"><FaTv/></span>watch live</div>
                <hr/>
                <div className="listen-now"><span className="fa fa-headphones"><FaHeadphones/></span>listen live</div>
            </div>
            <div className="main-div">
                <div className="live-video">
                    <div className="station-tag"><img id="live-logo" src="dalaFm_rounded_logo.PNG" alt=""/> <span>DALA FM</span></div>
                    <div className="live-tag">LIVE <span className="fa fa-dot-circle"></span> </div>
                    <video src="" className="actual-video" autoPlay></video>
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
            <h2 className="trendy-title">TRENDING VIDEOS</h2>
            <div className="trendy-wrapper">
                <div ref={el => leftButtons.current.push(el)} className="left-button"><span className="fa fa-caret-left"><FaCaretLeft/></span></div>
                <div ref={el => rightButtons.current.push(el)} className="right-button"><span className="fa fa-caret-right"><FaCaretRight/></span></div>
                <div ref={el =>  trendingVideos.current.push(el)} className="trending-videos">
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Nairobi wire</div>
                            <div className="news-details">How are Nairobians making money so fast?</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                </div>    
            </div>
            <h2 className="trendy-title">HOTTEST NEWS</h2>
            <div className="trendy-wrapper">
                <div ref={el => leftButtons.current.push(el)} className="left-button"><span className="fa fa-caret-left"><FaCaretLeft/></span></div>
                <div ref={el => rightButtons.current.push(el)} className="right-button"><span className="fa fa-caret-right"><FaCaretRight/></span></div>
                <div  ref={el => trendingVideos.current.push(el)} className="trending-videos">
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">New ConMen in Town</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">New ConMen in Town</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">New ConMen in Town</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">New ConMen in Town</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">New ConMen in Town</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">New ConMen in Town</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                </div>    
            </div>
            <h2 className="trendy-title">SPORT UPDATES</h2>
            <div className="trendy-wrapper">
                <div ref={el => leftButtons.current.push(el)} className="left-button"><span className="fa fa-caret-left"><FaCaretLeft/></span></div>
                <div ref={el => rightButtons.current.push(el)} className="right-button"><span className="fa fa-caret-right"><FaCaretRight/></span></div>
                <div ref={el => trendingVideos.current.push(el)} className="trending-videos">
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                    <div className="single-video">
                        <div className="bottom-div">
                            <div className="news-title">Arsenal's new coach</div>
                            <div className="news-details">Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.Nairobi has new changes currently that are to affect the new system. The state of affairs currently in the country are showing some new statistics that we need to change our way of living, but really is that the issue or are we the issue.</div>    
                        </div>
                        <video src="" className="actual-video"></video>
                    </div>
                </div>    
            </div>
        </>
    )
}

