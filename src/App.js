import React, { Component } from 'react';
import './App.css';
import { VotesListStore } from './Data/Stores';
import Provider from 'react-redux/lib/components/Provider';
import WelcomePage from './Components/WelcomePage';
import TryPage from './Components/TryPage';

class App extends Component {
 
  render() {
    // Todo :     Disclamer : Canvas Particle from <a href="https://github.com/JulianLaval/canvas-particle-network">Julian Laval's work.</a>
    return (
      <Provider store={VotesListStore}>
          <div>
            <WelcomePage/>
            <div style={{marginTop : '3em'}}>
              <TryPage/>
            </div>

            
            <p className="text-center text-muted" style={{marginTop : '8em'}}>Made with <span role="img" aria-label="cheese and wine">🧀 & 🍷</span> in France</p>
          </div>
      </Provider>
    );
  }
}

export default App;
