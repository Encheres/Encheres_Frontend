import  {combineReducers} from 'redux';
import authReducer from './authReducer';
import userProfile from './userProfile';

export default combineReducers({
    // reducers
    auth: authReducer,
    userProfile: userProfile
    
});