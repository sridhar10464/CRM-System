import axios from "axios";

const rootUrl = "https://crm-system-ikhw.onrender.com/v1/";
const ticketUrl = rootUrl + "ticket/";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("https://crm-system-ikhw.onrender.com/v1/ticket", {
          headers: {
            // Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGVtYWlsLmNvbSIsImlhdCI6MTY4NTc4NTA1MiwiZXhwIjoxNjg1ODcxNDUyfQ.-F7dHBSqpD472xPavWXDXqyaQDaHNn27FRD49s_8WZ0"
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleTicket = (_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(ticketUrl + _id, {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
            "Access-Control-Allow-Credentials": "*"
          },
        });
  
        resolve(result);
      } catch (error) {
        console.log(error.message);
        reject(error);
      }
    });
};
  
export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(ticketUrl + _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        closeTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const createNewTicket = (formData) => {
  console.log("from api", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUrl, formData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
