import LoginPageContainer from './components/LoginPage/LoginPageContainer';
import socket from './API/socket';
import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import ChatContainer from './components/Chat/ChatContainer';
import rooms from './API/rooms';

function App(props) {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    conectedUsers: [],
  });

  const setConectedUsers = (payload) => {
    return {
      type: 'SET_USERS',
      payload,
    };
  };

  const login = async (userData) => {
    socket.emit('Room:join', userData);
    // rooms.enter(userData);
    dispatch({
      type: 'AUTHENTICATION',
      payload: userData,
    });
    // dispatch(setConectedUsers({ conectedUsers }));
  };

  useEffect(() => {
    console.log('movment');
    socket.on('Room:movement', (users) => {
      console.log('movment in call');

      dispatch(setConectedUsers({ conectedUsers: users }));
    });
  }, []);
  console.log(state);

  return (
    <div className="App">
      {state.isAuth ? (
        <ChatContainer conectedUsers={state.conectedUsers} />
      ) : (
        <LoginPageContainer login={login} />
      )}
    </div>
  );
}

export default App;
