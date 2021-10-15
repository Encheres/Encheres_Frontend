import { record } from "../apis/encheres";
import {
	GET_AUCTION_LIST,
	GET_FILTERED_AUCTION,
	GET_AUCTION_LIST_ERROR,
} from "./actionTypes";

export const get_auction_list = (page) => {
	return async (dispatch, getState) => {
		try {
			return await record
				.get(`/auctions?/items?page=${page}`)
				.then((res) => {
					dispatch({
						type: GET_AUCTION_LIST,
						payload: res,
					});
				})
				.catch((error) => {
					dispatch({
						type: GET_AUCTION_LIST_ERROR,
					});
				});
		} catch (e) {
			console.log(e);
			return "Some Error occured";
		}
	};
};

export const get_filtered_auction = (filters) => {
	return async (dispatch, getState) => {
		try {
			let tags = "&tags=";

			for (let i = 0; i < filters.tags.length; i++) {
				tags = tags + filters.tags[i].value;
				if (i != filters.tags.length - 1) {
					tags = tags + ",";
				}
			}

			if (filters.time == "Past") {
				//
				record
					.get(
						`/completed-filtered-auctions?page=${filters.page}&tags=${tags}`
					)
					.then((response) => {
						dispatch({
							type: GET_FILTERED_AUCTION,
							payload: response,
						});
					})
					.catch((e) => {
						dispatch({
							type: GET_AUCTION_LIST_ERROR,
						});
					});
			} else {
				/*
				either present or upcomming
			*/
				const now = new Date();
				const abhi = now.toISOString();

				//<YYYY-mm-ddTHH:MM:ssZ>
				// 2021-10-14T03:43:37.846Z

				record
					.get(`/filtered-auctions?page=${filters.page}&tags=${tags}`)
					.then((response) => {
						if (filters.time.value == "Upcomming") {
							//completed = false;
							//abhi event_date_time < start event_date_time
							response.data.filter((e) => {
								return new Date(e.event_date_time) > new Date();
							})

						} else {
							//completed = false;
							//abhi event_date_time >= start event_date_time

							response.data.filter((e) => {
								return new Date(e.event_date_time) <= new Date();
							})
						}
					})
					.catch((error) => {
						dispatch({
							type: GET_AUCTION_LIST_ERROR,
						});
					});
			}
		} catch (e) {
			console.log(e);
			return "Some error occured";
		}
	};
};
