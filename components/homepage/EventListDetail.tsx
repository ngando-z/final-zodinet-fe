import { IEPayload } from '@/models/event.interface';
import { Empty, Pagination, Row } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as api from '../../api/index';
import EvenItem from '../event/EventItem';

const EventListDetail: React.FC = () => {
  const router = useRouter();
  const categoryId = router.query.categoryId ? router.query.categoryId.toString() : '';
  const [optionPaging, setOptionPaging] = useState({
    page: 1,
    limit: 6,
  });
  const [listEvent, setListEvents] = useState<IEPayload[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getEventsByCategory = async (id: string) => {
      const result = await api.eventApi.getEventPagingByCategory(
        optionPaging.page,
        optionPaging.limit,
        id
      );
      setListEvents(result.events);
      setTotal(result.total);
    };
    getEventsByCategory(categoryId);
  }, [optionPaging.limit, optionPaging.page, categoryId]);

  const changePage = (page: number) => {
    setOptionPaging({
      ...optionPaging,
      page: page,
    });
  };

  return (
    <article className="event-list">
      {listEvent.length <= 0 && <Empty />}
      {listEvent.length > 0 && (
        <main className="event-list__ contain">
          <Row gutter={[24, 24]} className="event-list-row">
            {listEvent.map((event) => (
              <EvenItem item={event} key={event.id} />
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

export default EventListDetail;
