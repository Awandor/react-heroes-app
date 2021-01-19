import { authReducer } from "../../authentication/authReducer";
import { types } from "../../types/types";



describe( 'Pruebas en authReducer', () => {

  const initialState = { logged: false };

  test( 'debe retornar el estado por defecto', () => {

    const state = authReducer( initialState, {} ); // enviamos una acción vacía para ver el resultado por defecto

    expect( state ).toEqual( initialState );

  } );

  test( 'debe autenticar y colocar el nombre del usuario', () => {

    const action = {
      type: types.login,
      payload: {
        name: 'Dan'
      }
    };

    const state = authReducer( initialState, action );

    expect( state ).toEqual( { logged: true, name: 'Dan' } );

  } );

  test( 'debe borrar el nombre del usuario y logged false', () => {

    const action = {
      type: types.logout
    };

    const state = authReducer( { logged: true, name: 'Dan' }, action );

    expect( state ).toEqual( initialState );

  } );


} );
