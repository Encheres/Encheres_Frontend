import {WINNINGS_FAILED, WINNINGS_LOADING, WINNINGS_SUCCESS} from '../actions/actionTypes';

// eslint-disable-next-line
export default (
    state = { isLoading: true, errMess: null, winnings: [] },
    action
) => {
    switch (action.type) {
        case WINNINGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                winnings: action.payload,
            };

        case WINNINGS_LOADING:
            return { ...state, isLoading: true, errMess: null, winnings: [] };

        case WINNINGS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};