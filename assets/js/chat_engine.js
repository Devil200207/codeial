console.log('chinmay');
class ChatEngine
{
    constructor(chatBoxId,userEmail)
    {
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        console.log('io',io);
            

        this.socket = io.connect('http://172.64.202.28:443:5000', {transports: ['websocket'], rejectUnauthorized: false });

        if(this.userEmail)
        {
            this.connectionHandler();
        }

        console.log('class',this);
    }

    connectionHandler()
    {
        let self = this;
        this.socket.on('connect',function()
        {
            console.log('connection established using sockets...!');

            self.socket.emit('join_room',{
              user_email: self.userEmail,
              chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data)
            {
                console.log('a user joined',data);
            });
        });

        $('#send-message').click(function()
        {
            let msg = $('#message-input').val();

            if(msg != '')
            {
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                });
            }
        });

        self.socket.on('receive_message',function(data)
        {
            console.log('message recived',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);

        });
    }
}