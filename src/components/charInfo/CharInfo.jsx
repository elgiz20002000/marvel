import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { setContent } from '../utils/setContent';

const CharInfo = (props) => {

    const {getCharacter , clearError , process , setProcess} = useMarvelService()
    const [char , setChar] =  useState(null)

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const onUpdateChar = () => {
        clearError()
        if(!props.charId) {
            return
        }
        getCharacter(props.charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))

    }

    useEffect(() => {
        onUpdateChar()
    } ,[])

    

    useEffect(() => {
        onUpdateChar()
    } , [props.charId])




    return (
        <div className="char__info">
            {setContent(process , View , char)}
        </div>
    )
}

const View = ({data}) => {
    const {name , thumbnail , description , wiki , homepage , comics} = data 
    return (
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt={name} style={Boolean(thumbnail.search('image_not_available') + 1) ? {objectFit:"fill"} : {objectFit:'cover'}} />
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {
                        comics.length ?  comics.map((item , i) => {
                                if(i > 10) return 
                                return (<li  className="char__comics-item" key={i}>
                                        <Link to={'./comics/' + item.resourceURI.slice(item.resourceURI.lastIndexOf('/') + 1)}>{item.name}</Link>
                                    </li>)
                            }) : 'Haven`t any comics'
                        }
                    
                    </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId:PropTypes.number
}

export default CharInfo;