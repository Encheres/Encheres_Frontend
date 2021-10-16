import { combineReducers } from "redux";
import { items } from './item';
import physicalAsset from './physicalAsset';
import authReducer from "./authReducer";
import resetPassword from './resetPassword'
import userProfile from "./userProfile";
import contact from "./contact_us";
import auctionlist from './auctionListReducer';
import liveAuctionReducer from './live_auction'
export default combineReducers({
  // reducers
  physicalAsset: physicalAsset,
  items: items,
  auth: authReducer,
  userProfile: userProfile,
  contactus: contact,
  resetPass: resetPassword,
  auctionlist : auctionlist,
  liveAuction: liveAuctionReducer
});
