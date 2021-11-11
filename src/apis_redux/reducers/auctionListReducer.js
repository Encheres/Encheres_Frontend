import {
  GET_AUCTION_LIST,
  GET_FILTERED_AUCTION,
  LOADING_AUCTION_LIST,
  GET_AUCTION_LIST_ERROR,
  GET_ALL_AUCTIONS,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: true,
  payload: [],
  errors: null,
};

const auction_list_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_AUCTION_LIST:
      return { loading: true, payload: [], errors: null };
    case GET_AUCTION_LIST:
      return { errors: null, payload: action.payload, loading: false };
    case GET_FILTERED_AUCTION:
      return { errors: null, payload: action.payload, loading: false };
    case GET_AUCTION_LIST_ERROR:
      return { payload: null, errors: action.error, loading: false };
    case GET_ALL_AUCTIONS:
      return { payload: action.payload, errors: null, loading: false };
    default:
      return state;
  }
};
export default auction_list_reducer;
