import { useState } from "react";

export const useForm = ( initialState = {} ) => {

    const [ formValues, setFormValues ] = useState( initialState );

    const reset = () => {

        setFormValues( initialState );

    };

    const handleInputChange = ( { target } ) => {

        // console.log( target );

        // target.name es el atributo name del input, así podemos reutilizar la misma función para varios inputs

        setFormValues( { ...formValues, [target.name]: target.value } );

    };

    // Podemos retornar un arreglo, un objeto, los valores...

    return [ formValues, handleInputChange, reset ];

};
