import Web3Client from '../Services/Web3Client';

export const PEND_VOTE_INFO = 'PEND_VOTE_INFO';
export const SET_VOTE_INFO = 'SET_VOTE_INFO';
export const SET_VOTE_ERROR = 'SET_VOTE_ERROR';
export const ADD_VOTE_PEND_TX = 'ADD_VOTE_PEND_TX';
export const REMOVE_VOTE_PEND_TX = 'REMOVE_VOTE_PEND_TX';
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
export const SET_NETWORK_PROVIDER = 'SET_NETWORK_PROVIDER';
export const ADD_COI = 'ADD_COI';
export const FORGET_ALL_COI = 'FORGET_ALL_COI';


const handleError = (ns, callback) => (error) => {
    console.log(error);
    ns.addNotification({
      message : error.message,
      level : "error",
      autoDismiss : 0
    });
    if(callback) callback(null, error);
}

export const deployVote = (ns,voteInfo, callback) => (dispatch) => {
    Web3Client.deployVote(voteInfo)
        .then(address =>{
        dispatch(fetchVoteInfo(address));
        dispatch(addCoI(address));
        ns.addNotification({
            message : "Contrat de VOTE déployé à l'adresse "+address,
            level : "success",
            autoDismiss : 0
        });
        if(callback) callback(address);
        })
        .catch(handleError(ns, callback));
}

export function setUserAddress(address){
    Web3Client.setUserAccountAddress(address);
    return {type : SET_USER_ADDRESS, address}
}

export function setNetworkProvider(provider){
    Web3Client.setProvider(provider);
    return {type : SET_NETWORK_PROVIDER, provider};
}

/**
 * @param {string} address 
 */
function pendVoteInfo(address){
    return {type : PEND_VOTE_INFO, address};
}

/**
 * 
 * @param {string} address 
 * @param {*} voteInfo 
 */
function setVoteInfo(address, voteInfo){
    return {type : SET_VOTE_INFO, address, voteInfo};
}

function setVoteError(address, error){
    return {type : SET_VOTE_ERROR, address, error};
}

/**
 * @param {string} address 
 */
export function fetchVoteInfo(address){

    return function(dispatch){
        if(Web3Client.web3.utils.isAddress(address)){
            dispatch(pendVoteInfo(address));
            return Web3Client.getVoteInfo(address).then(function(voteInfo){
                dispatch(setVoteInfo(address, voteInfo));
            }).catch(error => {
                dispatch(setVoteError(address, error.message))
            });
        }
    }
}

export function addCoI(address){
    return function (dispatch){
        if(Web3Client.web3.utils.isAddress(address))
        dispatch({type : ADD_COI, address, timestamp : Date.now()});
    }
}
export function forgetAllCoI(){
    return {type : FORGET_ALL_COI};
}

function addVotePendingTx(address){
    return {type : ADD_VOTE_PEND_TX, address};
}

function removeVotePendingTx(address){
    return {type : REMOVE_VOTE_PEND_TX, address};
}
export function makeProposalAsOwnerFor(dateUnix,address,ns){
    return function(dispatch){
        dispatch(addVotePendingTx(address));
        Web3Client.makeProposalAsOwnerFor(address, dateUnix).then( ({tx}) => {
          dispatch(fetchVoteInfo(address));
          dispatch(removeVotePendingTx(address));
          ns.addNotification({
           message : `Proposition faites pour le contrat à l'adresse ${address}. Hash de la transaction ${tx}.`,
           level : "success",
           autoDismiss : 0
         });
        })
        .catch(handleError(ns,( _ , error)=>{ 
            dispatch(removeVotePendingTx(address));
            dispatch(setVoteError(address, error.message))}));
    }
}

export function makeProposalAsVoterFor(dateUnix,address,ns){
    return function(dispatch){
        dispatch(addVotePendingTx(address));
        Web3Client.makeProposalAsVoterFor(address, dateUnix).then( ({tx}) => {
          dispatch(fetchVoteInfo(address));
          dispatch(removeVotePendingTx(address));
          ns.addNotification({
           message : `Proposition faites pour le contrat à l'adresse ${address}. Hash de la transaction ${tx}.`,
           level : "success",
           autoDismiss : 0
         });
        })
        .catch(handleError(ns,( _ , error)=>{ 
            dispatch(removeVotePendingTx(address));
            dispatch(setVoteError(address, error.message))}));
    }
}

export function voteForProposal(index, address, ns){
    return function (dispatch){
        dispatch(addVotePendingTx(address));
        Web3Client.voteForProposal(address, index).then( ({tx}) => {
        dispatch(fetchVoteInfo(address));
        dispatch(removeVotePendingTx(address));
        ns.addNotification({
            message : `Vote fait pour la proposition ${index+1} du contrat à l'adresse ${address}. Hash de la transaction ${tx}.`,
            level : "success",
            autoDismiss : 0
        });
        })
        .catch(handleError(ns,( _ , error)=>{ 
            dispatch(removeVotePendingTx(address));
            dispatch(setVoteError(address, error.message))}));
    }
}

export function approveProposal(index, address, ns){
    return function (dispatch){
        dispatch(addVotePendingTx(address));
        Web3Client.approveProposal(address, index).then( ({tx}) => {
        dispatch(fetchVoteInfo(address));
        dispatch(removeVotePendingTx(address));
        ns.addNotification({
            message : `Approbation donné pour la proposition ${index+1} du contrat à l'adresse ${address}. Hash de la transaction ${tx}.`,
            level : "success",
            autoDismiss : 0
        });
        })
        .catch(handleError(ns,( _ , error)=>{ 
            dispatch(removeVotePendingTx(address));
            dispatch(setVoteError(address, error.message))}));
    }
}