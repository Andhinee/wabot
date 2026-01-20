const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const { handleIncomingMessage } = require('./messageHandler');

// Initialize the Client
// using standard options. On Render, we might need no-sandbox args.
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

// Generate QR Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    // Generating with standard size (small: false) often renders better in web terminals
    qrcode.generate(qr, { small: false });
    console.log('Scan the QR code above with your WhatsApp app!');
    console.log('If the visual QR is broken, copy the longer text "QR RECEIVED..." above and use https://www.qr-code-generator.com/');
});

// Client is ready
client.on('ready', () => {
    console.log('Client is ready!');
});

// Incoming Messages
client.on('message', async msg => {
    console.log(`Message from ${msg.from}: ${msg.body}`);
    // Avoid replying to status updates or system messages if needed, 
    // but whatsapp-web.js handles chat messages well.
    await handleIncomingMessage(msg);
});

// Start the client
client.initialize();


// --- KEEP ALIVE SERVER FOR RENDER ---
// Render needs a web service to listen on a port, otherwise it thinks the app crashed.
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('WhatsApp Client is running. check logs for QR code.');
});

app.listen(PORT, () => {
    console.log(`Keep-alive server running on port ${PORT}`);
});
