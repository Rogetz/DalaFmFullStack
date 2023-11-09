import {ContentState, EditorState,RichUtils,AtomicBlockUtils,convertToRaw} from "draft-js"
// had to change the editor to point to the draft-js-plugins/editor.
import Editor from "@draft-js-plugins/editor"
import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef} from "react"
import "draft-js/dist/Draft.css"
import createHighlightPlugin from "./plugins/highlightPlugin.js"
import createLinkifyPlugin from "@draft-js-plugins/linkify"
import createLineThroughPlugin from "./plugins/lineThroughPlugin.js"
import {createEmbeddingLinksPlugin} from "./plugins/embeddingLinks.js"
import {h1Plugin} from "./plugins/h1Plugin.js"

//for the media
import { mediaBlockRenderer } from "./entities/components/mediaBlockRenderer";
import { useEffect } from "react";


// you need to call the plugin for it to be officially a ready plugin
const linkifyPlugin = createLinkifyPlugin() 

export function RichEditor(){
    const [editorState,setEditorState] = useState(EditorState.createEmpty())
    const editor = useRef() 
    // note that if the plugin is not in a method, you don't need to call the method, you simply import it.
    const highlightPlugin = createHighlightPlugin({editorState:editorState,setEditorState:setEditorState})    
    const lineThroughPlugin = createLineThroughPlugin({editorState: editorState,setEditorState: setEditorState})
    const embeddingLinksPlugin = createEmbeddingLinksPlugin({editorState:editorState,setEditorState:setEditorState})
    //testing if the plugins will be working as expected with the normal editor
    const plugins = [highlightPlugin,linkifyPlugin,lineThroughPlugin,embeddingLinksPlugin,h1Plugin]
    
    useEffect(function(){
        let focus = () => editor.current.focus()
    },[])

    let onAddImage = (e) => {
        e.preventDefault();
        const urlValue = window.prompt("Paste Image Link");
        const contentState = editorState.getCurrentContent();
        //I want to see the object in reality
        console.log(`content state before conversion: \n ${JSON.stringify(contentState)}`)
        console.log(`content state after conversion to a raw object: \n ${JSON.stringify(convertToRaw(contentState))}`)
        const contentStateWithEntity = contentState.createEntity(
        "image",
        "IMMUTABLE",
        { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity },
            "create-entity"
        )
        let newerState = AtomicBlockUtils.insertAtomicBlock(newEditorState,entityKey,"image")
        if(newerState){
            setEditorState(newerState)
            const contentState = newerState.getCurrentContent();
            console.log(`content state after adding the image and conversion to a raw object: \n ${JSON.stringify(convertToRaw(contentState))}`)
            setTimeout(() => focus(), 10000);
        }
    };

    //temporary link creator
    let tempLinkHandler = function(e){
        let link = window.prompt('Paste the link -');
        const selection = editorState.getSelection();
        if (!link) {
            setEditorState(RichUtils.toggleLink(editorState, selection,
            null));
            return 'handled but not a link';
        }
        const content = editorState.getCurrentContent();
        // also note that the part passed as an object while creating the entity is the data contained by the entity.
        const newerContent = content.createEntity('LINK', 'MUTABLE',
        { url: link });
        const newEditorState = EditorState.push(editorState,
        newerContent, 'create-entity');
        newerContent.getLastCreatedEntityKey
        const entityKey = newerContent.getLastCreatedEntityKey();
        // what's created by the richUtils is what will be passed on as output in the final link, so it can't work directly on the editor.
        // so chrome will not understand the link on the editor component, so to make chrome understand it that's where we use a decorator, and the decorator here uses a component that presents a link element that chrome can understand.
        let newestEditorState = RichUtils.toggleLink(newEditorState, selection,
        entityKey)
        if(newestEditorState){
            console.log("new editor generated")
            setEditorState(newestEditorState)
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
    let h1Handler = function(e){
        let newerState = RichUtils.toggleInlineStyle(editorState,"H1")
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
                <button style={buttonStyling} onClick={h1Handler}>
                    H1
                </button>
                <button style={buttonStyling} onClick={onAddImage}>
                    <i>image</i>
                </button>

            </div>
            <div className="editors">
            <Editor placeholder="editor's placeholder manze"  editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} plugins={plugins} ref={editor} 
blockRendererFn={mediaBlockRenderer}/>
            </div>
        </div>
    )
}