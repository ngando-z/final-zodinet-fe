import ListEvent from '@/components/event/ListEvent';
import EventCategory from '@/components/homepage/EventCategory';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models/common.interface';
const MyEventPage: NextPageWithLayout = () => {
  return (
    <EventCategory>
      <ListEvent />
    </EventCategory>
  );
};

MyEventPage.Layout = MainLayout;

export default MyEventPage;
