import {ORDERS_LOADING, ORDERS_SUCCESS, ORDERS_FAILED, ADD_ORDER, POST_FAIL} from '../actions/actionTypes';

// eslint-disable-next-line
export default (
    state = { isLoading: true, errMess: null, orders: [], postFail: false, postFailMess: ''},
    action
) => {
    switch (action.type) {
        case ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                orders: action.payload,
                postFailMess: '',
                postFail: false
            };

        case ORDERS_LOADING:
            return { ...state, isLoading: true, errMess: null, orders: [], postFail: false, postFailMess: '' };

        case ORDERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, postFail: false, postFailMess: '' };

        case ADD_ORDER:
            var order = action.payload;
            return { ...state, orders: state.orders.concat(order), postFail: false, postFailMess: ''};

        case POST_FAIL:
            return { ...state, postFail: true, postFailMess: action.payload}

        default:
            return state;
    }
};