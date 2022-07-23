import axios from 'axios';

class Rooms {
  enter(userData) {
    return axios.post('/rooms', userData);
  }
}

export default new Rooms();
