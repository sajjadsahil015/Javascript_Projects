# Expensify - Smart Personal Finance & Expense Tracker

> A modern, responsive personal finance and expense analytics web application built with Vanilla JavaScript (ES6 Modules), CSS3 Grid/Flexbox, and Chart.js. Designed with Spec-Driven Development principles and client-side data persistence via the Web Storage API.

---

## 🌟 Key Features

- **Real-Time Financial Dashboard**:
  - Live calculations for **Total Balance**, **Total Income**, **Total Expense**, and **Net Savings Rate (%)**.
  - Dynamic status indicators with positive/negative color-coding.

- **Interactive Visualizations (Chart.js)**:
  - Real-time **Doughnut Chart** providing visual expense breakdown categorized by spending areas (Food, Rent, Bills, Entertainment, etc.).
  - Interactive tooltips showing percentage and formatted amounts.

- **Complete Transaction Management (CRUD)**:
  - Add, edit, and delete income and expense items.
  - Form validation with animated feedback and custom non-blocking Toast alerts.
  - Dedicated Income / Expense type toggle switch.

- **Multi-Currency Support**:
  - Instant switching between currencies: `$ USD`, `Rs PKR`, `€ EUR`, `£ GBP`, `₹ INR`, and `AED`.
  - Seamless persistence of currency preferences across browser sessions.

- **Smart Categorization & Icons**:
  - Pre-configured color-coded categories with semantic FontAwesome icons.
  - Dynamic category selector tailored to Income vs Expense types.

- **Advanced Search & Filtering**:
  - Real-time instant search across transaction titles and categories.
  - Filter by Type (All / Income / Expense).
  - Filter by specific Category.
  - Multi-criteria sorting (Newest Date, Oldest Date, Highest Amount, Lowest Amount).

- **Data Portability & Utilities**:
  - **Export to CSV**: 1-click download of all transactions formatted as a `.csv` file.
  - **Load Demo Data**: Instant 1-click population with realistic financial records for quick demonstrations.
  - **Safe Reset**: Clear all local data with safety confirmation.

- **Responsive & Modern UI/UX**:
  - Mobile-first, desktop-optimized 2-column layout.
  - Sleek glassmorphism accents, soft drop shadows, and accessible touch targets.

---

## 🛠️ Tech Stack

- **Markup**: HTML5 (Semantic Structure & Accessibility)
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Custom Scrollbars, Keyframe Animations)
- **Scripting**: Vanilla JavaScript (ES6+ Modules: Separation of Concerns MVC Pattern)
- **Visuals & Charts**: [Chart.js](https://www.chartjs.org/) (CDN)
- **Icons**: [FontAwesome 6](https://fontawesome.com/)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Storage**: Browser `localStorage` API

---

## 📁 Architecture & File Structure

```text
Expense-Tracker-App/
├── index.html              # Main application shell and DOM structure
├── README.md               # Documentation & Portfolio Showcase guide
├── css/
│   ├── style.css           # Design tokens, layout grids, and typography
│   └── components.css      # Buttons, cards, form inputs, toasts, and list items
├── js/
│   ├── app.js              # Application entry point and event listener bindings
│   ├── storage.js          # Web Storage API (localStorage) wrapper
│   ├── transactions.js     # State management, calculations, filtering & business logic
│   └── ui.js               # DOM manipulation, dynamic rendering, and Chart.js controller
└── documentation/          # Engineering specifications & feature documentation
```

---

## 🚀 Quickstart & Running Locally

Because the application uses native ES6 JavaScript Modules (`type="module"`), it must be served via a local web server to comply with browser CORS policies.

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Right-click on `index.html` and click **"Open with Live Server"**.

### Option 2: Python Built-in Server
```bash
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

### Option 3: Node.js / npx
```bash
npx serve .
```

---

## 💼 LinkedIn Project Showcase Template

You can copy and adapt this text when adding this project to your LinkedIn profile:

```markdown
🚀 Excited to share my latest front-end project: Expensify - Smart Personal Finance & Expense Tracker!

Designed and built with Vanilla JavaScript (ES6 Modules) and modern CSS3, Expensify gives users a clean, real-time dashboard to monitor income, track daily expenses, and analyze spending patterns.

🔑 Highlights:
• Interactive Visualizations: Dynamic spending breakdown doughnut chart powered by Chart.js.
• Modular Architecture: Clean separation of concerns (Model-View-Controller pattern) across ES6 modules.
• Advanced UX: Multi-currency support (USD, PKR, EUR, GBP, INR), live instant search, multi-criteria filtering, and custom animated toast notifications.
• Data Portability: 1-click CSV export and local browser persistence with localStorage.
• Demo Ready: Built-in 1-click sample dataset generator for immediate exploration.

🛠️ Tech: JavaScript (ES6+), HTML5, CSS3 Grid/Flexbox, Chart.js, LocalStorage API.
```
