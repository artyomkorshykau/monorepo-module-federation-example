import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "@/index.scss"
import {router} from "@/router/Router";

const root = document.getElementById('root')

const container = createRoot(root)

container.render(
    <RouterProvider router={router}/>
)