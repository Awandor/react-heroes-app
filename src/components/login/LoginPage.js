import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";
import { types } from "../../types/types";

export const LoginPage = () => {

    const history = useHistory();

    const context = useContext( AuthContext );

    // console.log( 'context', context );

    const handleLogin = ( e ) => {

        // history.push('/marvel'); // Nos empuja a la página
        // history.replace('/marvel'); // Nos lleva a la página y reemplaza LoginPage por ésta en el historial

        const lastPath =localStorage.getItem( 'lastPath' ) || '/';

        context.dispatch( {
            type: types.login,
            payload: {
                name: 'Dan'
            }
        } );

        // history.replace( '/' ); 

        history.replace( lastPath ); 

    };

    return (
        <div className="container">
            <h1>Login</h1>
            <hr />

            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    );

};
