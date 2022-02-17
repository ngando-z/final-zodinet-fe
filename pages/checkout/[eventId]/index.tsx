// import { DatePicker, Space } from 'antd';
import { NextPageWithLayout } from '@/models/common.interface';
import { MainLayout } from '@/components/layout';
import InformationBuyer from '@/components/checkout/InformationBuyer';
import InformationCheckout from '@/components/checkout/InformationCheckout';
import { Col, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectorUser } from 'app/user/userSlice';
import { useRouter } from 'next/router';
import { IEventPayload } from '@/models/event.interface';
import * as api from './../../../api/index';
import AlertMessage, { TypeAlertEnum } from './../../../components/common/Alert/AlertMessage';

const CheckoutPage: NextPageWithLayout = () => {
  const { Content } = Layout;

  const router = useRouter();
  const user = useAppSelector(selectorUser);
  const [event, setEvent] = useState<IEventPayload>({} as IEventPayload);
  const [alertMessage, setAlertMessage] = useState({ message: '', title: TypeAlertEnum.Info });
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);

  const eventId = router.query.eventId ? router.query.eventId.toString() : '';

  useEffect(() => {
    setIsDisplayAlert(alertMessage.message ? true : false);
  }, [alertMessage]);

  useEffect(() => {
    const getEvent = async (id: string) => {
      try {
        const result: IEventPayload = await api.eventApi.getEventById(id);
        if (result) {
          setEvent(result);
        }
      } catch (error: any) {
        setAlertMessage({ message: error.message, title: TypeAlertEnum.Error });
      }
    };

    if (eventId) {
      getEvent(eventId);
    }
  }, [eventId]);

  const alertNoti = (message: string, title: TypeAlertEnum) => {
    setAlertMessage({ message: message, title: title });
    setIsDisplayAlert(true);
  };

  return (
    <>
      {isDisplayAlert && <AlertMessage message={alertMessage.message} title={alertMessage.title} />}
      <Content className="checkout">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
          <Col span={8}>
            <InformationBuyer item={user} />
          </Col>
          <Col span={8}>
            <InformationCheckout event={event} user={user} alertNoti={alertNoti} />
          </Col>
        </Row>
      </Content>
    </>
  );
};

CheckoutPage.Layout = MainLayout;

export default CheckoutPage;
