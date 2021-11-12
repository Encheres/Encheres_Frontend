import { combineReducers } from "redux";
import { items } from './item';
import physicalAsset from './physicalAsset';
import winnings from "./winnings";
import orders from "./orders";
import authReducer from "./authReducer";
import resetPassword from './resetPassword'
import userProfile from "./userProfile";
import contact from "./contact_us";
import auctionlist from './auctionListReducer';
import liveAuctionReducer from './live_auction'
//import getting_pending_orders_seller from './pending_order_seller';
import bids from './bids';

export default combineReducers({
  // reducers
  physicalAsset: physicalAsset,
  winnings: winnings,
  orders: orders,
  items: items,
  auth: authReducer,
  userProfile: userProfile,
  contactus: contact,
  resetPass: resetPassword,
  auctionlist : auctionlist,
  liveAuction: liveAuctionReducer,
  //pendingOrderSeller : getting_pending_orders_seller,
  bids,
});
