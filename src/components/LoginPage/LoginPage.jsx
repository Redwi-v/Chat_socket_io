import rooms from '../../API/rooms';
import Form from './Form/Form';
import style from './loginPage.module.scss';
import RightSide from './RightSide/RightSide';

const LoginPage = ({ login }) => {
  const SendForm = (form) => {
    const userData = {
      roomId: +form.roomId,
      userName: form.userName,
    };
    login(userData);
  };

  return (
    <div className="container">
      <div className={style.login}>
        <Form sendForm={SendForm} />
        <RightSide />
      </div>
    </div>
  );
};

export default LoginPage;
