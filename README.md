#  Finance Dashboard User Interface

## Overview

This project is a simple finance dashboard that allows users to track income and expenses, visualize their financial data, and gain basic insights.

The goal of the project was to practice core frontend concepts such as state management, DOM manipulation, and data visualization without relying on a frontend framework.

---

## How to Run

1. Clone the repository
2. Open `index.html` in your browser
   *(or use a local server like Live Server in VS Code)*

---

##  Tech Stack

* **HTML5**
* **CSS / Bootstrap 5**
* **Vanilla JavaScript**

###  Why this stack?

During my full-stack bootcamp, I primarily worked with **Laravel and Blade templates**, with limited exposure to frontend frameworks.

For this project, I intentionally chose vanilla JavaScript and Bootstrap to:

* strengthen my understanding of core JavaScript concepts
* practice DOM manipulation and state handling
* avoid abstraction layers and better understand how things work under the hood

---

## Features

* **Balance Trend (Line Chart)**
  Displays how the balance evolves over time based on transactions.

*  **Spending by Category (Pie Chart)**
  Visualizes expense distribution across categories.

*  **Search**
  Filter transactions by category in real time.

*  **Filters**
  View all transactions, only income, or only expenses.

*  **Insights (Modal)**
  Generates simple financial insights such as:

  * top spending category
  * total income vs expenses
  * saving status

*  **Role Switching (User / Admin)**

  * *User*: view-only access
  * *Admin*: can add new transactions

*  **Dynamic Greeting**
  UI adapts with a personalized greeting based on role.

---

##  Future Improvements

Given more time, I would improve the project by:

*  Persisting transactions using `localStorage` or a backend (e.g., Laravel API)
*  Replacing `prompt()` inputs with a proper form and validation
*  Enhancing UI/UX (better spacing, colors, responsiveness)
*  Refactoring into a frontend framework like Vue or React
*  Improving date formatting and filtering options

---
