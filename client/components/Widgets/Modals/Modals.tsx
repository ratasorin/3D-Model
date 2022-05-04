import { FC } from 'react';
import modal__style from './modal.module.css';
import { IoIosClose } from 'react-icons/io';
import { closeModal } from 'store/widgets/actions/modals-actions';
import type { supportedModals } from 'store/widgets/widgets-available';
import { indexOf } from 'store/widgets/widgets-actions';
interface ModalComponents {
  modal: supportedModals;
  header: {
    title: JSX.Element | string;
    subtitle: JSX.Element | string;
  };
  useMaxHeight?: boolean;
}
const ModalTemplate: FC<ModalComponents> = ({
  children,
  modal,
  header,
  useMaxHeight,
}) => {
  const zIndex = indexOf(modal);

  return (
    <div
      className={modal__style.modal__container}
      style={{
        zIndex,
      }}
    >
      <div
        className={`${modal__style.container} ${
          useMaxHeight ? modal__style.max__height : modal__style.regular__height
        }`}
      >
        <div className={modal__style.navigation}>
          <div className={modal__style.header}>
            <div className={modal__style.header__container}>
              <div className={modal__style.title}>{header.title}</div>
            </div>
            <div className={modal__style.close}>
              <IoIosClose
                className={modal__style.closeIcon}
                onClick={() => {
                  closeModal(modal);
                }}
              />
            </div>
          </div>
          <div className={modal__style.subtitle}>{header.subtitle}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
