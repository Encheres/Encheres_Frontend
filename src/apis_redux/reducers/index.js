import { combineReducers } from "redux";
import physicalAsset from './physicalAsset';
import authReducer from "./authReducer";
import resetPassword from './resetPassword'
import userProfile from "./userProfile";
import contact from "./contact_us";
import auctionlist from './auctionListReducer';
export default combineReducers({
  // reducers
  physicalAsset: physicalAsset,
  auth: authReducer,
  userProfile: userProfile,
  contactus: contact,
  resetPass: resetPassword,
  auctionlist : auctionlist,
});
