import classes from '@/components/App.module.scss'
import {Outlet} from "react-router-dom";

export const App = () => {

    return (
        <div className={classes.app}>

            <h1>Admin module</h1>

            <Outlet/>
        </div>
    );
};

