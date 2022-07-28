const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

const PORT = process.env.PORT || 7777;

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const rooms = new Map();

app.post('/messages', (req, res) => {
  const { roomId } = req.body;
  const messages = rooms.get(roomId).get('messages');
  res.json(messages);
});

io.on('connection', (socket) => {
  // Join
  socket.on('Room:join', ({ roomId, userName }, callback) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(
        roomId,
        new Map([
          ['users', new Map()],
          ['messages', []],
        ])
      );
    }

    //--return users
    const user = {
      name: userName,
      socketId: socket.id,
    };
    rooms.get(roomId).get('users').set(socket.id, user);
    const users = [...rooms.get(roomId).get('users').values()];
    const messages = [...rooms.get(roomId).get('messages').values()];
    io.in(roomId).emit('Room:movement', { users, messages });

    callback(user);
  });

  //new Message
  socket.on('Room:newMessage', ({ roomId, message }) => {
    message.time = new Date().toLocaleTimeString().slice(0, 5);
    message.socketId = socket.id;
    message.id = rooms.get(roomId).get('messages').length;

    rooms.get(roomId).get('messages').push(message);
    io.in(roomId).emit('Room:newMessage', [message]);
  });

  //Disconnect
  socket.on('disconnect', () => {
    console.log('dis');
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];

        socket.to(roomId).emit('Room:movement', { users });
      }
    });
  });
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log('listening on *:7777');
});
