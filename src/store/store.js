import {combineReducers, createStore} from 'redux'
import userReducer from './reducer/user-reducer';
import chosenFranchiseReducer from './reducer/chosen-franchise-reducer';

const all_reducers = combineReducers({
    // Define the reducer here
    user: userReducer,
    chosen_franchise: chosenFranchiseReducer
});

const store = createStore(all_reducers)

export default store;