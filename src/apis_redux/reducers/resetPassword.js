import {FORGOT_PASS, FORGOT_PASS_FAILED, RESET_PASS, RESET_PASS_FAILED} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FORGOT_PASS:
            return{...state, error:null, message:action.payload.message}
        case FORGOT_PASS_FAILED:
            return{...state, error:action.payload.error, message:null}
        case RESET_PASS:
            return{...state, error:null, message:action.payload.message}
        case RESET_PASS_FAILED:
            return{...state, error:action.payload.error, message:null}
        default:
            return state
    }
}