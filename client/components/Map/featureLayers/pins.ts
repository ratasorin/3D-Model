import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { pinsRendererBreakpoints } from '../breakpoints/breakpoints';
import { MONUMENTS_QUERY } from '../constants/monuments';
import { createInfoLabel } from './info-label/info-label';

export const pinsLayer = new FeatureLayer({
  id: 'PINS',
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  definitionExpression: MONUMENTS_QUERY,
  elevationInfo: {
    // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
    mode: 'relative-to-scene',
  },
  renderer: pinsRendererBreakpoints['default'] as any,
  labelsVisible: true,
  labelingInfo: createInfoLabel({}),
});
