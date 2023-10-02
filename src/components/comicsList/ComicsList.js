import './comicsList.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = (props) => {
    const [comicses, setComicses] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);


    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const {getAllComics, process, setProcess} = useMarvelService();

    const onRequest = (offset, init) => {
        init ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newComicses) => {
        let ended = false;
        if (newComicses.lenght < 8) {
            ended = true;
        }

        setComicses(comicses => [...comicses, ...newComicses]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    function listItem(comicses) {
        const items = comicses.map((comics, i) => {
            let style = {objectFit: 'cover'};
    
            if (comics.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                style = {objectFit: 'unset'};
            }

            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={i}>
                    <Link to={`/comics/${comics.id}`}>
                        <img style={style} src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.prices}</div>
                    </Link>
                </li>
            );
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        ); 
    }
    
    return (
        <div className="comics__list">
            {setContent(process, () => listItem(comicses), newItemLoading)}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;