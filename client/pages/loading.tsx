import React from 'react';
import main__style from './main.module.css';

const loading = () => {
  return (
    <div className={main__style.loading_panel__container}>
      <p>Incarcam mapa</p>
      <div className={main__style.loading__map}>
        <div className={main__style.map}>
          <img src="/map.png" alt="map" />
        </div>
        <div className={main__style.loader__container}>
          <div className={main__style['loading-spinner']}>
            <div className={main__style['loading']}>
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
};

export default loading;
