import { record } from "../apis/encheres";
import { CONTACT_US, FORM_FAILED } from "./actionTypes";

export const contactusform = (contactus_detatils) => async (dispatch, getState) => {
    console.log("inside contactus reducer");
    try {
      console.log("sending the data of conntactus to db");
      const response = await record.post("/contactUs", contactus_detatils);
      console.log(response.data.message);
      dispatch({ type: CONTACT_US, payload: response.data });
    } catch (e) {
      let error;
      if (e.response) {
        if (e.response.status === 400) {
          error = e.response.data.message || "Unsuccessfull";
        } else {
          error = e.response.statusText;
        }
      }
      console.log(error);
      dispatch({ type: FORM_FAILED, payload: { error: error } });
    }
  };
