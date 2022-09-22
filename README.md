# Real-time message exchange/passing through API call in Node and React using Websocket

## Description

- Implementation of websocket in backend and frontend
- Serve backend and websocket together with the same application using Node (Express.js)
- Send message during API call to the websocket
- Receive message in React frontend client

### Ports used

- backend - `7000`
- websocket - `8000`
- frontend - `3000`

### TO RUN

First, enter to the `backend` directory and then

`npm install` and `npm start`

Second, enter to the `frontend` directory and then

`npm install` and `npm start`

Finally, make the `POST` request to send the message 

`curl --location --request POST 'localhost:7000/send-msg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "test"
}'`
