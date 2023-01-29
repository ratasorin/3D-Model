import { createInfoLabel } from '../render/info-label';
import { pinsRenderer } from '../render/pins';

export const churchPinMediaQueries = {
  sm: pinsRenderer(20, 3),
  md: pinsRenderer(30, 4),
  lg: pinsRenderer(35, 5),
  xl: pinsRenderer(35, 5),
} as const;

export const infoLabelMediaQueries = {
  sm: createInfoLabel({
    size: 12,
    family: 'monospace',
    style: 'italic',
  }),
  md: createInfoLabel({
    size: 16,
    family: 'monospace',
    style: 'italic',
  }),
  lg: createInfoLabel({
    size: 20,
    family: 'monospace',
    style: 'italic',
  }),
  xl: createInfoLabel({
    size: 24,
    family: 'monospace',
    style: 'italic',
  }),
} as const;

type Breakpoints = 'sm' | 'md' | 'lg' | 'xl';

export const updateElementSize = (width: number): Breakpoints => {
  if (width < 600) return 'sm';
  if (width >= 600 && width < 800) return 'md';
  if (width >= 800 && width <= 1000) return 'lg';

  return 'xl';
};
