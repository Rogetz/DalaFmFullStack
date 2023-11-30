import React,{useState,useRef,useEffect} from "react"
import "./adminCreator.css"
import {createAdmin} from "./apis"
import { FaCheckCircle, FaWindowClose } from "react-icons/fa"
import dalaFmRounded from  "./dalaFm_rounded_logo.PNG"

export function AdminCreator(){
    const [alertStyle,setAlertStyle] = useState(initialDisplay)
    const [alertState,setAlertState] = useState("error")
    const [iconStyle,setIconStyle] = useState({backgroundColor:"red",color:"white"})
    const [notificationState,setNotificationState] = useState(null)
    const [wraperStyle,setWraperStyle] = useState({display: "none",visibility: "hidden"})
    let adminHandler = function(e){
        e.preventDefault()
        let admin = e.target.admin.value
        let email = e.target.email.value
        createAdmin({admin:admin,email:email}).then(function({err,object}){
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
                },3000)
            }
        }).catch((err) => {
            setNotificationState("error calling the api")
            setAlertStyle(errorAlert)
            setTimeout(function(){
                setAlertStyle(initialDisplay)
            },3000)
            console.log(err)
        })
    }
    let initialDisplay = {
        display: "none",
        visibility: "hidden",
        backgroundColor: "transparent",
        color: "white",
        fontWeight: "medium",
        fontSize: "1rem",
        padding: "0rem",
    }
    let successAlert = {
        backgroundColor: "green",
        color: "white",
        fontWeight: "medium",
        fontSize: "1rem",
        padding: "0rem",
        borderRadius: "0rem"
    }
    let errorAlert = {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        fontWeight: "medium",
        fontSize: "1rem",
        padding: "0rem",
        borderRadius: "0rem"
    }

    return (
        <div className="admin-major-wrapper">
            <div style={alertStyle}>
                <div className="toast-wrapper" style={wraperStyle}>
                    <div className="toast-top-div">
                        <div className="alert-text">{alertState}</div>  
                        <div className="alert-time" >now</div> 
                    </div>
                    <hr style={{width: "100%",color:"white"}}/>
                    <div className="toast-div">
                        <span style={iconStyle} className="fa fa-check-circle">{alertState == "error"?<FaWindowClose/>:<FaCheckCircle/>}</span>
                        <span className="alert-text">{notificationState}</span>
                    </div>
                    <div className="slider"></div>
                </div>
            </div>
            <div className="main-presentation">
                <div className="login-menu-logo">
                    <img className="login-logo-img" src={dalaFmRounded} alt="avt" />
                    <div className="login-brand-name">DALA FM</div>
                </div>    
                <div className="intro-div" style={{color:"blue",marginBottom: "2rem"}}>Admin creation</div>
                <form className="details" onSubmit={adminHandler}>
                    <div className="admin-input-div">
                        <label className="label-class" htmlFor="admin">Admin</label>
                        <input type="text" className="actual-input" name="admin" placeholder="admin name" id="presenterId"/>    
                    </div>
                    <div className="admin-input-div">
                        <label className="label-class" htmlFor="email">email address</label>
                        <input type="text" className="actual-input" name="email" placeholder="email address" id="email"/>    
                    </div>
                    <button type="submit" style={{marginTop:"2rem"}} className="admin-submit-btn">submit</button>
                </form>
            </div>
        </div>
    )    
}
