import { Buildings } from '../assets';
import PointSymbol3D from '@arcgis/core/symbols/PointSymbol3D';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';

const renderBuilding = (heading: number, href: string, height: number) => {
  return new PointSymbol3D({
    symbolLayers: [
      {
        type: 'object',
        anchor: 'origin',
        height,
        heading,
        resource: {
          href,
        },
      },
    ],
  });
};

export const buildingRenderer = new UniqueValueRenderer({
  defaultSymbol: renderBuilding(0, '/church.glb', 50),
  field: 'osm_id',
  uniqueValueInfos: Buildings.map((building) => ({
    label: building.name,
    symbol: renderBuilding(building.heading, building.href, building.height),
    value: building.osm_id,
  })),
});
