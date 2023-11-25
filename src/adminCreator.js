import React from "react"
import "./adminCreator.css"
import {createAdmin} from "./apis"

export function AdminCreator(){
    const [alertStyle,setAlertStyle] = useState(initialDisplay)
    const [notificationState,setNotificationState] = useState(null)
    let adminHandler = function(e){
        e.preventDefault()
        let admin = e.target.admin.value
        let email = e.target.email.value
        createAdmin(admin,email).then(function({err,object}){
            if(err != null){
                setNotificationState(err)
                setAlertStyle(errorAlert)
                setTimeout(function(){
                    setAlertStyle(initialDisplay)
                },5000)
            }
            else if(object != null){
                setNotificationState(object)
                setAlertStyle(successAlert)
                setTimeout(function(){
                    setAlertStyle(initialDisplay)
                },5000)
            }
        })
    }
    let initialDisplay = {
        display: "none",
        visibility: "hidden",
        backgroundColor: "transparent",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.3rem",
        padding: "1rem",
        borderRadius: "1rem"
    }
    let successAlert = {
        backgroundColor: "green",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.3rem",
        padding: "1rem",
        borderRadius: "1rem"
    }
    let errorAlert = {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.3rem",
        padding: "1rem",
        borderRadius: "1rem"
    }
    return (
    <div className="major-wrapper">
        <div style={alertStyle}>{notificationState}</div>
        <div className="main-presentation">
            <div className="intro-div">Presenter creation</div>
            <form className="details" onSubmit={adminHandler}>
                <div className="input-div">
                    <label className="label-class" htmlFor="admin">Admin</label>
                    <input type="text" className="actual-input" name="admin" placeholder="admin name" id="presenterId"/>    
                </div>
                <div className="input-div">
                    <label className="label-class" htmlFor="email">email address</label>
                    <input type="text" className="actual-input" name="email" placeholder="email address" id="email"/>    
                </div>
                <button type="submit" className="submit-btn">submit</button>
            </form>
        </div>
    </div>

    )    
}
