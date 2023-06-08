import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import { DefaultLayout } from '../../Layout/DefaultLayout';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../login/LoginSlice';
import { fetchNewAccessJWT } from '../../api/userApi';
import { getUserProfile } from '../../page/dashboard/userACtion';

export const PrivateRoute = ({children, ...rest}) => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    }

    !user._id && dispatch(getUserProfile());
    
    !sessionStorage.getItem("accessJWT") && localStorage.getItem("crmSite") && updateAccessJWT();
    // updateAccessJWT();
    !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess())
   }, [dispatch, isAuth]);

  return (
    
        <Route 
            {...rest}
            render={() =>
            isAuth ? (<DefaultLayout>{children}</DefaultLayout>) : (<Redirect to="/" />)} />
    
  )
}
