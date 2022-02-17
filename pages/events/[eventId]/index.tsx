import EventDetailItem from '@/components/event/EventDetailItem';
import EventCategory from '@/components/homepage/EventCategory';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models/common.interface';

const EventDetailPage: NextPageWithLayout = () => {
  return (
    <EventCategory>
      <EventDetailItem />
    </EventCategory>
  );
};

EventDetailPage.Layout = MainLayout;

export default EventDetailPage;
