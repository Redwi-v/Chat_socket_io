import style from './sendButton.module.scss';

import sendHoverIcon from '../../assets/icons/sendHover.png';
import sendIcon from '../../assets/icons/send.png';

const SendButton = ({ sendCallBack }) => {
  return (
    <button type="submit" className={style.button}>
      <div className={style.icons}>
        <img
          className={`${style.icon} ${style.hover}`}
          src={sendHoverIcon}
          alt=""
        />
        <img className={style.icon} src={sendIcon} alt="" />
      </div>
    </button>
  );
};

export default SendButton;
