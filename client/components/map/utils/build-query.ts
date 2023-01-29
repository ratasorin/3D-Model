import { Buildings } from '../assets';

export const BUILDINGS_QUERY = Buildings.reduce(
  (prev, { osm_id }, index, buildings) =>
    index === buildings.length - 1
      ? prev + `osm_id = ${osm_id}`
      : prev + `osm_id = ${osm_id} OR `,
  ''
);
