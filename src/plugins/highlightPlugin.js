import {RichUtils} from "draft-js"
import { hasCommandModifier } from "draft-js/lib/KeyBindingUtil"


// I've modified it to accept parameters.
export default ({editorState,setEditorState}) => {
    return {
        customStyleMap: {
            'HIGHLIGHT': {
                background: "red",
            },
        },
        keyBindingFn: (e) => {
            console.log(`e.metakey: ${e.metaKey} and e.key: ${e.key}`)
            if(hasCommandModifier(e) && e.key == 'h'){
                return 'highlight'
            }
        },
        handleKeyCommand: (command) => {
            console.log(`command found at handleKey: ${command}`)
            if (command == 'highlight') {
              let newerState = RichUtils.toggleInlineStyle(editorState,'HIGHLIGHT')
              if(newerState){
                setEditorState(newerState)
              }
            }
        },
    }
}
