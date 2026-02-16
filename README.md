# 📝 Productivity Task Management Dashboard

<p align="center">
  <a href="#-english-description">🇬🇧 English</a> | <a href="#-deskripsi-bahasa-indonesia">🇮🇩 Bahasa Indonesia</a>
</p>

---

<div id="-english-description"></div>

## 🇬🇧 English Description

### Overview
**Productivity Task Management Dashboard** is a dynamic Single Page Application (SPA) designed to help users organize daily tasks efficiently. Built entirely with **Vanilla JavaScript** and **Tailwind CSS**, this project demonstrates a deep understanding of DOM manipulation, state management, and event handling without relying on external frameworks like React or Vue.

### 🚀 Key Features
* **Smart Prioritization:** Tasks are categorized by priority (High/Medium/Low) with distinct visual color indicators.
* **Persistent Data:** Integrated with `LocalStorage` API, ensuring tasks remain saved even after a browser refresh.
* **Deadline Tracking:** Automatic visual alerts (red text) for overdue tasks based on real-time date comparison.
* **Dual-View System:** Separated views for "Active" and "Completed" tasks to keep the interface clean.
* **Responsive Design:** Fully responsive UI styled with Tailwind CSS utility classes.

### 🛠️ Tech Stack
* **Core:** HTML5, JavaScript (ES6+).
* **Styling:** Tailwind CSS (via CDN).
* **Font:** Google Fonts (Inter).

### 🧠 Technical Highlight: Event Delegation
Instead of attaching an event listener to every single "Delete" or "Complete" button (which consumes memory), I implemented **Event Delegation**. A single listener is attached to the parent container to handle actions for all dynamic child elements.

```javascript
// Example from script.js
const handleTaskActions = (e) => {
    const target = e.target;
    // Identify the button clicked using classList
    if (target.classList.contains('delete-btn')) {
        // Execute delete logic
    }
};
// Listener attached to the parent container only
document.querySelector('#task-container').addEventListener('click', handleTaskActions);
💻 How to Run
Clone this repository.

Open index.html in your browser.

Or use the "Live Server" extension in VS Code for the best experience.

<div id="-deskripsi-bahasa-indonesia"></div>

🇮🇩 Deskripsi Bahasa Indonesia
Ringkasan
Productivity Task Management Dashboard adalah aplikasi Single Page Application (SPA) yang dirancang untuk membantu pengguna mengatur tugas harian dengan efisien. Dibangun sepenuhnya menggunakan Vanilla JavaScript dan Tailwind CSS, proyek ini mendemonstrasikan pemahaman mendalam tentang manipulasi DOM, manajemen state, dan event handling murni tanpa bergantung pada framework eksternal seperti React atau Vue.

🚀 Fitur Unggulan
Prioritas Cerdas: Tugas dikategorikan berdasarkan prioritas (Tinggi/Sedang/Rendah) dengan indikator warna yang berbeda.

Penyimpanan Data Permanen: Terintegrasi dengan LocalStorage API, memastikan data tugas tidak hilang meskipun browser di-refresh.

Pelacakan Tenggat Waktu: Peringatan visual otomatis (teks merah) untuk tugas yang sudah melewati tanggal jatuh tempo (overdue).

Sistem Dua Tampilan: Tampilan terpisah untuk tugas "Aktif" dan "Selesai" agar antarmuka tetap rapi.

Desain Responsif: UI yang responsif dan modern menggunakan utility class dari Tailwind CSS.

🛠️ Teknologi yang Digunakan
Inti: HTML5, JavaScript (ES6+).

Styling: Tailwind CSS (via CDN).

Font: Google Fonts (Inter).

🧠 Sorotan Teknis: Event Delegation
Alih-alih menempelkan event listener ke setiap tombol "Hapus" atau "Selesai" (yang memboroskan memori), saya menerapkan teknik Event Delegation. Satu listener dipasang pada kontainer induk (parent) untuk menangani aksi dari semua elemen anak yang dinamis.

JavaScript
// Contoh dari script.js
const handleTaskActions = (e) => {
    const target = e.target;
    // Mengidentifikasi tombol yang diklik menggunakan classList
    if (target.classList.contains('delete-btn')) {
        // Jalankan logika hapus
    }
};
// Listener hanya dipasang pada parent container
document.querySelector('#task-container').addEventListener('click', handleTaskActions);
💻 Cara Menjalankan
Clone repositori ini.

Buka file index.html di browser Anda.

Atau gunakan ekstensi "Live Server" di VS Code untuk pengalaman terbaik.

<p align="center">
Created with ❤️ by <b>RMA</b>
</p>