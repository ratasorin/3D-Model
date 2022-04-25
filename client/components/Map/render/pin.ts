import { Buildings } from '../assets/buildings';

const FIELD_CRITERIA = 'osm_id';

const verticalOffset = {
  screenLength: 100,
  maxWorldLength: 135,
  minWorldLength: 75,
};

interface Customizations {
  fontSource: string;
  color: string;
  size?: number;
  lineWidth?: number;
}

function getUniqueValueSymbol(customizations: Customizations) {
  return {
    type: 'point-3d',
    symbolLayers: [
      {
        type: 'icon',
        anchor: 'relative',
        anchorPosition: {
          x: 0,
          y: 1,
        },
        resource: {
          href: customizations.fontSource,
        },
        size: customizations.size || 35,
        outline: {
          color: customizations.color,
        },
      },
    ],

    verticalOffset: verticalOffset,
    callout: {
      border: {
        color: customizations.color,
      },
      color: 'white',
      size: customizations.lineWidth || 5,
      type: 'line',
    },
  };
}

const createPinsRenderer = (size?: number, lineWidth?: number) => {
  console.log('FROM CREATE PINS RENDERER THE SIZE IS:', size);
  return {
    type: 'unique-value',
    field: FIELD_CRITERIA,
    uniqueValueInfos: [
      {
        value: Buildings['Biserica Romano-Catolică din Elisabetin'].osm_id,
        symbol: getUniqueValueSymbol({
          fontSource:
            'https://developers.arcgis.com/javascript/latest/sample-code/visualization-point-styles/live/Church.png',
          color: '#40C2B4',
          size,
          lineWidth,
        }),
      },
      {
        value: Buildings['Catedrala Mitropolitană Ortodoxă'].osm_id,
        symbol: getUniqueValueSymbol({
          fontSource:
            'https://developers.arcgis.com/javascript/latest/sample-code/visualization-point-styles/live/Church.png',
          color: '#40C2B4',
          size,
          lineWidth,
        }),
      },
    ],
  };
};

export const pinsRendererBreakpoints = {
  default: createPinsRenderer(),
  '600': createPinsRenderer(20, 3),
};
