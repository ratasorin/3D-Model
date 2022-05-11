import landing__style from './index.module.css';
import Link from 'next/link';
import { normalizePath } from 'utils/normalize-path';
import Image from 'next/image';
const sections = ['HARTA', 'CERC DE LECTURA', 'GALERIE'] as const;

const Index = () => {
  return (
    <div className={landing__style.container}>
      {sections.map((section) => (
        <div key={section} className={landing__style.section}>
          <Link href={`${normalizePath(section.toLowerCase())}`}>
            <a className={landing__style.section__a}>{section}</a>
          </Link>
          <Image
            src={`/${normalizePath(section.toLowerCase())}.jpg`}
            className={landing__style.image}
            blurDataURL={`/${normalizePath(section.toLowerCase())}.jpg`}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
        </div>
      ))}
    </div>
  );
};

export default Index;
