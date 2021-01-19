import { Redirect, useParams, useHistory } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";
import { useMemo } from 'react';

export const HeroPage = () => {

    // const params = useParams();

    // console.log(params);

    const { heroId } = useParams();

    // const hero = getHeroById(heroId);

    const hero = useMemo( () => getHeroById( heroId ), [ heroId ] );

    // console.log( 'hero: ', hero );

    let history = useHistory();

    // si heroId es undefined la app se rompe al hacer la desestructuración así que validamos

    if ( !hero ) {

        console.log( 'NO EXISTE' );

        return <Redirect to="/" />;

    }

    const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

    const handleReturn = () => {

        // console.log( 'Volver ha sido pulsado ++++++++++++++++++++++++++++' );

        // console.log( 'history.length', history.length );

        if( history.length <= 2 ){

            // console.log( 'PUSH' );

            history.push( '/' );

        } else {

            // console.log( 'GOBACK' );

            history.goBack();

        }

    };

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={`../assets/heroes/${heroId}.jpg`} alt="{superhero}" className="img-thumbnail animate__animated animate__fadeInLeft" />
            </div>

            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Alter ego:</b> {alter_ego}
                    </li>
                    <li className="list-group-item">
                        <b>Publisher:</b> {publisher}
                    </li>
                    <li className="list-group-item">
                        <b>First appearance:</b> {first_appearance}
                    </li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button className="btn btn-info" onClick={handleReturn}>Volver</button>
            </div>
        </div>
    );

};
