import { useEffect, useRef, useState } from 'react';
import style from '../loginPage.module.scss';
import TypingTextAnimation from './TypingTextAnimation';

const RightSide = (props) => {
  const [renderedMassages, setRenderedMassages] = useState([]);
  const interationCount = useRef(0);

  useEffect(() => {
    if (renderedMassages.length > 4) {
      setTimeout(() => {
        setRenderedMassages([]);
        interationCount.current = 0;
      }, 1000);
    }
  }, [renderedMassages]);

  const sendMassage = (massage) => {
    // сообщение из typingText callback
    const massageNode = renderMassageInMassages(
      massage,
      renderedMassages.length
    );

    // ответ на соообшение
    if (renderedMassages.length < 4) {
      setTimeout(() => {
        setRenderedMassages((massages) => {
          const componenMassage = renderMassageInMassages(
            mеssageAnswers[interationCount.current],
            massages.length,
            true
          );
          ++interationCount.current;
          return [...massages, componenMassage];
        });
      }, 2000);
    }

    setRenderedMassages((massages) => [...massages, massageNode]);
  };

  const massages = ['hello i cant find snow', 'ooh i found it thanks', 'bye'];
  const mеssageAnswers = ['did you look under the bed?', 'see you'];

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

        <TypingTextAnimation messages={massages} callBack={sendMassage} />
      </div>
    </div>
  );
};

export default RightSide;
