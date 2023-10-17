import React from "react"
import reactDom from "react-dom/client";
import {createRoot} from "react-dom/client";
import {RichEditor} from "./richEditor"

const root = createRoot(document.getElementById("root"))
root.render(
    <RichEditor/>
)
