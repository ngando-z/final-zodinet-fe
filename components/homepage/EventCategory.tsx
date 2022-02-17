import { Layout, Menu, LayoutProps } from 'antd';
import {
  BarsOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  SplitCellsOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ICategory } from '@/models/event.interface';
import * as api from '../../api/index';

const EventCategory: React.FC = ({ children }: LayoutProps) => {
  const { SubMenu } = Menu;
  const { Content, Sider } = Layout;
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const result = await api.eventApi.getAllCategory();
      setCategories(result);
    };

    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickMenuItem = (e: any) => {
    router.push(`/events/categories/${e.key}`);
  };

  return (
    <>
      <Sider width={300} className="site-layout-background">
        <Menu mode="inline" defaultOpenKeys={['sub1']} className="event-category__menu">
          <Menu.Item key="0" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<BarsOutlined />} title="Category Event">
            {categories.map((category) => (
              <Menu.Item
                key={category.id}
                icon={<SplitCellsOutlined />}
                onClick={handleClickMenuItem}
              >
                {category.name}
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key="10" icon={<UserOutlined />}>
            <Link href="/order">My order</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<FolderOpenOutlined />}>
            <Link href="/events/my-event"> My event</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="event-category-layout">
        <Content className="site-layout-background">{children}</Content>
      </Layout>
    </>
  );
};

export default EventCategory;
