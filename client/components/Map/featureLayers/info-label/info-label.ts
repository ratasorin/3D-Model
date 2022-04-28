import LabelClass from '@arcgis/core/layers/support/LabelClass';

interface Font {
  size?: number;
  family?: string;
  style?: string;
}

export const createInfoLabel = (font: Font, haloSize?: number) => {
  return [
    {
      labelExpressionInfo: {
        expression: '$feature.NAME',
      },
      labelPlacement: 'above-after',
      symbol: {
        type: 'text',
        color: 'black',
        haloSize: haloSize || 2,
        haloColor: 'white',
        backgroundColor: 'white',
        lineWidth: '180px',
        font: {
          size: font.size || 20,
          family: font.family || 'monospace',
          style: font.style || 'italic',
        },
      },
    } as any as LabelClass,
  ];
};
