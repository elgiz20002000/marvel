import './singleComic.scss';
import { Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleComic = ({data}) => {

    const {title , thumbnail , description , price , language , pages} = data 
    return (
            <>
        <Helmet>
            <meta
            name="description"
            content="Marvel information portal"
            />
            <title>{title}</title>
        </Helmet>
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} Pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link  to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
            </>
        )
}
export default SingleComic;