import { Buildings } from '../assets/buildings';

const FIELD_CRITERIA = 'osm_id';
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

export const monumentRenderer = {
  type: 'unique-value',
  // the default symbol indicates all other building types
  defaultSymbol: createSymbol(0, '/catedrala.gltf', 50),
  // match symbols to unique values here
  field: FIELD_CRITERIA,
  uniqueValueInfos: [
    {
      value: Buildings['Biserica Romano-Catolică din Elisabetin'].osm_id,
      symbol: createSymbol(
        Buildings['Biserica Romano-Catolică din Elisabetin'].heading,
        Buildings['Biserica Romano-Catolică din Elisabetin'].href,
        Buildings['Biserica Romano-Catolică din Elisabetin'].height
      ),
    },

    {
      value: Buildings['Catedrala Mitropolitană Ortodoxă'].osm_id,
      symbol: createSymbol(
        Buildings['Catedrala Mitropolitană Ortodoxă'].heading,
        Buildings['Catedrala Mitropolitană Ortodoxă'].href,
        Buildings['Catedrala Mitropolitană Ortodoxă'].height
      ),
    },
  ],
};
