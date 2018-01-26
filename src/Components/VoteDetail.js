import React, { Component } from 'react';
import { Fade, Card, CardHeader, CardBody, Button, Alert, Label, FormGroup, Col, CardFooter, Table, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { selectVote, selectUserAddress } from '../Data/Selectors';
import { fetchVoteInfo, makeProposalAsOwnerFor, makeProposalAsVoterFor, voteForProposal, approveProposal } from '../Data/Actions';
import AccountDisplay from './AccountDisplay';
import 'bootstrap/dist/css/bootstrap.css';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/fr';
import NotificationSystem from 'react-notification-system';
import Web3Client from '../Services/Web3Client';
import ReactTimeout from 'react-timeout';
import Loader from './Loader';

class VoteDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            proposal : null
        };
    }

    componentDidMount(){
        this.refreshDetail();
        this.props.setInterval(this.refreshDetail, 20*1000);
    }

    refreshDetail= () => {
        this.props.refreshVoteDetail(this.props.address);
    }
    isOwner = () => {
        return this.isUserAddress(this.props.getVoteDetail(this.props.address).owner);
    }
    isUserAddress =(address) =>{
        return Web3Client.isSameAccount(this.props.userAddress,address);
    }

    sendProposal = () => {
        if(this.state.proposal){
            if(this.isOwner()) this.props.makeProposalAsOwner(this.state.proposal.unix(), this.props.address, this.ns);
            else this.props.makeProposalAsVoter(this.state.proposal.unix(), this.props.address, this.ns);
        }
    }

    render() {
        const vote = this.props.getVoteDetail(this.props.address);
        return (
            <div>
                <Card>
                    <CardHeader>Sondage déployé à l'adresse <AccountDisplay account={this.props.address} contract/></CardHeader>
                    <CardBody>
                           
                        { vote && <div>
                            
                            <Fade in={vote.isPending}>
                               <Loader/> 
                            </Fade>

                            {!!vote.address && <div>
                                <p className="text-center">
                                    <span className="badge badge-primary">Informations</span>
                                </p>
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            <th>Propriétaire</th>
                                            <td><AccountDisplay account={vote.owner}/></td>
                                        </tr>
                                        <tr>
                                            <th>Durée de la réunion</th>
                                            <td>{moment.duration(vote.spanInms.valueOf()*1).asMinutes()} minutes</td>
                                      </tr>
                                    </tbody>
                                </Table>
                                <p className="text-center">
                                    <span className="badge badge-primary">Votes et propositions</span>
                                </p>
                                {(vote.proposals.length === 0) && <div>
                                    <p className="text-muted">
                                    Aucune proposition n'a été faite pour ce sondage
                                    </p>
                                    { vote.voters.length > 0 && 
                                    <div><p>Les comptes autorisés à voter sont :</p>
                                        <ListGroup>
                                        {vote.voters.map( (voter)=>(<ListGroupItem key={voter}><AccountDisplay account={voter} /></ListGroupItem>))}
                                        </ListGroup>
                                    </div>}
                                </div>}
                                <div>
                                    <Label>Faire une proposition</Label>
                                    <FormGroup row >
                                        <Col sm={10}>
                                            <DateTime value={this.state.proposal} onChange={(value)=>{this.setState({proposal : value})}}/>
                                        </Col>
                                        <Col>
                                            <Button role="button" onClick={this.sendProposal}>Valider</Button>
                                        </Col>
                                    </FormGroup>
                                </div>
                                {(vote.proposals.length > 0) && <div>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                {vote.proposals.map( (proposal, index) => 
                                                    ( <th key={index} title={proposal.approved?"Approuvé":"En attente d'approbation"}>
                                                        { moment.unix(proposal.start).calendar()} 
                                                        {proposal.approved? <span role="img" aria-label="Approuvé">✅</span> :<span role="img" aria-label="En attente d'approbation">❌</span>}
                                                        { this.isOwner() && !proposal.approved &&
                                                                <Button color="success" onClick={() => this.props.approveProposal(index, this.props.address, this.ns)}>Approuver</Button>
                                                        }
                                                     </th> )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vote.voters.map( (voter, indexV)=>(
                                                <tr key={indexV}>
                                                    <th><AccountDisplay account={voter}/></th>
                                                    {vote.proposals.map( (proposal, indexP)=>(
                                                        <td key={indexP} className="text-center">
                                                            {proposal.votes[voter]? "✅" : "❌"}
                                                            <br/>
                                                            {this.isUserAddress(voter) && !proposal.votes[voter] && proposal.approved &&
                                                                <Button color="success" onClick={() => this.props.voteForProposal(indexP, this.props.address, this.ns)}>Votez pour</Button>
                                                            }
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>}
                                {vote.voters.length === 0 &&
                                    <p className="text-muted">
                                        Aucune compte n'a été autorisé à voter, ce sondage peut juste servir à stocker des Ethers et des propositions du propriétaire.
                                    </p>
                                }
                            </div>}

                            <Fade in={!!vote.error} unmountOnExit mountOnEnter>
                                <Alert color="danger">
                                    {vote.error}
                                </Alert>
                            </Fade>

                            <Fade in={vote.pendingTx>0} unmountOnExit mountOnEnter>
                                <Alert color="info">
                                    Veuillez patientez, {vote.pendingTx} transaction(s) en attente de validation.
                                </Alert>
                            </Fade>
                        </div>}

                    </CardBody>
                    <CardFooter> <p className="text-muted text-center">Les transactions peuvent prendre un certain temps pour se synchroniser.</p> </CardFooter>
                </Card>
                <NotificationSystem ref={ns => this.ns = ns} />
            </div>
        );
    }
}

export default connect( 
    state =>({ 
        getVoteDetail : (address) => selectVote(state, address),
        userAddress : selectUserAddress(state) 
    }), 
    dispatch => ({
        refreshVoteDetail : (address) => dispatch(fetchVoteInfo(address)),
        makeProposalAsOwner : (dateUnix, address, ns) => dispatch(makeProposalAsOwnerFor(dateUnix, address, ns)),
        makeProposalAsVoter : (dateUnix, address, ns) => dispatch(makeProposalAsVoterFor(dateUnix, address, ns)),
        voteForProposal : (index, address, ns) => dispatch(voteForProposal(index, address, ns)),
        approveProposal : (index, address, ns) => dispatch(approveProposal(index, address, ns)),
    }))(ReactTimeout(VoteDetail));