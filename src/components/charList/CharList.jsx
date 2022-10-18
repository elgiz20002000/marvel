import './charList.scss';
import {useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useMemo } from 'react';
import { useRef } from 'react';
import { customSetContent } from '../utils/setContent';


const CharList  = (props) => {
    const { getAllCharacters , process , setProcess} = useMarvelService()
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
        .then(() => setProcess('confirmed'))
    }


    useEffect(() => {
        onRequest(offset , true)
    } ,[])

    const ref = useRef([]) ,

    focucOnItem = (id) => {
        ref.current.forEach(item => item.classList.remove('char__item_selected'))
        ref.current[id].classList.add('char__item_selected')
        ref.current[id].focus()
    }

    const renderItems = ({onCharSelect} , chars) => {
        return  (<ul className="char__grid">
                 <TransitionGroup component={null}>
                    {
                        chars.map((item , index) => (                        
                            <CSSTransition
                            timeout={300}
                            classNames={'char__item'}
                            key={item.id}>
                                <li 
                                className='char__item'
                                ref={(e) => ref.current[index] = e }
                                onClick={() => {
                                    onCharSelect(item.id)
                                        focucOnItem(index)
                                    }}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') {
                                        onCharSelect(item.id)
                                        focucOnItem(index)
                                        }
                                }}
                                tabIndex={index + 1}>
    
                                        <img loading='lazy' src={item.thumbnail} 
                                        style={Boolean(item.thumbnail.search('image_not_available') + 1 || item.thumbnail.match('http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif')) ? {objectFit:"fill"} : {objectFit:'cover'}} 
                                        alt={item.name}/>
    
                                        <div className="char__name">{item.name}</div>
                                </li>
                            </CSSTransition>
                            ) 
                        )
                    }
                </TransitionGroup> 
        </ul>)
    }



    const elements = useMemo(() => customSetContent(process , () =>  renderItems(props , chars) ,  newItemLoading ) , [process])




    return (
        <div className="char__list">
            {elements}
            <button className="button button__main button__long" 
            onClick={() => onRequest(offset)} 
            disabled={newItemLoading}
            style={{display:charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}





CharList.propTypes = {
    onCharSelect:PropTypes.func.isRequired
}

export default CharList;