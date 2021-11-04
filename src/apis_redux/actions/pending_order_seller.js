import { authRecord } from "../apis/encheres";
import {
	GET_PENDING_ORDERS_SELLER,
	LOADING_PENDING_ORDERS_SELLER,
	FAILED_PENDING_ORDERS_SELLER,
} from "./actionTypes";

const getting_pending_orders_seller = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LOADING_PENDING_ORDERS_SELLER,
			give: { loading: true, error: null },
		});
		const response = await authRecord.get(`/seller-pending-orders?page=5`);
		dispatch({
			type: GET_PENDING_ORDERS_SELLER,
			payload: response,
			give: { loading: false, error: null, payload: response },
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: FAILED_PENDING_ORDERS_SELLER,
			give: { loading: false, payload: null, error: err },
		});
	}
};
export default getting_pending_orders_seller;
