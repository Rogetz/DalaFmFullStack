import React from "react"
import "./contactUs.css"
import dalaFmRounded from "./dalaFm_rounded_logo.PNG"
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"


export function ContactUs(){

    return (
        <>
            <div className="contact-us-card">
                <div className="left-side">
                    <div className="contact-title">Contact Us</div>
                    <input type="text" className="text" placeholder="your name"/>
                    <input type="text" className="text" placeholder="your email"/>
                    <input type="text" className="text" placeholder="your message"/>
                    <button className="send">send us the message <span className="fa-brands fa-telegram-plane"></span></button>
                </div>
                <div className="right-side">
                    <h2>our socials</h2>
                    <div className="contact-social-handles">
                        <span className="fa-brands fa-instagram"><FaInstagram/><span className="text">follow us on instagram</span></span>
                        <span className="fa-brands fa-twitter"><FaTwitter/><span className="text">follow us on twitter</span></span>
                        <span className="fa-brands fa-linkedin"><FaLinkedin/><span className="text">follow us on linkedin</span></span>
                        <span className="fa-brands fa-youtube"><FaYoutube/><span className="text">follow us on youtube</span></span>
                    </div> 
                    <div className="location-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15959.255401265867!2d34.767915!3d-0.0857662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa5ff6b28c4af%3A0x1c05529d63b9ee96!2sDala%20Fm%20LTD!5e0!3m2!1sen!2ske!4v1700312402330!5m2!1sen!2ske" style={{border: "none",width: "100%",height: "100%"}} loading="lazy" ></iframe>
                    </div>   
                </div>
            </div>        
        </>
    )
}