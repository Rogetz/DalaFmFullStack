import React from "react"
import reactDom from "react-dom/client";
import {createRoot} from "react-dom/client";
import {RichEditor} from "./richEditor"
import {Home} from "./home"
import {AdminCreator} from "./adminCreator"
import {ImageUpload} from "./imageUpload"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {Wrapper} from "./wrapper"
import  ErrorElement  from "./errorElement";
import { ContactUs } from "./contactUs";
import {About} from "./about"
import {Presenter} from "./presenter"
import {Login} from "./login"
import {AdminWrapper} from "./adminWrapper"
import {PresenterWrapper} from "./presenterWrapper"
import {PresenterHome} from "./presenterHome"
import {AdminHome} from "./adminHome"
import {PresenterAdmin} from "./presenterAdmin"

let route = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper/>,
        errorElement: <ErrorElement/>,
        children : [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "contact",
                element : <ContactUs/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "presenter",
                element: <Presenter/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorElement/>
    },
    {
        path : "/admin",
        element: <AdminWrapper/>,
        errorElement: <ErrorElement/>,
        children : [
            {
                path: "/admin/",
                element: <AdminHome/>
            },
            {
                path: "contact",
                element : <ContactUs/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "presenter",
                element: <PresenterAdmin/>
            }
        ]
    },
    {
        path: "/presenterDashboard",
        element: <PresenterWrapper/>,
        errorElement: <ErrorElement/>,
        children: [
            {
                path: "/presenterDashboard/",
                element: <PresenterHome/>
            },
            {
                path: "contact",
                element : <ContactUs/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "presenter",
                element: <Presenter/>
            }
        ]
    }
])

const root = createRoot(document.getElementById("root"))
//root.render(<AdminCreator/>)
root.render(
    <RouterProvider router={route}/>
)
