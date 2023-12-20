import axios from 'axios';

class Rooms {
    getMessages(roomId) {
        return axios.post('https://chat-api-4tr3.onrender.com/messages', { roomId });
    }
}

export default new Rooms();
