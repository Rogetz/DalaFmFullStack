import React from "react"
import reactDom from "react-dom/client";
import {createRoot} from "react-dom/client";
import {RichEditor} from "./richEditor"
import {Home} from "./home"
import {AdminCreator} from "./adminCreator"
import {ImageUpload} from "./imageUpload"

const root = createRoot(document.getElementById("root"))
root.render(
    <AdminCreator/>
)
