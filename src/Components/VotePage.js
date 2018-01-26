import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import VoteList from './VoteList';
import NotificationSystem from 'react-notification-system';
import Link from 'react-router-dom/Link';
import Web3Client from '../Services/Web3Client';
import VoteDetail from './VoteDetail';

class VotePage extends Component {
    render() {
        return (
            <div>
                <div style={{width : '95%', margin : 'auto', maxWidth : '1000px', padding : '.5em'}}>
        
                    { !Web3Client.web3.utils.isAddress(this.props.address)? 
                    <div>
                        <h1 className="display-3 text-center">Comment voter ? </h1>
                        <p className="text-center text-muted"> <Link to="/">Je veux créer un sondage</Link></p>
                        <p style={{margin : '3%'}} className="text-justify text-muted">Si vous avez été invité à voter sur un sondage, vous pouvez y accéder
                         en entrant son addresse ci dessous.</p>
                        <VoteList />
                    </div>
                    :
                    <div>
                        <h1 className="display-3 text-center">Voter pour un sondage</h1>
                        <p className="text-center text-muted"> <Link to="/">Je veux créer un sondage</Link></p>
                        <p style={{margin : '3%'}} className="text-justify text-muted">En cas de problème, vérifier que vous êtes connecté au réseau 
                        sur lequel le contrat a été déployé et que vous avez le droit de vote.</p>
                        <VoteDetail address={this.props.address} />
                    </div>
                }

                </div>

                <NotificationSystem ref={ns => this.ns = ns} />
            </div>
        );
    }
}

export default VotePage;