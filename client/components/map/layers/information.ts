import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { pinsRenderer } from '../render/pins';
import { BUILDINGS_QUERY } from '../utils/build-query';
import { createInfoLabel } from '../render/info-label';

export const informationLayer = new FeatureLayer({
  id: 'information',
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  definitionExpression: BUILDINGS_QUERY,
  elevationInfo: {
    mode: 'relative-to-scene',
  },
  renderer: pinsRenderer(35, 5),
  labelsVisible: true,
  labelingInfo: [
    createInfoLabel({
      size: 24,
      family: 'monospace',
      style: 'italic',
    }),
  ],
});
