import { AUCTION_BIDDING_SUCCESS, AUCTION_BIDDING_FAILED } from "../actions/actionTypes";
const INITIAL_STATE = {
  message: null,
  err: null,
};
const bids = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUCTION_BIDDING_SUCCESS:
      return { ...state, message: action.payload.message, err: null };
    case AUCTION_BIDDING_FAILED:
      return { ...state, message:null, err: action.payload.error};
    default:
      return state;
  }
};

export default bids;