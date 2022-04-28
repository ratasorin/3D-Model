export const MONUMENTS_QUERY = 'osm_id = 152474227 OR osm_id = 194450516';
export const PORTAL_ID = '3677599f43b9484aa01a0ee212beb410';
export const FIELD_CRITERIA = 'osm_id';
export const MEDIA_QUERIES = ['600', '800', '1000'] as const;
export type Breakpoints = typeof MEDIA_QUERIES[number] | 'default';
