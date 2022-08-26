import './charList.scss';
import {useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types'


const CharList  = (props) => {

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


    const chars_items = chars.map((item , index) => {
            let clazz = item.id === props.charId ? ' char__item char__item_selected' : 'char__item'

            return (
            <li className={clazz} key={item.id} 
            onClick={() => {
                props.onCharSelect(item.id)
            }} 
            onKeyDown={(e) => {
                if(e.key === 'Enter') props.onCharSelect(item.id) 
            }}
            tabIndex={index + 1}>

                <img src={item.thumbnail} 
                style={Boolean(item.thumbnail.search('image_not_available') + 1 || item.thumbnail.match('http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif')) ? {objectFit:"fill"} : {objectFit:'cover'}} 
                alt={item.name}/>

                <div className="char__name">{item.name}</div>
            </li>)
    })

    let spinner = (loading && !newItemLoading) ? <Spinner/> : null ,
    errorMessage = error ? <ErrorMessage/> : null


    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <View chars_items={chars_items}/>
            <button className="button button__main button__long" 
            onClick={() => onRequest(offset)} 
            disabled={newItemLoading}
            style={{display:charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({chars_items}) => {
    return  <ul className="char__grid">
        {chars_items}
    </ul>
}

CharList.propTypes = {
    onCharSelect:PropTypes.func.isRequired
}

export default CharList;