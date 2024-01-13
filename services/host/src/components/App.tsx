import classes from '@/components/App.module.scss'
import {Link, Outlet} from "react-router-dom";
import {adminRoutes} from '@packages/shared/src/routes/admin'
import {shopRoutes} from '@packages/shared/src/routes/shop'

export const App = () => {

    return (
        <div className={classes.app}>

            <h1>ITS HOST APP</h1>
            <Link to={adminRoutes.about}>About</Link>

            <Link to={shopRoutes.main}>Shop</Link>
            <Link to={shopRoutes.second}>Shop</Link>

            <Outlet/>
        </div>
    );
};

