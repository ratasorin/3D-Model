import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import { openModal, selectFrom } from 'store/widgets/actions/modals-actions';
import { useGetChurchInfoQuery } from 'store/redux-caching/church-info-cache';
import Dispatch from '../../Button/Dispatch/Dispatch';
import type { ChurchInfo } from 'types/server';
import { PopupBuilder } from 'store/widgets/widgets-actions';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const useData = (name: string) => {
  const data = useGetChurchInfoQuery(name).currentData;
  const [info, setInfo] = useState<ChurchInfo | undefined | null>(undefined);
  useEffect(() => {
    if (data?.error) {
      openPopup('success-popup', {
        payload: data.payload,
        type: 'Error',
      } as PopupBuilder);
    } else setInfo(data?.payload);
  }, [data]);

  return info;
};

const openAuthenticationPanel = () => {
  openModal('authenticate-modal');
};

const Info = () => {
  const { name, visible } = selectFrom<{ name: string }>('info-modal');
  const openModifyModal = () => {
    openModal('modify-modal', {
      name: name,
    });
  };

  const info = useData(name);
  const user = useSession().data?.user;

  return visible ? (
    <ModalTemplate
      modal="info-modal"
      header={{
        title: name,
        subtitle: `Aflati mai multe informatii despre ${name}`,
      }}
    >
      <div className={info__style.container}>
        <div className={info__style.description}>
          {info?.churchDescription ||
            `Momentan nimeni nu a gasit o descriere buna pentru ${name}. Incercati dumneavoastra !`}
        </div>
        <div className={info__style.button__wrapper}>
          <div className={info__style.editor__container}>
            Editor:
            <p className={info__style.editor}>
              {info?.editedBy || 'Niciun autor'}
            </p>
          </div>
          {user ? (
            <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
          ) : (
            <Dispatch
              action={openAuthenticationPanel}
              payload="Autentifica-te"
            />
          )}
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;
