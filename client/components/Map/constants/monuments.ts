import { Buildings } from '../assets/buildings';

export const MONUMENTS_QUERY = Object.entries(Buildings)
  .map((b) => {
    console.log(b);
    return b;
  })
  .reduce(
    (prev, [_, value], index, buildings) =>
      index === buildings.length - 1
        ? prev + `osm_id = ${value.osm_id}`
        : prev + `osm_id = ${value.osm_id} OR `,
    ''
  );

console.log(MONUMENTS_QUERY);
