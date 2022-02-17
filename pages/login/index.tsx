// import { Form, Input, Button, Checkbox } from 'antd';
import NotFound from '@/components/common/NotFound/NotFound';
import Login from '@/components/user/Login';
import { NextPage } from 'next';
import React from 'react';
import { useAppSelector } from './../../app/hooks';
import { selectorUser } from './../../app/user/userSlice';

const LoginPage: NextPage = () => {
  const user = useAppSelector(selectorUser);

  return user.isLoggedIn ? <NotFound /> : <Login />;
};

export default LoginPage;
