import style from "../loginPage.module.scss";
import { useEffect, useRef, useState } from "react";

const TypingTextAnimation = ({ messages = ["hi"], callBack }) => {
  const [currentText, sendCurrentText] = useState("");
  const [deley, setDeley] = useState(150);
  const index = useRef(0);
  const arrayIndex = useRef(0);

  useEffect(() => {
    setTimeout(() => {
      if (
        messages[arrayIndex.current] &&
        messages[arrayIndex.current][index.current]
      ) {
        setDeley(150);
        sendCurrentText(
          currentText + messages[arrayIndex.current][index.current]
        );
        index.current += 1;
      } else {
        setTimeout(() => {
          setDeley(3000);
          callBack && callBack(messages[arrayIndex.current]);
          sendCurrentText("");
          arrayIndex.current++;
          if (arrayIndex.current == messages.length) {
            arrayIndex.current = 0;
          }
          index.current = 0;
        }, 1000);
      }
    }, deley);
  }, [currentText]);

  return <div className={style.message}>{currentText}</div>;
};

export default TypingTextAnimation;
