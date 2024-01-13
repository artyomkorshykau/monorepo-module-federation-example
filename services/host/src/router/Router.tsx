import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import React from "react";
// @ts-ignore
import shopRouter from 'shop/Router'
// @ts-ignore
import adminRouter from 'admin/Router'

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            ...shopRouter,
            ...adminRouter,
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes