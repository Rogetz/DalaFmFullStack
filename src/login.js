import React,{useState,useEffect,useRef} from "react"
import "./login.css"
import {logAdmin,logPresenter} from "./apis"
import { FaCheckCircle, FaWindowClose } from "react-icons/Fa"
import dalaFmRounded from "./dalaFm_rounded_logo.PNG"

// find a way of redirecting a link,
import {useNavigate} from "react-router-dom"

// used both for the administrator and the regular presenter
export function Login(){
    const [alertStyle,setAlertStyle] = useState(initialDisplay)
    // to tell whether the form is an admin form or not
    const [alertState,setAlertState] = useState("error")
    const navigate = useNavigate()
    const [iconStyle,setIconStyle] = useState({backgroundColor:"red",color:"white"})
    const [notificationState,setNotificationState] = useState(null)
    const [wraperStyle,setWraperStyle] = useState({display: "none",visibility: "hidden"})
    let loginHandler = function(e){
        e.preventDefault()
        let role = e.target.role.value
        let email = e.target.email.value
        let password = e.target.password.value
        if(role == "admin"){
            // for the admin login
            // working perfectly, just chck on the gui a bit and see if there's any issue with the class names and styling.
            logAdmin({email:email,password:password}).then(function({err,object}){
                if(err != null){
                    setNotificationState(err)
                    setAlertStyle(errorAlert)
                    setAlertState("error")
                    setIconStyle({backgroundColor:"red",color: "white"})
                    setWraperStyle({display:"block",visibility: "visible"})
                    setTimeout(function(){
                        setAlertStyle(initialDisplay) 
                    },3000)    
                }
                else if(object != null){
                    setNotificationState(object)
                    setAlertStyle(successAlert)
                    setAlertState("success")
                    setIconStyle({backgroundColor:"green",color:"white"})
                    setWraperStyle({display:"block",visibility: "visible"})
                    setTimeout(function(){
                        setAlertStyle(initialDisplay)
                        return navigate("/admin")
                    },3000)    
                }
            }).catch(function(err){
                setNotificationState("error calling the api")
                setAlertStyle(errorAlert)
                setTimeout(function(){
                    setAlertStyle(initialDisplay)
                },3000)
            })
        }
        else{
            // the role should be a presenter for normal login
            logPresenter({email:email,password:password}).then(function({err,object}){
                if(err != null){
                    setNotificationState(err)
                    setAlertStyle(errorAlert)
                    setAlertState("error")
                    setIconStyle({backgroundColor:"red",color: "white"})
                    setWraperStyle({display:"block",visibility: "visible"})
                    setTimeout(function(){
                        setAlertStyle(initialDisplay)
                    },3000)    
                }
                else if(object != null){
                    setNotificationState(object)
                    setAlertStyle(successAlert)
                    setAlertState("success")
                    setIconStyle({backgroundColor:"green",color:"white"})
                    setWraperStyle({display:"block",visibility: "visible"})
                    setTimeout(function(){
                        setAlertStyle(initialDisplay)
                        return navigate("/presenterDashboard")
                    },3000)    
                }
            }).catch(function(err){
                setNotificationState("error calling the api")
                setAlertStyle(errorAlert)
                setTimeout(function(){
                    setAlertStyle(initialDisplay)
                },3000)
            })
        }
    }
    let initialDisplay = {
        position: "absolute",
        top: "0rem",
        left: "0rem",
        zIndex: "5",
        display: "none",
        visibility: "hidden",
        backgroundColor: "transparent",
        color: "white",
        fontWeight: "medium",
        fontSize: "1rem",
        padding: "0rem",
        overflow: "hidden",
    }
    let successAlert = {
        position: "absolute",
        top: "0rem",
        left: "0rem",
        zIndex: "5",
        backgroundColor: "green",
        color: "white",
        fontWeight: "medium",
        fontSize: "1rem",
        padding: "0rem",
        borderRadius: "0rem",
        overflow: "hidden",
    }
    let errorAlert = {
        position: "absolute",
        top: "0rem",
        left: "0rem",
        zIndex: "5",
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        fontWeight: "medium",
        fontSize: "1rem",
        padding: "0rem",
        borderRadius: "0rem",
        overflow: "hidden",
    }
    return(
        <div className="box">
            <div style={alertStyle}>
                <div className="login-toast-wrapper" style={wraperStyle}>
                    <div className="login-toast-top-div">
                        <div className="login-alert-text">{alertState}</div>  
                        <div className="login-alert-time" >now</div> 
                    </div>
                    <hr style={{width: "100%",color:"white"}}/>
                    <div className="login-toast-div">
                        <span style={iconStyle} className="fa login-fa-check-circle">{alertState == "error"?<FaWindowClose/>:<FaCheckCircle/>}</span>
                        <span className="login-alert-text">{notificationState}</span>
                    </div>
                    <div className="login-slider"></div>
                </div>
            </div>
            <form className="login-form-div" onSubmit={loginHandler}>
                <div className="login-title">
                    <div className="login-menu-logo">
                        <img className="login-logo-img" src={dalaFmRounded} alt="avt" />
                        <div className="login-brand-name">DALA FM</div>
                    </div>    
                    <p style={{marginBottom: "0"}}>Log In</p>
                </div>
                <div className="login-input-div">
                    <input type="text" required name="email" id="email" placeholder="email address"/>
                    <label htmlFor="email">email address</label>
                </div>
                <div className="login-input-div">
                    <input type="password" required name="password" id="password" placeholder="password"/>
                    <label htmlFor="password">password</label>
                </div>
                <div className="radio-div">
                    <div className="actual-radio-div">
                        <label htmlFor="admin">admin</label>
                        <input type="radio" required name="role" id="admin" value="admin"/>    
                    </div>
                    <div className="actual-radio-div">
                        <label htmlFor="presenter">presenter</label>
                        <input type="radio" required name="role" id="presenter" value="presenter"/>   
                    </div>
                </div>
                <div className="options-text">
                    <a href="#" id="forgot-id">forgot password?</a>
                    <a href="#" id="sign-up-redirect">Sign Up</a>
                </div>
                <button type="submit" id="login-button">Login</button>
            </form>
        </div>
    )
}