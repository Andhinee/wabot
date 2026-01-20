# WhatsApp Chatbot (Menu Based)

A simple, rule-based WhatsApp chatbot that replies with a numbered menu. Built with Node.js, Express, and WhatsApp Cloud API.

## Features
- **Auto-Reply**: Automatically responds to incoming messages.
- **Menu System**: Users reply with numbers (1, 2, 3...) to get specific information.
- **Easy to Edit**: Menu content is stored in `messageHandler.js` for easy updates.

## Project Structure
- `server.js`: The main server file.
- `messageHandler.js`: Contains the logic for the menu and responses.
- `whatsappService.js`: Handles sending messages to WhatsApp.
- `.env`: Configuration file for API keys.

## Quick Start (Local)
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Configure `.env` (see `SETUP_GUIDE.md`).
3.  Run the server:
    ```bash
    node server.js
    ```

## deployment
Please refer to `SETUP_GUIDE.md` for detailed steps on how to set up the WhatsApp API and deploy this bot to Render.
