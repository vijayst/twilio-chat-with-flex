import { jwt } from 'twilio';
const { AccessToken } = jwt;
const { ChatGrant } = AccessToken;

export default function generateAccessToken(identity) {
    const chatGrant = new ChatGrant({
        serviceSid: process.env.SERVICE_SID
    });
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );
    token.addGrant(chatGrant);
    token.identity = identity;
    return token.toJwt();
}
