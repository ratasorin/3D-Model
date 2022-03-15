import { toggleStyle } from 'lib/edit-text';

const Bold = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('BOLD');
      }}
    >
      BOLD
    </button>
  );
};

export default Bold;
