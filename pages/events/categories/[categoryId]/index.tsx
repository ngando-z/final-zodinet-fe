import EventCategory from '@/components/homepage/EventCategory';
import EventListDetail from '@/components/homepage/EventListDetail';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models/common.interface';

const ListEventPage: NextPageWithLayout = () => {
  return (
    <EventCategory>
      <EventListDetail />
    </EventCategory>
  );
};

ListEventPage.Layout = MainLayout;

export default ListEventPage;
