import { toggleStyle } from 'lib/edit-text';

const Italic = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('ITALIC');
      }}
    >
      ITALIC
    </button>
  );
};

export default Italic;
