import { useAppSelector } from 'hooks/redux-hooks';
import { church$ } from 'lib/modal';
import { useEffect, useState } from 'react';
import { selectFrom } from 'store/widgets/actions/modals-actions';
import { indexOf } from 'store/widgets/widgets-actions';
import ModalTemplate from '../../Modals';

export interface pathToFile {
  church: string;
  oldFilename: string;
  newFilename: string;
}

const ChangeName = () => {
  const zIndex = indexOf('picture-change-name-modal');
  const [newFilename, setNewFilename] = useState('');
  const [church, setChurch] = useState('');
  const { visible, payload } = selectFrom<{ oldFilename: string }>(
    'picture-change-name-modal'
  );
  useEffect(() => {
    church$.subscribe(setChurch);
  });
  return visible ? (
    <ModalTemplate
      header={{
        title: `Schimbati denumirea fisierului ${payload.oldFilename}`,
        subtitle:
          'Acest fisier exista deja in baza noastra de date. Verificati continutul pentru a evita duplicarile, si incercati sa schimbati denumirea fisierului',
      }}
      modalToClose={'picture-change-name-modal'}
      zIndex={zIndex}
    >
      <input
        type="text"
        placeholder={payload.oldFilename}
        onChange={(e) => {
          setNewFilename(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          fetch(`/api/images/change/${payload.oldFilename}`, {
            method: 'POST',
            body: JSON.stringify({
              newFilename,
              church,
              oldFilename: payload.oldFilename,
            } as pathToFile),
          });
        }}
      >
        TRIMITE
      </button>
    </ModalTemplate>
  ) : null;
};

export default ChangeName;
