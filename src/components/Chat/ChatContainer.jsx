import Chat from './Chat';
import { useEffect } from 'react';
import socket from '../../API/socket';
import { Navigate, useParams } from 'react-router-dom';

const ChatContainer = (props) => {
  const { setConectedUsers, userData, getMessages, setMessages, setSocketId } =
    props;
  const { userName, roomId, conectedUsers, messages, socketId } = userData;

  const params = useParams();
  if (params.id) {
    window.localStorage.setItem('roomId', params.id);
  }

  const sendMessage = (messageText) => {
    const message = {
      user: userName,
      text: messageText,
    };

    socket.emit('Room:newMessage', { message: message, roomId });
  };

  const conectedNewUser = {
    userName,
    roomId,
  };

  useEffect(() => {
    if (userName && roomId) {
      socket.emit('Room:join', conectedNewUser, (response) => {
        setSocketId(response.socketId);
        getMessages();
      });
      socket.on('Room:newMessage', (message) => {
        setMessages(message);
      });
      socket.on('Room:movement', (users) => {
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
    />
  );
};

export default ChatContainer;
