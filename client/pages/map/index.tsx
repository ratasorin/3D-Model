import map__style from './map.module.css';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('components/map'), {
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

const Map = () => {
  return (
    <div className={map__style.app__container}>
      <DynamicMap />
    </div>
  );
};

export default Map;
