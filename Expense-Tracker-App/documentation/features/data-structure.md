# Data Structure Documentation

This document defines the data models used in the application.

## Transaction Object
```json
{
  "id": 123456789,
  "text": "Salary",
  "amount": 500.00
}
```

## Storage
Data is stored in LocalStorage under the key `transactions` as a JSON string.
