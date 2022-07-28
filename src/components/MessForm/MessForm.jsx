import style from '../Chat/chat.module.scss';
import SendButton from '../../commons/SendButton/SendButton';
import { useState } from 'react';

const MessForm = ({ callBack }) => {
  const [message, setMessage] = useState('');

  function adjustHeight(e) {
    e.target.style.height = e.target.scrollTop + 60 + 'px';
  }

  const chageMessage = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    callBack(message);
    setMessage('');
  };

  return (
    <form onSubmit={submitMessage} className={style.massage_form}>
      <textarea
        onKeyUp={adjustHeight}
        className={style.textarea}
        value={message}
        onChange={chageMessage}
      ></textarea>
      <SendButton />
    </form>
  );
};

export default MessForm;
