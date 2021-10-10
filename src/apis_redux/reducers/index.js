import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfile from "./userProfile";
import contactUs from "./contact_us";

export default combineReducers({
  // reducers
  auth: authReducer,
  userProfile: userProfile,
  contactUs: contactUs,
});
