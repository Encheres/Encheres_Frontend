import { authRecord } from "../apis/encheres";
import {CREATE_LIVE_AUCTION, CREATE_LIVE_AUCTION_FAILED, GET_AUCTION_DETAILS, GET_AUCTION_DETAILS_FAILED} from './actionTypes'

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

export const fetchAuctionDetails = data => async (dispatch,getState) =>{
    const token = getState().auth.token;
    try{
        const response = await authRecord(token).get(`/auctions/${data.auction_id}`);
        // console.log(response.data);
        dispatch({type:GET_AUCTION_DETAILS, payload:response.data});
        
    }catch(e){
        console.log({error: e});
        dispatch({type:GET_AUCTION_DETAILS_FAILED, payload:{error:"Something went wrong"}})
    }
}

export const updateAuctionDetails = data => async (dispatch,getState) =>{
    const token = getState().auth.token;
    try{
        const response = await authRecord(token).patch(`/auctions/${data.auction_id}/${data.item_id}`, data);
        console.log(response.data);
        // dispatch({type:GET_AUCTION_DETAILS, payload:response.data});
        
    }catch(e){
        console.log({error: e});
        // dispatch({type:GET_AUCTION_DETAILS_FAILED, payload:{error:"Something went wrong"}})
    }
}