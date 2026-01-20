# Panduan Lengkap Setup Chatbot WhatsApp (Render)

Panduan ini dirancang untuk pemula. Ikuti langkah-langkah di bawah ini satu per satu.

---

## Bagian 1: Persiapan Akun WhatsApp (Meta)

1.  **Buka Meta for Developers**
    *   Kunjungi [developers.facebook.com](https://developers.facebook.com/).
    *   Klik **"My Apps"** di pojok kanan atas (Login dengan akun Facebook Anda jika belum).

2.  **Buat Aplikasi Baru**
    *   Klik tombol **"Create App"**.
    *   Pilih **"Other"** > **Next**.
    *   Pilih **"Business"** > **Next**.
    *   Isi **App Name** (bebas, misal: `MyChatbot`) dan Email > **Create App**.

3.  **Tambahkan Produk WhatsApp**
    *   Di halaman dashboard aplikasi, cari **"WhatsApp"** di bagian bawah.
    *   Klik **"Set up"**.
    *   Pilih akun bisnis Meta Anda (atau buat baru jika belum ada) > **Continue**.

4.  **Dapatkan Token dan ID**
    *   Di menu sidebar kiri, pilih **WhatsApp** > **API Setup**.
    *   Anda akan melihat **Temporary Access Token**. Salin token ini.
    *   Anda juga akan melihat **Phone Number ID** (bukan nomor HP, tapi ID angka yang cukup panjang). Salin ID ini.
    *   **Penting**: Token Sementara hanya berlaku 24 jam. Untuk produksi, Anda nanti perlu membuat "System User Token" (tapi untuk tes awal, gunakan yang sementara dulu).

5.  **Isi File `.env`**
    *   Buka file `.env` di folder proyek Anda (`d:\Kuliah\bot\.env`).
    *   Tempelkan **Access Token** ke `WHATSAPP_TOKEN`.
    *   Tempelkan **Phone Number ID** ke `PHONE_NUMBER_ID`.
    *   Buat sebuah kata sandi rahasia bebas (misal: `botrahasia123`) dan isikan ke `WEBHOOK_VERIFY_TOKEN`.

---

## Bagian 2: Upload Kode ke GitHub

Render membutuhkan kode Anda berada di GitHub.

1.  **Buat Repositori GitHub**
    *   Buka [github.com](https://github.com/) dan login.
    *   Buat repositori baru (klik tombol **+** > **New repository**).
    *   Beri nama (misal: `whatsapp-bot`), biarkan Public/Private, lalu klik **Create repository**.

2.  **Upload Kode dari Komputer**
    *   Buka terminal/cmd di folder proyek Anda (`d:\Kuliah\bot`).
    *   Jalankan perintah berikut satu per satu:
        ```bash
        git init
        git add .
        git commit -m "Upload kode bot pertama"
        git branch -M main
        git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git
        git push -u origin main
        ```
    *   *(Ganti URL pada baris `git remote add` dengan URL repositori yang baru Anda buat di GitHub)*.

---

## Bagian 3: Deploy ke Render

1.  **Daftar/Login ke Render**
    *   Buka [render.com](https://render.com/).
    *   Login menggunakan akun **GitHub** Anda (ini akan memudahkan koneksi).

2.  **Buat Web Service Baru**
    *   Klik tombol **"New"** > **"Web Service"**.
    *   Pilih repositori `whatsapp-bot` yang tadi Anda upload.
    *   Klik **"Connect"**.

3.  **Konfigurasi Render**
    *   **Name**: Bebas (misal: `whatsapp-bot-service`).
    *   **Region**: Singapore (atau yang terdekat).
    *   **Branch**: `main`.
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install` (biasanya otomatis terisi).
    *   **Start Command**: `node server.js`.
    *   **Environment Variables** (PENTING!):
        *   Klik **"Add Environment Variable"**. Tambahkan data dari file `.env` Anda tadi satu per satu:
            *   Key: `WEBHOOK_VERIFY_TOKEN`, Value: `Isi dari .env`
            *   Key: `WHATSAPP_TOKEN`, Value: `Isi dari .env`
            *   Key: `PHONE_NUMBER_ID`, Value: `Isi dari .env`
    *   Pilih **"Free"** plan.
    *   Klik **"Create Web Service"**.

4.  **Tunggu Proses Deploy**
    *   Render akan memproses. Tunggu sampai statusnya **"Live"**.
    *   Salin URL aplikasi Anda yang ada di bagian atas (contoh: `https://whatsapp-bot-service.onrender.com`). URL ini akan digunakan untuk Webhook.

---

## Bagian 4: Setup Webhook di Meta

1.  Kembali ke **Meta for Developers** > **WhatsApp** > **Configuration**.
2.  Cari bagian **Webhook** > klik **Edit**.
3.  **Callback URL**: Masukkan URL dari Render tadi ditambah `/webhook` di belakangnya.
    *   Contoh: `https://whatsapp-bot-service.onrender.com/webhook`
4.  **Verify Token**: Masukkan token rahasia yang Anda buat di `.env` (misal: `botrahasia123`).
5.  Klik **Verify and Save**.
    *   *Jika error, pastikan aplikasi di Render sudah "Live" dan token verify sama persis.*
6.  Setelah tersimpan, klik **"Manage"** di kolom Webhook fields.
7.  Centang **"messages"** > **Subscribe** > **Done**.

---

## Bagian 5: Tes Bot

1.  Di Meta for Developers > **WhatsApp** > **API Setup**.
2.  Gulir ke bawah ke bagian **"Send and Receive Messages"**.
3.  Di sana ada nomor tes (Test Number).
4.  Klik **"Manage phone number list"** untuk menambahkan nomor WhatsApp pribadi Anda sebagai penerima pesan tes (wajib dilakukan saat mode Development).
5.  Kirim pesan "Halo" dari WhatsApp pribadi Anda ke nomor Test Number tersebut.
6.  Bot harusnya membalas dengan menu!
