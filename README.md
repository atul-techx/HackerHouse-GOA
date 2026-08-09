# 🌴 HH Goa 2026 — Frame & Builder ID Generator (#FrameInGoa)

> **Build in Goa, Ship from Paradise!**  
> Official Shortlisting Task Generator for **Hacker House Goa 2026**.

[![Live Demo](https://img.shields.io/badge/Live%20Website-hhgoa2026.vercel.app-10b981?style=for-the-badge&logo=vercel)](https://hhgoa2026.vercel.app)
[![Submission Form](https://img.shields.io/badge/Official-Submission%20Form-ff1e79?style=for-the-badge&logo=googleforms)](https://forms.gle/jM5hTaGvsrfEfixPA)
[![Hashtag](https://img.shields.io/badge/Hashtag-%23FrameInGoa-ffc700?style=for-the-badge&logo=x)](https://twitter.com/intent/tweet?text=I%20just%20generated%20my%20official%20Hacker%20House%20Goa%202026%20Builder%20Badge!%20%F0%9F%8D%B4%E2%9C%A8%0A%0ASee%20you%20in%20Goa!%20%F0%9F%8F%96%EF%B8%8F%20%23FrameInGoa%20%23HHGoa2026%0A%0AGenerate%20yours:%20https://hhgoa2026.vercel.app)

---

## 🔗 Quick Links

| Resource | Link |
| :--- | :--- |
| 🌐 **Live Web Application** | [https://hhgoa2026.vercel.app](https://hhgoa2026.vercel.app) |
| 📝 **Task Submission Form** | [https://forms.gle/jM5hTaGvsrfEfixPA](https://forms.gle/jM5hTaGvsrfEfixPA) |
| 💻 **GitHub Repository** | [https://github.com/atul-techx/HackerHouse-GOA](https://github.com/atul-techx/HackerHouse-GOA) |
| ⏰ **Submission Deadline** | **11:59 PM, 13th August 2026** |
| 🏷️ **Mandatory Hashtag** | `#FrameInGoa` |

---

## ✨ Features

- 🌴 **Format A: PFP Overlay Frame**:
  - High-res profile picture overlays for X with 4 distinct tropical styles:
    - **Tropical Palm** (Goa Signature Gold & Sunset Glow)
    - **Postage Stamp** (Vintage Scalloped Border & Airmail Stripes)
    - **Golden Sunset** (Sunburst Rays & Metallic Gold Rim)
    - **Cyber Glow** (Dual Neon Cyan/Pink & Corner HUD Brackets)
  - Custom corner badge stickers (`BUILDER`, `SHIPPER`, `SOLANA`, `TOP 1%`, etc.)

- 🆔 **Format B: Builder ID Card**:
  - Retro Goan event badge with user photo, name, role/stack, random or selectable **Builder Class** persona (`Terminal Wizard`, `Fullstack Architect`, `Solana Ninja`, etc.), unique `#HH26-XXXX` ID, QR code, vintage postmark seals, and lanyard slot.

- 👥 **Format C: Squad Badge Frame**:
  - Combine 2 to 4 teammates into a unified squad frame for team task submissions.

- 📸 **Photo Adjustments & iPhone HEIC Support**:
  - Interactive pan (X/Y), zoom (0.5x - 3.0x), 90° rotation, and photo filter presets (*Vibrant*, *Sunset*, *Cyber*, *B&W*).
  - Supports JPG, PNG, WEBP, and iPhone **HEIC** photo formats.

- 🚀 **1-Click Share to X (Twitter)**:
  - Instant share trigger opening pre-filled tweet intent with custom caption & mandatory hashtag `#FrameInGoa`.

- 📥 **High-Res PNG Download**:
  - Canvas API pixel-perfect 1000x1000 square & 800x1200 badge PNG downloads.

- 🖼️ **Dynamic OpenGraph Preview (`/api/og`)**:
  - Dynamic social card generation for link previews on Twitter/X, Discord, and Telegram.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Custom CSS Token System
- **Rendering & Canvas**: HTML5 Canvas 2D API
- **Icons**: Lucide React
- **Helpers**: `heic2any` (iPhone photo converter), `qrcode`, `canvas-confetti`
- **Deployment**: [Vercel](https://vercel.com)

---

## 📁 Repository Structure

```
HHgoa/
├── public/                  # Static assets & OG preview images
├── src/
│   ├── app/
│   │   ├── api/og/          # Dynamic OpenGraph card route
│   │   ├── layout.tsx       # Root layout & SEO metadata
│   │   └── page.tsx         # Main generator app interface
│   ├── components/
│   │   ├── BadgeCanvas.tsx  # Format B Canvas component
│   │   ├── ControlsPanel.tsx# Photo adjustment sliders & filters
│   │   ├── FormatAEditor.tsx# Format A controls & style selector
│   │   ├── FormatBEditor.tsx# Format B builder data form
│   │   ├── FormatCEditor.tsx# Format C squad team controls
│   │   ├── HowToGuide.tsx   # Submission instructions modal
│   │   ├── Navbar.tsx       # Top navigation header bar
│   │   ├── PFPCanvas.tsx    # Format A PFP Frame component
│   │   ├── SampleAvatars.tsx# 1-click test demo photos
│   │   ├── ShareModal.tsx   # 1-click Share to X modal
│   │   └── SquadCanvas.tsx  # Format C Squad frame component
│   └── lib/
│       ├── builderClasses.ts# Builder Class personas registry
│       ├── canvasUtils.ts   # HTML5 Canvas 2D rendering engine
│       ├── heicHelper.ts    # iPhone HEIC file converter
│       └── logoBase64.ts    # Embedded high-res graphics
├── tailwind.config.js       # Custom Goa palette configuration
└── README.md
```

---

## 🚀 Local Development Setup

1. **Clone repository**:
   ```bash
   git clone https://github.com/atul-techx/HackerHouse-GOA.git
   cd HackerHouse-GOA
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📋 Task Submission Instructions

1. **Generate your Graphic**: Choose Format A (PFP Overlay) or Format B (Builder ID Card), upload your photo, and customize your builder details.
2. **Download & Share on X**: Click **1-Click Share to X** or download your PNG and tweet with hashtag **`#FrameInGoa`**.
3. **Submit Official Form**: Fill out the Google Form at [https://forms.gle/jM5hTaGvsrfEfixPA](https://forms.gle/jM5hTaGvsrfEfixPA) before **13th August 2026, 11:59 PM**.

---

Built with ❤️ for **Hacker House Goa 2026** • *Build in Goa, Ship from Paradise!* 🌴🚀
