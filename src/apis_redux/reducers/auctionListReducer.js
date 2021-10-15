import {
	GET_AUCTION_LIST,
	GET_FILTERED_AUCTION,
	GET_AUCTION_LIST_ERROR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
	loading : true,
	payload : null,
	errors : null,
}

const auction_list_reducer = (state = INITIAL_STATE, action) => {
	switch (action.type){
		case GET_AUCTION_LIST : return { ...state , payload : action.payload };
		case GET_FILTERED_AUCTION : return {...state , payload : action.payload};
		case GET_AUCTION_LIST_ERROR : return {...state , payload:null , errors : action.payload.error};
		default: return state;
	}
}
export default auction_list_reducer