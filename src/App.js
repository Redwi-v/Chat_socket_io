import LoginPageContainer from './components/LoginPage/LoginPageContainer';
import { useReducer } from 'react';
import reducer from './reducer';
import ChatContainer from './components/Chat/ChatContainer';

import { Routes, Route, useParams } from 'react-router-dom';
import messages from './API/messages';
const myStorage = window.localStorage;

function App(props) {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: myStorage.getItem('isAuth') || false,
    roomId: myStorage.getItem('roomId') || null,
    userName: myStorage.getItem('userName') || null,
    socketId: '',
    conectedUsers: [],
    messages: [],
  });

  const setSocketId = (socketId) => {
    dispatch({
      type: 'SET_SOCKET_ID',
      socketId,
    });
  };

  const setConectedUsers = (payload) => {
    const action = {
      type: 'SET_USERS',
      payload,
    };

    dispatch(action);
  };

  const setMessages = (message) => {
    dispatch({
      type: 'SET_MESSAGES',
      payload: { messages: message },
    });
  };

  const getMessages = async () => {
    const { data } = await messages.getMessages(state.roomId);
    setMessages(data);
  };

  const login = async (userData) => {
    myStorage.setItem('userName', userData.userName);
    myStorage.setItem('roomId', userData.roomId);
    myStorage.setItem('isAuth', true);

    dispatch({
      type: 'AUTHENTICATION',
      payload: userData,
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LoginPageContainer login={login} userData={state} />}
        />
        <Route
          path={`/rooms/:id`}
          element={
            <ChatContainer
              userData={state}
              setConectedUsers={setConectedUsers}
              getMessages={getMessages}
              setMessages={setMessages}
              setSocketId={setSocketId}
            />
          }
        />
        <Route path="*" element={<LoginPageContainer login={login} />} />
      </Routes>
    </div>
  );
}

export default App;
