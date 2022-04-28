import { Buildings, Monuments } from '../assets/buildings';
import { FIELD_CRITERIA } from '../constants/constants';

const createSymbol = (
  heading: number,
  href: string,
  height: number,
  z = -0.5
) => {
  return {
    type: 'point-3d',
    symbolLayers: [
      {
        type: 'object',
        height,
        anchor: 'relative',
        anchorPosition: {
          x: 0,
          y: 0,
          z,
        },
        heading,
        resource: {
          href,
        },
      },
    ],
  };
};

const createUniqueValueInfos = (monument: Monuments) => ({
  value: Buildings[monument].osm_id,
  symbol: createSymbol(
    Buildings[monument].heading,
    Buildings[monument].href,
    Buildings[monument].height
  ),
});

export const monumentRenderer = {
  type: 'unique-value',
  // the default symbol indicates all other building types
  defaultSymbol: createSymbol(0, '/catedrala.gltf', 50),
  // match symbols to unique values here
  field: FIELD_CRITERIA,
  uniqueValueInfos: Object.entries(Buildings).map(([building]) =>
    createUniqueValueInfos(building as Monuments)
  ),
};
