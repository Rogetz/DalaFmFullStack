import {ContentState, EditorState,RichUtils} from "draft-js"
// had to change the editor to point to the draft-js-plugins/editor.
import Editor from "@draft-js-plugins/editor"
import React from "react"
import ReactDom from "react-dom/client";
import {useState} from "react"
import "draft-js/dist/Draft.css"
import createHighlightPlugin from "./plugins/highlightPlugin.js"
import createLinkifyPlugin from "@draft-js-plugins/linkify"
import createLineThroughPlugin from "./plugins/lineThroughPlugin.js"


// you need to call the plugin for it to be officially a ready plugin
const linkifyPlugin = createLinkifyPlugin()

export function RichEditor(){
    const [editorState,setEditorState] = useState(EditorState.createEmpty()) 
    const highlightPlugin = createHighlightPlugin({editorState:editorState,setEditorState:setEditorState})    
    const lineThroughPlugin = createLineThroughPlugin({editorState: editorState,setEditorState: setEditorState})
    //testing if the plugins will be working as expected with the normal editor
    const plugins = [highlightPlugin,linkifyPlugin,lineThroughPlugin]
    
    

    //temporary link creator
    let tempLinkHandler = function(e){
        console.log("temp handler reached")
        // it works with the Selection type.
        let currentSelection = editorState.getSelection()

        // It also works with the entityKey for the link.
        let currentContent = editorState.getCurrentContent()
        // adding the link compoent to the currentContent in the gui for it to be able to be added  as an entityKey.
        let contentWithLinkEntity = currentContent.createEntity("LINK","MUTABLE",{url: "https://www.google.com"})
        // note the use of the EditorState interface
        let newerStateWithEntity = EditorState.push(editorState,contentWithLinkEntity,'create-entity')
        let finalEntity = contentWithLinkEntity.getLastCreatedEntityKey()
        let newerState = RichUtils.toggleLink(newerStateWithEntity,currentSelection,finalEntity)
        if(newerState){
            console.log("newer state created.")
            setEditorState(newerState)
        }
    }

    let handleKeyCommand = function(command){
        // note that the rich utils has the handle key command that should be passed in a command, good thing is that if we're using the draft.js Editor component it automatically passes in the command found to the handle key command, since it understands the core keyboards functionality. 
        let newerState = RichUtils.handleKeyCommand(editorState,command)
        if(newerState){
            // if a state is returned, then set the state to the newerState and log that info if ypu so wish.
            setEditorState(newerState)
        }
    }
    let italicHandler = function(e){
        // this is for setting it in italics
        let newerState = RichUtils.toggleInlineStyle(editorState,"ITALIC")
        if(newerState){
            // you can log it if you so wish.
            setEditorState(newerState)
        }
    }
    let editorStyling = {
        width: "100%",
        height: "100%",
    }
    let editorWrapper = {
        width: "80%",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        borderRadius: "0.5rem",
        border: "0.2rem solid blue"
    }
    let editorTopMenu = {
        width: "100%",
        height: "3rem",
        color: "blue",
        backgroundColor: "white",
        color: 'blue',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
    }
    let buttonStyling = {
        width: "auto",
        height: "2rem",
        fontWeight: "1.4rem",
        padding: "0.2rem",
        color: "white",
        backgroundColor: 'blue'
    }
    let boldHandler = function(e){
        let newerState = RichUtils.toggleInlineStyle(editorState,"BOLD")
        if(newerState){
            // always use th if to test to ensure that there's noo fatal error
            setEditorState(newerState)
        }
    }
    let underlineHandler = function(e){
        let newerState = RichUtils.toggleInlineStyle(editorState,"UNDERLINE")
        if(newerState){
            setEditorState(newerState)
        }
    }
    let highlightHandler = function(e){
        let newerState = RichUtils.toggleInlineStyle(editorState,'HIGHLIGHT')
        if(newerState){
            setEditorState(newerState)
        }
    }
    let lineThroughHandler = function(e){
        let newerState = RichUtils.toggleInlineStyle(editorState,"LINETHROUGH")
        if(newerState){
            setEditorState(newerState)
        }
    }
    // ensure that the editor is inside a div somewhere, so that it can be displayed since the editor is not like a div.
    return(
        <div className="editorContainer">
            <div style={editorTopMenu}>
                {/*choose whatever name you're comfortable with for the name handlers.*/}
                <button style={buttonStyling} onClick={italicHandler}>
                    I
                </button>
                <button style={buttonStyling} onClick={boldHandler}>
                    B
                </button>
                <button style={buttonStyling} onClick={underlineHandler}>
                    U
                </button>
                <button style={buttonStyling} onClick={highlightHandler}>
                    H
                </button>
                <button style={buttonStyling} onClick={lineThroughHandler}>
                    <span style={{textDecoration: "line-through"}}>abc</span>
                </button>
                <button style={buttonStyling} onClick={tempLinkHandler}>
                    Link
                </button>
            </div>
            <div className="editors">
            <Editor placeholder="editor's placeholder manze"  editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} plugins={plugins}/>
            </div>
        </div>
    )
}