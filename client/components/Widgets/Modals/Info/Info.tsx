import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import Button from '../../Button/Button';
import { modalActions } from 'store';
const Info = () => {
  const isVisible = useAppSelector(({ infoModal }) => infoModal);
  const dispatch = useAppDispatch();
  const action: typeof modalActions = 'info-modal/close';
  const closeInfo = () => {
    dispatch({
      type: action,
    });
  };
  const openModifyModal = () => {
    dispatch(close());
    dispatch(open());
  };
  return isVisible ? (
    <ModalTemplate
      actions={{
        dispatch: closeInfo,
      }}
      header={{
        title: 'Biserica Catolica din Elisabetin',
        subtitle: 'Aflati mai multe informatii despre biserica Catolica',
      }}
    >
      <div className={info__style.container}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          esse. Ab dolorem nam recusandae quaerat tempore sapiente rerum.
          Quaerat, rerum perspiciatis aut dicta distinctio quis dolore sunt
          eligendi possimus impedit. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Et, ut enim neque animi veniam alias iste vero
          maxime, excepturi aspernatur esse sunt blanditiis at ad ea, quidem
          numquam porro praesentium. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Porro illum ducimus odit iure ex cumque, nulla dicta
          quo beatae deleniti eligendi, quia doloremque esse! Vel voluptatibus
          dolores laborum eius reiciendis! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Illo quis perspiciatis dolorum quae,
          eius officiis deserunt molestias esse repellendus! Necessitatibus ut
          saepe incidunt. Ea reiciendis ex, eaque tempora doloribus quam. Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Officiis, esse. Ab
          dolorem nam recusandae quaerat tempore sapiente rerum. Quaerat, rerum
          perspiciatis aut dicta distinctio quis dolore sunt eligendi possimus
          impedit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et,
          ut enim neque animi veniam alias iste vero maxime, excepturi
          aspernatur esse sunt blanditiis at ad ea, quidem numquam porro
          praesentium. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Porro illum ducimus odit iure ex cumque, nulla dicta quo beatae
          deleniti eligendi, quia doloremque esse! Vel voluptatibus dolores
          laborum eius reiciendis! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Illo quis perspiciatis dolorum quae, eius officiis
          deserunt molestias esse repellendus! Necessitatibus ut saepe incidunt.
          Ea reiciendis ex, eaque tempora doloribus quam. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Officiis, esse. Ab dolorem nam
          recusandae quaerat tempore sapiente rerum. Quaerat, rerum perspiciatis
          aut dicta distinctio quis dolore sunt eligendi possimus impedit.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, ut enim
          neque animi veniam alias iste vero maxime, excepturi aspernatur esse
          sunt blanditiis at ad ea, quidem numquam porro praesentium. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Porro illum
          ducimus odit iure ex cumque, nulla dicta quo beatae deleniti eligendi,
          quia doloremque esse! Vel voluptatibus dolores laborum eius
          reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illo quis perspiciatis dolorum quae, eius officiis deserunt molestias
          esse repellendus! Necessitatibus ut saepe incidunt. Ea reiciendis ex,
          eaque tempora doloribus quam.
        </p>
        <div className={info__style.button__wrapper}>
          <Button payload="Sugerati o modificare" action={openModifyModal} />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;
