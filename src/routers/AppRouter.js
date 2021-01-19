import {
    BrowserRouter as Router,
    Switch/* ,
    Route */
} from "react-router-dom";
import { LoginPage } from "../components/login/LoginPage";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const { userState: { logged } } = useContext( AuthContext ); // Forma rápida de llegar a logged

    // console.log( 'logged', logged );
    
    return (
        <Router>
            {/* Se aconseja meter el switch en un div */}
            <div>
                {/* <Navbar /> */}

                <Switch>
                    {/* <Route exact path="/login" component={LoginPage} /> */}
                    {/* <Route exact path="/login">
                        <LoginPage />
                    </Route> */}

                    <PublicRoute isAuthenticated={logged} path="/login" component={LoginPage} />

                    {/* En el siguiente no se usa exact */}
                    {/* <Route path="/">
                        <DashboardRoutes />
                    </Route> */}

                    <PrivateRoute isAuthenticated={logged} path="/" component={DashboardRoutes} />
                </Switch>
            </div>
        </Router>
    );
    
};
