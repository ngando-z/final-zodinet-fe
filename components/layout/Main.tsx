import { LayoutProps } from '@/models/index';
import React from 'react';
import { Layout } from 'antd';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';

export function MainLayout({ children }: LayoutProps) {
  return (
    <Layout>
      <Header />
      <Layout>{children}</Layout>
      <Footer />
    </Layout>
  );
}
