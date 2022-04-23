import slugify from 'slugify';

const normalize = (s: string) => {
  return slugify(s, {
    lower: true,
    replacement: '_',
  });
};

export default function normalizePaths(...paths: string[]) {
  return paths.map((s) => normalize(s));
}
