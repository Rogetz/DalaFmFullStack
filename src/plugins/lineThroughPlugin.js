import { hasCommandModifier } from "draft-js/lib/KeyBindingUtil"
import {RichUtils} from "draft-js"

export default({editorState,setEditorState}) => {
    return {
        customStyleMap: {
            "LINETHROUGH" : {
                textDecoration: "line-through"
            }
        },
        keyBindingFn: (e) => {
            if(hasCommandModifier(e) && e.key == ("L")){
                return "LINETHROUGH"
            }
        },
        handleKeyCommand: (command) => {
            if(command == "LINETHROUGH"){
                let newerState = RichUtils.toggleInlineStyle(editorState,"HIGHLIGHT")
                if(newerState){
                    setEditorState(newerState)
                }
            }
        }  
    }
}