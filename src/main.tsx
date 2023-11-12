import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ToastLayout from "./layout/ToastLayout.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(

        <Route element={<ToastLayout/>} errorElement={<ErrorPage/>}>
            <Route lazy={() => import("./layout/MenuHeaderLayout")}>
                <Route path='/menu' lazy={() => import("./pages/MainMenuPage.tsx")}/>
                <Route path='/settings' lazy={() => import("./pages/SettingsMenuPage.tsx")}/>
                <Route path='/previousmatches' lazy={() => import("./pages/PreviousMatchesPage.tsx")}/>
                <Route path='/instructions' lazy={() => import("./pages/InstructionsPage.tsx")}/>
            </Route>
            <Route index lazy={() => import("./pages/LandingMenu.tsx")}/>

            {/*// @ts-ignore */}
            <Route path='/game/:gameid' lazy={() => import("./pages/GamePage.tsx")}/>

        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
