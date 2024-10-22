import React,{useEffect,useRef,useState} from "react"
import "./wrapper.css"
import {Link,Outlet} from "react-router-dom"
import {FaBars, FaCaretLeft,FaCaretRight,FaProjectDiagram,FaHeadphones,FaHome,FaNewspaper,FaVolumeUp,FaPhone,FaMicrophone, FaInfoCircle, FaTv, FaUserCircle, FaWindowClose, FaInstagram, FaLinkedin, FaYoutube, FaCopyright, FaTwitter, FaFacebook} from "react-icons/fa"
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"
import musicStudio from "./music_studio.jpg"
import presenter2 from "./presenter-2.PNG"

// this is the one to have the footer and the header.

export function Wrapper(){
    const menuButton = useRef()
    const cancelButton = useRef()
    const svgRef = useRef()
    const outerCircle = useRef()
    const circleWrapper = useRef()
    const majorWrapper = useRef()
    const options = useRef()
    const [splashStyleState,setSplashStyleState] = useState(splashWrapperStyling)

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
            svgRef.current.style.strokeDasharray = `${actualProgress},${offSet}`
        },interval)
        setTimeout(function(){
            clearInterval(intervalResult)
            outerCircle.current.classList.add("hidden")
            circleWrapper.current.classList.add("hidden")
            majorWrapper.current.classList.add("active")
            setSplashStyleState(finalSplashWrapperStyle)
        },finalTimeout)
    
    },[])
    

    let splashWrapperStyling = {
        width: "100%",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:"relative"
    }
    let finalSplashWrapperStyle = {
        width: "100%",
        height: "60vh",
        position:"relative",
        display: "none",
        visibility: "hidden"  
    }

    return (
        <>
        <div style={splashStyleState}>
        <div ref={circleWrapper} className="circle-wrapper">
            <div ref={outerCircle} className="circular">
                <svg ref={svgRef} className="inner-svg" width="190" height="190">
                    <circle cx="95" cy="95" r="72"/>
                </svg>
                <div className="inner-circle">
                    <img src={dalaFmRounded} alt="avt"/>
                </div>
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
                <div className="opt"><span className="fa fa-home"><FaHome/></span><Link to="/">Home</Link> </div>
                <div className="opt"><span className="fa fa-newspaper"><FaNewspaper/></span><a href="#">News</a></div>
                <div className="opt"><span className="fa fa-timeline"><FaProjectDiagram/></span><a href="#">programms</a></div>
                <div className="opt"><span className="fa-solid fa-volume-high"><FaVolumeUp/></span><a href="#">Advertise with us</a></div>
                <div className="opt"><span className="fa fa-phone"><FaPhone/></span><Link to="contact">contact us</Link></div>
                <div className="opt"><span className="fa fa-info-circle"><FaInfoCircle/></span><Link to="about">About</Link></div>
                <div className="opt"><span className="fa fa-microphone"><FaMicrophone/></span><Link to="presenter">presenters</Link></div>
            </div>
            <div className="login-signup"><span className="fa fa-user-circle"><FaUserCircle/></span><Link to="/login">login</Link></div>
            <span ref={menuButton} onClick={menuHandler} className="fa fa-bars"><FaBars/></span>
            <span ref={cancelButton} onClick={cancelHandler} className="fa fa-close hidden"><FaWindowClose/></span>
            <div ref={options} className="toggled-menu">
                <div className="opt"><span className="fa fa-home"><FaHome/></span><Link to="/">Home</Link> </div>
                <div className="opt"><span className="fa fa-newspaper"><FaNewspaper/></span><a href="#">News</a></div>
                <div className="opt"><span className="fa fa-timeline"><FaProjectDiagram/></span><a href="#">programms</a></div>
                <div className="opt"><span className="fa-solid fa-volume-high"><FaVolumeUp/></span><a href="#">Advertise with us</a></div>
                <div className="opt"><span className="fa fa-phone"><FaPhone/></span><Link to="contact">contact us</Link></div>
                <div className="opt"><span className="fa fa-info-circle"><FaInfoCircle/></span><Link to="about">About</Link></div>
                <div className="opt"><span className="fa fa-microphone"><FaMicrophone/></span><Link to="presenter">presenters</Link></div>
            </div>
        </div>
            <Outlet/>
        <div className="footer">
            <div className="social-handles">
            <a href="https://www.instagram.com/dalafmkenya/"><span className="fa-brands fa-instagram"><FaInstagram/></span></a>
            <a href="https://twitter.com/dalafmKenya"><span className="fa-brands fa-twitter"><FaTwitter/></span></a>
                <a href="https://www.facebook.com/DalaFMKenya/"><span className="fa-brands fa-linkedin"><FaFacebook/></span></a>
                <a href="https://www.youtube.com/channel/UCKUwFjzvsoICHf8NmVDBrcw"><span className="fa-brands fa-youtube"><FaYoutube/></span></a>
            </div>
            <div className="copyright-info">
                <div className="copyright-class">copyright<span className="fa fa-copyright"><FaCopyright/></span> 2023</div> 
                <div className="dala-div">DALA FM</div>
            </div>
        </div>
        </div>            
        </>
    )
}