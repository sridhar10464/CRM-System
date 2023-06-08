import axios from "axios";


// const loginUrl = "http://localhost:3001/v1/user/login";
const rootUrl = "https://crm-system-ikhw.onrender.com/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens";
const userVerificationUrl = userProfileUrl + "/verify";

export const UserRegistration = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("https://crm-system-ikhw.onrender.com/v1/user", formData);
      // const res = await fetch('http://localhost:3001/v1/user', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData),
      //   });

      resolve(res.data);

      if (res.data.status === "success") {
        resolve(res.data);
      }
      
    } catch (error) {
      console.log(error.message)
      reject(error);
    }
  });
};

export const userRegistrationVerification = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(userVerificationUrl, formData);
      // const res = await fetch('http://localhost:3001/v1/user/verify', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      resolve(res.data);
      if (res.data.status === "success") {
        resolve(res.data);
      }
    } catch (error) {
      reject({ status: "error", message: error.error });
    }
  });
};

export const userLogin = (formData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(loginUrl, formData);

          // const res = await fetch('http://localhost:3001/v1/user/login', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(formData),
          // });
            resolve(res.data);

            if (res.data.status === "success") {
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                    "crmSite",
                    JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            }
        } catch (error) {
            console.log(error.message)
            reject(error);
        }
    })
};

export const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessJWT = sessionStorage.getItem("accessJWT");
  
        if (!accessJWT) {
          reject("Token not found!");
        }
       
        const res = await axios.get(userProfileUrl, {
          headers: {
            Authorization: accessJWT,
            // "Access-Control-Allow-Credentials": "*"
          },
        });
        
        console.log(res)
        resolve(res.data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));

      if (!refreshJWT) {
        reject("Token not found!");
      }

      const res = await axios.get(newAccessJWT, {
        headers: {
          Authorization: refreshJWT,
        },
      });
      console.log(res.data)

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
      }

      resolve(true);
    } catch (error) {
      if (error.message === "Request failed with status code 403") {
        localStorage.removeItem("crmSite");
      }

      reject(false);
    }
  });
};
  
export const userLogout = async () => {
  try {
    await axios.delete(logoutUrl, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
