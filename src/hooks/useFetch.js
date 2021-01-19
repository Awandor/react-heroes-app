import { useEffect, useState, useRef } from "react";

export const useFetch = ( url ) => {

  const isMounted = useRef( true );

  const [ state, setState ] = useState( { data: null, loading: true, error: null } );

  useEffect( () => {

    // El return se dispara cuando el componente se desmonta

    return () => {

      isMounted.current = false;

    };

  }, [] ); // La referencia vacía indica que sólo se ejecuta una vez al montarse

  useEffect( () => {

    setState( { data: null, loading: true, error: null } );

    fetch( url ).then( resp => resp.json() ).then( resp => {

      // Vamos a ralentizar el proceso

      setTimeout( () => {

        if ( isMounted.current ) {

          setState( {
            loading: false,
            error: null,
            data: resp
          } );

        } else {

          console.log( 'setState no se disparó' );

        }

      }, 500 );

    } ).catch( () => {

      setState( {
        data: null,
        loading: false,
        error: 'No se pudo cargar los datos'
      } );

    } );

  }, [ url ] );

  return state;

};
