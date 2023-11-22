import React from "react"
import "./contactUs.css"


export function ContactUs(){

    return (
        <div class="major-wrapper">
            <div class="upper-menu">
                <div class="menu-logo">
                    <img class="logo-img" src="./dalaFm_rounded_logo.PNG" alt="avt" />
                    <div class="brand-name">DALA FM</div>
                </div>
                <div class="other-options">      
                    <div class="opt"><span class="fa fa-home"></span><a href="./home.html">Home</a></div>
                    <div class="opt"><span class="fa fa-newspaper"></span><a href="./news.html">News</a></div>
                    <div class="opt"><span class="fa fa-timeline"></span><a href="./programs.css">programs</a></div>
                    <div class="opt"><span class="fa-solid fa-volume-high"></span><a href="advertise.html">Advertise with us</a></div>
                    <div class="opt"><span class="fa fa-phone"></span><a href="#">Contact us</a></div>
                    <div class="opt"><span class="fa fa-info-circle"></span><a href="./about.html">About</a></div>
                    <div class="opt"><span class="fa fa-microphone"></span><a href="./presenters.html">presenters</a></div>
                </div>
                <div class="login-signup"><span class="fa fa-user-circle"></span>login</div>
                <span class="fa fa-bars"></span>
                <span class="fa fa-close hidden"></span>
                <div class="toggled-menu">
                    <div class="opt"><span class="fa fa-home"></span><a href="./home.html">Home</a></div>
                    <div class="opt"><span class="fa fa-newspaper"></span><a href="./news.html">News</a></div>
                    <div class="opt"><span class="fa fa-timeline"></span><a href="./programs.css">programs</a></div>
                    <div class="opt"><span class="fa-solid fa-volume-high"></span><a href="advertise.html">Advertise with us</a></div>
                    <div class="opt"><span class="fa fa-phone"></span><a href="#">Contact us</a></div>
                    <div class="opt"><span class="fa fa-info-circle"></span><a href="./about.html">About</a></div>
                    <div class="opt"><span class="fa fa-microphone"></span><a href="./presenters.html">presenters</a></div>
                </div>
            </div>
            <div class="contact-us-card">
                <div class="left-side">
                    <div class="contact-title">Contact Us</div>
                    <input type="text" class="text" placeholder="your name"/>
                    <input type="text" class="text" placeholder="your email"/>
                    <input type="text" class="text" placeholder="your message"/>
                    <button class="send">send us the message <span class="fa-brands fa-telegram-plane"></span></button>
                </div>
                <div class="right-side">
                    <h2>our socials</h2>
                    <div class="contact-social-handles">
                        <span class="fa-brands fa-instagram"><span class="text">follow us on instagram</span></span>
                        <span class="fa-brands fa-twitter"><span class="text">follow us on twitter</span></span>
                        <span class="fa-brands fa-linkedin"><span class="text">follow us on linkedin</span></span>
                        <span class="fa-brands fa-youtube"><span class="text">follow us on youtube</span></span>
                    </div> 
                    <div class="location-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15959.255401265867!2d34.767915!3d-0.0857662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa5ff6b28c4af%3A0x1c05529d63b9ee96!2sDala%20Fm%20LTD!5e0!3m2!1sen!2ske!4v1700312402330!5m2!1sen!2ske" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>   
                </div>
            </div>
            <div class="footer">
                <div class="social-handles">
                    <span class="fa-brands fa-instagram"></span>
                    <span class="fa-brands fa-twitter"></span>
                    <span class="fa-brands fa-linkedin"></span>
                    <span class="fa-brands fa-youtube"></span>
                </div>
                <div class="copyright-info">
                    <div class="copyright-class">copyright<span class="fa fa-copyright"></span> 2023</div> 
                    <div class="dala-div">DALA FM</div>
                </div>
            </div>
        </div>
    )
}