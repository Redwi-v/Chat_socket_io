export default (state, action) => {
  switch (action.type) {
    case "AUTHENTICATION":
      return {
        ...state,
        isAuth: true,
        roomId: action.payload.roomId,
        userName: action.payload.userName,
      };

    default:
      return state;
  }
};
