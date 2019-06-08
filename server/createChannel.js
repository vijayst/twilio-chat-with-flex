import dotenv from 'dotenv';

dotenv.config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.chat.services(process.env.SERVICE_SID)
           .channels
           .create({friendlyName: 'FlexChannel'})
           .then(channel => console.log(channel.sid));