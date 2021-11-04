import {CREATE_LIVE_AUCTION, CREATE_LIVE_AUCTION_FAILED, GET_AUCTION_DETAILS, GET_AUCTION_DETAILS_FAILED} from '../actions/actionTypes'
const INITIAL_STATE = {
    data: null,
    message:null,
    error:null,
}

// eslint-disable-next-line
export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_LIVE_AUCTION:
            return{...state, data:null, message:action.payload.message, error:null}
        case CREATE_LIVE_AUCTION_FAILED:
            return{...state,data:null, error:action.payload.error, message:null}
        case GET_AUCTION_DETAILS:
            return{...state, data:action.payload, error:null, message:null}
        case GET_AUCTION_DETAILS_FAILED:
            return{...state, data:null, error:action.payload.error, message:null}
        default:
            return state
    }
}