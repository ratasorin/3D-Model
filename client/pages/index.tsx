import main__style from './main.module.css';
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

const LazyChangeName = dynamic(
  () => import('components/Widgets/Modals/Pictures/Change/ChangeName'),
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

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  ssr: false,
  loading: () => {
    return (
      <>
        <div className={main__style.loader}></div>
      </>
    );
  },
});

const Main = () => {
  const searchVisible = useAppSelector(({ showSearch }) => showSearch);
  useUser();
  return (
    <div className={main__style.app__container}>
      <DynamicMap />
      <Navbar />
      <LazyBlogs />
      <LazyInfo />
      <LazyPictures />
      <LazyModal />
      <LazySuccessPopup />
      <LazyAuthenticate />
      <LazyChangeName />
      <LazyBlog />
      {searchVisible ? (
        <div className={main__style.app}>
          <Searchbox />
        </div>
      ) : null}
    </div>
  );
};

export default Main;
