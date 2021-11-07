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
      return await record
        .get(`/auctions?page=${page}`)
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
      return `Some Error occured : ${e}`;
    }
  };
};
export const get_filtered_auction = (filters) => {
  console.log("inside reducer : ", filters);
  return async (dispatch, getState) => {
    try {
      console.log(filters);
      let tags = "";

      for (let i = 0; i < filters.tags.length; i++) {
        tags = tags + filters.tags[i];
        if (i !== filters.tags.length - 1) {
          tags = tags + ",";
        }
      }

      if (filters.time === "Past") {
        console.log(
          `/completed-filtered-auctions?page=${filters.page}&tags=${tags}`
        );
        record
          .get(`/completed-filtered-auctions?page=${filters.page}&tags=${tags}`)
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
        console.log(`/filtered-auctions?page=${filters.page}&tags=${tags}`);
        record
          .get(`/filtered-auctions?page=${filters.page}&tags=${tags}`)
          .then((response) => {
            // console.log(response);
            if (filters.time === "Upcomming") {
              //completed = false;
              //abhi event_date_time < start event_date_time
              response.data.filter((e) => {
                //    console.log(new Date(e.event_date_time));
                //  console.log(new Date());
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
          });
      }
    } catch (e) {
      console.log(e);
      return "Some error occured";
    }
  };
};
