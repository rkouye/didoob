import React, { Component } from 'react';
import { Card, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import UserAccount from './UserAccount';
import NetworkManagement from './NetworkManagement';
import connect from 'react-redux/lib/connect/connect';
import { selectUserAddress } from '../Data/Selectors';
import Web3Client from '../Services/Web3Client';
import AccountDisplay from './AccountDisplay';

class ConnectionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    
    render() {
        return (
            <div>
                <p className="text-center">
                  { Web3Client.web3.utils.isAddress(this.props.userAccount)?
                        <Button color="success" onClick={this.toggle}><AccountDisplay account={this.props.userAccount} /></Button>
                    :    
                        <Button color="danger" onClick={this.toggle}>Connexion requise</Button> 
                }
                </p>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>
                    <h2 className="text-center"><span role="img" aria-label="Important">💡</span> Prérequis : Se connecter à un noeud Ethereum</h2>  
                    </ModalHeader>

                    <ModalBody>
                    <p style={{margin : '3%'}} className="text-justify text-muted">Si vous ne savez pas comment, il vous suffit d'installer <a target="blank" href="https://metamask.io">Metamask</a>. 
                        C'est un portefeuille de comptes Ethereum avec plusieurs autres fonctionnalités pratiques.
                        DiDooB détecte automatiquement Metamask et récupère les addresses de vos comptes. Si vous avez du mal à installer Metamask (ie : Sur Internet Explorer),
                        une autre alternative est d'utiliser une blockchain privé sur votre PC. Exemple <a href="http://truffleframework.com/ganache/">Ganache</a>, et de copier ensuite l'url ci-dessous.</p>

                        <Card style={{margin : '3%'}} body>
                            <NetworkManagement>
                                <UserAccount/>
                            </NetworkManagement>
                        </Card>
                    </ModalBody>
                </Modal>
              </div>
        );
    }
}

export default connect( state => ({ userAccount : selectUserAddress(state)}), 
dispatch => ({}) )(ConnectionPage);