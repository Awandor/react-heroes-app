import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";
import { Navbar } from "../../components/ui/Navbar";
import { types } from "../../types/types";

describe( 'Pruebas en <Navbar />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        userState: {
            logged: true,
            name: 'Dan'
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    // Vamos a hacer un mock del history

    const historyMock = {
        push: jest.fn(),
        location: {},

        // Nos fijamos en los errores de lo que falta y los vamos añadiendo deduciendo el tipo
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
    };

    // Ahora lo aplicamos al Navbar usando Router

    const wrapperWithHistory = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    // Es conveniente limpiar los mocks después de cada prueba

    afterEach( () => {

        jest.clearAllMocks();

    } );

    test( 'Debe mostrar el nombre del usuario', () => {

        expect( wrapper.find( 'span' ).text().trim() ).toBe( 'Dan' );

    } );

    test( 'debe llamar logout y usar useHistory', () => {

        // Simulamos el click del botón logout

        wrapperWithHistory.find( 'button' ).simulate( 'click' );

        // Vamos a evaluar si la función dispatch dentro de handleLogout ha sido invocada

        expect( contextValue.dispatch ).toHaveBeenCalled();

        // Ahora enviamos argumento y falla si no proveemos al wrapper de un history

        expect( contextValue.dispatch ).toHaveBeenCalledWith( { type: types.logout } );

        // handleLogout usa history.replace, vamos a ver si se ha usado

        expect( historyMock.replace ).toHaveBeenCalledWith( '/login' );

    } );


} );
