import { devURL } from "../apis/encheres";
import {ORDERS_LOADING, ORDERS_SUCCESS, ORDERS_FAILED, ADD_ORDER, POST_FAIL} from '../actions/actionTypes';

export const ordersLoading = () => ({
	type: ORDERS_LOADING,
});

export const ordersFailed = (errmess) => ({
	type: ORDERS_FAILED,
	payload: errmess,
});

export const addOrders = (orders) => ({
	type: ORDERS_SUCCESS,
	payload: orders,
});

export const FetchOrders = (page) => (dispatch) => {

	const bearer = "Bearer " + localStorage.getItem("encheres_token");

	dispatch(ordersLoading(true))
	return fetch(devURL+`/seller-pending-orders?page=${page}`, {
			method: "GET",
			headers: {
				Authorization: bearer
			},
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
	.then((orders) => dispatch(addOrders(orders)))
	.catch((error) => dispatch(ordersFailed(error.message)));
}

export const PostOrder = (order) => (dispatch) => {
    
	const bearer = "Bearer " + localStorage.getItem("encheres_token");

    return fetch(devURL+"/orders", {
			method: "POST",
			body: JSON.stringify(order),
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer
			},
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
					alert(error);
					throw error;
				}
			},
			(error) => {
				alert(error);
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) =>{
			dispatch({type: ADD_ORDER, payload: response});
		})
		.catch((error) => {
            dispatch({type: POST_FAIL, payload: "Your Order could not be posted\nError: " + error.message});
		});
} 