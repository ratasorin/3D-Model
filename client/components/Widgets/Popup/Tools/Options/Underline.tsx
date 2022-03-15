import { toggleStyle } from 'lib/edit-text';

const Underline = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('UNDERLINE');
      }}
    >
      UNDERLINE
    </button>
  );
};

export default Underline;
