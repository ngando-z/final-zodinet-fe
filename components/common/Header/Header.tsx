/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Avatar, Button, Col, Input, Layout, Menu, Popover, Row } from 'antd';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectorUser, logout } from 'app/user/userSlice';
import { EditOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function Header() {
  const { Header } = Layout;
  const { Search } = Input;
  const router = useRouter();
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();
  const loginHandler = () => {
    router.push('/login');
  };

  const registerHandler = () => {
    router.push('/signup');
  };

  const createEventHandler = () => {
    if (user.isLoggedIn) {
      router.push('/events/create');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    router.push('/');
  };

  const contentPophoverUser = (
    <>
      {user.role === 'admin' && (
        <Row>
          <Col
            className="btn--popover header__label"
            onClick={() => {
              router.push('/admin');
            }}
          >
            <ProfileOutlined />
            <span className="ml-10 ">Manager User</span>
          </Col>
        </Row>
      )}
      <Row className="mt-10">
        <Col
          className="btn--popover header__label"
          onClick={() => {
            router.push('/user/profile');
          }}
        >
          <EditOutlined />
          <span className="ml-10 ">Profile</span>
        </Col>
      </Row>
      <Row className="mt-10">
        <Col onClick={handleLogout} className="btn--popover header__label">
          <LogoutOutlined />
          <span className="ml-10 ">Logout</span>
        </Col>
      </Row>
    </>
  );

  const ItemMenu = () => {
    return user.isLoggedIn ? (
      <>
        <Menu.Item>
          <Popover
            placement="bottomLeft"
            content={contentPophoverUser}
            trigger="hover"
            className="header__user"
            key="4"
          >
            <Avatar icon={<UserOutlined />} />
            <span>{user.name}</span>
          </Popover>
        </Menu.Item>
      </>
    ) : (
      <>
        <Menu.Item key="2" onClick={registerHandler}>
          Sign up
        </Menu.Item>
        <Menu.Item key="3" onClick={loginHandler}>
          Sign in
        </Menu.Item>
      </>
    );
  };

  return (
    <Header className="header">
      <div className="container">
        <div className="header-box">
          <Link href="/" passHref>
            <img
              src="https://zodinet.com/wp-content/uploads/2021/09/logo-footer.png"
              className="header__logo"
            />
          </Link>
          <Search placeholder="Search" enterButton className="header__search" />

          <Menu mode="horizontal" className="header__navigation">
            <Menu.Item key="1">
              <Button
                type="default"
                shape="round"
                size="large"
                className="header__btn-create"
                onClick={createEventHandler}
              >
                Create event
              </Button>
            </Menu.Item>
            <ItemMenu />
          </Menu>
        </div>
      </div>
    </Header>
  );
}
