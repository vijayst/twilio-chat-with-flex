import axios from 'axios';

export default function generateAccessToken2() {
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
    ).then(response => {
        return response.data;
    });
}