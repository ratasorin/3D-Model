import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import mapStyle from './Map.module.css';
import SceneView from '@arcgis/core/views/SceneView';
import '@arcgis/core/assets/esri/css/main.css';
import getView from './view';
import { tap } from 'rxjs';
import { Subject } from 'rxjs';
import Camera from '@arcgis/core/Camera';
export const coordinates = new Subject<[number, number]>();

const MapP: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SceneView>();
  useEffect(() => {
    if (divRef.current && !view) {
      const view = getView(divRef.current);
      setView(view);
    }

    coordinates
      .pipe(
        tap(([lat, long]) => {
          console.log(lat, long);
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
  return (
    <div className={mapStyle.container}>
      <div className={mapStyle.map} ref={divRef}></div>
    </div>
  );
};

export default MapP;
