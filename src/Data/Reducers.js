import  { PEND_VOTE_INFO, SET_VOTE_INFO, SET_USER_ADDRESS, SET_NETWORK_PROVIDER, ADD_COI, SET_VOTE_ERROR, FORGET_ALL_COI, ADD_VOTE_PEND_TX, REMOVE_VOTE_PEND_TX } from './Actions';

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
}

export const VotesListReducer = createReducer({},{

    [PEND_VOTE_INFO](state, action){
        return {...state, votes :{ ...state.votes, [action.address] : {...state.votes[action.address], isPending : true}}};    
    },

    [SET_VOTE_INFO](state, action){
        return {...state, votes :{ ...state.votes, [action.address] : {...action.voteInfo, isPending : false}}};
    },
    [SET_VOTE_ERROR](state, action){
        return {...state, votes :{ ...state.votes, [action.address] : {...state.votes[action.address], error : action.error, isPending : false}}};
    },
    [ADD_VOTE_PEND_TX](state, action){
        let pendingTx = (state.votes[action.address].pendingTx||0)+1;
        return {...state, votes :{ ...state.votes, [action.address] : {...state.votes[action.address], pendingTx }}};
    },
    [REMOVE_VOTE_PEND_TX](state, action){
        let pendingTx = (state.votes[action.address].pendingTx||0)-1;
        return {...state, votes :{ ...state.votes, [action.address] : {...state.votes[action.address], pendingTx }}};
    },
    [SET_USER_ADDRESS](state, action){
        return {...state, userAddress : action.address}
    },

    [SET_NETWORK_PROVIDER](state, action){
        return {...state, provider : action.provider}
    },
    [ADD_COI](state, action){
        const oldCoI = state.contractsOfInterest;
        const newCoI = [ { address : action.address, timestamp : action.timestamp},...oldCoI.filter( contract => contract.address !== action.address)];
        return {...state, contractsOfInterest : newCoI};
    },
    [FORGET_ALL_COI](state, action){
        return {...state, contractsOfInterest : [] }
    }
});