import { AppRouter } from "./routers/AppRouter";
import { AuthContext } from "./authentication/AuthContext";
import { useEffect, useReducer } from "react";
import { authReducer } from "./authentication/authReducer";

const init = () => {

    return JSON.parse( localStorage.getItem( 'user' ) ) || { logged: false };

};

export const HeroesApp = () => {

    // Se ejecuta init y el resultado se lo pasa al initialSate que lo hemos definido como {} y así tenemos el state inicial de la app

    const [ userState, dispatch ] = useReducer( authReducer, {}, init );

    // Guardamos en localStorage cuando userState cambia

    useEffect( () => {
        
        localStorage.setItem( 'user', JSON.stringify( userState ) );

        /* return () => {
            cleanup
        } */

    }, [ userState ] );


    return (
        <AuthContext.Provider value={ { userState, dispatch } }>
            <AppRouter />
        </AuthContext.Provider>
    );

    // Con el AuthContext podemos distribuir por toda la app el estado del usuario haciendo dispatch

};
