import landing__style from './index.module.css';
import Link from 'next/link';

const Index = () => {
  return (
    <div className={landing__style.container}>
      <Link href="/map">MAP</Link>
    </div>
  );
};

export default Index;
