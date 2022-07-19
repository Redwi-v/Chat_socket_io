import { useState } from "react";
import style from "../loginPage.module.scss";
import TypingTextAnimation from "./TypingTextAnimation";

const RightSide = (props) => {
  const [renderedMassages, setRenderedMassages] = useState([]);
  const sendMassage = (massage) => {
    const massageNode = renderMassageInMassages(
      massage,
      renderedMassages.length
    );

    setTimeout(() => {
      setRenderedMassages((massages) => {
        const componenMassage = renderMassageInMassages(
          "а я нет",
          massages.length,
          true
        );
        return [...massages, componenMassage];
      });
    }, 1000);

    setRenderedMassages((massages) => [...massages, massageNode]);
  };

  const massages = ["hello how are you?", "i love you my lady"];

  const renderMassageInMassages = (massages, key, isCompanion) => {
    return (
      <li
        className={`${style.sending_massage} ${isCompanion && style.companion}`}
        key={key}
      >
        {massages}
      </li>
    );
  };

  return (
    <div className={style.right_side}>
      <div className={style.messanger}>
        <ul className={style.sending_massages}>{renderedMassages}</ul>

        {/* <TypingTextAnimation messages={massages} callBack={sendMassage} /> */}
      </div>
    </div>
  );
};

export default RightSide;
