import form__style from './forms.module.css';
import Content from './Content/Content';
import Picker from './Media/Upload/Picker/Picker';
const Forms = () => {
  return (
    <div className={form__style.container}>
      <Picker></Picker>
      <Content></Content>
    </div>
  );
};

export default Forms;
