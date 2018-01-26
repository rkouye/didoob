
export function selectVotes(state){
    return state.votes;
}

export function selectVote(state, voteAddress){
    return selectVotes(state)[voteAddress];
}

export function selectUserAddress(state){
    return state.userAddress;
}

export function selectContractOfInterest(state){
    return state.contractsOfInterest;
}

export function selectProvider(state){
    return state.provider;
}