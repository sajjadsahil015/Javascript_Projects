# Personal Finance Tracker Web App

## Project Overview
Responsive web application for tracking daily expenses, income, and visualizing budget status. Designed to run completely in the browser using LocalStorage for data persistence.

## Core Features
- Transaction management (Add, Edit, Delete expenses & income)
- Real-time balance updates (Total Balance, Income, Expense)
- Filter and Sort transactions (by date, category)
- Data persistence using Browser LocalStorage
- Interactive Charts (Visualizing spending habits)
- Responsive Design (Mobile-first approach)

## Tech Stack
- **Structure**: HTML5 (Semantic)
- **Styling**: CSS3 (Flexbox, CSS Grid, CSS Variables for theming)
- **Logic**: Vanilla JavaScript (ES6+ Modules)
- **Storage**: Web LocalStorage API (No backend required)
- **Icons**: FontAwesome or SVG Icons

## Project Structure
```text
expense-tracker/
├── index.html                  # Main entry point (DOM Structure)
├── css/
│   ├── style.css               # Global styles and resets
│   └── components.css          # Cards, buttons, and form styles
├── js/
│   ├── app.js                  # Main controller (Event Listeners)
│   ├── storage.js              # LocalStorage handling wrapper
│   ├── transactions.js         # Transaction logic and calculations
│   └── ui.js                   # DOM manipulation and rendering
└── documentation/
    ├── GEMINI.md               # Project rules and context
    └── features/
        ├── ui-logic.md
        └── data-structure.md
```
