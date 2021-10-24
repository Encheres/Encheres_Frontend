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
		dispatch({ type: ITEM_FAILED, payload: err.message });
	}
};


export const UpdateSaleForItem = (itemId, sale) => (dispatch) => {

	const bearer = "Bearer " + localStorage.getItem("encheres_token");
	return fetch(devURL+`/items/${itemId}`, {
		method: "PATCH",
		body: JSON.stringify({
			sale: sale
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer
		}  
	})
	.then(
		(response) => {
			if (response.ok) {
				return response;
			} else {
				var error = new Error(
					"Error " + response.status + ": " + response.statusText
				);
				error.response = response;
				throw error;
			}
		},
		(error) => {
			var errmess = new Error(error.message);
			throw errmess;
		}
	)
	.then((response) => response.json())
	.then((asset) => dispatch({ type: GET_ITEM, payload: asset }))
	.catch((error) => dispatch({ type: ITEM_FAILED, payload: error.message }));
}

export const UpdateShippedStatusForItem = (itemId, shipped) => (dispatch) => {

	const bearer = "Bearer " + localStorage.getItem("encheres_token");
	return fetch(devURL+`/items/${itemId}`, {
		method: "PATCH",
		body: JSON.stringify({
			shipped: shipped
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer
		}  
	})
	.then(
		(response) => {
			if (response.ok) {
				return response;
			} else {
				var error = new Error(
					"Error " + response.status + ": " + response.statusText
				);
				error.response = response;
				throw error;
			}
		},
		(error) => {
			var errmess = new Error(error.message);
			throw errmess;
		}
	)
	.then((response) => response.json())
	.then((asset) => dispatch({ type: GET_ITEM, payload: asset }))
	.catch((error) => dispatch({ type: ITEM_FAILED, payload: error.message }));
}