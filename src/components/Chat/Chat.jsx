import { useEffect, useRef } from 'react';
import style from './chat.module.scss';

const Chat = ({ conectedUsers }) => {
  const textareaRef = useRef({});

  function adjustHeight(e) {
    e.target.style.height = e.target.scrollTop + 60 + 'px';
  }

  const conectedUsersList =
    conectedUsers &&
    conectedUsers.map((user, index) => {
      return (
        <li key={index} className={style.user}>
          {user.name}
        </li>
      );
    });

  return (
    <div className={style.chat}>
      <aside className={style.aside}>
        <ul className={style.contected_users}>{conectedUsersList}</ul>
      </aside>
      <div className={style.right_side}>
        <ul className={style.massages}>
          <li className={style.massage}>
            <div className={style.massage_data}>
              <span className={style.name}>Dima</span>
              <span className={style.time}>12:22</span>
            </div>
            <p className={style.massage_text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              veritatis tempore asperiores quisquam quae dolor delectus deserunt
              ipsum officiis! Consequatur placeat totam adipisci natus inventore
              quasi fuga modi corrupti et!
            </p>
          </li>
          <li className={`${style.massage} ${style.my_massage}`}>
            <div className={style.massage_data}>
              <span className={style.name}>Dima</span>
              <span className={style.time}>12:22</span>
            </div>
            <p className={style.massage_text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              veritatis tempore asperiores quisquam quae dolor delectus deserunt
              ipsum officiis! Consequatur placeat totam adipisci natus inventore
              quasi fuga modi corrupti et!
            </p>
          </li>
        </ul>

        <form className={style.massage_form}>
          <textarea
            ref={textareaRef}
            onKeyUp={adjustHeight}
            className={style.textarea}
          ></textarea>
        </form>
      </div>
    </div>
  );
};

export default Chat;
