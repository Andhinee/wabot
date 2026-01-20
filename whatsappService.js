const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const sendMessage = async (to, body) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        text: { body: body },
      },
    });
    console.log('Message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    return null;
  }
};

module.exports = {
  sendMessage,
};
