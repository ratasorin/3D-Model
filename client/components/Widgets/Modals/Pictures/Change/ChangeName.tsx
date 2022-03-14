import { useState } from 'react';
import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../../Modals';

export interface pathToFile {
  church: string;
  oldFilename: string;
  newFilename: string;
}

const ChangeName = () => {
  const [newFilename, setNewFilename] = useState('');
  const { visible, oldFilename, name } = selectFrom<{
    oldFilename: string;
    name: string;
  }>('picture-change-name-modal');

  return visible ? (
    <ModalTemplate
      header={{
        title: `Schimbati denumirea fisierului ${oldFilename}`,
        subtitle:
          'Acest fisier exista deja in baza noastra de date. Verificati continutul pentru a evita duplicarile, si incercati sa schimbati denumirea fisierului',
      }}
      modal="picture-change-name-modal"
    >
      <input
        type="text"
        placeholder={oldFilename}
        onChange={(e) => {
          setNewFilename(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          fetch(`/api/images/change/${oldFilename}`, {
            method: 'POST',
            body: JSON.stringify({
              newFilename,
              church: name,
              oldFilename,
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
