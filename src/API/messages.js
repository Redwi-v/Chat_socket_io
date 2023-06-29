import axios from 'axios';

class Rooms {
  getMessages(roomId) {
    return axios.post('http://localhost:7777/messages', { roomId });
  }
}

export default new Rooms();
