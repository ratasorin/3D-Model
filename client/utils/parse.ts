import slugify from 'slugify';

export default function parse(s: string) {
  return slugify(s, {
    lower: true,
    replacement: '_',
  });
}
