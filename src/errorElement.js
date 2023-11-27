import React from "react"
import "./errorElement.css"
import { useRouteError } from "react-router-dom"

export default function ErrorElement(){
    const error = useRouteError()
    console.log(error)
    return (
        <div>Error element
            {error.statusText}
        </div>
    )
}