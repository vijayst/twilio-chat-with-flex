import twilio from 'twilio';
import axios from 'axios';

export default function createChannel(displayName) {
    let channelSid;
    let flexIdentity;
    let flexSid;

    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    return client.chat
        .services(process.env.SERVICE_SID)
        .channels.create({ friendlyName: 'FlexChannel for ' + displayName })
        .then(channel => {
            channelSid = channel.sid;
            console.log('created channel', channelSid);

            return axios.post(
                `https://preview.twilio.com/iam/Accounts/${
                    process.env.FLEX_ACCOUNT_SID
                }/Tokens`,
                { products: ['flex'] },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
        })
        .then(response => {
            flexIdentity = response.data.identity;
            console.log('retrieved identity', flexIdentity);

            return axios.get(
                'https://preview.twilio.com/Flex/FlexFlows',
                {
                    withCredentials: true,
                    auth: {
                        username: process.env.FLEX_ACCOUNT_SID,
                        password: process.env.FLEX_AUTH_TOKEN
                    }
                }
            );
        })
        .then(response => {
            const flexFlow = response.data.flex_flows.find(
                ff => ff.channel_type === 'web'
            );
            flexSid = flexFlow.sid;
            console.log('retrieved FlexFlowSid', flexSid);

            return axios.post(
                'https://preview.twilio.com/Flex/WebChannels',
                `FlexFlowSid=${flexSid}&Identity=${flexIdentity}&ChatFriendlyName=FlexChannel for ${displayName}&CustomerFriendlyName=${displayName}`,
                {
                    withCredentials: true,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: process.env.FLEX_ACCOUNT_SID,
                        password: process.env.FLEX_AUTH_TOKEN
                    }
                }
            );
        })
        .then(() => {
            console.log('registered webchannel');
            return channelSid;
        })
        .catch(error => {
            console.log(error.message);
        });
}
