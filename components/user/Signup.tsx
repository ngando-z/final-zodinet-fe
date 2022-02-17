import { ISignupPayload } from '@/models/sigup.interface';
import { Row, Col, Form, Input, Button, Radio } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useLayoutEffect } from 'react';
import * as api from '../../api/index';
import AlertMessage, { TypeAlertEnum } from '../common/Alert/AlertMessage';

const Signup: React.FC = () => {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState({ message: '', title: TypeAlertEnum.Info });
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);

  useLayoutEffect(() => {
    setIsDisplayAlert(alertMessage.message ? true : false);
  }, [alertMessage]);

  const onFinish = async (values: ISignupPayload) => {
    try {
      const result = await api.authApi.signup(values);

      if (result) {
        setAlertMessage({ message: 'Sign Up Successfully!', title: TypeAlertEnum.Success });
        router.push('/login');
      }
    } catch (error: any) {
      setAlertMessage({ message: error?.errorCode, title: TypeAlertEnum.Error });
    }
  };

  return (
    <Row>
      <Col offset="16" span="8">
        {isDisplayAlert && (
          <AlertMessage message={alertMessage.message} title={alertMessage.title} />
        )}
      </Col>
      <Col span="24">
        <section className="box">
          <h1 className="heading"> Snake Ticket Online</h1>
          <h3 className="heading--secondary">New here?</h3>
          <p className="heading--sub mb-24">Signing up is easy. It only takes a few steps</p>
          <Form
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="form"
            scrollToFirstError={true}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter full name!' }]}
              className="form__item"
            >
              <Input placeholder="Full name" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter email!', type: 'email' }]}
              className="form__item"
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: 'Please enter password!',
                },
                {
                  pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                  message: 'Password must include uppercase, lowercase and number!',
                },
                {
                  min: 8,
                  message: 'Password minimum 8 characters!',
                },
              ]}
              className="form__item"
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirm"
              className="form__item"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item
              // label="Giới tính"
              name="gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
              className="form__item"
            >
              <Radio.Group className="group__gender">
                <Radio value="Female">Female</Radio>
                <Radio value="Male">Male</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }} className="form__item  mt-10">
              <Button type="default" htmlType="submit" size="large" className="form__button">
                <span className="form__button-label">Sign up</span>
              </Button>
            </Form.Item>

            <p className="form__redirect">
              Already have an account?
              <span className="form__redirect-link ml-5">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </Form>
        </section>
      </Col>
    </Row>
  );
};

export default Signup;
