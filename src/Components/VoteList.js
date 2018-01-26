import React, { Component } from 'react';
import {connect} from 'react-redux';
import { selectContractOfInterest } from '../Data/Selectors';
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import Web3Client from '../Services/Web3Client';
import AccountDisplay from './AccountDisplay';
import { addCoI, forgetAllCoI } from '../Data/Actions';
import VoteDetail from './VoteDetail';
import { Fade, Row, Col, Button } from 'reactstrap';

class VoteList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            contractAddress : null,
        }
    }

    onSelectChange = (selection)=>{
        if(selection) this.setState({ contractAddress : selection.value});
    }

    addCoI = (address)=>{
        this.props.addCoI(address);
        this.setState({ contractAddress : address});
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm="8">
                    <Creatable 
                        isValidNewOption={ ({label}) => Web3Client.web3.utils.isAddress(label) }
                        promptTextCreator={(label) => `Accéder au contrat situé à l'adresse ${label} ?` }
                        onNewOptionClick={({value})=> this.addCoI(value)} 
                        placeholder="Entrez ici l'adresse d'un contrat pour y accéder."
                        optionRenderer={({value})=> (<span><AccountDisplay account={value} contract/></span>)}
                        options={this.props.cOI.map( contract => ({ label : contract.address, value : contract.address }))}
                        noResultsText="Adresse invalide."
                        onChange={this.onSelectChange} 
                        value={this.state.contractAddress}
                    />
                    </Col>
                    <Col>   <Button color="danger" block onClick={this.props.forgetAllCoI}>Effacer l'historique</Button>
                    </Col>
                </Row>
                <Fade in={!!this.state.contractAddress} style={{marginTop : '3em'}} unmountOnExit mountOnEnter>
                    <VoteDetail address={this.state.contractAddress}/>              
                </Fade>
            </div>
        );
    }
}

export default connect( 
    state =>({ 
        cOI : selectContractOfInterest(state),
    }), 
    dispatch => ({
        addCoI : (address)=>dispatch(addCoI(address)),
        forgetAllCoI : () => { if(window.confirm("Attention, cette action est irréversible, continuez ?")) dispatch(forgetAllCoI()) }
    }))(VoteList);