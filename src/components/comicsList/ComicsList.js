import './comicsList.scss';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const ComicsList = (props) => {
    const [comicses, setComicses] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);


    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const {loading, error, getAllComics} = useMarvelService();

    const onRequest = (offset, init) => {
        console.log(111)
        init ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
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

            console.log(comics.id);

            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={comics.id}
                    // onClick={() => {
                    //     props.onComicsSelected(comics.id);
                    //     // focusOnItem(i);    
                    // }}
                    // onKeyDown={(e) => {
                    //     if (e.key === ' ' || e.key === "Enter") {
                    //         props.onComicsSelected(comics.id);
                    //         // focusOnItem(i);
                    //     }
                    // }}
                    >
                    <a href="/#">
                        <img style={style} src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.prices}</div>
                    </a>
                </li>
            );
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        ); 
    }

    const items = listItem(comicses);
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    
    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMessage}
            <button className="button button__main button__long"
                style={{display: comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;