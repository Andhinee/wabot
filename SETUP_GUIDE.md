# Panduan Setup Bot WhatsApp (Railway)

Railway adalah alternatif yang sangat bagus karena otomatis mengenali Dockerfile kita.

---

## Langkah 1: Update Kode ke GitHub

Saya sudah menyiapkan filenya. Anda cukup kirim update terbaru ke GitHub supaya Railway bisa membacanya.
(Nanti jalankan perintah git yang saya berikan di chat).

---

## Langkah 2: Deploy di Railway

1.  Buka **[railway.app](https://railway.app/)**.
2.  Login (pilih **Login with GitHub**).
3.  Klik tombol besar **+ New Project**.
4.  Pilih **Deploy from GitHub repo**.
5.  Pilih repositori bot Anda (misal `bot-wa-saya` atau `wabot`).
6.  Klik **Deploy Now**.
    *   Railway akan otomatis mendeteksi file `Dockerfile`.
    *   Tunggu prosesnya (sekitar 2-4 menit).

---

## Langkah 3: Scan QR Code

1.  Setelah deploy berjalan, klik kotak proyek Anda di dashboard Railway.
2.  Klik tab **Deployments** (biasanya di menu atas atau klik "View Logs").
3.  Pilih deployment yang paling atas (yang sedang "Active" atau "Building").
4.  Klik **Deploy Logs**.
5.  Tunggu sampai muncul tulisan:
    > **Scan the QR code above with your WhatsApp app!**
6.  Akan muncul kode QR (kotak-kotak teks).
7.  Scan menggunakan HP Anda (Menu "Linked Devices" / "Perangkat Tertaut" di WA).

---

### Tips
*   Jika QR Code terpotong di Logs: Coba Zoom Out browser Anda (Ctrl + Minus).
*   Jika bot mati: Railway versi Trial punya batas jam penggunaan (kredit). Pastikan akun Anda masih aktif.
