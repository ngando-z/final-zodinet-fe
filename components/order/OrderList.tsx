import React, { useEffect, useState } from 'react';
import { Empty, Pagination } from 'antd';
import OrderItem from './OrderItem';
import { Typography } from 'antd';
import * as api from '../../api/index';
import { IOrderPagingPayload, IOrderPayload } from '@/models/order.interface';

const OrderList: React.FC = () => {
  const { Title } = Typography;
  const [orders, setOrders] = useState<IOrderPayload[]>([]);
  const [optionPaging, setOptionPaging] = useState({
    page: 1,
    limit: 5,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getEventPaging = async (page: number, limit: number) => {
      const result: IOrderPagingPayload = await api.orderApi.getAllOrder(page, limit);
      setOrders(result.orders);
      setTotal(result.total);
    };
    getEventPaging(optionPaging.page, optionPaging.limit);
  }, [optionPaging.limit, optionPaging.page]);

  const changePage = (page: number) => {
    setOptionPaging({
      ...optionPaging,
      page: page,
    });
  };

  console.log(total);

  if (orders.length === 0) return <Empty className="mt-40" />;
  return (
    <article className="order-list">
      <Title level={3} className="order-list__header">
        My order
      </Title>
      {orders.map((order) => (
        <OrderItem key={order.id} item={order} />
      ))}
      <div className="order-list__pagination">
        <Pagination
          defaultCurrent={1}
          total={total}
          current={optionPaging.page}
          onChange={changePage}
          pageSize={optionPaging.limit}
        />
      </div>
    </article>
  );
};

export default OrderList;
