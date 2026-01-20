# WhatsApp Chatbot (QR Code Method)

Bot WhatsApp otomatis berbasis menu, menggunakan `whatsapp-web.js`.
Bot ini bertindak seperti WhatsApp Web. Chat pribadi Anda tetap aman dan nomor tidak mati.

## Cara Kerja
1.  Server menjalankan browser Chrome virtual.
2.  Server menampilkan QR Code.
3.  Anda scan QR Code pakai HP (Menu Linked Devices).
4.  Bot aktif!

## Struktur File
- `server.js`: Menjalankan klien WhatsApp dan server dummy (agar Render senang).
- `messageHandler.js`: Logika menu dan balasan otomatis.
- `Dockerfile`: Konfigurasi sistem untuk Render.

## Instalasi Lokal
1.  `npm install`
2.  `node server.js`
3.  Scan QR code yang muncul di terminal.
