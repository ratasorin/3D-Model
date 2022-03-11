import title__style from './title.module.css';

const Title = () => {
  return (
    <div className={title__style.container}>
      <input type="text" placeholder="TITLU" className={title__style.input} />
    </div>
  );
};

export default Title;
