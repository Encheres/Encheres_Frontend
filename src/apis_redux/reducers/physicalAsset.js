import {PHYSICAL_ASSETS_FAILED, PHYSICAL_ASSETS_LOADING, PHYSICAL_ASSETS_SUCCESS,
    ADD_PHYSICAL_ASSET, POST_FAIL} from '../actions/actionTypes';

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
                postFail: false, postFailMess: ''
            };

        case PHYSICAL_ASSETS_LOADING:
            return { ...state, isLoading: true, errMess: null, assets: [], postFail: false, postFailMess: '' };

        case PHYSICAL_ASSETS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, postFail: false, postFailMess: '' };

        case POST_FAIL:
            return { ...state, postFail: true, postFailMess: action.payload}

        case ADD_PHYSICAL_ASSET:
            var asset = action.payload;
            return { ...state, assets: state.assets.concat(asset), postFail: false, postFailMess: ''};

        default:
            return state;
    }
};