import style from "../loginPage.module.scss";

import React, { memo, useCallback, useState } from "react";
import Input from "../../../commons/Input/Input";

const Form = ({ sendForm }) => {
  const [form, setForm] = useState({
    roomName: "",
    roomPassword: "",
  });
  const changeRoomNameValue = (e) => {
    setForm({ ...form, roomName: e.target.value });
  };

  const changeroomPasswordValue = (e) => {
    setForm({ ...form, roomPassword: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    sendForm(form);
  };

  return (
    <form className={style.form} onSubmit={submitForm}>
      <div className={style.input_wraper}>
        <Input
          type="text"
          placeholder="Room ID"
          value={form.roomName}
          onChange={changeRoomNameValue}
        />
      </div>
      <div className={style.input_wraper}>
        <Input
          type="text"
          placeholder="Your name"
          value={form.roomPassword}
          onChange={changeroomPasswordValue}
        />
      </div>

      <button className={style.send_button}>send</button>
    </form>
  );
};

export default Form;
