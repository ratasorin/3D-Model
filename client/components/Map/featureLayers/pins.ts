import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { pinsRendererBreakpoints } from '../breakpoints/breakpoints';
import { createInfoLabel } from './info-label/info-label';

export const pinsLayer = new FeatureLayer({
  id: 'PINS',
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  definitionExpression: 'osm_id = 152474227 OR osm_id = 194450516',
  elevationInfo: {
    // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
    mode: 'relative-to-scene',
  },
  renderer: pinsRendererBreakpoints['default'] as any,
  labelsVisible: true,
  labelingInfo: createInfoLabel({}),
});
