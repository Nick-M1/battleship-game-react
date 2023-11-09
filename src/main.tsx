import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route errorElement={<ErrorPage/>}>
            <Route lazy={() => import("./layout/MenuHeaderLayout")}>
                <Route path='/menu' lazy={() => import("./pages/MainMenuPage.tsx")}/>
                <Route path='/settings' lazy={() => import("./pages/SettingsMenuPage.tsx")}/>
            </Route>
            <Route index lazy={() => import("./pages/LandingMenu.tsx")}/>
            <Route path='/game/:gameid' lazy={() => import("./pages/GamePage.tsx")}/>
            {/*<Route path='/leaderboard' lazy={() => import("./pages/LeaderboardPage")}/>*/}


        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
