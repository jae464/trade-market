const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    transports: ['websocket'],
  });
  app.set('io', io);
  io.on('connection', (socket) => {
    console.log('socket 연결');
    // const req = socket.request;
    // console.log(socket.nsp);
    socket.on('room', (roomId) => {
      socket.join(roomId);
      console.log(`${roomId}번 방으로 참여`);
      // socket.emit('chat','안녕!!');
      // io.to(roomId).emit('chat','안녕?'); // 
    });
    socket.on('exit', (roomId) => {
      io.to(roomId).emit('exit');
    })
    // socket.on('chat', (chat, roomId) => {
    //   io.to(roomId).emit('chat',chat);
    // })
    // console.log(req);
    // console.log(socket.request.headers);
    socket.on('disconnect', () => {
      console.log('소켓 연결 헤제');
    })
  })
}