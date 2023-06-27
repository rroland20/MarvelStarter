import { Component } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';

import MarvelService from '../../services/MarvelService'; 
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onCharLoaded = (newChars) => {
        let ended = false;
        if (newChars.lenght < 9) {
            ended = true;
        }
        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    onError = () => {
        this.setState({error: true, loading: false});
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    listItem = (chars) => {
        const items = chars.map((char, i) => {
            let style = {objectFit: 'cover'};
    
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                style = {objectFit: 'unset'};
            }
            return (
                <li className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={char.id}
                    onClick={() => {
                        this.props.onCharSelected(char.id);
                        this.focusOnItem(i);    
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(char.id);
                            this.focusOnItem(i);
                        }
                    }}>
                        <img style={style} src={char.thumbnail} alt={char.name}/>
                        <div className="char__name">{char.name}</div>
                </li>
            );
        });
        return (
            <ul className="char__grid">
                    {items}
                </ul>
        );
    }

    render() {
        const {chars, loading, error, newItemLoading, offset, charEnded} = this.state;
        const items = this.listItem(chars);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const view = !(loading || error) ? items : null;
        
        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {view}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;