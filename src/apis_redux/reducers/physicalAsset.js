import {PHYSICAL_ASSETS_FAILED, PHYSICAL_ASSETS_LOADING, PHYSICAL_ASSETS_SUCCESS,
    ADD_PHYSICAL_ASSET, PHYSICAL_ASSETS_UPDATION, POST_FAIL, ILLEGAL_BID, LEGAL_BID} from '../actions/actionTypes';

// eslint-disable-next-line
export default (
    state = { isLoading: true, errMess: null, assets: [], postFail: false, postFailMess: '' },
    action
) => {
    switch (action.type) {
        case PHYSICAL_ASSETS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                assets: action.payload,
                postFail: false, postFailMess: '',
                isBidLegal: true, illegalBidMess: '', legalBidMess: ''
            };

        case PHYSICAL_ASSETS_LOADING:
            return { ...state, isLoading: true, errMess: null, assets: [], postFail: false, postFailMess: '' };

        case PHYSICAL_ASSETS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, postFail: false, postFailMess: '' };

        case POST_FAIL:
            return { ...state, postFail: true, postFailMess: action.payload}

        case LEGAL_BID:
            return { ...state, isBidLegal: true, illegalBidMess: '', legalBidMess: action.payload }

        case ILLEGAL_BID:
            return { ...state, isBidLegal: false, illegalBidMess: action.payload }

        case ADD_PHYSICAL_ASSET:
            var asset = action.payload;
            return { ...state, assets: state.assets.concat(asset), postFail: false, postFailMess: ''};

        case PHYSICAL_ASSETS_UPDATION:
            var newAsset = [action.payload];
            var updatedAssets = state.assets.map(obj => newAsset.find(o => o.id === obj.id) || obj);
            return { ...state, assets: updatedAssets, postFail: false, postFailMess: ''};
        default:
            return state;
    }
};