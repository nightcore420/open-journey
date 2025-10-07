# 🤝 Panduan Kontribusi / Contributing Guide

Terima kasih atas minat Anda untuk berkontribusi! Dokumen ini akan memandu Anda melalui proses kontribusi.

Thank you for your interest in contributing! This document will guide you through the contribution process.

---

## 🌟 Untuk Kontributor Pemula / For First-Time Contributors

**Selamat datang!** Proyek ini dirancang khusus untuk membantu pemula membuat kontribusi pertama mereka.

**Welcome!** This project is specifically designed to help beginners make their first contributions.

### Tidak tahu harus mulai dari mana? / Don't know where to start?

1. Baca panduan utama di [README.md](README.md)
2. Lihat [Good First Issues](https://github.com/firstcontributions/first-contributions/labels/good%20first%20issue)
3. Pilih satu issue dan komentari bahwa Anda ingin mengerjakannya
4. Ikuti langkah-langkah di bawah ini

---

## 📋 Jenis Kontribusi / Types of Contributions

Kami menerima berbagai jenis kontribusi:

We accept various types of contributions:

### ✅ Menambahkan Nama Anda / Add Your Name
- Tambahkan nama Anda ke `Contributors.md`
- Ini adalah cara termudah untuk memulai!
- This is the easiest way to get started!

### 📝 Perbaikan Dokumentasi / Documentation Fixes
- Memperbaiki typo atau kesalahan
- Memperbaiki link yang rusak
- Meningkatkan kejelasan instruksi
- Fix typos or errors
- Fix broken links
- Improve instruction clarity

### 🌐 Terjemahan / Translations
- Menerjemahkan README ke bahasa Anda
- Memperbaiki terjemahan yang ada
- Menambahkan tutorial dalam bahasa lain
- Translate README to your language
- Fix existing translations
- Add tutorials in other languages

### 📚 Konten Edukatif / Educational Content
- Menambahkan tutorial baru
- Menambahkan resource pembelajaran
- Membuat glossary atau cheat sheet
- Add new tutorials
- Add learning resources
- Create glossaries or cheat sheets

### 🌟 Project Showcase / Galeri Proyek
- Menambahkan proyek pribadi ke showcase
- Membagikan aplikasi atau tool yang telah dibuat
- Menampilkan portfolio dan karya kreatif
- Add personal projects to showcase
- Share applications or tools you've built
- Display portfolio and creative works

---

## 🌟 Showcase Contribution Guidelines / Panduan Kontribusi Showcase

### 📋 Required Fields / Field yang Diperlukan

When adding a project to the showcase, ensure your markdown file includes these required YAML front-matter fields:

Ketika menambahkan proyek ke showcase, pastikan file markdown Anda menyertakan field YAML front-matter yang diperlukan:

```yaml
---
title: "Your Project Name"           # Required
contributor: "Your Name"             # Required  
description: "Brief description"     # Required
year: 2025                          # Required (YYYY format)
github: "https://github.com/you"    # Optional
repo: "https://github.com/you/repo" # Optional
demo: "https://your-demo.com"       # Optional
tags: ["tag1", "tag2"]             # Optional
screenshot: "https://img-url.com"   # Optional
---
```

### ✅ Validation Rules / Aturan Validasi

- **Title**: Must be a non-empty string
- **Contributor**: Must be a non-empty string  
- **Description**: Must be a non-empty string
- **Year**: Must be a number between 2000-2100
- **File Location**: Must be in `showcase/YYYY/filename.md` format
- **Table Update**: Run `npm run showcase:build` after adding files

- **Title**: Harus berupa string yang tidak kosong
- **Contributor**: Harus berupa string yang tidak kosong
- **Description**: Harus berupa string yang tidak kosong  
- **Year**: Harus berupa angka antara 2000-2100
- **Lokasi File**: Harus dalam format `showcase/YYYY/filename.md`
- **Update Tabel**: Jalankan `npm run showcase:build` setelah menambahkan file

### 🚨 Common Issues / Masalah Umum

- Missing required fields → Add all required YAML fields
- Invalid year format → Use 4-digit year (e.g., 2025)
- Table not updated → Run `npm run showcase:build`
- File in wrong location → Move to `showcase/YYYY/` directory

- Field yang diperlukan hilang → Tambahkan semua field YAML yang diperlukan
- Format tahun tidak valid → Gunakan tahun 4 digit (contoh: 2025)
- Tabel tidak terupdate → Jalankan `npm run showcase:build`
- File di lokasi salah → Pindahkan ke direktori `showcase/YYYY/`

---

## 🚀 Langkah-langkah Kontribusi / Contribution Steps

### 1️⃣ Fork Repository

Klik tombol "Fork" di bagian atas halaman repository.

Click the "Fork" button at the top of the repository page.

### 2️⃣ Clone ke Komputer Anda / Clone to Your Computer

```bash
git clone https://github.com/your-username/first-contributions.git
cd first-contributions
```

### 3️⃣ Buat Branch Baru / Create a New Branch

```bash
git switch -c your-branch-name
```

Contoh nama branch yang baik / Examples of good branch names:
- `add-john-doe`
- `fix-typo-readme`
- `translate-readme-indonesian`
- `add-git-glossary`

### 4️⃣ Buat Perubahan / Make Changes

Edit file yang diperlukan menggunakan text editor favorit Anda.

Edit the necessary files using your favorite text editor.

**Tips:**
- Buat perubahan yang kecil dan fokus / Make small, focused changes
- Ikuti format yang sudah ada / Follow existing formats
- Pastikan tidak ada typo / Make sure there are no typos

### 5️⃣ Commit Perubahan / Commit Changes

```bash
git add .
git commit -m "Deskripsi singkat perubahan Anda"
```

Contoh commit message yang baik / Examples of good commit messages:
- `Add John Doe to Contributors list`
- `Fix typo in Indonesian README`
- `Translate introduction section to Indonesian`
- `Add Git commands glossary in Indonesian`

### 6️⃣ Push ke GitHub

```bash
git push origin your-branch-name
```

### 7️⃣ Buat Pull Request

1. Pergi ke repository Anda di GitHub
2. Klik tombol "Compare & pull request"
3. Isi deskripsi Pull Request dengan jelas
4. Klik "Create pull request"

Go to your repository on GitHub, click "Compare & pull request", fill in the description clearly, and click "Create pull request".

---

## ✅ Checklist Sebelum Submit PR / Pre-PR Checklist

Sebelum membuat Pull Request, pastikan:

Before creating a Pull Request, make sure:

- [ ] Anda sudah membaca [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [ ] Perubahan Anda mengikuti format yang ada
- [ ] Tidak ada typo atau kesalahan ketik
- [ ] Link yang Anda tambahkan masih valid
- [ ] Commit message Anda deskriptif
- [ ] Anda hanya mengubah file yang perlu diubah

---

## 📝 Standar Penulisan / Writing Standards

### Untuk Konten Bahasa Indonesia / For Indonesian Content

- Gunakan Bahasa Indonesia yang baik dan benar
- Hindari bahasa yang terlalu formal atau terlalu casual
- Gunakan istilah teknis dengan terjemahan jika memungkinkan
- Use proper Indonesian language
- Avoid language that is too formal or too casual
- Use technical terms with translations when possible

### Untuk Konten Bahasa Inggris / For English Content

- Use clear and simple English
- Avoid jargon when possible
- Be concise and to the point

### Format Markdown

- Gunakan heading yang sesuai (`#`, `##`, `###`)
- Gunakan list untuk poin-poin
- Gunakan code blocks untuk kode (` ``` `)
- Gunakan link yang deskriptif
- Use appropriate headings
- Use lists for points
- Use code blocks for code
- Use descriptive links

---

## 🎯 Issue Guidelines

### Sebelum Membuat Issue Baru / Before Creating a New Issue

1. Cek apakah issue serupa sudah ada
2. Gunakan template yang sesuai
3. Berikan deskripsi yang jelas
4. Check if similar issues already exist
5. Use the appropriate template
6. Provide clear descriptions

### Label yang Tersedia / Available Labels

- `good first issue` - Cocok untuk pemula / Good for beginners
- `hacktoberfest` - Kontribusi Hacktoberfest / Hacktoberfest contributions
- `documentation` - Terkait dokumentasi / Documentation related
- `translation` - Terkait terjemahan / Translation related
- `bug` - Laporan bug / Bug reports
- `help wanted` - Butuh bantuan / Help needed

---

## 🎃 Hacktoberfest Specific Guidelines

### Apa yang Dihitung / What Counts

✅ Pull Request yang valid:
- Menambahkan nama ke Contributors.md
- Memperbaiki bug atau typo yang nyata
- Menambahkan konten yang berarti
- Menerjemahkan dokumentasi

✅ Valid Pull Requests:
- Adding name to Contributors.md
- Fixing actual bugs or typos
- Adding meaningful content
- Translating documentation

❌ Pull Request yang tidak valid:
- Perubahan whitespace saja
- Perubahan yang merusak
- Spam atau perubahan tidak berarti
- Duplikasi konten

❌ Invalid Pull Requests:
- Whitespace-only changes
- Breaking changes
- Spam or meaningless changes
- Duplicate content

### Tips untuk Hacktoberfest

1. Mulai dari issue `good first issue`
2. Buat PR yang berkualitas, bukan banyak PR spam
3. Tunggu review dari maintainer
4. Perbaiki jika ada feedback
5. Bersabar - review membutuhkan waktu

---

## 💡 Tips Sukses / Tips for Success

1. **Mulai dari yang kecil** - Tidak perlu kontribusi besar untuk memulai
2. **Baca dengan teliti** - Pastikan Anda memahami apa yang diminta
3. **Tanya jika ragu** - Lebih baik bertanya daripada salah
4. **Belajar dari review** - Feedback adalah kesempatan belajar
5. **Bersabar** - Review membutuhkan waktu

---

## 🆘 Butuh Bantuan? / Need Help?

- 💬 Diskusi: [GitHub Discussions](https://github.com/firstcontributions/first-contributions/discussions)
- 📧 Email: [Hubungi maintainer]
- 🐛 Bug: [Buat issue baru](https://github.com/firstcontributions/first-contributions/issues/new)

---

## 🙏 Terima Kasih! / Thank You!

Setiap kontribusi, sekecil apapun, sangat berarti bagi kami!

Every contribution, no matter how small, means a lot to us!

**Selamat berkontribusi! Happy contributing! 🎉**
