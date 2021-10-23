import { GET_PENDING_ORDERS_SELLER,LOADING_PENDING_ORDERS_SELLER,FAILED_PENDING_ORDERS_SELLER } from '../actions/actionTypes';
const INITIAL_STATE = {
	loading:false,
	payload:null,
	error:null
}

export default (state=INITIAL_STATE, action) => {
    if(action.type === GET_PENDING_ORDERS_SELLER){
    	return {payload:action.give.payload , loading:false , error:null}
    }
    else if(action.type === LOADING_PENDING_ORDERS_SELLER){
    	return {...state , loading:true}
    }
    else if(action.type === FAILED_PENDING_ORDERS_SELLER){
    	return {...state , loading:false, error : action.give.error,payload:null}
    }
    else{
	    return {...state,loading:false};
    }
}