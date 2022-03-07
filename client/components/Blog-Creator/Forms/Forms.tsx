import form__style from './forms.module.css';
import Content from './Content/Content';
import Upload from './Media/Upload/Uploader';
const Forms = () => {
  return (
    <div className={form__style.container}>
      <Upload />
      <Content></Content>
    </div>
  );
};

export default Forms;
