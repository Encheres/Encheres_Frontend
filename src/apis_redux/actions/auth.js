import {record, authRecord} from '../apis/encheres';
import {SIGN_UP, AUTH_FAILED, SIGN_IN, SIGN_OUT, FORGOT_PASS, 
    FORGOT_PASS_FAILED, RESET_PASS, RESET_PASS_FAILED } from './actionTypes';


    
export const forgetPassword = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/users/forgot_password', userDetails);
        console.log(response.data.message);
        dispatch({type:FORGOT_PASS,payload:response.data});
    }catch(e){
        let error;
        if(e.response){
            if(e.response.status===401){
                error = e.response.data.message||"Unsuccessfull";
            }
            else{
                error = e.response.statusText;
            }
        }
        console.log(error);
        dispatch({type:FORGOT_PASS_FAILED, payload:{error}})
    }
}

export const resetPassword = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/users/reset_password', userDetails);
        console.log(response.data);
        dispatch({type:RESET_PASS,payload:response.data});
    }catch(e){
        let error;
        if(e.response){
            if(e.response.status===401){
                error = e.response.data||"Unsuccessfull";
            }
            else{
                error = e.response.statusText;
            }
        }
        console.log(e.response.data);
        dispatch({type:RESET_PASS_FAILED, payload:{error}})
    }
}