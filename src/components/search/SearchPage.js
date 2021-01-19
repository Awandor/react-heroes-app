import { HeroCard } from '../heroes/HeroCard';
import { useForm } from "../../hooks/useForm";
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { useMemo } from 'react';

export const SearchPage = () => {

    const history = useHistory();

    const location = useLocation();

    const { q = '' } = queryString.parse( location.search ); // desestructuramos e igualamos a string vacío por defecto para evitar undefined

    const [ { name }, handleInputChange ] = useForm( {
        name: q // tiene que ser el nombre del input y lo igualamos a q así si hemos buscado y refrescado mantenemos el valor de q
    } );

    // const heroesFiltered = getHeroesByName(name);

    const heroesFiltered = useMemo( () => getHeroesByName( q ), [ q ] ); // Evita que se dispare cada vez que toco una tecla, sólo cuando q cambia



    const handleSearch = ( e ) => {

        e.preventDefault(); // evitar el refresco de la página

        // console.log( history );

        // console.log( location ); // nos da la propiedad search

        // console.log( 'queryString', queryString.parse( location.search ) ); // Nos devuelve un objeto con todos los parámetros de búsqueda

        // console.log( 'name +++++++++++++', name );

        if ( name.trim().length <= 1 ) {

            return;

        }

        history.push( `?q=${name}` ); // Nos empuja a la misma página con el parámetro y gracias a queryString.parse cambiamos el valor de q

    };

    return (
        <div>
            <h1>Search Page</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input className="form-control" type="text" name="name" placeholder="Find your hero" autoComplete="off" value={name} onChange={handleInputChange} />

                        <button className="btn btn-primary btn-block mt-3" type="submit">Search</button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        ( q === '' ) && <div className="alert alert-info">
                            Search for a hero
                        </div>
                    }

{
                        ( q !== '' && heroesFiltered.length === 0 ) && <div className="alert alert-danger">
                            There is no hero with name {q}
                        </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ) )
                    }
                </div>
            </div>
        </div>
    );

};
