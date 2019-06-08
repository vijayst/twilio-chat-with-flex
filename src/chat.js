import Chat from 'twilio-chat';
import axios from 'axios';

let chatClient;
let chatChannel;

axios
    .post('http://localhost:3000/token', {
        identity: 'vijayst@gmail.com'
    })
    .then(response => {
        return Chat.Client.create(response.data);
    })
    .then(client => {
        chatClient = client;
        axios.post('http://localhost:3000/channel', {
            displayName: 'Vijay Thirugnanam'
        });
    })
    .then(response => {
        return chatClient.getChannelBySid(response.data);
    }).then(channel => {
        chatChannel = channel;
    });

export function sendMessage(message) {
    if (chatChannel) {
        chatChannel.sendMessage(message);
    }
}
