import React, {useState} from 'react'
import { Card } from "antd";
import { Login } from '../../components/login/Login';
import "../entry/Entry.style.css";
import { ResetPassword } from '../../components/ResetPassword/ResetPassword';


export const Entry = () => {
    const [formLoad, setFormLoad] = useState("login");
    
    const handleOnResetSubmit = e => {
        e.preventDefault()

       
    }

    const formSwitcher = (formType) => {
        setFormLoad(formType);
    }

  return (
    <div className='entry-page bg-info'>
        <Card className="form-box"> 
              {formLoad === "login" && 
              <Login
                  formSwitcher={formSwitcher}
              />
              }

              {formLoad === "reset" && 
              <ResetPassword
                //   handleOnChange={handleOnChange} 
                  handleOnResetSubmit={handleOnResetSubmit}
                  formSwitcher={formSwitcher}
                //   email={email}
              />
              }
        </Card>
    </div>
  )
}
