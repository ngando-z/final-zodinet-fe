// import { DatePicker, Space } from 'antd';
import { NextPageWithLayout } from '@/models/common.interface';
import { MainLayout } from '@/components/layout';
import EventCategory from '@/components/homepage/EventCategory';
import EventCarousel from '@/components/homepage/EventCarousel';
import EventList from '@/components/homepage/EventList';
import React, { useEffect, useState } from 'react';
import { ICategory } from '@/models/event.interface';
import * as api from '../api/index';

const Home: NextPageWithLayout = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const result = await api.eventApi.getAllCategory();
      setCategories(result);
    };

    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EventCategory>
        <EventCarousel />
        {categories.length > 0 &&
          categories.map((category) => (
            <EventList id={category.id} key={category.id} name={category.name} />
          ))}
      </EventCategory>
    </>
  );
};

Home.Layout = MainLayout;

export default Home;
