import slugify from 'slugify';

const normalize = (s: string) => {
  return slugify(s, {
    lower: true,
    replacement: '_',
  });
};

export const normalizePath = (path: string) => normalize(path);
export default function normalizePaths(...paths: string[]) {
  return paths.map((s) => normalize(s));
}
