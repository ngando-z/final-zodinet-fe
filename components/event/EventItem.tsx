import { FieldTimeOutlined, EnvironmentFilled, ArrowRightOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Button, Card, Image, Typography } from 'antd';
import { isOwner } from 'app/event/eventSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';

import { IEPayload } from '../../models/event.interface';

interface IEventItemProps {
  item: IEPayload;
  isHome?: boolean;
  isOwner?: boolean;
}

const EvenItem: React.FC<IEventItemProps> = (props) => {
  const { Text } = Typography;
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isOwner({ isOwner: props.isOwner ? !!props.isOwner : false }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOwner]);

  const onSeeMore = () => {
    router.push(`/events/${props.item.id}`);
  };

  return (
    <Col
      sm={24}
      md={12}
      xl={8}
      key={props.item.id}
      onClick={onSeeMore}
      className="event-item__contain"
    >
      <Card
        className="event-item__card"
        cover={
          <Image
            alt="example"
            src={props.item.bannerUrl ? props.item.bannerUrl : '/img/default-image.jpg'}
            preview={false}
            className="event-item__img"
          />
        }
      >
        <Row>
          <Col span={2}>
            <Avatar
              size="large"
              src={props.item.logoUrl ? props.item.logoUrl : '/img/default-image.jpg'}
            />
          </Col>
          <Col offset={2} span={20}>
            <Text className="event-item__title" ellipsis>
              {props.item.name}
            </Text>
          </Col>
          <Col offset={4} span={20} className="mt-10">
            <div className="event-item__info-item">
              <FieldTimeOutlined />
              <span className="ml-10">{props.item.eventStartDate}</span>
            </div>
            <div className="event-item__info-item">
              <Text ellipsis>
                <EnvironmentFilled className="mr-10" />
                {`${props.item.eventPlaceName} - ${props.item.eventAddress}`}
              </Text>
            </div>
          </Col>
          {!props.isHome && (
            <Col className="mt-40 event-item__btn" offset={12} span={12}>
              <Button
                shape="round"
                size="large"
                type="dashed"
                className="btn btn--submit"
                onClick={onSeeMore}
              >
                See more
                <span className="ml-10">
                  <ArrowRightOutlined />
                </span>
              </Button>
            </Col>
          )}
        </Row>
      </Card>
    </Col>
  );
};

export default EvenItem;
