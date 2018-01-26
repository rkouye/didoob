import React, { Component } from 'react';
import Web3 from 'web3';
import { Button } from 'reactstrap';
import connect from 'react-redux/lib/connect/connect';
import { selectProvider } from '../Data/Selectors';
import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';
import {setNetworkProvider} from '../Data/Actions'

class NetworkManagement extends Component {

    constructor(props){
        super(props);
        const givenProvider = Web3.givenProvider?Web3.givenProvider.constructor.name : "";
        
        let options = [
            {label : "http://localhost:8545" , value  : "http://localhost:8545"},
            {label : "http://localhost:7545" , value  : "http://localhost:7545"},
            {label : "https://localhost:8545" , value  : "https://localhost:8545"},
            {label : "https://localhost:7545" , value  : "https://localhost:7545"},
        ];

        if(givenProvider) options.push({ label : givenProvider, value : givenProvider});
        this.state = {options, edit : false};
    }

    onProviderChosen = (selection)=>{
        if(selection)this.props.setNetworkProvider(selection.value);
        this.setState({edit : false});
    }

    render() {
        return (
            <div>
                { (this.props.provider  && !this.state.edit) ?
                    (<div>
                        <p className="text-center">DiDoob utilise le nœud <b>{this.props.provider}</b> <Button onClick={() =>  this.setState({edit : true})}>Changer</Button></p>
                        {this.props.children}
                    </div>)
                    :
                    <Creatable
                        placeholder="Entrez ici l'url de votre noeud Ethereum..."
                        promptTextCreator={(label) => `Se connecter à ${label} ?` }
                        options={this.state.options}
                        onChange={this.onProviderChosen}
                        value={this.props.provider}
                    />
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        provider : selectProvider(state)     
    }),
    dispatch => ({
        setNetworkProvider : (provider) => dispatch(setNetworkProvider(provider))
    })
)(NetworkManagement);