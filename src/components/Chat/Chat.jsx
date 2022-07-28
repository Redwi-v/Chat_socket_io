import { useEffect, useRef } from 'react';
import MessForm from '../MessForm/MessForm';
import style from './chat.module.scss';

const Chat = ({ conectedUsers, sendMessage, messages, socketId, roomId }) => {
  const chatList = useRef();

  const generateEmoji = () => {
    const emjies = [':)', ';)', ':O', '>_<', '$_$'];

    const min = Math.ceil(0);
    const max = Math.floor(emjies.length - 1);
    const index = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются

    return emjies[index];
  };

  const conectedUsersList =
    conectedUsers &&
    conectedUsers.map((user, index) => {
      return (
        <li key={index} className={style.user}>
          {`${user.name} ${generateEmoji()}`}
        </li>
      );
    });

  const renderedMassages = messages.map((message) => {
    return (
      <li
        key={message.id}
        className={`${style.massage} ${
          socketId === message.socketId && style.my_massage
        }`}
      >
        <div className={style.massage_data}>
          <span className={style.name}>{message.user}</span>
          <span className={style.time}>{message.time}</span>
        </div>
        <p className={style.massage_text}>{message.text}</p>
      </li>
    );
  });

  useEffect(() => {
    chatList.current.scrollTop = chatList.current.scrollHeight;
  }, [messages]);

  return (
    <div className={style.chat}>
      <aside className={style.aside}>
        <h1 className={style.roomId}>
          RoomId: <span>{roomId}</span>
        </h1>
        <h2 className={style.members}>
          Members: <span>{conectedUsers.length}</span>{' '}
        </h2>
        <ul className={style.contected_users}>{conectedUsersList}</ul>
      </aside>
      <div className={style.right_side}>
        <ul ref={chatList} className={style.massages}>
          {renderedMassages}
        </ul>
        <MessForm callBack={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
