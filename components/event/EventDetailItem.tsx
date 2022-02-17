/* eslint-disable jsx-a11y/alt-text */
import { IEventPayload } from '@/models/event.interface';
import {
  CalendarOutlined,
  EnvironmentFilled,
  FieldTimeOutlined,
  FileTextOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Empty, Image, Row, Table, Tabs, Typography } from 'antd';
import { selectorEvent } from 'app/event/eventSlice';
import { useAppSelector } from 'app/hooks';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as api from '../../api/index';
import AlertMessage, { TypeAlertEnum } from '../common/Alert/AlertMessage';

const EventDetailItem: React.FC = () => {
  const { Title, Text, Paragraph } = Typography;
  const { TabPane } = Tabs;

  const router = useRouter();
  const event = useAppSelector(selectorEvent);

  const [data, setData] = useState<IEventPayload>({} as IEventPayload);
  const [alertMessage, setAlertMessage] = useState({ message: '', title: TypeAlertEnum.Info });
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const eventId = router.query.eventId ? router.query.eventId.toString() : '';

  const columns = [
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'price',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Ticket Amount ',
      dataIndex: 'totalTickets',
      key: 'amount',
      render: (text: string) => <a>{text}</a>,
    },
    // {
    //   title: 'Number of tickets sold ',
    //   dataIndex: '',
    //   key: 'amount',
    //   render: (text: string) => <a>{text}</a>,
    // },
    {
      title: 'Ticket Image',
      dataIndex: 'ticketImageUrl',
      key: 'image',
      render: (text: string) => (
        <Image
          width={400}
          height={200}
          src={text ? text : '/img/default-image.jpg'}
          preview={false}
        />
      ),
    },
  ];

  useEffect(() => {
    setIsDisplayAlert(alertMessage.message ? true : false);
  }, [alertMessage]);

  useEffect(() => {
    const getEvent = async (id: string) => {
      try {
        const result: IEventPayload = await api.eventApi.getEventById(id);
        if (result) {
          setData(result);
        }
      } catch (error: any) {
        setAlertMessage({ message: error?.errorCode, title: TypeAlertEnum.Error });
      }
    };

    if (eventId) {
      getEvent(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    setIsUpdate(event.isOwner ? event.isOwner : false);
  }, [event.isOwner]);

  const handleClick = () => {
    if (isUpdate) {
      router.push(`/events/update/${eventId}`);
    } else {
      router.push(`/checkout/${eventId}`);
    }
  };

  return (
    <Row>
      <Col offset="16" span="8">
        {isDisplayAlert && (
          <AlertMessage message={alertMessage.message} title={alertMessage.title} />
        )}
      </Col>
      {!data.id && (
        <Col offset={8}>
          <Empty />
        </Col>
      )}
      {data.id && (
        <Col span={24}>
          <section className="event__contain">
            <Row justify="center">
              <Col span={12}>
                <Image
                  src={data.bannerUrl ? data.bannerUrl : '/img/default-image.jpg'}
                  className="event__img w-100"
                  preview={false}
                />
              </Col>
              <Col span={12} className="event-info">
                <Row>
                  <Col span={8}>
                    <CalendarOutlined className="event-info__icon" />
                  </Col>
                  <Col span={16}>
                    <Title className="event-info__name" level={3}>
                      {data.name}
                    </Title>
                  </Col>
                  <Col offset={8} span={16}>
                    <Text className="event-info__date">
                      <span className="mr-10">
                        <FieldTimeOutlined />
                      </span>
                      {data.eventStartDate} - {data.eventEndDate}
                    </Text>
                  </Col>
                  <Col offset={8} span={16}>
                    <Text className="event-info__address">
                      <span className="mr-10">
                        <EnvironmentFilled />
                      </span>
                      {data.eventPlaceName} - {data.eventAddress}
                    </Text>
                  </Col>
                  <Col offset={8} span={16}>
                    <Text className="event-info__price">
                      <span className="mr-10">
                        <MoneyCollectOutlined />
                      </span>
                      {`${data.ticketPrice}$`}
                    </Text>
                  </Col>

                  <Col offset={4} span={16} className="mt-40">
                    <Button
                      className="btn btn--submit btn--order w-100"
                      size="large"
                      onClick={handleClick}
                    >
                      {isUpdate ? 'Update Event' : 'Order Ticket'}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-20 event-info">
              <Tabs className="w-100">
                <TabPane
                  tab={
                    <span>
                      <FileTextOutlined /> Introduce
                    </span>
                  }
                  key="1"
                >
                  <Title level={3}>{data.name}</Title>
                  <Paragraph className="event-info__description">{data.description}</Paragraph>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <MoneyCollectOutlined /> Ticket Information
                    </span>
                  }
                  key="2"
                >
                  <Table columns={columns} dataSource={[data]} pagination={false} bordered></Table>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <TeamOutlined /> Organizers Information
                    </span>
                  }
                  key="3"
                >
                  <Row>
                    <Col span={4}>
                      <Avatar
                        size={128}
                        src={data.logoUrl ? data.logoUrl : '/img/default-image.jpg'}
                      />
                    </Col>
                    <Col span={18}>
                      <Title level={2}>{data.organizationInfo}</Title>
                      <Col span={24}>
                        <Paragraph>Address - {data.organizationAddress}</Paragraph>
                      </Col>
                      <Col span={24}>
                        <Paragraph>Phone - {data.organizationPhone}</Paragraph>
                      </Col>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Row>
          </section>
        </Col>
      )}
    </Row>
  );
};

export default EventDetailItem;
