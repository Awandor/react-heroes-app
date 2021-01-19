import { mount } from "enzyme";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { SearchPage } from "../../../components/search/SearchPage";


describe( 'Pruebas en <SearchPage />', () => {

    test( 'debe mostrarse correctamente con valor por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search' ]}>
                <Route path="/search" component={SearchPage} />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( '.alert-info' ).text().trim() ).toBe( 'Search for a hero' );

    } );

    test( 'debe mostrar a Batman y el input con el valor del queryString', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <Route path="/search" component={SearchPage} />
            </MemoryRouter>
        );

        expect( wrapper.find( 'input' ).prop( 'value' ) ).toBe( 'batman' );

    } );

    test( 'debe mostrar un error si no se encuentra el héroe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=algo' ]}>
                <Route path="/search" component={SearchPage} />
            </MemoryRouter>
        );

        expect( wrapper.find( '.alert-danger' ).text().trim() ).toBe( 'There is no hero with name algo' );

    } );

    test( 'debe de llamar el push del history', () => {

        const historyMock = {
            push: jest.fn(),

            // Nos fijamos en los errores de lo que falta y los vamos añadiendo deduciendo el tipo
            listen: jest.fn(),
            createHref: jest.fn(),
            replace: jest.fn(),
            location: {
                pathname: '/search' // Debe coincidir con Route
            }
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search' ]}>
                <Router history={historyMock}>
                    <Route path="/search" component={ () => <SearchPage />} />
                </Router>
            </MemoryRouter>
        );

        // Simulamos el cambio en el input y enviamos el evento

        wrapper.find( 'input' ).simulate( 'change', {
            target: {
                name: 'name',
                value: 'batman'
            }
        } );

        wrapper.find( 'form' ).prop( 'onSubmit' )( { preventDefault() { } } );

        expect( historyMock.push ).toHaveBeenCalled();
    
} );




} );
