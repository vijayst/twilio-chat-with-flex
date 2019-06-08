import Chat from 'twilio-chat';


Chat.Client.create(token).then(client => {
    client.sendMessage('test');
});