import { 
    registrationError,
    registrationPending,
    registrationSuccess
} from "./REgistrationSlice";

import { UserRegistration } from "../../api/userApi";

export const newUserRegistration = (formData) => async (dispatch) => {
    try {
        dispatch(registrationPending());

        const result = await UserRegistration(formData);
        result.status === "success"
            ? dispatch(registrationSuccess(result.message))
            : dispatch(registrationError(result.message));
        
        console.log(result);
    } catch (error) {
        dispatch(registrationError(error.messgae));
    }
};