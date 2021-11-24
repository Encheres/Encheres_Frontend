import {
	GET_GENERATED_ASSET,
	GENERATED_ASSET_PROCESSING,
	GENERATED_ASSET_FAILED,
} from "../actions/actionTypes";

export const generatedAssets = (
	state = { isProcessing: false, errMess: null, generatedAsset: null },
	action
) => {
	switch (action.type) {
		case GENERATED_ASSET_FAILED:
			return { ...state, isProcessing: false, errMess: action.payload };

		case GET_GENERATED_ASSET:
			return {
				...state,
				isProcessing: false,
				errMess: null,
				generatedAsset: action.payload,
			};

		case GENERATED_ASSET_PROCESSING:
			return {
				...state,
				isProcessing: true,
				errMess: null,
				generatedAsset: {},
			};

		default:
			return state;
	}
};
