# Project Overview
**Project Name:** Charity Company  
This is a React-based web application built using Vite. The project leverages TypeScript and TailwindCSS for styling, along with various libraries for handling dates, forms, and API requests.

# Technologies Used
- **Frontend Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management & Form Handling:** React Hook Form
- **Date Handling:** Jalali Moment, Persian Date, React Multi Date Picker
- **API Requests:** Axios
- **Linting & Code Quality:** ESLint

# Key Dependencies
- `@types/moment-jalaali` - Type definitions for working with Jalali dates
- `axios` - For handling HTTP requests
- `jalali-moment`, `moment-jalaali`, `persian-date` - Libraries for Persian calendar support
- `react`, `react-dom` - Core React dependencies
- `react-hook-form` - For form validation and handling
- `react-icons` - Provides a collection of icons
- `react-multi-date-picker` - Persian calendar date picker component

# Development Setup
1. **Install Dependencies:**  
   ```sh
   npm install
   ```
2. **Run the Development Server:**  
   ```sh
   npm run dev
   ```
3. **Build for Production:**  
   ```sh
   npm run build
   ```
4. **Lint the Code:**  
   ```sh
   npm run lint
   ```
5. **Preview Production Build:**  
   ```sh
   npm run preview
   ```

# Configuration
- **Vite Configuration:** Defined in `vite.config.ts`
- **TypeScript Configuration:** `tsconfig.json`
- **TailwindCSS Configuration:** `tailwind.config.js`
- **Environment Variables:** Managed in `.env`

# Notes
- The project includes ESLint rules to enforce code quality.
- TypeScript is fully integrated for type safety.
- The project uses Jalali/Persian date handling extensively.

This document provides a high-level overview of the project structure and setup. Let me know if you need additional details!

