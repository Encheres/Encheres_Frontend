import { combineReducers } from "redux";
import authReducer from "./authReducer";
import resetPassword from './resetPassword'
import userProfile from "./userProfile";
import contact from "./contact_us";
export default combineReducers({
  // reducers
  auth: authReducer,
  userProfile: userProfile,
  contactus: contact,
  resetPass: resetPassword,
});
