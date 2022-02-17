import EventCategory from '@/components/homepage/EventCategory';
import { MainLayout } from '@/components/layout';
import UserProfile from '@/components/Profile/UserProfile';
import { NextPageWithLayout } from '@/models/common.interface';
import React from 'react';
const UserProfilePage: NextPageWithLayout = () => {
  return (
    <EventCategory>
      <article className="user-profile">
        <UserProfile />
      </article>
    </EventCategory>
  );
};

UserProfilePage.Layout = MainLayout;

export default UserProfilePage;
