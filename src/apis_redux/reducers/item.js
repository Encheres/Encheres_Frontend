import {ITEM_LOADING, ITEM_FAILED, GET_ITEM,} from "../actions/actionTypes";

export const items = (state = { isLoading: true, 
                                errMess: null, item: null 
                            }, action) => {
	switch (action.type) {
		case ITEM_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case GET_ITEM:
			return { ...state, isLoading: false, errMess: null, item: action.payload };
		
		case ITEM_LOADING:
			return {...state, isLoading: true, errMess: null, item: {}};

		default:
			return state;
	}
};