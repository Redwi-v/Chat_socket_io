import axios from 'axios';

class Rooms {
  getMessages(roomId) {
    return axios.post('/messages', { roomId });
  }
}

export default new Rooms();
