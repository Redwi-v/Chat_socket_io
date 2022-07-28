import style from '../loginPage.module.scss';

import React, { useState } from 'react';
import Input from '../../../commons/Input/Input';

const Form = ({ sendForm }) => {
  const [form, setForm] = useState({
    roomId: localStorage.getItem('roomId') || '',
    userName: '',
  });
  const [isLoading, setLoading] = useState(false);
  const changeRoomNameValue = (e) => {
    setForm({ ...form, roomId: e.target.value });
  };

  const changeuserNameValue = (e) => {
    setForm({ ...form, userName: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendForm(form);
    setLoading(false);
  };

  return (
    <form className={style.form} onSubmit={submitForm}>
      <div className={style.input_wraper}>
        <Input
          type="text"
          placeholder="Room ID"
          value={form.roomId}
          onChange={changeRoomNameValue}
        />
      </div>
      <div className={style.input_wraper}>
        <Input
          type="text"
          placeholder="Your name"
          value={form.userName}
          onChange={changeuserNameValue}
        />
      </div>

      <button className={style.send_button}>
        {isLoading ? 'enters...' : 'enter'}
      </button>
    </form>
  );
};

export default Form;
