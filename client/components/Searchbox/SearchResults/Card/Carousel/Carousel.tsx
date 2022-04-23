import Slider, { LazyLoadTypes } from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import carouselStyles from './carousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { ServerResponse } from 'pages/types/server';
import type { Image } from 'pages/types/server';

const Carousel = ({ church }: { church: string }) => {
  const [photos, setPhotos] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(`/api/images/${church}`);
      const base64Images = (await response.json()) as ServerResponse<Image[]>;
      if (base64Images.error) return [];
      return base64Images.payload
        ? base64Images.payload.map((base64Image) => {
            const image = new Image();
            console.log(base64Image);
            image.src = base64Image.src;
            return image;
          })
        : [];
    }

    fetchImages().then((images) => setPhotos(images));
  }, []);
  const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
    return (
      <div
        className={`${carouselStyles.arrow} ${carouselStyles.next}`}
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
    return (
      <div
        className={`${carouselStyles.arrow} ${carouselStyles.prev}`}
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
    <div className={carouselStyles.container}>
      <Slider
        {...settings}
        adaptiveHeight={true}
        className={carouselStyles.slider}
      >
        {photos.map((img, index) => (
          <div key={index} className={carouselStyles.slide}>
            <img src={img?.src} alt={'alt'} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
