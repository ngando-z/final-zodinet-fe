import React from 'react';
import { Avatar, Col, Empty, Row, Table, Tabs, Tag } from 'antd';
import {
  AntDesignOutlined,
  DownloadOutlined,
  EnvironmentFilled,
  FieldTimeOutlined,
  ProfileOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import { IOrderPayload, StatusEnum } from '@/models/order.interface';

interface IOrderItemProps {
  item: IOrderPayload;
}

const OrderItem: React.FC<IOrderItemProps> = (props) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const { amount, tickets, event, status } = props.item;

  const columns = [
    {
      title: 'TICKET TYPE',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'QUANTITY',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'UNIT PRICE',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'TOTAL AMOUNT',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const data = [
    {
      key: '1',
      name: event.name,
      quantity: amount,
      price: +event.ticketPrice,
      total: +event.ticketPrice * amount,
    },
  ];

  const columnsTicket = [
    {
      title: 'No',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'TICKET KEY',
      dataIndex: 'ticket',
      key: 'ticket',
    },
    {
      title: 'DOWNLOAD',
      dataIndex: 'download',
      key: 'download',
    },
  ];

  const dataTicket = tickets.map((ticket, index) => ({
    key: index + 1,
    number: index + 1,
    ticket,
    download: <DownloadOutlined />,
  }));

  if (false) return <Empty />;

  return (
    <>
      <article className="order-item">
        <Row className="order-item__header">
          <Col span={2}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={!event.logoUrl ? <AntDesignOutlined /> : ''}
              src={event.logoUrl}
            />
          </Col>
          <Col className="order-item__info" span={20}>
            <Title level={2}>
              {event.name}{' '}
              <span>
                <Tag color={status === StatusEnum.Progress ? 'processing' : 'success'}>
                  {status === StatusEnum.Progress ? 'processing' : 'success'}
                </Tag>
              </span>
            </Title>
            <div className="order-item__info__item">
              <FieldTimeOutlined />
              <span className="order-item__info__item__description">{event.eventStartDate}</span>
            </div>
            <div className="order-item__info__item">
              <EnvironmentFilled />
              <span className="order-item__info__item__description">
                {event.eventPlaceName + ' - ' + event.eventAddress}
              </span>
            </div>
          </Col>

          <Col className="order-item__qr" span={2}>
            <Avatar
              shape="square"
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src="https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
            />
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <ProfileOutlined />
                Order Detail
              </span>
            }
            key="1"
          >
            <Table columns={columns} dataSource={data} pagination={false} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <SolutionOutlined />
                My Tickets
              </span>
            }
            key="2"
          >
            <Table columns={columnsTicket} dataSource={dataTicket} />
          </TabPane>
        </Tabs>
      </article>
    </>
  );
};

export default OrderItem;
