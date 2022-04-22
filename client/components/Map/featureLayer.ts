import renderer from './renderer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Circle from '@arcgis/core/geometry/Circle';
const featureLayer = new FeatureLayer({
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  labelsVisible: false,
  opacity: 1,
  definitionExpression: 'osm_id = 152474227 OR osm_id = 194450516',
  renderer: renderer as unknown as undefined,
});

const query = featureLayer.createQuery();
query.where = 'osm_id = 152474227 OR osm_id = 194450516';
query.returnGeometry = true;

export const chruches = featureLayer.queryFeatures(query).then((response) => {
  return response.features.map((church) => {
    return {
      name: church.attributes.name as string,
      lat: (church.geometry as Circle).centroid.latitude,
      long: (church.geometry as Circle).centroid.longitude,
    };
  });
});

export default featureLayer;
