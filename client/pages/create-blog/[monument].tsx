import { useRouter } from 'next/router';
import Header from 'components/Blog-Creator/Header/Header';
import monument_creator__style from './monument-creator.module.css';
import dynamic from 'next/dynamic';
import SimplePopup from 'components/Widgets/Popup/Simple/Simple';

const Forms = dynamic(() => import('components/Blog-Creator/Forms/Forms'), {
  ssr: false,
});
const Monument = () => {
  const router = useRouter();
  const monument = (router.query.monument as string) || '';
  console.log(monument);
  return (
    <div className={monument_creator__style.fullpage}>
      <SimplePopup />
      <Header monument={monument} />
      <Forms />
    </div>
  );
};

export default Monument;
