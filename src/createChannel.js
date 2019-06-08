import { Client } from 'twilio-chat';
import axios from 'axios';

let chatClient;

export default function createChannel(identity, displayName) {
    return axios
        .post('http://localhost:4000/token', {
            identity
        })
        .then(response => {
            return Client.create(response.data);
        })
        .then(client => {
            chatClient = client;
            return axios.post('http://localhost:4000/channel', {
                displayName
            });
        })
        .then(response => {
            return chatClient.getChannelBySid(response.data);
        })
        .then(channel => {
            channel.join();
            return channel;
        });
}
