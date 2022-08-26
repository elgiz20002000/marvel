import { lazy, Suspense } from 'react';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spiner';


const MainPage = lazy(() => import('../pages/main_page')) ,
ComicsPage = lazy(() => import('../pages/comics_page')) ,
Page404 = lazy(() => import('../pages/page404')) ,
SingleComic = lazy(() => import('../pages/SingleComic'))



const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route  path={'/'} element={<MainPage/>}/>
                            <Route  path={'/comics'} element={<ComicsPage/>}/>
                            <Route  path={'/comics/:comicsId'} element={<SingleComic/>}/>
                            <Route  path={'*'} element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
          
        </Router>
   
    )
}

export default App;