import {GET_ITEM, ITEM_FAILED, ITEM_LOADING} from './actionTypes';
import { devURL } from "../apis/encheres";

export const fetchItem = (itemId) => async (dispatch, getState) => {

	dispatch({ type: ITEM_LOADING})
	try {
		let response = await fetch(devURL + "/items/"+itemId, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			response = await response.json();
			dispatch({ type: GET_ITEM, payload: response });
		} else {
			response = await response.text();
			console.log("Error", response);
			throw new Error(response);
		}
	} catch (err) {
		console.log("err", err);
		dispatch({ type: ITEM_FAILED, payload: err });
	}
};
