import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types'


class CharList extends Component {
    marvelService = new MarvelService()
    state = {
        chars:[],
        loading:true ,
        error: false ,
        newItemLoading:false ,
        offset: 210 ,
        charEnded: false
    }

    onCharLoaded = (newChars) => {
        let ended = false
        if(newChars.length < 9) {
            ended = true
        }
        this.setState(({chars , offset}) => ({
            chars: [...chars , ...newChars] , 
            loading: false ,
            offset: offset + 9 ,
            charEnded: ended ,
            newItemLoading: false
        }))
    }

    onCharLoading = () => {
        this.setState({
            newItemLoading:true
        })
    }

    onError = () => {
        this.setState({loading:false , error:true})
    }

    onRequest = (offset) => {
        this.onCharLoading()
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }


    componentDidMount = () => {
        this.onRequest()
    }
    render() {
       const chars_items = this.state.chars.map((item , index) => {
                let clazz = item.id === this.props.charId ? ' char__item char__item_selected' : 'char__item'

                return (
                <li className={clazz} key={item.id} 
                onClick={() => {
                    this.props.onCharSelect(item.id)
                }} 
                onKeyDown={(e) => {
                    if(e.key === 'Enter') this.props.onCharSelect(item.id) 
                }}
                tabIndex={index + 1}>

                    <img src={item.thumbnail} 
                    style={Boolean(item.thumbnail.search('image_not_available') + 1 || item.thumbnail.match('http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif')) ? {objectFit:"fill"} : {objectFit:'cover'}} 
                    alt={item.name}/>

                    <div className="char__name">{item.name}</div>
                </li>)
        })

        let {loading , error , newItemLoading , offset , charEnded} = this.state ,
        spinner = loading ? <Spinner/> : null ,
        errorMessage = error ? <ErrorMessage/> : null ,
        content = !(spinner || errorMessage) ? <View chars_items={chars_items}/> : null

        return (
            <div className="char__list">
                {spinner}
                {error}
                {content}
                <button className="button button__main button__long" 
                onClick={() => this.onRequest(offset)} 
                disabled={newItemLoading}
                style={{display:charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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