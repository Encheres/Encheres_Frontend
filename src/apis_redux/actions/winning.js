import { devURL } from "../apis/encheres";
import { WINNINGS_FAILED, WINNINGS_LOADING, WINNINGS_SUCCESS } from "./actionTypes";

export const winningsLoading = () => ({
	type: WINNINGS_LOADING,
});

export const winningsFailed = (errmess) => ({
	type: WINNINGS_FAILED,
	payload: errmess,
});

export const addWinnings = (winnings) => ({
	type: WINNINGS_SUCCESS,
	payload: winnings,
});

export const FetchPhysicalAssetWinnings = (page) => (dispatch) => {

		const bearer = "Bearer " + localStorage.getItem("encheres_token");

		dispatch(winningsLoading())
		return fetch(devURL+`/sold-items?page=${page}`, {
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
		.then((winnings) => dispatch(addWinnings(winnings)))
		.catch((error) => {
			dispatch(winningsFailed(error.message))
		});
}
