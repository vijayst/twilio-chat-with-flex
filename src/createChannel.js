import { Client } from 'twilio-chat';
import axios from 'axios';

let chatClient;

export default function createChannel(displayName) {
    console.log(displayName);
    let identity;
    return axios
        .post('http://localhost:4000/token')
        .then(response => {
            identity = response.data.identity;
            return Client.create(response.data.token);
        })
        .then(client => {
            chatClient = client;
            return axios.post('http://localhost:4000/channel', {
                identity,
                displayName
            });
        })
        .then(response => {
            return chatClient.getChannelBySid(response.data);
        });
}
