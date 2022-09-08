import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import { Link } from 'react-router-dom';
import { TransitionGroup , CSSTransition } from 'react-transition-group';

const ComicsList = () => {
    const {error , loading , getAllComics} = useMarvelService()
    const [comics , setComics] = useState([])
    const [newItemLoading , setNewItemLoading] = useState(false)
    const [offset , setOffset] = useState(210)
    const [comicsEnded , setComicsEnded] = useState(false)



    useEffect(() => {
        onRequest(offset , true)
    } ,[])
    

   const onComicsLoaded = (newComics) => {
        let ended = false
        if(newComics.length < 9) {
            ended = true
        }
  
        setComics((comics) => [...comics , ...newComics])
        setOffset(offset => offset + 8)
        setComicsEnded(ended)
        setNewItemLoading(false)
    }




   const onRequest = (offset , initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
        .then(onComicsLoaded)
    }





    let spinner = (loading && !newItemLoading) ? <Spinner/> : null ,
    errorMessage = error ? <ErrorMessage/> : null



    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <View comics={comics}/>
            <button onClick={() => onRequest(offset)} disabled={newItemLoading} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({comics}) => {
    return  <ul className="comics__grid">
        <TransitionGroup component={null}>
                {
                    comics.map((item , index) => {
                        return (
                                <CSSTransition
                                    timeout={300}
                                    classNames={'comics__item'}
                                    key={item.id}>
                                    <li className="comics__item" key={index}   style={{cursor:'pointer'}}>
                                        <Link to={'/comics/' + item.id}>
                                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                                            <div className="comics__item-name">{item.title}</div>
                                            <div className="comics__item-price">{item.price}</div>
                                        </Link>
                                    </li>
                                </CSSTransition>
                        )
                    })
                }  
            </TransitionGroup> 
    </ul>
}

export default ComicsList;