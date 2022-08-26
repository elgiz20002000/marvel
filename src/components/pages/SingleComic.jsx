import './singleComic.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import { Link, useParams } from 'react-router-dom';

const SingleComic = () => {

    const {loading , error , getComics , clearError} = useMarvelService()
    const [comics , setComics] =  useState(null)
    const {comicsId} = useParams()

    const onComicsLoaded = (comics) => {
        setComics(comics)
    }

    const onUpdateComics = () => {
        clearError()
        if(!comicsId) {
            return
        }
        getComics(comicsId)
        .then(onComicsLoaded)
    }

    useEffect(() => {
        onUpdateComics()
    } ,[])

    

    useEffect(() => {
        onUpdateComics()
    } , [comicsId])


    let skeleton = loading || error || comics ? null  : <Skeleton/> ,
    spinner = loading ? <Spinner/> : null ,
    errorMessage = error ? <ErrorMessage/> : null ,
    content = !(spinner || errorMessage || !comics) ? <View  comics={comics}/> : null




    return (
        <>
           {skeleton}
           {spinner}
           {errorMessage}
           {content}
        </>
    )
}


const View = ({comics , onComicsSelected}) => {
    const {title , thumbnail , description , price , language , pages} = comics 
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} Pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link  to={'/'} className="single-comic__back">Back to all</Link>
        </div>

   
    )
}

export default SingleComic;