const { sendMessage } = require('./whatsappService');

// Define the menu structure
// You can easily edit this object to change the menu options and answers
const menuData = {
    start: `Halo! Selamat datang di Layanan Pelanggan Otomatis.
Silakan balas dengan angka untuk memilih opsi:

1. Info Jam Operasional
2. Alamat Kantor
3. Cara Pembayaran
4. Kontak Admin Lainnya

Balas '0' untuk kembali ke menu ini kapan saja.`,
    options: {
        '1': 'Kami buka setiap hari Senin - Jumat, pukul 08.00 - 17.00 WIB.',
        '2': 'Alamat kami di: Jl. Teknologi No. 123, Jakarta Selatan, Indonesia.',
        '3': 'Pembayaran bisa dilakukan via Transfer Bank BCA: 1234567890 a.n PT Contoh.',
        '4': 'Anda bisa menghubungi admin kami di email: support@contoh.com atau Telp: 021-555555.',
    }
};

const handleIncomingMessage = async (from, messageBody) => {
    const incomingText = messageBody.trim();

    let responseText = '';

    // Logic for handling the input
    if (incomingText === '0' || incomingText.toLowerCase() === 'hi' || incomingText.toLowerCase() === 'halo') {
        responseText = menuData.start;
    } else if (menuData.options[incomingText]) {
        responseText = menuData.options[incomingText];
    } else {
        responseText = `Maaf, saya tidak mengerti pilihan "${incomingText}".
` + menuData.start;
    }

    // Send the response back to the user
    await sendMessage(from, responseText);
};

module.exports = {
    handleIncomingMessage,
};
