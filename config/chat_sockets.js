module.exports.chatSockets = function(socketServer)
{
    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
          //   allowedHeaders: ["my-custom-header"],
          //   credentials: true
          }
        });
    
    io.sockets.on('connection',function(socket)
    {
       
        console.log('new connection recived...!',socket.id);
        socket.on('dissconnect',function()
        {
            console.log('socket dissconnect!');
        });

        socket.on('join_room',function(data)
        {
            console.log('joining requsest recived',data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data)
        {
            io.in(data.chatroom).emit('receive_message',data);
        });
        
    });
    
}