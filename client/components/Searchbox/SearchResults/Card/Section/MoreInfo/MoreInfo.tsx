import React, { FC } from 'react';
import Section from '../Section';
import more_info_style from './moreinfo.module.css';
import { TiInfoLarge } from 'react-icons/ti';
import { openModal } from 'store/widgets/actions/modals-actions';

const MoreInfo: FC<{ name: string }> = ({ name }) => {
  return (
    <Section
      iconContent={{
        element: <TiInfoLarge />,
        size: 'small',
      }}
      isNavigable={true}
      mainContent={{
        element: (
          <>
            Aflati mai multe informatii despre
            <span className={more_info_style.church__name__info}>{name}</span>
          </>
        ),
        position: 'last',
        iconAlign: 'center',
        sideEffects: () => {
          openModal('info-modal', {
            name,
          });
        },
      }}
    />
  );
};

export default MoreInfo;
