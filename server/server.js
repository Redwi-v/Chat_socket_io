const { time } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.json());

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const rooms = new Map();

app.get('/', (req, res) => {
  res.json('hi');
});

app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;

  console.log([...rooms]);
  res.json([...rooms.get(roomId).get('users').values()]);
});

io.on('connection', (socket) => {
  socket.on('Room:join', ({ roomId, userName }) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(
        roomId,
        new Map([
          ['users', new Map()],
          ['massages', []],
        ])
      );
    }

    const user = {
      name: userName,
    };

    rooms.get(roomId).get('users').set(socket.id, user);

    const users = [...rooms.get(roomId).get('users').values()];

    io.in(roomId).emit('Room:movement', users);
  });

  socket.on('disconnect', () => {
    console.log('dis');

    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).emit('Room:movement', users);
      }
    });
  });
  console.log('a user connected');
});

server.listen(7777, () => {
  console.log('listening on *:7777');
});
