import CreateEvent from '@/components/event/CreateEvent';
// import EventCategory from '@/components/homepage/EventCategory';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models/common.interface';
// import { GetServerSideProps } from 'next';

const CreatEventPage: NextPageWithLayout = () => {
  return <CreateEvent />;
};

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const { req } = context;
//   console.log(req);
//   return {
//     props: {},
//   };
// };

CreatEventPage.Layout = MainLayout;

export default CreatEventPage;
