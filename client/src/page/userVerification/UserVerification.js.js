import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { userRegistrationVerification } from "../../api/userApi";

import "./userVerificationStyle.css";
import { Alert, Spinner } from "react-bootstrap";

const initialResponse = {
  status: "",
  message: "",
};
export const UserVerification = () => {
  const { _id, email } = useParams();
  const dt = { _id, email };

  const [response, setResponse] = useState(initialResponse);
  
  useEffect (() => {
    const apiCall = async () => {
      const result = await userRegistrationVerification(dt);
      setResponse(result);
    };

    !response.status && apiCall();
  }, [response]);

  return (
    <div className="registration-page bg-info">
      <div className="mt-5">
        <Card className="form-box">
        {!response.status && <Spinner variant="info" animation="border" />}

        {response.status && (
          <Alert
            variant={response.status === "success" ? "success" : "danger"}
          >
            {response.message}
          </Alert>
        )}
        </Card>
      </div>
    </div>
  );
};

