import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import mapStyle from './Map.module.css';
import SceneView from '@arcgis/core/views/SceneView';
import '@arcgis/core/assets/esri/css/main.css';
import getView from './view';
import { tap } from 'rxjs';
import { Subject } from 'rxjs';
import { useWindowSize } from 'hooks/useWindowSize';
import {
  infoLabelBreakpoints,
  pinsRendererBreakpoints,
} from './breakpoints/breakpoints';
import { MEDIA_QUERIES } from './constants/constants';
export const coordinates = new Subject<[number, number]>();

const MapP: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SceneView>();
  const { width } = useWindowSize();
  useEffect(() => {
    if (divRef.current && !view) {
      const view = getView(divRef.current);
      setView(view);
    }

    coordinates
      .pipe(
        tap(([lat, long]) => {
          view
            ?.goTo({
              center: [long, lat],
              zoom: 17,
              tilt: 0,
            })
            .then(() => {
              view?.goTo({
                tilt: 65,
              });
            });
        })
      )
      .subscribe();
  }, [divRef, view]);

  useEffect(() => {
    if (width) {
      const rawQuery = MEDIA_QUERIES.reduce((prev, curr) => {
        if (width > Number(curr)) return curr;
        if (width > Number(prev) && width < Number(curr)) return curr;
        else return prev;
      }, '600');
      const query = width > Number(rawQuery) ? 'default' : rawQuery;
      view?.map.layers.map((layer) => {
        if (layer.id === 'PINS') {
          layer.set('labelingInfo', infoLabelBreakpoints[query]);
          layer.set('renderer', pinsRendererBreakpoints[query]);
        }
      });
    }
  }, [width]);

  return (
    <div className={mapStyle.container}>
      <div className={mapStyle.map} ref={divRef}></div>
    </div>
  );
};

export default MapP;
