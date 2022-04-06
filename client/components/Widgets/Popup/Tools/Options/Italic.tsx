import { toggleStyle } from 'lib/edit-text';
import option__style from './_option.module.css';

const Italic = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('ITALIC');
      }}
      className={option__style.button}
    >
      <i>I</i>
    </button>
  );
};

export default Italic;
