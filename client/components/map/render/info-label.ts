import LabelClass from '@arcgis/core/layers/support/LabelClass';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';

interface Font {
  size: number;
  family: string;
  style: 'italic' | 'normal' | 'oblique';
}

export const createInfoLabel = (font: Font) => {
  const infoLabel = new LabelClass({
    labelExpressionInfo: {
      expression: '$feature.name',
    },
    symbol: new TextSymbol({
      color: 'black',
      haloColor: 'white',
      haloSize: 4,
      lineWidth: 180,
      font,
    }),
  });

  return infoLabel;
};
