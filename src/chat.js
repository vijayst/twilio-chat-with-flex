import Chat from 'twilio-chat';
import axios from 'axios';

axios
    .post('http://localhost:3000/token', {
        identity: 'vijayst@gmail.com'
    })
    .then(response => {
        return Chat.Client.create(response.data);
    })
    .then(client => {
        return chatClient.createChannel({
            uniqueName: 'general',
            friendlyName: 'General Chat Channel'
        });
    }).then(channel);

export function sendMessage(message) {}
