import Chat from './Chat';
import { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatContainer = (props) => {
  const socket = useRef();
  useEffect(() => {
    socket.current = io('https://my-chat112.herokuapp.com');
  }, []);

  const {
    setConectedUsers,
    userData,
    getMessages,
    setMessages,
    setSocketId,
    logout,
  } = props;
  const { userName, roomId, conectedUsers, messages, socketId } = userData;

  const params = useParams();
  if (params.id) {
    window.localStorage.setItem('roomId', params.id);
  }

  const sendMessage = (messageText) => {
    const message = {
      user: userName,
      text: messageText,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };

    socket.current.emit('Room:newMessage', { message: message, roomId });
  };

  const conectedNewUser = {
    userName,
    roomId,
  };

  useEffect(() => {
    if (userName && roomId) {
      socket.current.emit('Room:join', conectedNewUser, (response) => {
        setSocketId(response.socketId);
        getMessages();
      });
      socket.current.on('Room:newMessage', (message) => {
        setMessages(message);
      });
      socket.current.on('Room:movement', (users) => {
        setConectedUsers({ conectedUsers: users });
      });
    }
  }, []);

  if (!roomId || !userName) {
    return <Navigate to="/" />;
  }

  return (
    <Chat
      conectedUsers={conectedUsers}
      sendMessage={sendMessage}
      messages={messages}
      socketId={socketId}
      roomId={roomId}
      logout={logout}
    />
  );
};

export default ChatContainer;
