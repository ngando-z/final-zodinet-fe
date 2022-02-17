import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import EventDescription from '@/components/eventdetailpage/EventDescription';
import EventInformation from '@/components/eventdetailpage/EventInformation';
import { NextPage } from 'next';
import React from 'react';
const EventDetailPage: NextPage = () => {
  return (
    <>
      <Header />
      <EventInformation />
      <EventDescription />
      <Footer />
    </>
  );
};

export default EventDetailPage;
