export interface Building {
  name: string;
  osm_id: string;
  heading: number;
  href: string;
  height: number;
}

export const Buildings: Building[] = [
  {
    name: 'Biserica Romano-Catolică din Elisabetin',
    osm_id: '152474227',
    heading: 45,
    href: '/church.glb',
    height: 90,
  },
  {
    name: 'Catedrala Mitropolitană Ortodoxă',
    osm_id: '194450516',
    heading: 135,
    href: '/church.glb',
    height: 150,
  },
  {
    name: 'Biserica Adormirea Maicii Domnului',
    heading: 100,
    height: 90,
    href: '/church.glb',
    osm_id: '418821198',
  },
];
