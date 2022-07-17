import { useCallback, useEffect, useRef, useState } from "react";
import Form from "./Form/Form";
import style from "./loginPage.module.scss";

const LoginPage = (props) => {
  const SendForm = (form) => {
    console.log(form);
  };

  const [currentText, sendCurrentText] = useState("");
  const index = useRef(0);
  const message = "i love you my ledy";

  useEffect(() => {
    setTimeout(() => {
      if (message[index.current]) {
        sendCurrentText(currentText + message[index.current]);
        index.current += 1;
      } else {
        setTimeout(() => {
          sendCurrentText("");
          index.current = 0;
        }, 1000);
      }
    }, 100);
  }, [currentText]);

  return (
    <div className="container">
      <div className={style.login}>
        <Form sendForm={SendForm} />
        <div className={style.right_side}>
          <div className="massage">{currentText}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
