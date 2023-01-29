import { useEffect, useRef, useState } from 'react';
import type SceneView from '@arcgis/core/views/SceneView';
import { createScene } from './scene';
import {
  churchPinMediaQueries,
  infoLabelMediaQueries,
  updateElementSize,
} from './utils/responsive';
import { useWindowSize } from '../../hooks/useWindowSize';
import '@arcgis/core/assets/esri/css/main.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<SceneView>();
  const { width } = useWindowSize();

  useEffect(() => {
    if (mapContainer.current && !scene) {
      const scene = createScene(mapContainer.current);
      setScene(scene);
    }
  }, [scene]);

  useEffect(() => {
    if (!width || !scene) return;

    const size = updateElementSize(width);
    scene.map.layers.forEach((layer) => {
      if (layer.id === 'PINS') {
        layer.set('labelingInfo', infoLabelMediaQueries[size]);
        layer.set('renderer', churchPinMediaQueries[size]);
      }
    });
  }, [width, scene]);

  return (
    <div style={{ position: 'absolute', height: '100vh', width: '100vw' }}>
      <div
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
        }}
        ref={mapContainer}
      />
    </div>
  );
};

export default Map;
