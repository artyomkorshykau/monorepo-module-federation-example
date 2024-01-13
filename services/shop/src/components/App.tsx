import classes from '@/components/App.module.scss'
import {Link, Outlet} from "react-router-dom";

export const App = () => {

    return (
        <div className={classes.app}>

            <h1>Shop module</h1>
            <Outlet/>
        </div>
    );
};

