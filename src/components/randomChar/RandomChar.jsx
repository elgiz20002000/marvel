import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';





class RandomChar extends Component {

    marvelService = new MarvelService()

    state = {
        char: {
        } ,
        loading:true ,
        error:false
    }
    onCharLoaded = (char) => {
        this.setState({char , loading:false})
    }

    onError = () => {
        this.setState({loading:false , error:true})
    }

    updateChar = () => {
        this.setState({loading:true})
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount = () => {
        this.updateChar()
    }



    render() {
        let {char , loading , error} = this.state ,
        spinner = loading ? <Spinner/> : null ,
        errorMessage = error ? <ErrorMessage/> : null ,
        content = !(spinner || errorMessage) ? <View char={char}/> : null
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
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    let  {name , description , thumbnail , homepage , wiki} = char

     return (<div className="randomchar__block">
     <img src={thumbnail} style={ Boolean(thumbnail.search('image_not_available') + 1) ? {objectFit:"fill"} : {objectFit:'cover'}} alt="Random character" className="randomchar__img"/>
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