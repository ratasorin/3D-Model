import Slider, { LazyLoadTypes } from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import carousel__style from './carousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { ServerResponse } from 'types/server';
import { openModal } from 'store/widgets/actions/modals-actions';
import type { Image } from 'types/server';

interface ProcessedImage {
  image: HTMLImageElement;
  filename: string;
}

const Carousel = ({ church }: { church: string }) => {
  const [urls, setUrls] = useState<string[] | null>([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(`/api/images/${church}`);
      console.log({ response });
      const images = (await response.json()) as ServerResponse<string[]>;
      console.log({ images });
      if (images.error) return [];
      return images.payload;
    }

    fetchImages().then((urls) => setUrls(urls));
  }, []);
  const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
    return (
      <div
        className={`${carousel__style.arrow} ${carousel__style.next}`}
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
    return (
      <div
        className={`${carousel__style.arrow} ${carousel__style.prev}`}
        onClick={onClick}
      >
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    infinite: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    centerPadding: '0',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={carousel__style.container}>
      {urls?.length ? (
        <Slider
          {...settings}
          adaptiveHeight={true}
          className={carousel__style.slider}
        >
          {urls?.map((url, index) => (
            <div key={index} className={carousel__style.slide}>
              <img
                src={url}
                alt={'alt'}
                onClick={() => {
                  console.log(url);
                  openModal('image-viewer', {
                    src: url,
                  });
                }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className={carousel__style.placeholder}></div>
      )}
    </div>
  );
};

export default Carousel;
