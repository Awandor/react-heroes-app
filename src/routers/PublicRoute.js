import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

export const PublicRoute = ( { isAuthenticated, component: Component, ...rest } ) => {

    return (
        <Route {...rest} component={

            ( props ) => {

                return ( !isAuthenticated ) ? ( <Component {...props} /> ) : ( <Redirect to="/" /> );

                // return <Component {...props} />;

            }
        } />
    );

};

PublicRoute.propTypes = {

    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired // Es una función pues es un functional component
};
