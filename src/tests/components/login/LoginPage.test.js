import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../authentication/AuthContext";
import { LoginPage } from "../../../components/login/LoginPage";
import { types } from "../../../types/types";

describe( 'Pruebas en <LoginPage />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        userState: {
            logged: false
        }
    };

    const historyMock = {
        push: jest.fn(),
        location: {},

        // Nos fijamos en los errores de lo que falta y los vamos añadiendo deduciendo el tipo
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
    };

    test( 'debe mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // console.log( wrapper );

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe realizar el dispatch y la navegación', () => {

        const wrapperWithHistory = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Router history={historyMock}>
                        <LoginPage />
                    </Router>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        wrapperWithHistory.find( 'button' ).simulate( 'click' );

        // Vamos a evaluar si la función dispatch dentro de handleLogout ha sido invocada

        expect( contextValue.dispatch ).toHaveBeenCalled();

        // Ahora enviamos argumento y falla si no proveemos al wrapper de un history

        const userData = {
            type: types.login,
            payload: {
                name: 'Dan'
            }
        };

        expect( contextValue.dispatch ).toHaveBeenCalledWith( userData );

        // handleLogin usa history.replace, vamos a ver si se ha usado

        expect( historyMock.replace ).toHaveBeenCalledWith( '/' );

        // Vamos a usar localStorage

        localStorage.setItem( 'lastPath', '/dc' );

        wrapperWithHistory.find( 'button' ).simulate( 'click' );

        expect( historyMock.replace ).toHaveBeenCalledWith( '/dc' );

    } );

} );
