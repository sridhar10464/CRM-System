import { Card } from "antd";
import React from 'react';

import { useSelector } from 'react-redux';
import { ResetPassword } from '../../components/ResetPassword/ResetPassword';
import UpdatePasswordForm from '../../components/ResetPassword/UpdatePasswordForm';
import "../entry/Entry.style.css";
import "./passwordOtpFormStyle.css";

export const PasswordOtpForm = () => {
  const { showUpdatePassForm } = useSelector(state => state.password);
    
  return (
    <div className='entry-page bg-info'>
      <Card className="form-box"> 
          {showUpdatePassForm ? <UpdatePasswordForm /> : <ResetPassword />} 
     
      <div className='text-center'>
        <a href="/">Login now</a>
      </div> 
      </Card>     
    </div>
  )
}
