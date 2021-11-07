import {
  GET_AUCTION_LIST,
  GET_FILTERED_AUCTION,
  LOADING_AUCTION_LIST,
  GET_AUCTION_LIST_ERROR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: true,
  payload: [],
  errors: null,
};

const auction_list_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_AUCTION_LIST:
      return { loading: true, payload: [], error: null };
    case GET_AUCTION_LIST:
      return { payload: action.payload, loading: false, error: null };
    case GET_FILTERED_AUCTION:
      return { error: null, payload: action.payload, loading: false };
    case GET_AUCTION_LIST_ERROR:
      return { payload: [], errors: action.error, loading: false };
    default:
      return state;
  }
};
export default auction_list_reducer;
