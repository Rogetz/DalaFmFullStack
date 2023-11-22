// showing the logo before submitting it.
import React,{useState,useRef} from "react"
//best way of importing images
import avatar from "./nairobi-town.jpg"

export function ImageUpload(){
    const [fileFound,setFileFound] = useState(null)
    // this is the base64 FILE TO ne stored in the db
    const [base64File,setBase64File] = useState(null)
    const imageRef = useRef()
    let imageHandler = function(e){
        e.preventDefault()
        // use the files and access the first index found
        const fileReader = new FileReader()
        fileReader.readAsDataURL(fileFound)
        fileReader.onload = function(){
            // this seemingly doesnt work since it isn't a state.
            // get the fileReader.result as the result to set to the src
            let result = fileReader.result
            imageRef.current.src = result
            setBase64File(result)
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
        <div style={{width:"100%",height: "100vh",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            {/*always use a form if you are working with images*/}
            <form onSubmit={imageHandler}>
                {/*fun fact though is that here it uses the id for the label and not the name
                I guess that's how we label in react*/}
                <label htmlFor="my-file-id">
                    <img ref={imageRef} src={avatar} style={{width:"6rem",height:"6rem",objectFit:"cover",borderRadius:"50%"}} alt="avt"/>
                </label>
                <input type="file" onChange={fileChangeHandler} id="my-file-id" accept=".jpg,.png,jpeg" style={{display: "none",visibility:"hidden"}} />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}