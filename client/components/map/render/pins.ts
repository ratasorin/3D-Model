import PointSymbol3D from '@arcgis/core/symbols/PointSymbol3D';
import type { Building } from '../assets';
import { Buildings } from '../assets';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';

const CHURCH_ICON_URL =
  'https://developers.arcgis.com/javascript/latest/sample-code/visualization-point-styles/live/Church.png';

const OFFSET = {
  SCREEN_LENGTH: 50,
  MAX_WORLD_LENGTH: 135,
  MIN_WORLD_LENGTH: 75,
};

interface Customizations {
  iconUrl: string;
  color: string;
  size: number;
  lineWidth: number;
}

export const createPin = ({
  color,
  iconUrl,
  lineWidth,
  size,
}: Customizations) =>
  new PointSymbol3D({
    symbolLayers: [
      {
        type: 'icon',
        anchor: 'relative',
        anchorPosition: {
          x: 0,
          y: 1,
        },
        resource: {
          href: iconUrl,
        },
        size,
        outline: {
          color,
        },
      },
    ],

    verticalOffset: {
      maxWorldLength: OFFSET.MAX_WORLD_LENGTH,
      minWorldLength: OFFSET.MIN_WORLD_LENGTH,
      screenLength: OFFSET.SCREEN_LENGTH,
    },
    callout: {
      border: {
        color,
      },
      color: 'white',
      size: lineWidth,
      type: 'line',
    },
  });

const createUniquePinForBuilding = (
  building: Building,
  size: number,
  lineWidth: number
) => ({
  value: building.osm_id,
  symbol: createPin({
    iconUrl: CHURCH_ICON_URL,
    color: '#40C2B4',
    size,
    lineWidth,
  }),
});

/**
 * @param size The size of the icon
 * @param lineWidth The width of the line
 */
export const pinsRenderer = (size: number, lineWidth: number) => {
  return new UniqueValueRenderer({
    field: 'osm_id',
    uniqueValueInfos: Buildings.map((building) =>
      createUniquePinForBuilding(building, size, lineWidth)
    ),
  });
};
