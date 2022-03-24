import { Buildings } from './buildings';

const FIELD_CRITERIA = 'osm_id';

const createSymbol = (heading: number, href: string, height: number) => {
  return {
    type: 'point-3d',
    symbolLayers: [
      {
        type: 'object',
        height,
        heading,
        resource: {
          href,
        },
      },
    ],
  };
};

const renderer = {
  type: 'unique-value', // autocasts as new UniqueValueRenderer()
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

export default renderer;
