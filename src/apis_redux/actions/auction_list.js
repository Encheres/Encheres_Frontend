/*import { record } from "../apis/encheres";
import {
  GET_AUCTION_LIST,
  GET_FILTERED_AUCTION,
  GET_AUCTION_LIST_ERROR,
  LOADING_AUCTION_LIST,
} from "./actionTypes";
*/
const { record } = require("../apis/encheres");
const {
  GET_AUCTION_LIST,
  GET_FILTERED_AUCTION,
  GET_AUCTION_LIST_ERROR,
  LOADING_AUCTION_LIST,
  GET_ALL_AUCTIONS,
} = require("./actionTypes");
const get_auction_list = (page) => {
  return async (dispatch, getState) => {
    try {
      /*
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
        });*/
      //console.log("dispatch loading true");
      dispatch({ type: LOADING_AUCTION_LIST });
      console.log(`/auctions?page=${page}`);
      const response = await record.get(`/auctions?page=${page}`);

      //console.log(response);
      return dispatch({
        type: GET_AUCTION_LIST,
        payload: response.data,
      });
      //console.log("dispatch GET_AUCTION_LIST");
    } catch (e) {
      dispatch({ type: GET_AUCTION_LIST_ERROR, error: e });
    }
  };
};
const get_filtered_auction = (filters) => {
  return async (dispatch, getState) => {
    try {
      let tags = "";
      //for getting the tags , wise
      if (filters.tags.length === 0) {
        tags =
          "Art,Antiques,Electronics,Vehicles,Households,Collectibles,Sports,Fashion,Mini Items,Real Estate,Miscellaneous";
      } else {
        for (let i = 0; i < filters.tags.length; i++) {
          tags = tags + filters.tags[i];
          if (i !== filters.tags.length - 1) {
            tags = tags + ",";
          }
        }
      }
      dispatch({ type: LOADING_AUCTION_LIST });
      if (filters.time === "Past") {
        /* record
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
          });*/
        console.log(
          `/completed-filtered-auctions?page=${filters.page}&tags=${tags}`
        );
        const response = await record.get(
          `/completed-filtered-auctions?page=${filters.page}&tags=${tags}`
        );
        dispatch({ type: GET_FILTERED_AUCTION, payload: response.data });
      } else {
        /*
        either present or upcomming
      */
        const now = new Date();
        const abhi = now.toISOString();
        //<YYYY-mm-ddTHH:MM:ssZ>
        // 2021-10-14T03:43:37.846Z
        /*record
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
          });*/
        console.log(`/filtered-auctions?page=${filters.page}&tags=${tags}`);
        const response = await record.get(
          `/filtered-auctions?page=${filters.page}&tags=${tags}`
        );
        if (filters.time === "Upcomming") {
          //completed = false;
          //abhi event_date_time < start event_date_time
          const final_data = response.data.filter((e) => {
            //    console.log(new Date(e.event_date_time));
            //  console.log(new Date());
            return new Date(e.event_date_time) > new Date(abhi);
          });
          dispatch({ type: GET_FILTERED_AUCTION, payload: final_data });
        } else {
          //completed = false;
          //abhi event_date_time >= start event_date_time

          const final_data = response.data.filter((e) => {
            return new Date(e.event_date_time) <= new Date(abhi);
          });
          dispatch({ type: GET_FILTERED_AUCTION, payload: final_data });
        }
      }
    } catch (e) {
      dispatch({ type: GET_AUCTION_LIST_ERROR, error: e });
    }
  };
};
const get_all_auctions = (filters) => {
  return async (dispatch, getState) => {
    try {
      let tags = "";
      for (let i = 0; i < filters.tags.length; i++) {
        tags = tags + filters.tags[i];
        if (i !== filters.tags.length - 1) {
          tags = tags + ",";
        }
      }
      dispatch({ type: LOADING_AUCTION_LIST });
      console.log(`/all-auctions?page=${filters.page}&tags=${tags}`);
      const response = await record.get(
        `/all-auctions?page=${filters.page}&tags=${tags}`
      );
      return dispatch({
        type: GET_AUCTION_LIST,
        payload: response.data,
      });
    } catch (e) {
      dispatch({ type: GET_AUCTION_LIST_ERROR, error: e });
    }
  };
};

module.exports = { get_auction_list, get_filtered_auction, get_all_auctions };
