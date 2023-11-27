import React from "react"
import "./login.css"
import dalaFmRounded from "./dalaFm_rounded_logo.PNG"

export function Login(){
    return(
        <div className="box">
            <form className="login-form-div">
                <div className="login-title">
                    <div className="login-menu-logo">
                        <img className="login-logo-img" src={dalaFmRounded} alt="avt" />
                        <div className="login-brand-name">DALA FM</div>
                    </div>    
                    <p>Log In</p>
                </div>
                <div className="login-input-div">
                    <input type="text" name="email" id="email" placeholder="email address"/>
                    <label for="email">email address</label>
                </div>
                <div className="login-input-div">
                    <input type="password" name="password" id="password" placeholder="password"/>
                    <label for="password">password</label>
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