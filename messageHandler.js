// Define the menu structure
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

const handleIncomingMessage = async (msg) => {
    const incomingText = msg.body.trim();

    // Logic for handling the input
    if (incomingText === '0' || incomingText.toLowerCase() === 'hi' || incomingText.toLowerCase() === 'halo') {
        await msg.reply(menuData.start);
    } else if (menuData.options[incomingText]) {
        await msg.reply(menuData.options[incomingText]);
    } else {
        // If input is not recognized, you can either ignore it or show the menu again
        // For personal bot, maybe it's better to NOT reply if not matched (so you can chat manually)
        // Or reply with a "I don't understand" + Menu

        // Uncomment this if you want it to be strict:
        // await msg.reply(`Maaf, saya tidak mengerti pilihan "${incomingText}".\n` + menuData.start);

        // For now, let's keep it silent if unmatched so you can chat manually
    }
};

module.exports = {
    handleIncomingMessage,
};
