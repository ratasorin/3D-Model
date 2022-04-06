import form__style from './forms.module.css';
import Content from './Editor/Editor';
import Picker from './Editor/Media/Upload/Picker/Picker';
import Title from './Title/Title';

const Forms = () => {
  return (
    <div className={form__style.container__flip}>
      <div className={form__style.container__normalize}>
        <Title></Title>
        <Picker></Picker>
        <Content></Content>
      </div>
    </div>
  );
};

export default Forms;
