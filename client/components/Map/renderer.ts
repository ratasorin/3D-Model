import { Buildings } from './buildings';

const FIELD_CRITERIA = 'osm_id';

const createSymbol = (heading: number) => {
  return {
    type: 'point-3d',
    symbolLayers: [
      {
        type: 'object',
        height: 50,
        heading: heading,
        resource: {
          href: '/church.glb',
        },
      },
    ],
  };
};

const renderer = {
  type: 'unique-value', // autocasts as new UniqueValueRenderer()
  // the default symbol indicates all other building types
  defaultSymbol: createSymbol(0),
  // match symbols to unique values here
  field: FIELD_CRITERIA,
  uniqueValueInfos: [
    {
      value: Buildings['Biserica Romano-Catolică din Elisabetin'].osm_id,
      symbol: createSymbol(
        Buildings['Biserica Romano-Catolică din Elisabetin'].heading
      ),
    },

    {
      value: Buildings['Catedrala Mitropolitană Ortodoxă'].osm_id,
      symbol: createSymbol(
        Buildings['Catedrala Mitropolitană Ortodoxă'].heading
      ),
    },
  ],
};

export default renderer;
