import { PrivateRoute } from "../../routers/PrivateRoute";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";


describe( 'Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    // Para comprobar cosas de la función localStorage.setItem, si ha sido llamada, con qué argumentos

    Storage.prototype.setItem = jest.fn();

    test( 'debe mostrar el componente si está autenticado y guardar en localStorage', () => {

        // el componente tiene que ser una función que retorna HTML

        // const wrapper = shallow( <PrivateRoute isAuthenticated={true} component={() => <span>algo</span>} {...props} /> );

        // Si hubiera un problema tipo componente Route tiene que estar dentro de Router podemos usar <MemoryRouter></MemoryRouter>

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute isAuthenticated={true} component={() => <span>algo</span>} {...props} />
            </MemoryRouter>
        );

        // Si usamos un higher order component como <MemoryRouter> no podemos usar shallow sino mount

        // console.log( wrapper.html() );

        // expect( wrapper.find( 'span' ).exists() ).toBe( true );
        expect( wrapper.find( 'span' ).exists() ).toBeTruthy();

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/marvel' );

    } );

    test( 'debe de bloquear el componente si no está autenticado', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute isAuthenticated={false} component={() => <span>algo</span>} {...props} />
            </MemoryRouter>
        );

        expect( wrapper.find( 'span' ).exists() ).toBe( false );

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/marvel' );
        
    } );
    

} );
