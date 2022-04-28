import SceneView from '@arcgis/core/views/SceneView';
import Extent from '@arcgis/core/geometry/Extent';
import map from './basemap';
const clippingArea = new Extent({
  xmin: 21.201993,
  xmax: 21.258754,
  ymin: 45.720666,
  ymax: 45.777872,
});
const handler = (mapContainer: HTMLDivElement) =>
  new SceneView({
    clippingArea,
    viewingMode: 'local',
    map: map,
    container: mapContainer,
    center: {
      type: 'point',
      x: 21.226451243275225,
      z: 125,
      y: 45.74,
    },
    camera: {
      position: {
        x: 21.226451243275225,
        y: 45.74,
        z: 125,
      },
      heading: 0,
      tilt: 65,
    },
    environment: {
      background: {
        type: 'color',
        color: '#D4F5FF',
      },
      starsEnabled: false,
      atmosphereEnabled: false,
    },
  });
export default handler;
