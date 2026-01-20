const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { handleIncomingMessage } = require('./messageHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// 1. Verification Endpoint (GET)
// Used by Facebook to verify the webhook when you first set it up
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if mode and token are in the query string
    if (mode && token) {
        // Check if the mode and token match what we expect
        if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400); // Bad Request if parameters are missing
    }
});

// 2. Message Event Endpoint (POST)
// Where Facebook sends the messages
app.post('/webhook', async (req, res) => {
    const body = req.body;

    console.log('Incoming webhook:', JSON.stringify(body, null, 2));

    // Check if this is an event from a WhatsApp subscription
    if (body.object) {
        if (
            body.entry &&
            body.entry[0].changes &&
            body.entry[0].changes[0].value.messages &&
            body.entry[0].changes[0].value.messages[0]
        ) {
            const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
            const from = body.entry[0].changes[0].value.messages[0].from; // sender's phone number
            const msg_body = body.entry[0].changes[0].value.messages[0].text.body; // message text

            console.log(`Received message from ${from}: ${msg_body}`);

            // Process the message
            await handleIncomingMessage(from, msg_body);
        }

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.get('/', (req, res) => {
    res.send('WhatsApp Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
