import { toggleStyle } from 'lib/edit-text';
import option__style from './_option.module.css';

const Underline = () => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleStyle('UNDERLINE');
      }}
      className={option__style.button}
    >
      <u>U</u>
    </button>
  );
};

export default Underline;
