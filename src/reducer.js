export default (state, action) => {
  switch (action.type) {
    case 'AUTHENTICATION':
      return {
        ...state,
        isAuth: action.payload.isAuth,
        roomId: action.payload.roomId,
        userName: action.payload.userName,
      };
    case 'SET_USERS':
      return {
        ...state,
        conectedUsers: [...action.payload.conectedUsers.users],
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
      };
    case 'SET_SOCKET_ID':
      return {
        ...state,
        socketId: action.socketId,
      };
    default:
      return state;
  }
};
