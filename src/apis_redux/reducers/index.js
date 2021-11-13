import { combineReducers } from "redux";
import { items } from './item';
import { generatedAssets } from "./aiGeneratedAssets";
import physicalAsset from './physicalAsset';
import winnings from "./winnings";
import orders from "./orders";
import authReducer from "./authReducer";
import resetPassword from './resetPassword'
import userProfile from "./userProfile";
import contact from "./contact_us";
import auctionlist from './auctionListReducer';
import liveAuctionReducer from './live_auction'
import bids from './bids';

export default combineReducers({
  // reducers
  physicalAsset: physicalAsset,
  winnings: winnings,
  orders: orders,
  items: items,
  generatedAssets: generatedAssets,
  auth: authReducer,
  userProfile: userProfile,
  contactus: contact,
  resetPass: resetPassword,
  auctionlist : auctionlist,
  liveAuction: liveAuctionReducer,
  bids,
});
