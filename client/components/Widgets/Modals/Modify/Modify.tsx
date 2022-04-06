import modal from './modal.module.css';
import TypewriterComponent from 'typewriter-effect';
import Field from './Field/Field';
import { write } from './typewriter';
import ModalTemplate from '../Modals';
import { selectFrom } from 'store/widgets/actions/modals-actions';
const Modal = () => {
  const { name, visible } = selectFrom<{ name: string }>('modify-modal');

  const typewriter = (
    <TypewriterComponent
      onInit={write}
      options={{
        autoStart: true,
        cursorClassName: `${modal.cursor}`,
      }}
    />
  );

  return visible ? (
    <ModalTemplate
      modal="modify-modal"
      header={{
        title: typewriter,
        subtitle:
          'Pentru a imbunatatii calitatea informatiilor sugerati o modificare',
      }}
    >
      <Field name={name} id="description"></Field>
      <div className={modal.button__container}>
        <div className={modal.button__content}></div>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Modal;
