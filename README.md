# Project Overview

**Project Name:** Charity Company\
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

# Pages Overview

The project consists of the following main pages:

1. **Home Page**
   - Displays an overview of the organization’s mission and key statistics.
   - Includes a hero section with a call-to-action button for donations.
   - Showcases recent campaigns and success stories.

2. **Donation Page**
   - Allows users to select a donation amount and payment method.
   - Displays active fundraising campaigns with progress bars.
   - Integrates with a secure payment gateway.

3. **Campaigns Page**
   - Lists all active and past fundraising campaigns.
   - Provides filters for sorting campaigns by category and urgency.
   - Each campaign has a dedicated page with full details and donation options.

4. **Volunteer Page**
   - Provides information on how users can participate as volunteers.
   - Includes a sign-up form for volunteering opportunities.
   - Displays testimonials from past volunteers.

5. **About Us Page**
   - Describes the history, mission, and values of the organization.
   - Highlights key team members and their roles.
   - Includes a section on partnerships and affiliations.

6. **Contact Page**
   - Contains a contact form for inquiries and support requests.
   - Displays organization contact details and social media links.
   - Embeds a Google Map for location reference.

7. **User Dashboard (if applicable)**
   - Allows logged-in users to track their donations and activities.
   - Provides settings for managing personal information.
   - Displays notifications related to new campaigns and updates.

# Notes

- The project includes ESLint rules to enforce code quality.
- TypeScript is fully integrated for type safety.
- The project uses Jalali/Persian date handling extensively.

This document provides a high-level overview of the project structure and setup. Let me know if you need additional details!

