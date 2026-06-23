<div align="center">
<img src="https://raw.githubusercontent.com/CleopatraTheDoggy/loveisland-tracker/refs/heads/main/img/island-guru-banner.svg" alt="Island.Guru — animated logo" height="50%" width="100%"/>

<br/>
<br/>

# <img src="https://cdn.jsdelivr.net/gh/CleopatraTheDoggy/loveisland-tracker@main/img/icons/favicon-main.svg" width="42" height="42" valign="middle" alt="Island.Guru heart icon"/> Island.Guru <img src="https://cdn.jsdelivr.net/gh/CleopatraTheDoggy/loveisland-tracker@main/img/icons/apple-touch-icon-transparent.png" width="42" height="42" valign="middle" alt="Island.Guru heart icon"/>

### Live Instagram Follower Tracker · Love Island USA Season 8

[![Live Site](https://img.shields.io/badge/🌴%20Live%20Site-island.guru-db2777?style=for-the-badge&labelColor=1e1e2e)](https://island.guru/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://island.guru/)

[![JS](https://img.shields.io/badge/JavaScript-59%25-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/CleopatraTheDoggy/loveisland-tracker/search?l=javascript)
[![HTML](https://img.shields.io/badge/HTML-37%25-e34f26?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/CleopatraTheDoggy/loveisland-tracker/search?l=html)
[![CSS](https://img.shields.io/badge/CSS-4%25-1572b6?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/CleopatraTheDoggy/loveisland-tracker/search?l=css)

</div>

---

## 🌺 What is Island.Guru?

**Island.Guru** is the ultimate live Instagram follower tracking dashboard for **Love Island USA Season 8**, set in Fiji. It tracks every islander's follower journey — from the original cast to Casa Amor bombshells — with real-time counts, interactive growth charts, and ranked leaderboards, all built from 100% publicly available data.

Trusted by Love Island fan accounts on Twitter/X for daily updates, Island.Guru delivers more transparency and frequency than any other tracker out there.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📈 **Follower Growth Charts** | Interactive Chart.js time-series graphs showing each islander's follower trajectory since Day 1 |
| 🏆 **Growth Leaderboard** | Ranked sidebar showing total follower gain since tracking began |
| 🏠 **Casa Amor Tab** | Dedicated view for Casa Amor contestants, separate from the original cast |
| 🔀 **Combined View** | Overlay all islanders in one chart for direct comparison |
| 🌙 **Dark / Light Mode** | Smooth toggle between themes with persistent preference |
| ⚡ **Live Status Badge** | Real-time fetch indicator showing data freshness |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop |
| 🔍 **SEO-Optimized** | Full JSON-LD structured data, Open Graph, Twitter Cards, and FAQ schema |

---

## 🛠️ Tech Stack

```
📦 Frontend
├── HTML5           — Semantic structure & SEO meta/schema
├── Tailwind CSS    — Utility-first styling with dark mode support
├── Vanilla JS      — Chart logic, data fetching, theme toggle
└── Chart.js        — Interactive follower growth charts
    └── chartjs-adapter-date-fns  — Time-series x-axis support

📊 Data
└── /json/          — Follower count snapshots updated multiple times daily

🎨 Design
├── Pacifico font   — Branded "Island.Guru" title treatment
├── Golden heart SVG — Animated logo with shimmer sparkles & pulse
└── Custom CSS      — Animations: requestAnimationFrame reveal, mask-image gradients

🚀 Hosting
└── GitHub Pages    — Deployed at island.guru via custom CNAME
```

---

## 📁 Repository Structure

```
loveisland-tracker/
├── index.html        # Main app — layout, SEO schema, FA Q markup
├── script.js         # Chart rendering, data fetching, leaderboard logic
├── styles.css        # Custom animations, dark mode vars, scrollbar styles
├── robots.txt        # Search engine crawl rules
├── sitemap.xml       # XML sitemap for SEO indexing
├── CNAME             # Custom domain → island.guru
├── img/
│   ├── og-preview.jpg          # Open Graph / Twitter Card share image
│   └── icons/                  # Favicons, PWA manifest, Apple touch icon
└── json/
    ├── followers.json           # Original cast follower snapshots
    ├── casa-amor.json           # Casa Amor follower snapshots
    └── oembed.json              # oEmbed metadata for rich link previews
```

---

## 📊 How the Data Works

Follower counts are sourced from **100% public Instagram metrics** and written into versioned JSON snapshots in the `/json/` directory. Data is updated **multiple times daily** through an automated process. No scraping of private data, no login walls, no personal user information is collected or stored — ever.

---

## 🔒 Privacy & Disclaimers

> **Not affiliated with Peacock, ITV, or Love Island.**
> All data is sourced from publicly available Instagram follower metrics.
> No personal user data is collected, stored, or sold.

---

## 🧡 Credits

Built with love (and a lot of JSON) by **[Plant Chant](https://github.com/CleopatraTheDoggy)** — a fan project for the Love Island community. 💛

---

<div align="center">

**[🌴 Visit Island.Guru](https://island.guru/)** &nbsp;·&nbsp; **[📂 Browse the Code](https://github.com/CleopatraTheDoggy/loveisland-tracker)**

<sub>Made for the fans. Powered by public data. Fueled by drama. ☀️</sub>

</div>
