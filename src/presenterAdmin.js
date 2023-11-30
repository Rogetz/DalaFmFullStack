import React from "react"
import "./presenterAdmin.css"
import portrait2 from "./portrait2removed.png"
import dalaRemoved from "./dalaFmActualRemoved.png"
import {createPresenter} from "./apis"

export function PresenterAdmin(){

    const [fileFound,setFileFound] = useState(null)
    // this is the base64 FILE TO ne stored in the db
    const [base64File,setBase64File] = useState(null)
    const imageRef = useRef()
    let presenterHandler = function(e){
        e.preventDefault()
        let name = e.target.presenterName.value
        let showName = e.target.showName.value
        let email = e.target.email.value
        let time = e.target.time.value
        // use the files and access the first index found
        const fileReader = new FileReader()
        fileReader.readAsDataURL(fileFound)
        fileReader.onload = function(){
            // this seemingly doesnt work since it isn't a state.
            // get the fileReader.result as the result to set to the src
            let result = fileReader.result
            imageRef.current.src = result
            setBase64File(result)
            // submit this to the form
            createPresenter({name:name,showName:showName,email:email,time:time,photo:base64File}).then(function({err,object}){
                // the result must be a text(object/error) 
                if(err != null){
                    // diplay the professional error toast.
                }
                else if(object != null){
                    // display the professional object toast.
                }
            }).catch(function(err){
                // display the professional error toaste
            })
            console.log(`result found in base64: ${JSON.stringify(result)}`)
        }
        fileReader.onerror = function(err){
            console.log("error occured when loading the file.")
        }
    }
    // the file can be read on the onChange from the frontend but not on the onSubmit,since when you submit it's sent through a http action.
    let fileChangeHandler = async function(e){
        let file = e.target.files[0] 
        setFileFound(file)
        console.log(`file found: ${file}`)
    }

    return (
        <>
        <div className="main-presentation">
            <div className="intro-div">Presenter creation</div>
            <form className="details" onSubmit={presenterHandler}>
                <div className="input-div">
                    <label className="label-class" htmlFor="presenterName">presenter</label>
                    <input type="text" className="actual-input" name="presenterName" placeholder="e.g Tony Nyadundo" id="presenterId"/>    
                </div>
                <div className="input-div">
                    <label className="label-class" htmlFor="emailId">email address</label>
                    <input type="text" className="actual-input" name="email" placeholder="e.g tony@gmail.com" id="emailId"/>    
                </div>
                <div className="input-div">
                    <label className="label-class" htmlFor="showId">show name</label>
                    <input type="text" className="actual-input" name="showName" placeholder=" e.g Mos Gi Tich" id="showId"/>    
                </div>
                <div className="input-div">
                    <label className="label-class" htmlFor="timeId">time</label>
                    <input type="text" className="actual-input" name="time" placeholder="e.g Mon-Fri,7am-10am" id="timeId"/>    
                </div>
                <label className="image-class" htmlFor="presenter-img">
                    <img ref={imageRef} id="actual-image" src="presenter-1.PNG" alt=""/>
                </label>
                <p>click the image to change presenter's icon</p>
                <input onChange={fileChangeHandler} type="file" name="" id="presenter-img" accept=".jpg,.jpeg,.png"/>
                <button type="submit" className="submit-btn">submit</button>
            </form>
        </div>

        <h2>Director's note</h2>
        <div className="director-div">
            <div className="director-left">
                <img src={dalaRemoved} alt="" className="director-pic"/>
            </div>
            <div className="director-right">
                <div className="director-name">Seth Oloo Mbaka</div>
                <h2 className="welcome-intro">welcome note</h2>
                <div className="welcome-note">
                    Welcome to Dala Fm our highly esteemed viewers and listeners. We are the modern local | international radio station for the engluo nation. Here at Dala Fm we air it just as you want it, when you want it and wherever you want it. Feel at home far from home.
                </div>
            </div>
        </div>
        <h2>DALA FM presenters</h2>
        <div className="presenters-wrapper">
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
            <div className="presenter-card">
                <div className="top-div">
                    <img className="top-presenter-img" src={portrait2} alt="" />
                </div>
                <div className="presenter-card-bottom">
                    <div className="presenter-name">Jeff Oloo</div>
                    <div className="presenter-show">
                        <div className="show-title">
                            <div className="left-show">show</div>
                            <div className="show-details">mos gi tich</div>
                        </div>
                        <div className="show-times">
                            <div className="time-title">Time</div>
                            <div className="time-details">Mon - Fri : 7-10 am</div>
                        </div>
                    </div>
                </div>               
            </div>
        </div>
        </>
    )
}