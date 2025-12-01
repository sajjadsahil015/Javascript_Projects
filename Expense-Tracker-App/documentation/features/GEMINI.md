# Feature: Transaction Management

## Overview
This module handles the core logic for adding, deleting, and updating financial transactions (Income & Expenses). It acts as the bridge between the User Interface (DOM) and the Data Storage.

## Data Structure
Each transaction object must follow this schema strictly:

```javascript
{
  id: Number,          // Unique ID (use Date.now() for simplicity)
  text: String,        // Description of the transaction
  amount: Number,      // Amount in Cents/Paisa (Integer)
  type: String,        // "income" or "expense"
  date: String         // ISO String or formatted date
}