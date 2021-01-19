import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";



describe( 'Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        userState: {
            logged: true,
            name: 'Dan'
        }
    };

    test( 'debe mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // console.log( wrapper );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( 'span' ).text().trim() ).toBe( 'Dan' );

    } );

} );
