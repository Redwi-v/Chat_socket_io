import axios from 'axios';

class Rooms {
  getMessages(roomId) {
    return axios.post('https://my-chat112.herokuapp.com/messages', { roomId });
  }
}

export default new Rooms();
