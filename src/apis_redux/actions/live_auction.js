import { authRecord } from "../apis/encheres";
import {CREATE_LIVE_AUCTION, CREATE_LIVE_AUCTION_FAILED, GET_AUCTION_DETAILS, GET_AUCTION_DETAILS_FAILED,
    AUCTION_BIDDING_SUCCESS, AUCTION_BIDDING_FAILED} from './actionTypes'

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

export const updateUserBids = data => async (dispatch,getState) =>{
    const token = getState().auth.token;
    try{
        const response = await authRecord(token).patch(`/auctions/${data.auction_id}/${data.item_id}`, data);
        dispatch({type:AUCTION_BIDDING_SUCCESS, payload:{message: "Bidding updated successfully"}});
        
    }catch(e){
        dispatch({type:AUCTION_BIDDING_FAILED, payload:{error:"Couldn't place Bid. Something went wrong"}})
    }
}

export const addNotificationMessage = data => async (dispatch,getState) =>{
    const token = getState().auth.token;
    try{
        const response = await authRecord(token).patch(`/auctions/chats/${data.auction_id}`, data);
        console.log(response.data);


    }catch(e){
        console.log({error: e});

    }
    
}

export const sellLiveItem = data => async (dispatch,getState) =>{
    const token = getState().auth.token;
    console.log("Selling: ", data, Date);
    try{
        console.log("called");
        const response = await authRecord(token).patch(`auctions/sell/${data.auction_id}/${data.item_id}`, data);
        console.log(response.data, "sold");

    }catch(e){
        console.log({error: e});

    }


}