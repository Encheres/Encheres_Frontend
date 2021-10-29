import { record, authRecord  } from "../apis/encheres";
import {GET_USER_PROFILE, GET_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILED} from "./actionTypes";

export const fetchProfile = (id)=>async(dispatch, getState)=>{
    const url = '/users/profile/'+id;
    try{
        const response = await record.get(url);
        dispatch({type:GET_USER_PROFILE,payload:{profile:response.data}});
    }catch(e){
        dispatch({type:GET_USER_PROFILE_FAILED, payload:{error:e}})
    }
}


// UPDATE DETAILS
export const updateProfile = (data) => async (dispatch,getState) =>{
    // will update general  details of user
    // data will be a json object, containing only fields that need to be changed.

    let token = getState().auth.token;
    try{
        await authRecord(token).patch('/users/me', data);
        // get updated user profile

        dispatch({type:UPDATE_USER_PROFILE_SUCCESS,payload:{msg:"Your profile has been updated successfully"}});
    }catch(e){
        // console.log("Error",e);
        dispatch({type:UPDATE_USER_PROFILE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}

export const updateAddress = (data) => async (dispatch,getState) =>{
    // Use to update user default address. Only those fields should be passed that needs to be changed.
    let token = getState().auth.token;
    try{
        await authRecord(token).patch('/users/me/address', data);
        // get updated user profile

        dispatch({type:UPDATE_USER_PROFILE_SUCCESS,payload:{msg:"Your Address has been updated"}});
    }catch(e){
        dispatch({type:UPDATE_USER_PROFILE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}

export const updateAuctionBookmark = (data) => async (dispatch,getState) =>{
    // data = {AuctionId:asldfjlsjf1651, req_type:1} // req_type = 1 for add, 0 for remove
    let token = getState().auth.token;
    try{
        await authRecord(token).patch('/users/bookmarks', data);
        // get updated user profile

        dispatch({type:UPDATE_USER_PROFILE_SUCCESS,payload:{msg:"Your bookmarks have been updated"}});
    }catch(e){
        console.log(e);
        dispatch({type:UPDATE_USER_PROFILE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}
