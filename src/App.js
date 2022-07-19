import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import socket from "./API/socket";
import { useEffect, useReducer } from "react";
import reducer from "./reducer";

function App(props) {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
  });
  const login = (userData) => {
    dispatch({
      type: "AUTHENTICATION",
      payload: userData,
    });
    socket.emit("Room:join", userData);
  };

  useEffect(() => {
    socket.on("Room:joined", (users) => {
      console.log(users);
    });
  }, []);

  return (
    <div className="App">
      {!state.isAuth && <LoginPageContainer login={login} />}
    </div>
  );
}

export default App;
