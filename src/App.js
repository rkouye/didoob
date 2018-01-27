import React, { Component } from 'react';
import './App.css';
import { VotesListStore } from './Data/Stores';
import Provider from 'react-redux/lib/components/Provider';
import WelcomePage from './Components/WelcomePage';
import TryPage from './Components/TryPage';
import {HashRouter as Router, Route} from 'react-router-dom';
import VotePage from './Components/VotePage';
import Switch from 'react-router-dom/Switch';
import PresentationPage from './Components/PresentationPage';

class App extends Component {
 
  render() {
    // Todo :     Disclamer : Canvas Particle from <a href="https://github.com/JulianLaval/canvas-particle-network">Julian Laval's work.</a>
    return (
      <Provider store={VotesListStore}>
          <div>
            <WelcomePage/>
            <Router>
            <div style={{margin : '10vh 0'}}>
              <div style={{width : '95%', margin : 'auto', maxWidth : '1000px'}}>

                <Switch>
                  <Route exact path="/vote/:address?" component={({match}) => <VotePage address={match.params.address}/>} />
                  <Route exact path="/new"component={TryPage} />
                  <Route exact component={PresentationPage} />
                </Switch>
                            
              </div>

            </div>
            </Router>
            
            <p className="text-center text-muted" style={{marginTop : '8em'}}>Made with <span role="img" aria-label="cheese and wine">🧀 & 🍷</span> in France</p>
          </div>
      </Provider>
    );
  }
}

export default App;
