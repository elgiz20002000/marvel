import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spiner';
import PropTypes from 'prop-types'

class CharInfo extends Component {

    marvelService = new MarvelService()
    state = {
        char:  null,
        loading:false ,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({char , loading:false})
    }

    onError = () => {
        this.setState({loading:false , error:true})
    }

    onUpdadeChar = () => {
        if(!this.props.charId) {
            return
        }
        this.setState({loading:true})
        this.marvelService.getCharacter(this.props.charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    componentDidMount() {
        this.onUpdadeChar()
    }

    componentDidUpdate = (prevProps , prevState) => {
        if(prevProps.charId !== this.props.charId) {
            this.onUpdadeChar()
        }
    }


    render() {
        let {char , loading , error} = this.state ,
        skeleton = loading || error || char ? null  : <Skeleton/> ,
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
}

const View = ({char}) => {
    const {name , thumbnail , description , wiki , homepage , comics} = char 
    return <>
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
                            return (<li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>)
                        }) : 'Haven`t any comics'
                    }
                 
                </ul>
    </>
}

CharInfo.propTypes = {
    charId:PropTypes.number
}

export default CharInfo;