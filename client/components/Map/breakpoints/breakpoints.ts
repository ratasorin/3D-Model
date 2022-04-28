import { Breakpoints } from '../constants/constants';
import { createInfoLabel } from '../featureLayers/info-label/info-label';
import { createPinsRenderer } from '../render/pin';

export const pinsRendererBreakpoints = {
  default: createPinsRenderer(),
  '600': createPinsRenderer(20, 3),
  '800': createPinsRenderer(30, 4),
  '1000': createPinsRenderer(35, 5),
} as Record<Breakpoints, unknown>;

export const infoLabelBreakpoints = {
  default: createInfoLabel({ size: 28 }),
  '600': createInfoLabel({ size: 12 }, 1.5),
  '800': createInfoLabel({ size: 16 }),
  '1000': createInfoLabel({ size: 20 }),
} as Record<Breakpoints, unknown>;
