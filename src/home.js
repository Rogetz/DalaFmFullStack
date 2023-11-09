import React from "react"
import ReactDom from "react-dom/client";
import {useState,useRef,useEffect} from "react"
import "./home.css"

export function Home(){
    let upperDiv = {
        width: "100%",
        height: "5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "blue",
        position: "sticky",
        top: "0rem",
        padding: "0rem 2rem",
        boxSizing: "border-box",
        zIndex: "5"
    }
    let mainDiv = {
        width: "100%",
        minHeight: "90vh",
        position: "relative",
        backgroundColor: "red"
    }
    let  bottomDiv = {
        width: "100%",
        height: "auto",
        backgroundColor: "green",
        color: "white"
    }
    let logoIcon = {
        width: "10rem",
        height: "3rem",
        backgroundColor: "green",
        position:"relative"
    }
    let leftDiv = {
        minWidth: "4rem",
        height: "3rem",
        backgroundColor: "red",
        position: 'relative'
    }
    let liveStyle = {
        position: "fixed",
        top: "6rem",
        left: "2rem",
        backgroundColor: "blue",
        width: "fit-content",
        height: "fit-content",
        padding: "0.3rem",
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "0.5rem",
    }
    let watchStyle = {
        position: "fixed",
        top: "6rem",
        right: "2rem",
        backgroundColor: "blue",
        width: "fit-content",
        height: "fit-content",
        padding: "0.3rem",
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "0.5rem",
    }
    return (
        <div style={{width:"100%",minHeight:"100vh",backgroundColor:"red",margin:"0rem"}}>
            <div style={upperDiv}>
                <div style={logoIcon}></div>
                <div style={leftDiv}></div>
            </div>
            <div style={mainDiv}>
                <div style={liveStyle}>listen live</div>
                <div style={watchStyle}>watch live</div>
            </div>
            <div style={bottomDiv}>
                Dala fm
            </div>
        </div>
    )
}

