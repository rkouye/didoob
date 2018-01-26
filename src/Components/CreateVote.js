import React, { Component } from 'react';
import {Form, Label, Input, FormGroup, Col, Button, ListGroup, ListGroupItem, Alert, FormText, FormFeedback} from 'reactstrap';
import Web3Client from '../Services/Web3Client';
import {createBinderFor} from '../Utilities/FieldBinding';
import PropTypes from 'prop-types';
import AccountDisplay from './AccountDisplay';
import Loader from './Loader'
/**
 * Component to create a vote
 * 
 * @class CreateVote
 * @extends {Component}
 */
class CreateVote extends Component {

    constructor(props){
        super(props);

        this.bindAs = createBinderFor(this).bindAs;
        
        this.state = {
            toS : 3600,
            newAddress : "",
            duration : 1,
            voters : [],
            task : {}
        };
    }

    formSubmit = (event) => {
        event.preventDefault();
        this.setState({ task : { isBusy : true } });
        this.props.onSubmit({
            duration_in_ms : this.state.duration*this.state.toS*1000,
            voters : this.state.voters
        },(address, error) => {
            this.setState({ task : { address, error } });
        });
    }

    addNewVoter = () => {
        if(Web3Client.web3.utils.isAddress(this.state.newAddress) && (this.state.voters.indexOf(this.state.newAddress) === -1) ) {
            this.setState(prevState =>({
                newAddress$isDirty : false,
                newAddress : "",
                voters : [...prevState.voters, prevState.newAddress]
            }));
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.formSubmit}>
                   <FormGroup row >
                    <Label sm={12}>Quelle est à la durée de la réunion ?</Label>
                    <Col sm={8}>
                        <Input type="number" min={0} {...this.bindAs("duration")}/>
                    </Col>
                    <Col sm={4}>
                        <Input type="select" {...this.bindAs("toS")}>
                          <option value={60}>Minute(s)</option>
                          <option value={3600}>Heure(s)</option>
                        </Input>
                    </Col>    
                   </FormGroup>

                   <FormGroup row>
                      <Col xs="12" sm="12">
                        <Label>Liste des comptes Ethereum authorisés à voter</Label>
                       </Col>
                       <Col xs="12" sm="8">
                        <Input type="text" {...this.bindAs("newAddress")} 
                            valid={this.state.newAddress$isDirty? Web3Client.web3.utils.isAddress(this.state.newAddress) : undefined }/>
                            <FormFeedback>Cette addresse n'est pas valide.</FormFeedback>
                       </Col>
                       <Col xs="12" sm="4">
                        <Button type="button" block onClick={this.addNewVoter}>Ajouter</Button>
                       </Col>
                       <Col xs="12" sm="12">
                       <FormText color="muted">
                            Pour ajouter un voteur, copiez son adresse ci-dessus et cliquez sur le bouton <b>Ajouter</b>
                        </FormText>
                       </Col>
                   </FormGroup>

                   <ListGroup>
                      {this.state.voters.map(voter => <ListGroupItem key={voter}><AccountDisplay account={voter}/></ListGroupItem>)}
                   </ListGroup>
                   <p className="text-center"><a href="#">Lire le code du contrat</a></p>
                   <hr/>
                   <Button block disabled={this.state.task.isBusy} color="primary">
                        {this.state.task.isBusy?
                            (<div><Loader/> Veuillez patientez, le temps que la transaction soit inclus dans un bloc...</div>)
                            :
                            "Déployer le contrat sur la blockchain Ethereum"}
                    </Button>
                   
                   { this.state.task.address &&
                    <Alert color="success">
                        Contrat de vote déployé à l'addresse <b><AccountDisplay account={this.state.task.address} contract /></b>.<br/>
                        Chaque ÐApp possède une addresse unique sur le réseau ou elle a été déployé. Les particpants ont besoin de
                        cette addresse pour voter ou faire des propositions. Donc partager là ! Pour améliorer votre expérience, DiDooB sauvegarde dans
                        votre navigateur les adresses des contrats que vous avez déployé. Mais si vous voulez plus de sécurité, faites en une copie.
                    </Alert>
                   }
                   { this.state.task.error &&
                    <Alert color="danger">
                        Quelque chose ne va pas <span role="img" aria-label="hum">😕</span>.<br/>
                        {this.state.task.error.message}
                    </Alert>
                   }
                </Form>
            </div>
        );
    }
}

CreateVote.propTypes = {
    /**
     * This function will be called by the component when data is valid and user click Submit
     * 
     * 
     * The function will be call with parameter an object `{ duration_in_s : int, votersAddresses : [string] }`
     * 
     * And a callback that will return the address
     */
    onSubmit : PropTypes.func
}

export default CreateVote;