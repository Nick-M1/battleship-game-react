import {Outlet, useLoaderData} from "react-router-dom";
import {getRandomMenuBackgroundCss} from "../constants/asset-background-menu.ts";

export function loader() {
    const selectedMenuBackgroundCss = getRandomMenuBackgroundCss()

    return { selectedMenuBackgroundCss }
}

export function Component() {
    const { selectedMenuBackgroundCss } = useLoaderData() as ReturnType<typeof loader>

    return (
        <div className={`text-white w-screen h-screen overflow-clip font-riffic bg-black ${selectedMenuBackgroundCss} bg-center bg-cover`}>
            <Outlet/>
        </div>
    )
}