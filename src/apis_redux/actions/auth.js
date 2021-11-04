import { record, authRecord } from "../apis/encheres";
import {
  SIGN_UP,
  AUTH_FAILED,
  SIGN_IN,
  SIGN_OUT,
  FORGOT_PASS,
  FORGOT_PASS_FAILED,
  RESET_PASS,
  RESET_PASS_FAILED,
} from "./actionTypes";

export const handleSignUp = (userDetails) => async (dispatch,getState) =>{
  try{
      const response = await record.post('/users/signup', userDetails);
      localStorage.setItem('encheres_isSignedIn','true');
      localStorage.setItem('encheres_userId', response.data.user._id);
      localStorage.setItem('encheres_token',response.data.token);
      dispatch({type:SIGN_UP,payload:response.data});
  }catch(e){
      let error = e;
      if(e.response){
          if(e.response.data.code===11000){
              error = "This email id already exist"
          }else{
              error = e.response.statusText;
          }
      }else{
          error = "Something went wrong";
      }
      dispatch({type:AUTH_FAILED, payload:{error}})
  }
}

export const handleSignIn = (userDetails) => async (dispatch,getState) =>{
  try{
      const response = await record.post('/users/login', userDetails);
      localStorage.setItem('encheres_isSignedIn','true');
      localStorage.setItem('encheres_userId', response.data.user._id);
      localStorage.setItem('encheres_token',response.data.token);
      dispatch({type:SIGN_IN, payload:response.data});
  }catch(e){
      let error = e;
      if(e.response){
          if(e.response.data){
              error = e.response.data;
          }else{
              error = e.response.statusText;
          }
      }else{
          error = "Something went wrong";
      }
      dispatch({type:AUTH_FAILED, payload:{error}})
  }

}

export const handleSignOut = (userDetails) => async (dispatch,getState) =>{
  const token = userDetails.token;
  try{
      await authRecord(token).post('/users/logout');
      localStorage.removeItem('encheres_token')
      localStorage.removeItem('encheres_userId')
      localStorage.removeItem('encheres_isSignedIn')
      dispatch({type:SIGN_OUT, payload:{msg:"You have been logged out successfully"}});
  }catch(e){
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('isSignedIn')
      dispatch({type:AUTH_FAILED, payload:{error:"Something went wrong"}});
  }
  
}


export const handleForgetPassword = (userDetails) => async (dispatch, getState) => {
  try {
    const response = await record.post("/users/forgot_password", userDetails);
    console.log(response.data.message);
    dispatch({ type: FORGOT_PASS, payload: response.data });
  } catch (e) {
    let error;

    if (e.response && e.response.status === 401) {
      error = e.response.data.message || "Unsuccessfull";
    }else if(e.response && e.response.statusText) {
      error = e.response.statusText;
    }else{
      error = "Something went wrong";
    }
    console.log(error);
    dispatch({ type: FORGOT_PASS_FAILED, payload: { error } });
  }
};

export const handleResetPassword = (userDetails) => async (dispatch, getState) => {
  try {
    const response = await record.post("/users/reset_password", userDetails);
    console.log(response.data);
    dispatch({ type: RESET_PASS, payload: response.data });
  } catch (e) {
    let error;
    if (e.response) {
      if (e.response.status === 401) {
        error = e.response.data || "Unsuccessfull";
      } else {
        error = e.response.statusText;
      }
    }
    console.log(e.response.data);
    dispatch({ type: RESET_PASS_FAILED, payload: { error } });
  }
};
