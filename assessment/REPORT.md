# AI Interview Platform - Technical Assessment

## 🎯 Approach & Strategy
Dalam pengerjaan *assessment* ini, saya membagi fokus menjadi dua fase utama: **Gap Analysis (Quality Assurance)** dan **Feature Implementation (Full-stack Development)**. Pendekatan ini bertujuan untuk tidak hanya menambah fitur baru, tetapi juga mengidentifikasi *critical bugs* yang menghalangi *core user experience*.

### Fase 1: Gap Analysis & Bug Fixes
Saya mengidentifikasi dan menangani beberapa *issue* kritis (P0) pada aplikasi bawaan:
1. **Frontend-Backend Port Mismatch:** Memperbaiki *hardcoded URL port* (dari 3001 ke 5173) pada halaman undangan *assessment* yang menyebabkan *routing error*.
2. **Bypass Hardcoded Internet Speed Test:** Menyesuaikan logika validasi tes kecepatan internet yang sebelumnya menolak koneksi secara sepihak meskipun *upload/download speed* sudah memadai.
3. **WebSocket & AI Chat Crash:** Menemukan *critical bug* di mana ruang obrolan AI gagal membangun koneksi WebSocket. Alih-alih *error handling*, sistem secara otomatis memicu penyelesaian wawancara ("Interview Complete"). Ini merupakan temuan utama yang memerlukan investigasi mendalam pada arsitektur asinkron *backend*.
4. **Redis Dependency:** Mengidentifikasi kegagalan fungsi `Save & Create Session` yang disebabkan oleh absennya *service* Redis (yang merespons dengan *timeout error* ke layar *client*).

### Fase 2: Feature Showcase (CRUD)
Sebagai bukti kompetensi *full-stack*, saya menambahkan fungsionalitas yang hilang dari antarmuka pengguna:
* **Delete Functionality for Vacancies:** Mengimplementasikan tombol *Delete* pada `VacancyListPage.tsx` dan menyambungkannya dengan fungsi *destroy* di *backend* (`vacancies_controller.rb`).
* **Delete Functionality for Assessments:** Mengimplementasikan tombol *Delete* pada `AssessmentListPage.tsx` untuk menghapus draf ujian dengan mulus.

---

## 🚀 How to Run Locally
1. Pastikan Docker sudah berjalan.
2. Jalankan **Redis** via Docker: `docker run -d -p 6379:6379 redis`
3. Jalankan server Backend (Rails) dan Frontend (React) sesuai panduan standar repositori ini.