import { toggleStyle } from 'lib/edit-text';

const Quotes = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('QUOTE');
      }}
    >
      QUOTES
    </button>
  );
};

export default Quotes;
