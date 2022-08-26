import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spiner';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const CharInfo = (props) => {

    const {loading , error , getCharacter , clearError} = useMarvelService()
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
    }

    useEffect(() => {
        onUpdateChar()
    } ,[])

    

    useEffect(() => {
        onUpdateChar()
    } , [props.charId])


    let skeleton = loading || error || char ? null  : <Skeleton/> ,
    spinner = loading ? <Spinner/> : null ,
    errorMessage = error ? <ErrorMessage/> : null ,
    content = !(spinner || errorMessage || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">
            {spinner}
            {errorMessage}
            {content}
            {skeleton}
        </div>
    )
}

const View = ({char}) => {
    const {name , thumbnail , description , wiki , homepage , comics} = char 
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