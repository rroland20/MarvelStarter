import './singleComicPage.scss';

import { useParams, Link } from 'react-router-dom';

import { useState, useEffect} from 'react'
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comics, setComics] = useState(null); 
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId]);
    
    const updateComics = () => {
        clearError();
        getComics(comicId)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comics) ? <View comics={comics} /> : null;
    const display = errorMessage ? 'block' : 'grid';

    return (
        <div style={{display: display}} className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comics}) => {
    const {title, thumbnail, description, pageCount, language, prices} = comics;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    );
}

export default SingleComicPage;
