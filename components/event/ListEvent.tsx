import { IEPayload, IEventPagingPayload } from '@/models/event.interface';
import { Divider, Empty, Pagination, Row } from 'antd';
import { useAppSelector } from 'app/hooks';
import { selectorUser } from 'app/user/userSlice';
import React, { useEffect, useState } from 'react';
import * as api from '../../api/index';
import EvenItem from './EventItem';

const ListEvent: React.FC = () => {
  const [listEvent, setListEvent] = useState<IEPayload[]>([]);
  const user = useAppSelector(selectorUser);
  const [total, setTotal] = useState(0);
  const [optionPaging, setOptionPaging] = useState({
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const getEventPaging = async (page: number, pageSize: number, id: string) => {
      const result: IEventPagingPayload = await api.eventApi.getEventPagingByUserId(
        page,
        pageSize,
        id
      );
      setListEvent(result.events);
      setTotal(result.total);
    };
    if (user.id) {
      getEventPaging(optionPaging.page, optionPaging.limit, user.id);
    }
  }, [optionPaging.limit, optionPaging.page, user.id]);

  const changePage = (page: number) => {
    setOptionPaging({
      ...optionPaging,
      page: page,
    });
  };

  return (
    <article className="event-list">
      <Divider className="event-list__header">My Event</Divider>
      {listEvent.length <= 0 && <Empty />}
      {listEvent.length > 0 && (
        <main className="event-list__ contain">
          <Row gutter={[24, 24]} className="event-list-row">
            {listEvent.map((event) => (
              <EvenItem item={event} key={event.id} isOwner={true} />
            ))}
          </Row>
        </main>
      )}

      {listEvent.length > 0 && (
        <div className="event-list__pagination">
          <Pagination
            defaultCurrent={1}
            total={total}
            current={optionPaging.page}
            onChange={changePage}
            pageSize={optionPaging.limit}
          />
        </div>
      )}
    </article>
  );
};

export default ListEvent;
