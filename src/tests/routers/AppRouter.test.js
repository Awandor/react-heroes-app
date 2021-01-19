import { AppRouter } from "../../routers/AppRouter";
import { mount } from "enzyme";
import { AuthContext } from "../../authentication/AuthContext";

describe( 'Pruebas en <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        userState: {
            logged: false
        }
    };

    test( 'debe mostrar login si no está autenticado', () => {

        /* const wrapper = shallow(
            <AppRouter />
        ); */

        // console.log( wrapper.html() ); // Da error porque no puede leer userState, falta el contexto

        // Tenemos que usar AuthContext como en HeroesApp.js

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log( wrapper.html() ); // Nos muestra el componente en HTML

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe mostrar el componente <MarvelPage /> si está autenticado', () => {

        contextValue.userState.logged = true;

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log( wrapper.html() ); // Nos muestra el componente en HTML

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( '.navbar' ).exists() ).toBe( true );
        
    } );
    


} );
