import React, { Component } from 'react';
import Web3Client from '../Services/Web3Client';
import { DropdownToggle, DropdownMenu, InputGroup, Input, ButtonDropdown, InputGroupButton, DropdownItem, Label, FormFeedback } from 'reactstrap';
import AccountDisplay from './AccountDisplay';
import { createBinderFor } from '../Utilities/FieldBinding';
import connect from 'react-redux/lib/connect/connect';
import { setUserAddress } from '../Data/Actions';
import { selectUserAddress } from '../Data/Selectors';

//TODO : Use store for account to allow multiple UserAccount component at the same time.
class UserAccount extends Component {

    constructor(props){
        super(props);
        const binder = createBinderFor(this);

        this.bindAs = binder.bindAs;
        this.updateStateFromEvent = binder.updateStateFromEvent;
        
        this.state = {
            accounts : [],
            dropdownOpen : false,
            account : this.props.userAccount
        };
        Web3Client.web3.eth.getAccounts().then(accounts => {
            this.setState({accounts : accounts});
        });
    }

    toggleDropDown =()=>{
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    onChange = (event)=> {
        this.updateStateFromEvent(event,this.onAccountSet);
    }
    onSelect = (account)=>{
        this.setState({account} , this.onAccountSet);
    }
    
    onAccountSet = ()=>{
        if(Web3Client.web3.utils.isAddress(this.state.account))
        this.props.onAccountSet(this.state.account);
    }

    render() {
        return (
            <div>
                    <Label>Entrez l'adresse de votre compte</Label>
                    <InputGroup>
                     <Input 
                      valid={ Web3Client.web3.utils.isAddress(this.state.account)  || (this.state.account$isDirty?false:undefined) }
                      {...this.bindAs("account")} onChange={this.onChange}/>
                       
                     { this.state.accounts.length > 0 &&
                     (<InputGroupButton>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                                <DropdownToggle caret>
                                    Adresses disponibles
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.accounts.map( account => 
                                        (<DropdownItem key={account} onClick={() => this.onSelect(account)}><AccountDisplay account={account}/></DropdownItem>))
                                    }
                                </DropdownMenu>
                            </ButtonDropdown>
                        </InputGroupButton>)
                     }
                     <FormFeedback>Cette adresse n'est pas valide.</FormFeedback>
                    </InputGroup>
                
            </div>
        );
    }
}

export default connect( state => ({ userAccount : selectUserAddress(state)}), 
                        dispatch => ({ onAccountSet : (address) => dispatch(setUserAddress(address)) }) )(UserAccount);