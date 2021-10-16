import { authRecord } from "../apis/encheres";
import {CREATE_LIVE_AUCTION, CREATE_LIVE_AUCTION_FAILED} from './actionTypes'

export const handleCreateAuction = (data) => async (dispatch,getState) =>{
    const token = getState().auth.token;
    try{
        const response = await authRecord(token).post('/auctions', data);
        dispatch({type:CREATE_LIVE_AUCTION, payload:response.data});
        
    }catch(e){
        console.log({error: e});
        dispatch({type:CREATE_LIVE_AUCTION_FAILED, payload:{error:"Something went wrong"}})
    }
}