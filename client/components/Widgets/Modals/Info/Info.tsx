import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import { openModal, selectFrom } from 'store/widgets/actions/modals-actions';
import { useGetChurchInfoQuery } from 'store/redux-caching/church-info-cache';
import Dispatch from '../../Button/Dispatch/Dispatch';
import { ChurchInfoSuccessResponse } from 'pages/api/church-info/[church]';
import { PopupBuilder } from 'store/widgets/widgets-actions';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { useEffect, useState } from 'react';
import { ChurchInfo } from '@prisma/client';

const useData = (name: string) => {
  const data = useGetChurchInfoQuery(name).currentData;
  const [info, setInfo] = useState<ChurchInfoSuccessResponse>();
  useEffect(() => {
    if (data?.error) {
      openPopup('success-popup', {
        payload: data.message,
        type: 'Error',
      } as PopupBuilder);
    } else setInfo(data);
  }, [data?.error]);

  return info;
};

const Info = () => {
  const { name, visible } = selectFrom<{ name: string }>('info-modal');
  const openModifyModal = () => {
    openModal('modify-modal', {
      name: name,
    });
  };

  const info = useData(name);

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
          {info?.churchInfo?.churchDescription}
        </div>
        <div className={info__style.button__wrapper}>
          <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;
