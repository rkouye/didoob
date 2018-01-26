import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import UserAccount from './UserAccount';
import { Card } from 'reactstrap';
import NetworkManagement from './NetworkManagement';
import CreateVote from './CreateVote';
import VoteList from './VoteList';
import connect from 'react-redux/lib/connect/connect';
import NotificationSystem from 'react-notification-system';
import { deployVote } from '../Data/Actions';

class TryPage extends Component {
    render() {
        const ConnectedCreateVote = connect(
            state => ({}),
            dispatch => ({onSubmit : (voteInfo, callback) => dispatch(deployVote(this.ns, voteInfo, callback)) })
        )(CreateVote);
        return (
            <div>
                <p className="lead text-center"><b>DiDooB</b> est un clone de <a target="blank" href="https://doodle.com">Doodle</a> qui fonctionne sur 
                  les réseaux <a target="blank" href="https://fr.wikipedia.org/wiki/Ethereum">Ethereum</a>.</p>
                
                <p className="text-justify text-muted" style={{width : '95%', margin : 'auto', maxWidth : '1000px', marginBottom : '3em'}}>DiDoob a été conçu initialement 
                pour un projet scolaire et a donc une vocation pédagogique. Cependant on peut aussi s'en servir pour mettre en place un système décentralisé et sécurisé 
                de planification de réunion en déployant les contrats sur un réseau Ethereum privé par exemple.</p>

                <h1 className="display-3 text-center">Comment ça marche ?</h1>

                <div style={{width : '95%', margin : 'auto', maxWidth : '1000px', marginTop : '3em', padding : '.5em'}}>
                    
                    <h2><span className="badge badge-secondary">1</span> Je me connecte à mon compte Ethereum.</h2>
                    
                    <p style={{margin : '3%'}} className="text-justify text-muted">Si vous ne savez pas comment, il vous suffit d'installer <a target="blank" href="https://metamask.io">Metamask</a>. 
                    C'est un portefeuille de comptes Ethereum avec plusieurs autres fonctionnalités pratiques.
                    DiDooB détecte automatiquement Metamask et récupère les addresses de vos comptes.</p>

                    <Card style={{margin : '3%'}} body>
                        <NetworkManagement>
                            <UserAccount/>
                        </NetworkManagement>
                    </Card>
                    
                    
                    <h2 style={{marginTop : '2em'}}><span className="badge badge-secondary">2</span> Je déploie mon sondage sur un réseau Ethereum.</h2>
                    <p style={{margin : '3%'}} className="text-justify text-muted">Chaque <i>sondage</i> est un contrat de vote implémenté sous forme la d'une application décentralisée déployée sur un réseau Ethereum.
                     On parle de ÐApp.
                     Déployer une ÐApp vous coûtera des Ethers. Vous pouvez obtenir des Ethers gratuitement sur un réseau de test comme <b>Ropsten</b>.
                     Encore une fois, si vous ne savez pas comment faire, <a target="blank" href="https://metamask.io">Metamask</a> vous permet de déployer des contrats et
                     d'interagir avec un réseau sans déployer de nœuds sur votre PC. Lorsque Metamask est installé, DiDoob détecte automatiquement le réseau auquel vous êtes connecté.</p>

                     <Card style={{margin : '3%'}} body>
                            <ConnectedCreateVote/>
                    </Card>
                     

                    <h2 style={{marginTop : '2em'}}><span className="badge badge-secondary">3</span> Je peux interagir avec le sondage suivant les règles établies.</h2>
                    <p style={{margin : '3%'}} className="text-justify text-muted">Si vous avez été invité à voter sur un sondage, vous pouvez y accéder en entrant son addresse ci dessous.</p>
                    
                    <VoteList />
                </div>

                <NotificationSystem ref={ns => this.ns = ns} />
            </div>
        );
    }
}

export default TryPage;