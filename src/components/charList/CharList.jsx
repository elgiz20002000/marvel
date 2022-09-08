import './charList.scss';
import {useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const CharList  = (props) => {
    console.log('list')
    const {error , loading , getAllCharacters} = useMarvelService()
    const [chars , setChars] = useState([])
    const [newItemLoading , setNewItemLoading] = useState(false)
    const [offset , setOffset] = useState(210)
    const [charEnded , setCharEnded] = useState(false)
    

   const onCharLoaded = (newChars) => {
        let ended = false
        if(newChars.length < 9) {
            ended = true
        }
  
        setChars((chars) => [...chars , ...newChars])
        setOffset(offset => offset + 9)
        setCharEnded(ended)
        setNewItemLoading(false)
    }




   const onRequest = (offset , initial) => {
        setNewItemLoading(!initial)
        getAllCharacters(offset)
        .then(onCharLoaded)
    }


    useEffect(() => {
        onRequest(offset , true)
    } ,[])



    let spinner = (loading && !newItemLoading) ? <Spinner/> : null ,
    errorMessage = error ? <ErrorMessage/> : null


    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <View upProp={props} chars={chars} />
            <button className="button button__main button__long" 
            onClick={() => onRequest(offset)} 
            disabled={newItemLoading}
            style={{display:charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({upProp , chars}) => {
    return  <ul className="char__grid">
             <TransitionGroup component={null}>
                {
                    chars.map((item , index) => (                        
                        <CSSTransition
                        timeout={300}
                        classNames={'char__item'}
                        key={item.id}>
                            <li 
                            className={item.id === upProp.charId ? ' char__item char__item_selected' : 'char__item'}  
                            onClick={() => upProp.onCharSelect(item.id)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') upProp.onCharSelect(item.id) 
                            }}
                            tabIndex={index + 1}>

                                    <img src={item.thumbnail} 
                                    style={Boolean(item.thumbnail.search('image_not_available') + 1 || item.thumbnail.match('http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif')) ? {objectFit:"fill"} : {objectFit:'cover'}} 
                                    alt={item.name}/>

                                    <div className="char__name">{item.name}</div>
                            </li>
                        </CSSTransition>
                        ) 
                    )
                }
            </TransitionGroup> 
    </ul>
}

CharList.propTypes = {
    onCharSelect:PropTypes.func.isRequired
}

export default CharList;