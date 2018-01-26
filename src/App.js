import React, { Component } from 'react';
import './App.css';
import { VotesListStore } from './Data/Stores';
import Provider from 'react-redux/lib/components/Provider';
import WelcomePage from './Components/WelcomePage';
import TryPage from './Components/TryPage';
import {HashRouter as Router, Route} from 'react-router-dom';
import VotePage from './Components/VotePage';
import Switch from 'react-router-dom/Switch';
import { Card } from 'reactstrap';
import UserAccount from './Components/UserAccount';
import NetworkManagement from './Components/NetworkManagement';

class App extends Component {
 
  render() {
    // Todo :     Disclamer : Canvas Particle from <a href="https://github.com/JulianLaval/canvas-particle-network">Julian Laval's work.</a>
    return (
      <Provider store={VotesListStore}>
          <div>
            <WelcomePage/>
            <Router>
            <div style={{marginTop : '3em'}}>

            <div style={{width : '95%', margin : 'auto', maxWidth : '1000px', marginBottom : '3em'}}>
              <p className="lead text-center"><b>DiDooB</b> est un clone de <a target="blank" href="https://doodle.com">Doodle</a> qui fonctionne sur 
                  les réseaux <a target="blank" href="https://fr.wikipedia.org/wiki/Ethereum">Ethereum</a>.</p>
                
                <p className="text-justify text-muted">
                Vous pouvez vous en servir pour mettre en place un système décentralisé et sécurisé 
                de planification de réunion. DiDoob a été conçu pour un projet scolaire et a donc une vocation pédagogique. 
                Mais, rien n'empêche son utilisation dans un contexte professionnel.
                C'est juste un Doodle sans "middleman", l'inconvénient par contre, c'est que ce sera cher payé pour planifier un match de foot entre amis.
                </p>

                <h2 className="text-center" style={{marginTop : '2em'}}><span role="img" aria-label="Important">💡</span> Prérequis : Se connecter à un noeud Ethereum</h2>
                      
                <p style={{margin : '3%'}} className="text-justify text-muted">Si vous ne savez pas comment, il vous suffit d'installer <a target="blank" href="https://metamask.io">Metamask</a>. 
                      C'est un portefeuille de comptes Ethereum avec plusieurs autres fonctionnalités pratiques.
                      DiDooB détecte automatiquement Metamask et récupère les addresses de vos comptes. Si vous avez du mal à installer Metamask (ie : Sur Internet Explorer),
                      une autre alternative est d'utiliser une blockchain privé sur votre PC. Exemple <a href="http://truffleframework.com/ganache/">Ganache</a>, et de copier ensuite l'url ci-dessous.</p>

                      <Card style={{margin : '3%'}} body>
                          <NetworkManagement>
                              <UserAccount/>
                          </NetworkManagement>
                      </Card>
              </div>
          
                <Switch>
                  <Route exact path="/vote/:address?" component={({match}) => {
                      return <VotePage address={match.params.address}/>
                    } 
                  } />
                  <Route exact component={TryPage} />         
                </Switch>
  
            </div>
            </Router>
            
            <p className="text-center text-muted" style={{marginTop : '8em'}}>Made with <span role="img" aria-label="cheese and wine">🧀 & 🍷</span> in France</p>
          </div>
      </Provider>
    );
  }
}

export default App;
