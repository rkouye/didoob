import Web3 from 'web3';
import TimeSlotVoteTruffleMeta from './TimeSlotVote.json';
import TruffleContract from 'truffle-contract';
import 'babel-polyfill';

const missingAccountErrorMessage = "Entrez d'abord l'adresse de votre compte Ethereum. (Plus haut, dans prérequis)";
const missingProviderMessage = "Connectez vous d'abord à un noeud Ethereum. (Plus haut, dans prérequis)";

let web3 = new Web3("");

let TimeSlotVote = TruffleContract(TimeSlotVoteTruffleMeta);

let _TimeSlotVote = new web3.eth.Contract(TimeSlotVoteTruffleMeta.abi);

function setProvider(provider){
    
    if (provider && Web3.givenProvider && provider === Web3.givenProvider.constructor.name)
        web3.setProvider(Web3.givenProvider);
    else web3.setProvider(provider);
    TimeSlotVote = TruffleContract(TimeSlotVoteTruffleMeta);
    TimeSlotVote.setProvider(web3.currentProvider);
    _TimeSlotVote = new web3.eth.Contract(TimeSlotVoteTruffleMeta.abi);
    //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    if (typeof TimeSlotVote.currentProvider.sendAsync !== "function") {
        TimeSlotVote.currentProvider.sendAsync = function() {
        return TimeSlotVote.currentProvider.send.apply(
            TimeSlotVote.currentProvider, arguments
        );
        };
    }

}

let options = {
    from : "",
    gas: 4712388,
    gasPrice: 3000000000
};

  /**
   * 
   * @param {Object} vote
   * @param {number} vote.duration_in_ms
   * @param {string[]} vote.voters
   * @returns {Promise<string>} A promise that resolves to the newly deployed contract's address 
   */
function deployVote (vote){
    
    if(!web3.currentProvider) return Promise.reject(new Error(missingProviderMessage));
    if(!web3.utils.isAddress(options.from)) return Promise.reject(new Error(missingAccountErrorMessage))

    return _TimeSlotVote.deploy({
        data: TimeSlotVoteTruffleMeta.bytecode,
        arguments : [vote.duration_in_ms, vote.voters]
      }).send(options).then(function(newContract){
          return newContract.options.address
      });

    //Bug in metamask prevent this from working, so commenting it for now
    /*return TimeSlotVote.new([vote.duration_in_ms, vote.voters]).then(function(result){
        console.log("done");
        console.log(result);
    });*/
}
/**
 * 
 * @param {string} address 
 */
function setUserAccountAddress(address){
    options.from = address;
}

/**
 * 
 * @param {string} address 
 * @returns {Promise<{}>}
 */
async function getVoteInfo(address){

    if(!web3.currentProvider) return Promise.reject(new Error(missingProviderMessage));
    
    let instance = TimeSlotVote.at(address);
    //Prefetch
    let [
        span_in_ms,
        owner,
        voters,
        proposals
    ] = [
        instance.span_in_ms(),
        instance.owner(),
        instance.getVoters(),
        instance.getProposals()
    ];

    voters = await voters;
    
    let _proposals = await proposals;

    const numberOfProposals = _proposals[0].length;

    const [START , APPROVED, OWNER, VOTE] = [0, 1, 2, 3];

    proposals = new Array(numberOfProposals).fill(0).map( (_, proposalIndex) =>({
            start : _proposals[START][proposalIndex],
            approved : _proposals[APPROVED][proposalIndex],
            owner : _proposals[OWNER][proposalIndex],
            //Ok this is a kind of obfuscate but the result is a map { [voter] : haveVotedForThisProposal }
            votes : Object.assign({} , ...voters.map((voter, index) => ({[voter] : _proposals[VOTE][proposalIndex*voters.length+index]})))
        })
    );
    
    return {
        address,
        spanInms : await span_in_ms,
        owner : await owner,
        voters,
        proposals
    }
}

/**
 * 
 * @param {string} address 
 * @param {number} start
 */
function makeProposalAsOwnerFor(address, start){
    if(!web3.currentProvider) return Promise.reject(new Error(missingProviderMessage));
    if(!web3.utils.isAddress(options.from)) return Promise.reject(new Error(missingAccountErrorMessage))
    
    let instance = TimeSlotVote.at(address);
    return instance.makeProposalAsOwner([start], options);
}

/**
 * 
 * @param {string} address 
 * @param {number} start
 */
function makeProposalAsVoterFor(address, start){
    if(!web3.currentProvider) return Promise.reject(new Error(missingProviderMessage));
    if(!web3.utils.isAddress(options.from)) return Promise.reject(new Error(missingAccountErrorMessage))
    
    let instance = TimeSlotVote.at(address);
    return instance.makeProposalAsVoter([start], options);
}

function voteForProposal(address, proposalIndex){
    if(!web3.currentProvider) return Promise.reject(new Error(missingProviderMessage));
    if(!web3.utils.isAddress(options.from)) return Promise.reject(new Error(missingAccountErrorMessage))
    
    let instance = TimeSlotVote.at(address);
    return instance.voteForProposalAtIndex([proposalIndex], options);
}

function approveProposal(address, proposalIndex){
    if(!web3.currentProvider) return Promise.reject(new Error(missingProviderMessage));
    if(!web3.utils.isAddress(options.from)) return Promise.reject(new Error(missingAccountErrorMessage))
    
    let instance = TimeSlotVote.at(address);
    return instance.approveProposal([proposalIndex], options);
}


function isSameAccount(address1, address2){
    return address1 && address2 && (address1.toLowerCase() === address2.toLowerCase());
}
const Web3Client = {
    web3,
    deployVote,
    setUserAccountAddress,
    isSameAccount,
    getVoteInfo,
    makeProposalAsOwnerFor,
    makeProposalAsVoterFor,
    approveProposal,
    voteForProposal,
    setProvider
};
export default Web3Client;