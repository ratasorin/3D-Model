import { monumentRenderer } from '../render/monument';
import Circle from '@arcgis/core/geometry/Circle';
import Graphic from '@arcgis/core/Graphic';
import { ChurchInfo, ServerResponse } from 'types/server';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

export const monumentsLayer = new FeatureLayer({
  id: 'MONUMENTS',
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  labelsVisible: false,
  opacity: 1,
  definitionExpression: 'osm_id = 152474227 OR osm_id = 194450516',
  renderer: monumentRenderer as unknown as undefined,
  popupTemplate: {
    title: '{NAME}',
    content: async (e: { graphic: Graphic }) => {
      const monument = e.graphic.attributes.name as string;
      console.log(monument);
      return fetch(`/api/church-info/${monument}`).then(async (r) => {
        const response = (await r.json()) as ServerResponse<ChurchInfo>;
        console.log('THE RESPONSE FROM THE POPUP IS:', response);
        if (response.error) {
          openPopup('success-popup', {
            payload: response.payload,
            type: 'Error',
          } as PopupBuilder);
          return '';
        } else return `<p>${response.payload?.churchDescription}</p>`;
      });
    },
  },
});

const query = monumentsLayer.createQuery();
query.where = 'osm_id = 152474227 OR osm_id = 194450516';
query.returnGeometry = true;

export const monuments = monumentsLayer
  .queryFeatures(query)
  .then((response) => {
    return response.features.map((church) => {
      return {
        name: church.attributes.name as string,
        lat: (church.geometry as Circle).centroid.latitude,
        long: (church.geometry as Circle).centroid.longitude,
      };
    });
  });
