import Map from '@arcgis/core/Map';
import config from '@arcgis/core/config';
import { monumentsLayer } from './featureLayers/monuments';
import { pinsLayer } from './featureLayers/pins';
config.apiKey =
  'AAPK3e35c62c997345d6a290368f12ee84125aRTVkpYaDREUO_2X3uYcuIoyNyhyfiFRHE05ISNorYGrNWPcteZM7LTF0LFtZuX';
export default new Map({
  basemap: 'arcgis-navigation',
  layers: [monumentsLayer, pinsLayer],
});
