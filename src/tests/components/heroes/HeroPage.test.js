import { mount } from "enzyme";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { HeroPage } from "../../../components/heroes/HeroPage";

describe( 'Pruebas en <HeroPage />', () => {

    // Vamos a hacer un mock del history tal y como lo usamos en HeroPage

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),

        // Nos fijamos en los errores de lo que falta y los vamos añadiendo deduciendo el tipo
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),

        location: {
            pathname: '/hero/marvel-spider'
        }

    };

    // Ahora lo aplicamos al HeroPage usando Router

    /* const wrapper = mount(
        <MemoryRouter initialEntries={ [ '/hero' ] }>
            <Router history={historyMock}>
                <HeroPage />
            </Router>
        </MemoryRouter>
    ); */

    // Es conveniente limpiar los mocks después de cada prueba

    afterEach( () => {

        jest.clearAllMocks();

    } );



    test( 'debe mostrar el componente <Redirect /> si no hay parámetros en el URL', () => {

        const wrapperNoHero = mount(
            <MemoryRouter initialEntries={[ '/hero' ]}>
                <HeroPage />
            </MemoryRouter>
        );

        expect( wrapperNoHero.find( 'Redirect' ).exists() ).toBe( true );

    } );

    const wrapper = mount(
        <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
            <Route path="/hero/:heroId">
                <HeroPage />
            </Route>
        </MemoryRouter>
    );


    test( 'debe mostrar un hero si el parámetro es correcto', () => {

        expect( wrapper.find( 'h3' ).text().trim() ).toBe( 'Spider Man' );

    } );

    const wrapperHistory = mount(
        <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
            <Router history={historyMock}>
                <Route path="/hero/:heroId" component={() => <HeroPage />} />
            </Router>
        </MemoryRouter>
    );

    test( 'debe regresar a la pantalla anterior con goBack', () => {

        expect( wrapperHistory ).toMatchSnapshot();

        // Simulamos el click del botón Volver

        wrapperHistory.find( 'button' ).simulate( 'click' );

        // Vamos a evaluar si la función history.goBack dentro de handleReturn ha sido invocada

        expect( historyMock.goBack ).toHaveBeenCalled();

    } );

    test( 'debe ir a la pantalla de inicio', () => {

        historyMock.length = 1;

        // Simulamos el click del botón Volver

        wrapperHistory.find( 'button' ).simulate( 'click' );

        // Vamos a evaluar si la función history.goBack dentro de handleReturn ha sido invocada

        expect( historyMock.push ).toHaveBeenCalledWith( '/' );

    } );

    test( 'debe llamar Redirect si el héroe no existe', () => {

        historyMock.location = {
            pathname: '/hero/algo'
        };

        const wrapperHistory = mount(
            <MemoryRouter initialEntries={[ '/hero/algo' ]}>
                <Router history={historyMock}>
                    <Route path="/hero/:heroId" component={() => <HeroPage />} />
                </Router>
            </MemoryRouter>
        );

        expect( wrapperHistory ).toMatchSnapshot();

    } );


} );
