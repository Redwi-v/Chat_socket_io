import Form from './Form/Form';
import style from './loginPage.module.scss';
import RightSide from './RightSide/RightSide';
import { Navigate } from 'react-router-dom';

const LoginPage = ({ login, userData }) => {
  const SendForm = (form) => {
    const userData = {
      roomId: form.roomId,
      userName: form.userName,
    };
    login(userData);
  };

  if (userData.isAuth) {
    return <Navigate to={`/rooms/${userData.roomId}`} />;
  }

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
