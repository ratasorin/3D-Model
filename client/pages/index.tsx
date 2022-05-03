import index__style from './index.module.css';
import Link from 'next/link';
import { normalizePath } from 'utils/normalize-path';
const sections = ['HARTA', 'CERC DE LECTURA', 'GALERIE'] as const;

const Index = () => {
  return (
    <div className={index__style.container}>
      {sections.map((section) => (
        <div
          key={section}
          className={index__style.section}
          style={{
            backgroundImage: `url("${normalizePath(
              section.toLowerCase()
            )}.jpg")`,
          }}
        >
          <Link href={`${normalizePath(section.toLowerCase())}`}>
            <a className={index__style.section__a}>{section}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Index;
