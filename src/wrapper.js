import React,{useEffect,useRef,useState} from "react"
import "./wrapper.css"
import {Link,Outlet} from "react-router-dom"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter} from "react-icons/fa"
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"

// this is the one to have the footer and the header.

export function Wrapper(){
    let menuButton = useRef()
    let cancelButton = useRef()
    let options = useRef()
    const svg = useRef()
    const outerCircle = useRef()
    const circleWrapper = useRef()
    const majorWrapper = useRef()

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

    
    let offSet = 453
    let actualProgress = 0
    /*
    // This one worked perfectly, it shows the progress bar as someone scrolls.
    // remember to also calculate the circumference first so that you can get the actual calculations for the offset.
    // remember that the offset is actually the circumference calculated through the radius that you've set for the circle.
    */
    let finalTimeout = 5000
    // interval for the repeated setIntervals
    let interval = finalTimeout / 30
    // gap for the progress bar.
    let gap = offSet / 10
    // interval result
    let intervalResult = setInterval(function(){
        actualProgress += gap
        if(actualProgress >= offSet){
            actualProgress = 0
        }    
        svg.current.style.strokeDasharray = `${actualProgress},${offSet}`
    },interval)
    setTimeout(function(){
        clearInterval(intervalResult)
        outerCircle.current.classList.add("hidden")
        circleWrapper.current.classList.add("hidden")
        majorWrapper.current.classList.add("active")
    },finalTimeout)

    let splash = `<div ref={outerCircle} className="circular">
        <svg ref={svg} className="inner-svg" width="190", height="190">
            <circle cx="95" cy="95" r="72"/>
        </svg>
        <div className="inner-circle">
            <img src={dalaFmRounded} alt="avt"/>
        </div>
    </div>`
    let actual = `
    <div className="major-wrapper">
    <div className="upper-menu">
        <div className="menu-logo">
            <img className="logo-img" src={dalaFmRounded} alt="avt" />
            <div className="brand-name">DALA FM</div>
        </div>
        <div className="other-options">      
            <div className="opt"><span className="fa fa-home"><FaHome/></span><a href="#">Home</a> </div>
            <div className="opt"><span className="fa fa-newspaper"><FaNewspaper/></span><a href="./news.html">News</a></div>
            <div className="opt"><span className="fa fa-timeline"><FaProjectDiagram/></span><a href="./programs.html">programms</a></div>
            <div className="opt"><span className="fa-solid fa-volume-high"><FaVolumeUp/></span><a href="./advertise.html">Advertise with us</a></div>
            <div className="opt"><span className="fa fa-phone"><FaPhone/></span><Link to="contact">contact us</Link></div>
            <div className="opt"><span className="fa fa-info-circle"><FaInfoCircle/></span><Link to="about">About</Link></div>
            <div className="opt"><span className="fa fa-microphone"><FaMicrophone/></span><Link to="presenter">presenters</Link></div>
        </div>
        <div className="login-signup"><span className="fa fa-user-circle"><FaUserCircle/></span>login</div>
        <span ref={menuButton} onClick={menuHandler} className="fa fa-bars"><FaBars/></span>
        <span ref={cancelButton} onClick={cancelHandler} className="fa fa-close hidden"><FaWindowClose/></span>
        <div ref={options} className="toggled-menu">
            <div className="opt"><span className="fa fa-home"><FaHome/></span><a href="#">Home</a> </div>
            <div className="opt"><span className="fa fa-newspaper"><FaNewspaper/></span><a href="./news.html">News</a></div>
            <div className="opt"><span className="fa fa-timeline"><FaProjectDiagram/></span><a href="./programs.html">programms</a></div>
            <div className="opt"><span className="fa-solid fa-volume-high"><FaVolumeUp/></span><a href="./advertise.html">Advertise with us</a></div>
            <div className="opt"><span className="fa fa-phone"><FaPhone/></span><Link to="contact">contact us</Link></div>
            <div className="opt"><span className="fa fa-info-circle"><FaInfoCircle/></span><Link to="about">About</Link></div>
            <div className="opt"><span className="fa fa-microphone"><FaMicrophone/></span><Link to="presenter">presenters</Link></div>
        </div>
    </div>
        <Outlet/>
    <div className="footer">
        <div className="social-handles">
            <span className="fa-brands fa-instagram"><FaInstagram/></span>
            <span className="fa-brands fa-twitter"><FaTwitter/></span>
            <span className="fa-brands fa-linkedin"><FaLinkedin/></span>
            <span className="fa-brands fa-youtube"><FaYoutube/></span>
        </div>
        <div className="copyright-info">
            <div className="copyright-class">copyright<span className="fa fa-copyright"><FaCopyright/></span> 2023</div> 
            <div className="dala-div">DALA FM</div>
        </div>
    </div>
    </div>
    `


    return (
        <div style={{width: "100%",height: "60vh",position:"relative"}}>
        <div ref={circleWrapper} className="circle-wrapper">
            <div ref={outerCircle} className="circular">
                <svg ref={svg} className="inner-svg" width="190" height="190">
                    <circle cx="95" cy="95" r="72"/>
                </svg>
                <div className="inner-circle">
                    <img src={dalaFmRounded} alt="avt"/>
                </div>
            </div>
        </div>
        <div ref={majorWrapper} className="major-wrapper">
        <div className="upper-menu">
            <div className="menu-logo">
                <img className="logo-img" src={dalaFmRounded} alt="avt" />
                <div className="brand-name">DALA FM</div>
            </div>
            <div className="other-options">      
                <div className="opt"><span className="fa fa-home"><FaHome/></span><a href="#">Home</a> </div>
                <div className="opt"><span className="fa fa-newspaper"><FaNewspaper/></span><a href="./news.html">News</a></div>
                <div className="opt"><span className="fa fa-timeline"><FaProjectDiagram/></span><a href="./programs.html">programms</a></div>
                <div className="opt"><span className="fa-solid fa-volume-high"><FaVolumeUp/></span><a href="./advertise.html">Advertise with us</a></div>
                <div className="opt"><span className="fa fa-phone"><FaPhone/></span><Link to="contact">contact us</Link></div>
                <div className="opt"><span className="fa fa-info-circle"><FaInfoCircle/></span><Link to="about">About</Link></div>
                <div className="opt"><span className="fa fa-microphone"><FaMicrophone/></span><Link to="presenter">presenters</Link></div>
            </div>
            <div className="login-signup"><span className="fa fa-user-circle"><FaUserCircle/></span><Link to="/login">login</Link></div>
            <span ref={menuButton} onClick={menuHandler} className="fa fa-bars"><FaBars/></span>
            <span ref={cancelButton} onClick={cancelHandler} className="fa fa-close hidden"><FaWindowClose/></span>
            <div ref={options} className="toggled-menu">
                <div className="opt"><span className="fa fa-home"><FaHome/></span><a href="#">Home</a> </div>
                <div className="opt"><span className="fa fa-newspaper"><FaNewspaper/></span><a href="./news.html">News</a></div>
                <div className="opt"><span className="fa fa-timeline"><FaProjectDiagram/></span><a href="./programs.html">programms</a></div>
                <div className="opt"><span className="fa-solid fa-volume-high"><FaVolumeUp/></span><a href="./advertise.html">Advertise with us</a></div>
                <div className="opt"><span className="fa fa-phone"><FaPhone/></span><Link to="contact">contact us</Link></div>
                <div className="opt"><span className="fa fa-info-circle"><FaInfoCircle/></span><Link to="about">About</Link></div>
                <div className="opt"><span className="fa fa-microphone"><FaMicrophone/></span><Link to="presenter">presenters</Link></div>
            </div>
        </div>
            <Outlet/>
        <div className="footer">
            <div className="social-handles">
                <span className="fa-brands fa-instagram"><FaInstagram/></span>
                <span className="fa-brands fa-twitter"><FaTwitter/></span>
                <span className="fa-brands fa-linkedin"><FaLinkedin/></span>
                <span className="fa-brands fa-youtube"><FaYoutube/></span>
            </div>
            <div className="copyright-info">
                <div className="copyright-class">copyright<span className="fa fa-copyright"><FaCopyright/></span> 2023</div> 
                <div className="dala-div">DALA FM</div>
            </div>
        </div>
        </div>            
        </div>
    )
}