import EventDetail from '@/components/event/EventDetail';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models/common.interface';
import { useRouter } from 'next/router';

const UpdateEventPage: NextPageWithLayout = () => {
  const router = useRouter();
  const eventId = router.query.eventId ? router.query.eventId.toString() : '';

  return <EventDetail id={eventId} />;
};

UpdateEventPage.Layout = MainLayout;

export default UpdateEventPage;
