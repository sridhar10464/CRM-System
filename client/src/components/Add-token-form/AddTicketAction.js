import {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
  } from "./AddTokenslice";
  import { createNewTicket } from "../../api/ticketApi";
  
  export const openNewTicket = (formData) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(openNewTicketPending());
  
        ////call api
        const result = await createNewTicket(formData);
        if (result.status === "error") {
          return dispatch(openNewTicketFail(result.message));
        }
        dispatch(openNewTicketSuccess(result.message));
      } catch (error) {
        console.log(error);
        dispatch(openNewTicketFail(error.message));
      }
    });
  };