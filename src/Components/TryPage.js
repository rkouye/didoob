import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'reactstrap';
import CreateVote from './CreateVote';
import VoteList from './VoteList';
import connect from 'react-redux/lib/connect/connect';
import NotificationSystem from 'react-notification-system';
import { deployVote } from '../Data/Actions';
import Link from 'react-router-dom/Link';

class TryPage extends Component {
    render() {
        const ConnectedCreateVote = connect(
            state => ({}),
            dispatch => ({onSubmit : (voteInfo, callback) => dispatch(deployVote(this.ns, voteInfo, callback)) })
        )(CreateVote);
        return (
            <div>
                <div style={{width : '95%', margin : 'auto', maxWidth : '1000px', padding : '.5em'}}>

                    <h1 className="display-3 text-center">Comment créer un sondage ? </h1>
                    <p className="text-center text-muted"> <Link to="/vote">Je veux juste voter</Link></p>
                     
                    <h2 style={{marginTop : '2em'}}><span className="badge badge-secondary">1</span> Je déploie mon sondage sur un réseau Ethereum.</h2>
                    <p style={{margin : '3%'}} className="text-justify text-muted">Chaque <i>sondage</i> est un contrat de vote implémenté sous la forme d'une application décentralisée déployée sur un réseau Ethereum.
                     On parle de ÐApp.
                     Déployer une ÐApp vous coûtera des Ethers. Vous pouvez obtenir des Ethers gratuitement sur un réseau de test comme <b>Ropsten</b>.
                     Encore une fois, si vous ne savez pas comment faire, <a target="blank" href="https://metamask.io">Metamask</a> vous permet de déployer des contrats et
                     d'interagir avec un réseau sans déployer de nœuds sur votre PC. Lorsque Metamask est installé, DiDoob détecte automatiquement le réseau auquel vous êtes connecté.</p>

                     <Card style={{margin : '3%'}} body>
                            <ConnectedCreateVote/>
                    </Card>
                     

                    <h2 style={{marginTop : '2em'}}><span className="badge badge-secondary">2</span> Je peux faire des propositions et voter.</h2>
                    <p style={{margin : '3%'}} className="text-justify text-muted">Vous pouvez accéder à un sondage en entrant son addresse ci dessous.</p>
                    
                    <VoteList />
                </div>

                <NotificationSystem ref={ns => this.ns = ns} />
            </div>
        );
    }
}

export default TryPage;