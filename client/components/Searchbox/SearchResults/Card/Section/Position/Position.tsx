import React, { FC } from 'react';
import Section from '../Section';
import { HiLocationMarker } from 'react-icons/hi';
import position_style from './position.module.css';
import { coordinates } from 'components/Map/Map';
const Position: FC<{ x: number; y: number }> = ({ x, y }) => {
  return (
    <Section
      isNavigable={true}
      iconContent={{
        element: <HiLocationMarker />,
        size: 'small',
      }}
      mainContent={{
        sideEffects: () => {
          coordinates.next([x, y]);
        },
        element: (
          <>
            <div className={position_style.coordinates}>
              <div className={position_style.latLong}>{x}</div>
              <div className={position_style.latLong}>{y}</div>
            </div>
          </>
        ),
        iconAlign: 'center',
        position: 'middle',
      }}
    />
  );
};

export default Position;
