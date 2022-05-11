import { Buildings } from '../assets/buildings';

export const MONUMENTS_QUERY = Object.entries(Buildings).reduce(
  (prev, [, value], index, buildings) =>
    index === buildings.length - 1
      ? prev + `osm_id = ${value.osm_id}`
      : prev + `osm_id = ${value.osm_id} OR `,
  ''
);
