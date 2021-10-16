import {
  GET_AUCTION_LIST,
  GET_FILTERED_AUCTION,
  LOADING_AUCTION_LIST,
  GET_AUCTION_LIST_ERROR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: true,
  payload: null,
  errors: null,
};

const auction_list_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_AUCTION_LIST:
      return { ...state, loading: true };
    case GET_AUCTION_LIST:
      return { ...state, payload: action.payload, loading: false };
      break;
    case GET_FILTERED_AUCTION:
      return { ...state, payload: action.payload, loading: false };
      break;
    case GET_AUCTION_LIST_ERROR:
      return { ...state, payload: null, errors: "error", loading: false };
      break;
    default:
      return state;
  }
};
export default auction_list_reducer;
