import { Avatar, Button, Checkbox, Col, Divider, InputNumber, Row, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { IEventPayload } from '@/models/event.interface';
import * as api from '../../api/index';
import { IUserProfile } from '@/models/user.interface';
import { IBankPayload } from '@/models/bank.interface';
import { TypeAlertEnum } from '../common/Alert/AlertMessage';
import { useRouter } from 'next/router';
interface IEventItemProps {
  event: IEventPayload;
  user: IUserProfile;
  // eslint-disable-next-line no-unused-vars
  alertNoti: (message: string, title: TypeAlertEnum) => void;
}

const InformationCheckout: React.FC<IEventItemProps> = (props) => {
  const { Title } = Typography;
  const router = useRouter();

  const [bankSellerAccount, setBankSellerAccount] = useState<IBankPayload>({} as IBankPayload);
  const [isDisableBtnSubmit, setIsDisableBtnSubmit] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  useEffect(() => {
    const getBank = async (id: string) => {
      const result = await api.userApi.findBankByUserId(id);
      setBankSellerAccount(result);
    };

    if (props.event.userId) getBank(props.event.userId);
  }, [props.event.userId]);

  const {
    id,
    logoUrl,
    name,
    eventStartDate,
    eventEndDate,
    eventPlaceName,
    eventAddress,
    ticketPrice,
    minTicketOrder,
    maxTicketOrder,
    availableTickets,
  } = props.event;

  const [amount, setAmount] = useState(1);

  const handleChangeAmount = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    setIsDisableBtnSubmit(true);
    if (amount <= availableTickets) {
      const result = await api.orderApi.create({
        eventId: id,
        userId: props.user.id,
        bankId: bankSellerAccount.id,
        amount: amount,
      });
      if (result) {
        props.alertNoti('Ticket booking successful', TypeAlertEnum.Success);
        router.push('/order');
        setIsDisableBtnSubmit(false);
      } else {
        setIsDisableBtnSubmit(false);
        props.alertNoti('Ticket booking fail', TypeAlertEnum.Error);
      }
    } else {
      setIsDisableBtnSubmit(false);
      props.alertNoti('Number of Ticket is not Enough', TypeAlertEnum.Error);
    }
  };

  function onChange(e: any) {
    setIsAgree(e.target.checked);
    // console.log(`checked = ${e.target.checked}`);
  }

  return (
    <article className="information-checkout">
      <Row>
        <Col flex={1}>
          <Avatar
            shape="square"
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={logoUrl ? <UserOutlined /> : ''}
            src={logoUrl}
          />
        </Col>

        <Col flex={7}>
          <Title level={5}>{name}</Title>
          <div className="information-checkout__event__description">
            <span>C13</span>
            <Divider type="vertical" />
            <span>2 hours 37 minutes</span>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row className="information-checkout__event">
        <Space size={4} direction="vertical" className="information-checkout__event__wrap">
          <Title level={5}>{eventPlaceName}</Title>
          <span>{eventAddress}</span>
          <span>
            {eventStartDate} - {eventEndDate}
          </span>
          <span>D17</span>
          <div className="information-checkout__event__ticket">
            <div>
              <span>Amount: </span>
              <InputNumber
                min={minTicketOrder}
                max={maxTicketOrder}
                defaultValue={1}
                value={amount}
                onChange={(amount) => handleChangeAmount(amount)}
              />
            </div>
            <span>{amount * +ticketPrice}</span>
          </div>
        </Space>
      </Row>
      <Divider />
      <Row className="information-checkout__event__total">
        <span>{amount * +ticketPrice}đ</span>
      </Row>
      <Row className="information-checkout__term">
        <Checkbox onChange={onChange}>
          I agree with <a href="">Terms and Condition and am purchasing tickets</a> for age
          appropriate audience
        </Checkbox>
      </Row>
      <Row>
        <Button
          type="default"
          htmlType="submit"
          size="large"
          className="form__button"
          loading={isDisableBtnSubmit}
          onClick={handleSubmit}
          disabled={!isAgree}
        >
          <span className="form__button-label">Pay</span>
        </Button>
      </Row>
    </article>
  );
};

export default InformationCheckout;
