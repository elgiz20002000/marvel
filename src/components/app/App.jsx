import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spiner';


const MainPage = lazy(() => import('../pages/main_page')) ,
ComicsPage = lazy(() => import('../pages/comics_page')) ,
Page404 = lazy(() => import('../pages/page404')) ,
SingleComic = lazy(() => import('../pages/SingelComic/SingleComic')) ,
SingleChar = lazy(() => import('../pages/SingleChar/SingleChar')),
SinglePage = lazy(() => import('../pages/SinglePage'))



const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Marvel information portal</title>
                </Helmet>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route  path={'/'} element={<MainPage/>}/>
                            <Route  path={'/comics'} element={<ComicsPage/>}/>
                            <Route  path={'/comics/:id'} element={<SinglePage Component={SingleComic} dataType='comics'/>}/>
                            <Route  path={'/character/:id'} element={<SinglePage Component={SingleChar} dataType='character'/>}/>
                            <Route  path={'*'} element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
          
        </Router>
   
    )
}

export default App;