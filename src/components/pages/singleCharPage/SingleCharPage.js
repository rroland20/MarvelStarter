import './singleCharPage.scss';

import { useParams } from 'react-router-dom';

import { useState, useEffect} from 'react'
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SingleCharPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterId]);
    
    const updateChar = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setCharacter(char);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !character) ? <View char={character} /> : null;
    const display = errorMessage ? 'block' : 'grid';

    return (
        <div style={{display: display}} className="single-char">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}) => {
    const {name, thumbnail, description } = char;
    return (
        <>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </>
    );
}

export default SingleCharPage;