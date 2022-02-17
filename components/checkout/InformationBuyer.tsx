import React from 'react';
import { Divider, Form, Input, Radio } from 'antd';
import { CreditCardOutlined, UserOutlined } from '@ant-design/icons';
import { IUserProfile } from '@/models/user.interface';

interface IUserProps {
  item: IUserProfile;
}

const InformationBuyer: React.FC<IUserProps> = (props) => {
  const { email, numberPhone } = props.item;

  const onFinish = async () => {
    console.log(true);
  };

  return (
    <article className="information-buyer">
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="form"
        scrollToFirstError={true}
        layout="vertical"
        requiredMark={false}
      >
        <div className="information-buyer__header">
          <UserOutlined />
          <div>Recipient information</div>
        </div>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
          className="form__item"
          label="Phone number"
        >
          <Input size="large" defaultValue={numberPhone || ''} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter email!', type: 'email' }]}
          className="form__item"
          label="Email"
        >
          <Input placeholder="Input here" size="large" defaultValue={email || ''} disabled />
        </Form.Item>

        <Divider />

        <div className="information-buyer__header">
          <CreditCardOutlined />
          <div>Payment Method</div>
        </div>

        <Form.Item name="paymentMethod" className="payment-method">
          <Radio.Group size="large" className="payment-method__group">
            <Radio.Button value="momo" className="payment-method__item">
              Momo Wallet
            </Radio.Button>
            <Radio.Button value="credit" className="payment-method__item">
              Credit Card
            </Radio.Button>
            <Radio.Button value="atm" className="payment-method__item">
              ATM
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </article>
  );
};

export default InformationBuyer;
