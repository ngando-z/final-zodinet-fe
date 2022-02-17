// import { DatePicker, Space } from 'antd';
import { NextPageWithLayout } from '@/models/common.interface';
import { MainLayout } from '@/components/layout';
import EventCategory from '@/components/homepage/EventCategory';
import OrderList from '@/components/order/OrderList';
import { useAppSelector } from './../../app/hooks';
import { selectorUser } from './../../app/user/userSlice';
import { useRouter } from 'next/router';
import { Empty } from 'antd';

const OrderPage: NextPageWithLayout = () => {
  const user = useAppSelector(selectorUser);
  const router = useRouter();

  if (!user.isLoggedIn) {
    router.push('/login');
    return <Empty />;
  }

  return (
    <EventCategory>
      <OrderList />
    </EventCategory>
  );
};

OrderPage.Layout = MainLayout;

export default OrderPage;
