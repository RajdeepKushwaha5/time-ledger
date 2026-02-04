# ⏳ TimeLedger

**Minimalist wallpapers for mindful living.**

Transform your lock screen into a powerful visual reminder of time's passage. Beautiful, minimalist calendar wallpapers that update automatically every day.

🌐 **Live Demo:** [time-ledger-one.vercel.app](https://time-ledger-one.vercel.app/)

![TimeLedger Preview](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📅 **Life Calendar** | Visualize your entire life in weeks (inspired by Tim Urban's "Your Life in Weeks") |
| 📆 **Year Calendar** | Track the current year's progress day by day |
| 🎯 **Goal Calendar** | Count down to any deadline or milestone |
| 🔲 **Multi-Calendar** | Combine Life + Year + Goal in one wallpaper |
| ⚫ **Grid Styles** | Choose from circles, squares, rounded, or dots |
| 🔤 **Font Options** | Inter, System, Mono, or Serif typography |
| 🎨 **7 Color Themes** | Minimal, Ocean, Forest, Sunset, Rose, Purple, Gold |
| 💬 **Daily Quotes** | Rotating motivational quotes about time |
| 🔥 **Streak Counter** | Track consecutive days with your wallpaper |
| 📱 **70+ Devices** | Support for all iPhone & Android models |

---

## 📱 Supported Devices

### iPhone
iPhone 16/15/14/13/12/11 series, iPhone SE, iPhone X/XS/XR

### Android
Samsung Galaxy S24/S23/S22/S21, Google Pixel 9/8/7/6, OnePlus 12/11, Xiaomi 14/13, Nothing Phone, Sony Xperia, and generic resolutions

---

## 🚀 Installation Guide

### Prerequisites

Choose your platform:

| Platform | Required App |
|----------|--------------|
| **iPhone** | [Shortcuts](https://apps.apple.com/app/shortcuts/id915249334) (pre-installed on iOS 13+) |
| **Android** | [MacroDroid](https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid) (free) |

---

## 📲 iPhone Setup (iOS Shortcuts)

> **⚠️ Important Note:** Due to iOS Shortcuts limitations, the automatic wallpaper update requires opening Safari briefly. The shortcut will open the wallpaper page, take a screenshot, crop it, and set it as wallpaper. This is the most reliable method without a server-side image generator.

### Step 1: Get Your Wallpaper URL

1. Visit [time-ledger-one.vercel.app](https://time-ledger-one.vercel.app/)
2. Choose your calendar type (Life, Year, Goal, or Multi)
3. Select **iPhone** as your device
4. Fill in your details (birth date, phone model, etc.)
5. Customize appearance (grid style, theme, quotes)
6. **Copy the generated URL** (remove `&headless=true` from the end if present)

### Step 2: Create the Shortcut

1. Open the **Shortcuts** app on your iPhone
2. Tap the **+** button (top right) to create a new shortcut
3. Name it "TimeLedger Update"

### Step 3: Add Actions

Add these actions in order:

#### Action 1: Open URL in Safari
1. Tap **Add Action**
2. Search for **"Open URLs"**
3. Paste your wallpaper URL (with `&headless=true` at the end)

#### Action 2: Wait
1. Tap **+** to add action
2. Search for **"Wait"**
3. Set to **3 seconds** (allows page to render)

#### Action 3: Take Screenshot
1. Tap **+** to add action
2. Search for **"Take Screenshot"**

#### Action 4: Set Wallpaper
1. Tap **+** to add action
2. Search for **"Set Wallpaper"**
3. Set wallpaper to: **Screenshot**
4. Choose **Lock Screen**
5. Toggle OFF **"Show Preview"**

### Step 4: Set Up Daily Automation

1. Go to the **Automation** tab (bottom of Shortcuts app)
2. Tap **+** → **Create Personal Automation**
3. Select **"Time of Day"**
4. Set time to **6:00 AM** (or when you typically wake up)
5. Set Repeat to **Daily**
6. Tap **Next**
7. Select "Run Shortcut" and choose "TimeLedger Update"
8. Tap **Next**
9. Toggle OFF **"Ask Before Running"** 
10. Tap **Done**

### ✅ Test Your Setup

Run the shortcut manually. Safari will briefly open, capture the wallpaper, and set it as your lock screen!

### 📌 Alternative: Manual Daily Update

If automation feels clunky, you can:
1. Visit [time-ledger-one.vercel.app](https://time-ledger-one.vercel.app/) on your iPhone
2. Configure your calendar
3. Tap **Download Wallpaper**
4. Save to Photos
5. Set as Lock Screen manually

---

## 🤖 Android Setup (MacroDroid)

### Step 1: Get Your Wallpaper URL

1. Visit [time-ledger-one.vercel.app](https://time-ledger-one.vercel.app/)
2. Choose your calendar type (Life, Year, Goal, or Multi)
3. Select **Android** as your device
4. Fill in your details (birth date, phone model, etc.)
5. Customize appearance (grid style, theme, quotes)
6. **Copy the generated URL**

### Step 2: Install MacroDroid

1. Download [MacroDroid](https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid) from Play Store
2. Open the app and grant necessary permissions
3. Tap **Add Macro**

### Step 3: Set the Trigger

1. In the **Triggers** section, tap **+**
2. Select **Date/Time** → **Day/Time**
3. Set time to **12:01 AM**
4. Select all days of the week
5. Tap **OK**

### Step 4: Add HTTP Request Action

1. In the **Actions** section, tap **+**
2. Select **Web/Web Services** → **HTTP Request**
3. Configure:
   - **URL:** Paste your copied URL from Step 1
   - **Method:** GET
   - ✅ Enable **"Block next actions until complete"**
   - ✅ Enable **"Save HTTP response to file"**
   - **Folder:** `/Download/`
   - **Filename:** `timeledger.png`
4. Tap **OK**

### Step 5: Add Set Wallpaper Action

1. Tap **+** to add another action
2. Select **Device Settings** → **Set Wallpaper**
3. Select **"Image and Screen"**
4. Choose **Lock Screen** (or Both)
5. For image source, select **"Specified File"**
6. Enter path: `/Download/timeledger.png`
7. Tap **OK**

### Step 6: Save and Enable

1. Give your macro a name (e.g., "TimeLedger Daily Update")
2. Tap the checkmark to save
3. Ensure the macro is **enabled** (toggle on)

### ✅ Test Your Setup

Tap the play button on your macro to test. The wallpaper should download and apply to your lock screen!

---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Setup

```bash
# Clone the repository
git clone https://github.com/RajdeepKushwaha5/time-ledger.git

# Navigate to project
cd time-ledger

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
time-ledger/
├── public/
│   ├── favicon.svg
│   └── _redirects          # Netlify routing
├── src/
│   ├── components/         # React components
│   ├── lib/
│   │   ├── utils.js        # Device dimensions, helpers
│   │   ├── config.js       # Grid, font, theme configs
│   │   └── quotes.js       # Daily motivational quotes
│   ├── pages/
│   │   └── Wallpaper.jsx   # Wallpaper generation page
│   ├── App.jsx             # Main application
│   ├── Root.jsx            # Router setup
│   └── index.css           # Tailwind styles
├── vercel.json             # Vercel routing config
├── netlify.toml            # Netlify routing config
└── package.json
```

---

## 🔗 URL Parameters

The wallpaper endpoint accepts these parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | `life`, `year`, `goal`, or `multi` |
| `device` | string | Device key (e.g., `iphone-15-pro-max`) |
| `birth` | date | Birth date (YYYY-MM-DD) for life calendar |
| `lifespan` | number | Expected lifespan in years (default: 80) |
| `goalName` | string | Name of goal for goal calendar |
| `goalStart` | date | Goal start date (YYYY-MM-DD) |
| `goalEnd` | date | Goal end date (YYYY-MM-DD) |
| `headless` | boolean | `true` for automation (returns raw image) |
| `grid` | string | `circles`, `squares`, `rounded`, `dots` |
| `font` | string | `inter`, `system`, `mono`, `serif` |
| `theme` | string | `minimal`, `ocean`, `forest`, `sunset`, `rose`, `purple`, `gold` |
| `quotes` | boolean | `true` or `false` for daily quotes |
| `streak` | number | Days streak counter |

### Example URL

```
https://time-ledger-one.vercel.app/wallpaper?type=life&device=iphone-15-pro-max&birth=1990-05-15&lifespan=80&grid=circles&theme=ocean&quotes=true&headless=true
```

---

## 🚀 Deployment

The project is configured for easy deployment:

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RajdeepKushwaha5/time-ledger)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RajdeepKushwaha5/time-ledger)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [The Life Calendar](https://thelifecalendar.com/) by [@luismbat](https://x.com/luismbat) and [@joao_batalha](https://x.com/joao_batalha)
- Tim Urban's ["Your Life in Weeks"](https://waitbutwhy.com/2014/05/life-weeks.html) concept
- Built with [React](https://react.dev/), [Vite](https://vite.dev/), and [Tailwind CSS](https://tailwindcss.com/)

---

## 👤 Author

**Rajdeep Kushwaha**

- GitHub: [@RajdeepKushwaha5](https://github.com/RajdeepKushwaha5)
- LinkedIn: [@rajdeepsingh5](https://linkedin.com/in/rajdeepsingh5)

---

<p align="center">
  Made with ❤️ for mindful living
</p>
