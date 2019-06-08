# twilio-chat-with-flex

Use Twilio Chat SDK along with Twilio Flex. Makes use of Undocumented Preview API from Twilio.

## Twilio Chat SDK

- [Twilio Chat NPM Package](https://www.npmjs.com/package/twilio-chat)
- [Create Access Token](https://www.twilio.com/docs/chat/create-tokens)

## Tech support (Twilio)

### Get Access token from Accounts service

Make a request to  
https://preview.twilio.com/iam/Accounts/[[Your Account SID]]/Tokens
Request Method POST
Request body : {"products": ["flex"]}
Content: json/application
Auth: none

### Get FlowSID from Flex Flow service

FlowSid - This can be taken from the Flex Flow Endpoint, you can make a request to the Flow endpoint with a GET request, the endpoint would be: https://preview.twilio.com/Flex/FlexFlows , autherizaton Basic - your account/auth token sids, the response will be returned in json format, i.e:

        {
            "studio_flow_sid": "FW5XXXXXXX",
            "date_updated": "2019-03-22T04:42:12Z",
            "enabled": true,
            "friendly_name": "Flex WebChat Flow",
            "contact_identity": null,
            "account_sid": "AC0cbXXXXX",
            "channel_type": "web",
            "url": "https://preview.twilio.com/Flex/FlexFlows/FOXXXXX",
            "sid": "FOXXXXXX",
            "date_created": "2019-03-19T04:05:51Z",
            "chat_service_sid": "ISfXXXXXXX"
        }

You are looking for :
Channel type: "web" and you'll need the sid value that starts with FOxxxxxx. Then you can use the Flow sid with the request to WebChannels endpoint.

### Get Identity from Identity service

### Register with Webchannel service

Use the access token in the response to use as credentials for the WebChannel endpoint. Use the FlexFlowSid and Identity response in request body.

Endpoint: https://preview.twilio.com/Flex/WebChannels
Method: POST
Content-Type: application/x-www-form-urlencoded
Auth: Basic [[Token]]
Params:
FlexFlowSid: [[WebChat Flow Sid]]
Identity: [[Identity Response]]
ChatFriendlyName: [[Chat Channel Friendly Name]]
CustomerFriendlyName: [[Identity that will be displayed in FlexUI]]
