import React from 'react';
import {RichUtils,EditorState,} from 'draft-js'
import {Link,linkStrategy} from "../entityProperties/embededLinks.js"
import {hasCommandModifier} from "draft-js/lib/KeyBindingUtil"


// actually a plugin is simply an object with attributes, only that you can embed it in a function if you wish.
export const createEmbeddingLinksPlugin = ({editorState,setEditorState}) => {
    return {
        keyBindingFn: (event) => {
            const selection = editorState.getSelection();
            if (selection.isCollapsed()) {
            return;
            }
            if (hasCommandModifier(event) && event.key == "e"){
            return 'add-link'
            }
        },
        handleKeyCommand: (command) => {
            if (command !== 'add-link') {
                return 'not-handled';
            }
            let link = window.prompt('Paste the link -');
            const selection = editorState.getSelection();
            if (!link) {
                setEditorState(RichUtils.toggleLink(editorState, selection,
                null));
                return 'handled but not a link';
            }
            const content = editorState.getCurrentContent();
            // also note that the part passed as an object while creating the entity is the data contained by the entity.
            //Do note that this part of creating the entity is what actually calls the decorator.
            // remember that decorator is a property of any entity so when it's created it works with the decorator here and calls it here.
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
            return 'handled';
        },
        decorators: [{
            strategy: linkStrategy,
            component: Link,
        }],
    }
}