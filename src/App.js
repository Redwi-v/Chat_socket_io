
import { io } from 'socket.io-client';
import LoginPageContainer from './components/LoginPage/LoginPageContainer';

const socket = io('http://localhost:7777', {
  reconnectionDelayMax: 10000,
  auth: {
    token: '123',
  },
  query: {
    'my-key': 'my-value',
  },
});

function App(props) {
    return (
      <div className="App">
        <LoginPageContainer />
      </div>
    );
}

export default App;
