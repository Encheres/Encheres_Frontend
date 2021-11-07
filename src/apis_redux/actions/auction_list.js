import { record } from "../apis/encheres";
import {
  GET_AUCTION_LIST,
  GET_FILTERED_AUCTION,
  GET_AUCTION_LIST_ERROR,
  LOADING_AUCTION_LIST,
} from "./actionTypes";

export const get_auction_list = (page) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_AUCTION_LIST });

      const res = await record.get(`/auctions?page=${page}`);

      dispatch({ type: GET_AUCTION_LIST, payload: res.data });
    } catch (e) {
      dispatch({
        type: GET_AUCTION_LIST_ERROR,
        error: e,
      });
    }
  };
};
export const get_filtered_auction = async (filters) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_AUCTION_LIST });
      let tags = "";
      for (let i = 0; i < filters.tags.length; i++) {
        tags = tags + filters.tags[i];
        if (i !== filters.tags.length - 1) {
          tags = tags + ",";
        }
      }
      if (filters.time === "Past") {
        const res = await record.get(
          `/completed-filtered-auctions?page=${filters.page}&tags=${tags}`
        );
        dispatch({ type: GET_FILTERED_AUCTION, payload: res.data });
      } else {
        // either present or upcomming
        const now = new Date();
        const abhi = now.toISOString();
        //<YYYY-mm-ddTHH:MM:ssZ>
        // 2021-10-14T03:43:37.846Z
        const res = await record.get(
          `/filtered-auctions?page=${filters.page}&tags=${tags}`
        );
        if (filters.time === "Upcomming") {
          //completed = false;
          //abhi event_date_time < start event_date_time
          const final_data = res.data.filter((element) => {
            const boolean = new Date(element.event_date_time) > new Date(abhi);
            return boolean;
          });
          dispatch({ type: GET_FILTERED_AUCTION, payload: final_data });
        } else {
          //completed = false;
          //abhi event_date_time >= start event_date_time
          const final_data = res.data.filter((element) => {
            const boolean = new Date(element.event_date_time) <= new Date(abhi);
            return boolean;
          });
          dispatch({ type: GET_FILTERED_AUCTION, payload: final_data });
        }
        /*  .then((response) => {
            if (filters.time === "Upcomming") {
              //completed = false;
              //abhi event_date_time < start event_date_time
              response.data.filter((e) => {
                return new Date(e.event_date_time) > new Date(abhi);
              });
            } else {
              //completed = false;
              //abhi event_date_time >= start event_date_time

              response.data.filter((e) => {
                return new Date(e.event_date_time) <= new Date(abhi);
              });
            }
          })
          .catch((error) => {
            dispatch({
              type: GET_AUCTION_LIST_ERROR,
            });
          });*/
      }
    } catch (e) {
      dispatch({
        type: GET_AUCTION_LIST_ERROR,
        error: e,
      });
    }
  };
};
