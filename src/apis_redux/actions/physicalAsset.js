import { record, devURL } from "../apis/encheres";
import { PHYSICAL_ASSETS_FAILED, PHYSICAL_ASSETS_LOADING, PHYSICAL_ASSETS_SUCCESS, ADD_PHYSICAL_ASSET, 
    POST_FAIL } from "./actionTypes";

export const assetsLoading = () => ({
	type: PHYSICAL_ASSETS_LOADING,
});

export const assetsFailed = (errmess) => ({
	type: PHYSICAL_ASSETS_FAILED,
	payload: errmess,
});

export const addAssets = (assets) => ({
	type: PHYSICAL_ASSETS_SUCCESS,
	payload: assets,
});

export const FetchPhysicalAssets = () => (dispatch) => {

	dispatch(assetsLoading(true))
	return fetch(devURL+'/items')
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
	.then((assets) => dispatch(addAssets(assets)))
	.catch((error) => dispatch(assetsFailed(error.message)));
}

export const PostPhysicalAsset = (asset) => (dispatch) => {
    
	const bearer = "Bearer " + localStorage.getItem("encheres_token");

    return fetch(devURL+"/items", {
			method: "POST",
			body: JSON.stringify(asset),
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
			dispatch({type: ADD_PHYSICAL_ASSET, payload: response});
		})
		.catch((error) => {
            dispatch({type: POST_FAIL, payload: "Your Asset could not be posted\nError: " + error.message});
		});
} 