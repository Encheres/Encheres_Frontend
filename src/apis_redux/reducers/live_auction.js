import {CREATE_LIVE_AUCTION, CREATE_LIVE_AUCTION_FAILED} from '../actions/actionTypes'
const INITIAL_STATE = {
    message:null,
    error:null,
}

// eslint-disable-next-line
export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_LIVE_AUCTION:
            return{...state, message:action.payload.message, error:null}
        case CREATE_LIVE_AUCTION_FAILED:
            return{...state, error:action.payload.error, message:null}
        default:
            return state
    }
}