import { Card } from "antd";
import React from "react";
import RegistrationForm from "../../components/registrationForm/RegistrationForm";

import "./registrationStyle.css";


export const Registration = () => {
  return (
    <div className="registration-page bg-info">
      <div className="mt-5">
        <Card className="form-box">
          <RegistrationForm />
        </Card>
      </div>
    </div>
  );
};

