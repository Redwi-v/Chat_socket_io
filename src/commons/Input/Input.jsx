import style from "./input.module.scss";

const Input = (props) => {
  return (
    <div className="">
      <input className={style.input} {...props} />
    </div>
  );
};

export default Input;
