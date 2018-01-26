import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { VotesListReducer } from './Reducers';
import ls from 'local-storage';
import {createLogger} from 'redux-logger';
import { selectContractOfInterest } from './Selectors';
import Web3Client from '../Services/Web3Client';
import Web3 from 'web3';

const getContractsOfInterest = ()=>{
    return ls.get("ContractsOfInterest") || [];
}
const persistContractsOfInterest = (contractsOfInterest) => {
    ls.set("ContractsOfInterest", contractsOfInterest);
}

const storeShape = {
    userAddress : "",
    provider : Web3.givenProvider?Web3.givenProvider.constructor.name : "",
    contractsOfInterest : getContractsOfInterest(),
    votes : {}
}
if(storeShape.provider) Web3Client.setProvider(storeShape.provider);

export const VotesListStore = createStore(VotesListReducer, storeShape, applyMiddleware(thunkMiddleware, createLogger()));

VotesListStore.subscribe(()=>{
    persistContractsOfInterest(selectContractOfInterest(VotesListStore.getState()));
});
