import {GET_USER_PROFILE, GET_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILED} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    profile:null
}

// eslint-disable-next-line
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case GET_USER_PROFILE:
            return {...state, message:"Success", error:null, profile:action.payload.profile}
        case GET_USER_PROFILE_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case UPDATE_USER_PROFILE_SUCCESS:
            return {...state, message:null, error:null, profile:null}
        case UPDATE_USER_PROFILE_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        default:
            return state
    }
}