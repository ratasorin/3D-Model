export interface Building {
  osm_id: string;
  heading: number;
  href: '/church-d.glb';
  height: number;
}

export type Monuments =
  | 'Biserica Romano-Catolică din Elisabetin'
  | 'Catedrala Mitropolitană Ortodoxă'
  | 'Biserica Adormirea Maicii Domnului';

export const Buildings: Record<Monuments, Building> = {
  'Biserica Romano-Catolică din Elisabetin': {
    osm_id: '152474227',
    heading: 45,
    href: '/church-d.glb',
    height: 90,
  },
  'Catedrala Mitropolitană Ortodoxă': {
    osm_id: '194450516',
    heading: 135,
    href: '/church-d.glb',
    height: 150,
  },
  'Biserica Adormirea Maicii Domnului': {
    heading: 100,
    height: 90,
    href: '/church-d.glb',
    osm_id: '418821198',
  },
};
