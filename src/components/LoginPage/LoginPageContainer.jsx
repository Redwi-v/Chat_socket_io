import LoginPage from './LoginPage';
import { useParams } from 'react-router-dom';

const LoginPageContainer = (props) => {
  return <LoginPage {...props} />;
};

export default LoginPageContainer;
