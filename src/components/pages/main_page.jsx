import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { useCallback, useState } from "react";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import { SearchForm } from "../SearchForm/SearchForm";

const MainPage = () => {
     
    const [selected , setSelected] = useState(null)
    const onCharSelect =  useCallback((id) => setSelected(id) , [])    

   return (
   <>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
        <ErrorBoundary>
            <CharList onCharSelect={onCharSelect} charId={selected}/>
        </ErrorBoundary>
        <div>
        <ErrorBoundary>
                <CharInfo charId={selected}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <SearchForm/>
            </ErrorBoundary>
        </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
   </>)
}

export default MainPage