import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';





const RandomChar = () => {

   const {loading , error , getCharacter , clearError} = useMarvelService()

    const [char , setChar] =  useState({})

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id).then(onCharLoaded)
    }


    useEffect(() => {
        updateChar()
    } ,[])



        let spinner = loading ? <Spinner/> : null ,
        errorMessage = error ? <ErrorMessage/> : null ,
        content = !(spinner || errorMessage || !char) ? <View char={char}/> : null

        return (
            <div className="randomchar">
               {spinner}
               {errorMessage}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
     
}

const View = ({char}) => {
    let  {name , description , thumbnail , homepage , wiki} = char ,
    imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:"fill"} : {objectFit:'cover'}


     return (<div className="randomchar__block">
     <img src={thumbnail} style={imgStyle} alt="Random character" className="randomchar__img"/>
     <div className="randomchar__info">
         <p className="randomchar__name">{name}</p>
         <p className="randomchar__descr">
             {description}                            
         </p>
         <div className="randomchar__btns">
             <a href={homepage} className="button button__main">
                 <div className="inner">homepage</div>
             </a>
             <a href={wiki} className="button button__secondary">
                 <div className="inner">Wiki</div>
             </a>
         </div>
     </div>
 </div>)
 }


export default RandomChar;