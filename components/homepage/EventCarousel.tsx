import React from 'react';
import { Carousel, Image } from 'antd';

const EventCarousel: React.FC = () => {
  return (
    <Carousel autoplay className="carousel-wrap">
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/780/300/Upload/eventcover/2021/10/08/9101E9.jpg"
        alt="1"
        preview={false}
      />
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2021/11/30/73EB14.jpg"
        alt="1"
        preview={false}
      />
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/780/300/Upload/eventcover/2021/11/06/12B6A3.jpg"
        alt="1"
        preview={false}
      />
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/780/300/Upload/eventcover/2021/12/13/D0A090.jpg"
        alt="1"
        preview={false}
      />
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/780/300/Upload/eventcover/2021/12/01/078930.jpg"
        alt="1"
        preview={false}
      />
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2020/10/20/9A27FA.jpg"
        alt="1"
        preview={false}
      />
      <Image
        className="carousel-wrap__item"
        src="https://images.tkbcdn.com/1/780/300/Upload/eventcover/2021/12/16/1DEA9C.jpg"
        alt="1"
        preview={false}
      />
    </Carousel>
  );
};

export default EventCarousel;
