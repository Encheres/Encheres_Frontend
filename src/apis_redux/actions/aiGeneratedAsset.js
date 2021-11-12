import { devURL } from "../apis/encheres";
import { GET_GENERATED_ASSET, GENERATED_ASSET_PROCESSING, GENERATED_ASSET_FAILED } from './actionTypes';

export const fetchAiGeneratedAsset = (contentHash, styleHash) => async (dispatch, getState) => {

	dispatch({ type: GENERATED_ASSET_PROCESSING})
	try {
		let response = await fetch(
			devURL + `/neural-style-transfer-art-generation?contentHash=${contentHash}&styleHash=${styleHash}`, 
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (response.ok) {
			response = await response.json();
			dispatch({ type: GET_GENERATED_ASSET, payload: response });
		} else {
			response = await response.text();
			console.log("Error", response);
			throw new Error(response);
		}
	} catch (err) {
		console.log("err", err);
		dispatch({ type: GENERATED_ASSET_FAILED, payload: err.message });
	}
};