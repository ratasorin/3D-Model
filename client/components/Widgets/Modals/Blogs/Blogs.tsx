import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../Modals';
import blogs__styles from './blogs.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { useRouter } from 'next/router';
import Filter from './Filter/Filter';
import dynamic from 'next/dynamic';
const Card = dynamic(() => import('./Card/Card'));

const Blogs = () => {
  const router = useRouter();
  const { name, visible } = selectFrom<{ name: string }>('blogs-modal');
  return visible ? (
    <ModalTemplate
      header={{
        subtitle: 'Arhiva culturala',
        title: name,
      }}
      modalToClose="blogs-modal"
    >
      <div className={blogs__styles.container}>
        <div className={blogs__styles.options__container}>
          <Filter></Filter>
          <Dispatch
            action={() => {
              console.log('ACTION');
              router.push(`/create-blog/${name}`);
            }}
            payload="Scrie o postare"
          ></Dispatch>
        </div>
        <Card golden={true}></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Blogs;
