import React from 'react';
import { Input, Layout, Row, Col, Divider, Typography, Button, Image } from 'antd';
import {
  AndroidOutlined,
  AppleOutlined,
  BehanceOutlined,
  DesktopOutlined,
  EnvironmentFilled,
  FacebookOutlined,
  InstagramOutlined,
  MailFilled,
  MobileOutlined,
  PhoneFilled,
  SendOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

export default function Footer() {
  const { Footer } = Layout;
  const { Title, Text } = Typography;
  return (
    <Footer className="footer">
      <section className="footer__wrapper">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                Hotline
              </Title>
              <Text className="footer__content__description">
                <PhoneFilled />
                Ho Chi Minh: Monday - Friday &#40;8:30 AM - 6:30 PM&#41;
              </Text>
              <Text strong className="footer__content__hotline">
                1900.6408
              </Text>
            </div>

            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                Support Email
              </Title>
              <Text className="footer__content__description">
                <MailFilled />
                support@snake.vn
              </Text>
            </div>
          </Col>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                How Do We Help
              </Title>
              <Text className="footer__content__description">Easy, Convenient and Secured</Text>
            </div>

            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                Customer care and support
              </Title>
              <Text className="footer__content__description">
                <EnvironmentFilled />
                53 Street 2, Van Phuc City, Hiep Binh Phuoc Ward, Thu Duc City, HCMC
              </Text>
            </div>
          </Col>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                Booking instruction
              </Title>
              <Text className="footer__content__description">Only with a few simple steps</Text>
            </div>

            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                Our Company
              </Title>
              <Text className="footer__content__description">About us</Text>
              <Text className="footer__content__description">Event Landscape Booklet</Text>
              <Text className="footer__content__description">We are hiring</Text>
              <Text className="footer__content__description">
                E-commerce marketplace regulation
              </Text>
              <Text className="footer__content__description">Dispute Resolution Policy</Text>
            </div>
          </Col>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                FAQ
              </Title>
              <Text className="footer__content__description">Frequently Asked Questions</Text>
            </div>

            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                Subscribe
              </Title>
              <Input
                className="footer__content__item_mail"
                placeholder="Your email"
                prefix={<MailFilled className="site-form-item-icon" />}
                suffix={<SendOutlined />}
              />
            </div>
          </Col>
        </Row>
        <Divider />

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content">
              <Title level={3} className="footer__content__title">
                TicketBox Application
              </Title>
              <div className="footer__content__list">
                <Button className="footer__content__item__platform" icon={<AppleOutlined />}>
                  <span className="footer__content__item__platform__item">
                    <Text strong>AVAILABLE ON</Text>
                    <br />
                    <Text>App store</Text>
                  </span>
                </Button>
                <Button className="footer__content__item__platform" icon={<AndroidOutlined />}>
                  <span className="footer__content__item__platform__item">
                    <Text strong>AVAILABLE APP ON</Text>
                    <br />
                    <Text>Google play</Text>
                  </span>
                </Button>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content contact">
              <Title level={3} className="footer__content__title">
                TicketBox Application
              </Title>
              <div className="footer__content__list">
                <Button className="footer__content__item__platform" icon={<DesktopOutlined />}>
                  <span className="footer__content__item__platform__item">
                    <Text strong>DESKTOP APP</Text>
                    <br />
                    <Text>Multi platform</Text>
                  </span>
                </Button>
                <Button className="footer__content__item__platform" icon={<MobileOutlined />}>
                  <span className="footer__content__item__platform__item">
                    <Text strong>MOBILE APP</Text>
                    <br />
                    <Text>Android and iOS</Text>
                  </span>
                </Button>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content contact">
              <Title level={3} className="footer__content__title">
                Follow Us
              </Title>
              <div className="footer__content__list">
                <div className="footer__content__item">
                  <FacebookOutlined />
                </div>
                <div className="footer__content__item">
                  <YoutubeOutlined />
                </div>
                <div className="footer__content__item">
                  <InstagramOutlined />
                </div>
                <div className="footer__content__item">
                  <TwitterOutlined />
                </div>
                <div className="footer__content__item">
                  <BehanceOutlined />
                </div>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" md={24} lg={8} xl={6}>
            <div className="footer__content contact">
              <Title level={3} className="footer__content__title">
                Language
              </Title>
              <div className="footer__content__list">
                <Image
                  className="footer__content__item-img"
                  preview={false}
                  src="https://static.tkbcdn.com/site/global/content-v2/img/lang-vi.svg"
                  alt="vi"
                />
                <Image
                  className="footer__content__item-img"
                  preview={false}
                  src="https://static.tkbcdn.com/site/global/content-v2/img/lang-en.svg"
                  alt="en"
                />
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </Footer>
  );
}
