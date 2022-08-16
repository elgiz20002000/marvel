import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component } from "react";
import ErrorBoundary from "../errorBoundary/errorBoundary";

class App extends Component {
    state = {
        selected: null
    }

    onCharSelect = (id) => {
        this.setState({
            selected:id
        })
    }
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelect={this.onCharSelect} charId={this.state.selected}/>
                    </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selected}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;