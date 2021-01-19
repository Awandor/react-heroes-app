import { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ( { publisher } ) => {

    // const heroes = getHeroesByPublisher(publisher);

    const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ publisher ] );

    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map( hero => (

                    /* Usamos la desestructuración de objetos para enviar las props */

                    <HeroCard key={hero.id} {...hero} />
                ) )
            }
        </div>
    );

};
