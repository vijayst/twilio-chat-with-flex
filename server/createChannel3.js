import axios from 'axios';

export default function createChannel3(displayName) {
    let flexIdentity;
    let flexSid;

    return axios
        .post(
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
        )
        .then(response => {
            flexIdentity = response.data.identity;
            console.log('retrieved identity', flexIdentity);

            return axios.get('https://preview.twilio.com/Flex/FlexFlows', {
                withCredentials: true,
                auth: {
                    username: process.env.FLEX_ACCOUNT_SID,
                    password: process.env.FLEX_AUTH_TOKEN
                }
            });
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
        .then(response => {
            console.log('registered webchannel');
            return response.data.chat_channel_sid;
        })
        .catch(error => {
            console.log(error.message);
        });
}
