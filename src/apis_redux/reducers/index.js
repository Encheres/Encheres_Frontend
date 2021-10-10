import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfile from "./userProfile";

import contact_us from "./contact_us";
export default combineReducers({
  // reducers
  auth: authReducer,
  userProfile: userProfile,
  contactus: contact_us,
});
