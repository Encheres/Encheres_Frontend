// create_digital_auction
import { record, authRecord  } from "../apis/encheres";
import {CREATE_DIGITAL_ASSET_AUCTION_SUCCESS, CREATE_DIGITAL_ASSET_AUCTION_FAILED} from './actionTypes'


export const createDigitalAssetAuction = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    try{
        const res = authRecord(token).post('create_digital_auction', data);
        console.log(res.data);
        // dispatch({type:CREATE_DIGITAL_ASSET_AUCTION_SUCCESS, payload:{data:res.data}});

    }catch(e){
        console.log(e);
        // dispatch({type:CREATE_DIGITAL_ASSET_AUCTION_FAILED, payload:{error:e}})
    }
}