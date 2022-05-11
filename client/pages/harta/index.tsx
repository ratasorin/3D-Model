import map__style from './harta.module.css';
import { useAppSelector } from 'hooks/redux-hooks';
import dynamic from 'next/dynamic';
import Navbar from 'components/Navbar/Navbar';
import { useUser } from 'lib/user';

const Searchbox = dynamic(() => import('components/Searchbox/Searchbox'), {
  ssr: false,
});

const LazyInfo = dynamic(() => import('components/Widgets/Modals/Info/Info'), {
  ssr: false,
});

const LazyModal = dynamic(
  () => import('components/Widgets/Modals/Modify/Modify'),
  {
    ssr: false,
  }
);

const LazyPictures = dynamic(
  () => import('components/Widgets/Modals/Pictures/Pictures'),
  {
    ssr: false,
  }
);

const LazySuccessPopup = dynamic(
  () => import('components/Widgets/Popup/Success/Success'),
  {
    ssr: false,
  }
);

const LazyAuthenticate = dynamic(
  () => import('components/Widgets/Modals/Authenticate/Authenticate'),
  {
    ssr: false,
  }
);

const LazyBlogs = dynamic(import('components/Widgets/Modals/Blogs/Blogs'), {
  ssr: false,
});

const LazyBlog = dynamic(import('components/Widgets/Modals/Blogs/Blog/Blog'), {
  ssr: false,
});

const LazyPDF = dynamic(import('components/Widgets/Modals/PDF/PDF'), {
  ssr: false,
});

const DynamicMap = dynamic(() => import('components/Map/Map'), {
  ssr: false,
  loading: () => {
    return (
      <div className={map__style.loading_panel__container}>
        <p>Incarcam mapa</p>
        <div className={map__style.loading__map}>
          <div className={map__style.map}>
            <img src="/map.png" alt="map" />
          </div>
          <div className={map__style.loader__container}>
            <div className={map__style['loading-spinner']}>
              <div className={map__style['loading']}>
                <div></div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

const LazyImages = dynamic(
  () => import('components/Widgets/Modals/Image/Image')
);

const Main = () => {
  const searchVisible = useAppSelector(({ showSearch }) => showSearch);
  useUser();
  return (
    <div className={map__style.app__container}>
      <DynamicMap />
      <Navbar />
      <LazyBlogs />
      <LazyInfo />
      <LazyPictures />
      <LazyModal />
      <LazySuccessPopup />
      <LazyAuthenticate />
      <LazyBlog />
      <LazyImages />
      <LazyPDF />
      {searchVisible ? (
        <div className={map__style.app}>
          <Searchbox />
        </div>
      ) : null}
    </div>
  );
};

export default Main;
