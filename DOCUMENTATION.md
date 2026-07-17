# JobSphere — Responsive Job Board Application
## Architectural and Feature Documentation

Welcome to **JobSphere**, a modern, high-performance, and responsive Job Board web application built as a React-based Single Page Application (SPA). This document outlines the application's design system, state management, folder organization, and core features, designed to meet modern web design standards.

---

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` for optimized builds)
- **Icons**: React Icons (`react-icons/hi`, `react-icons/fa`, `react-icons/md`)
- **Routing**: React Router DOM v7
- **Toasts**: React Hot Toast
- **Database/Data**: Static JSON dataset (`src/data/jobs.json`)
- **Persistence**: Browser `localStorage` (for Saved Jobs, Applied Jobs, and Dark/Light Theme preferences)

---

## 📁 Project Structure

The project is structured logically into modular folders to guarantee high maintainability and scalability:

```
job-board/
├── .github/workflows/
│   └── deploy.yml            # CI/CD deployment configuration to Vercel
├── public/                   # Static public assets (favicons, logos)
├── src/
│   ├── assets/               # Local images and graphic assets
│   ├── components/
│   │   ├── navbar/           # Sticky Navbar with responsive mobile toggle drawer
│   │   ├── footer/           # Sleek footer containing social links & contact details
│   │   ├── hero/             # Search-centric Hero section with suggestion chips
│   │   ├── jobs/             # Job cards, filter panels, and forms
│   │   └── ui/               # Reusable inputs, pagination, and empty state templates
│   ├── context/
│   │   ├── ThemeContext.jsx       # Theme state controller (Light/Dark Mode)
│   │   ├── SavedJobsContext.jsx   # Handles Bookmarking / Saved jobs persistence
│   │   └── AppliedJobsContext.jsx # Tracks submitted job applications & status
│   ├── data/
│   │   └── jobs.json         # Dataset containing 20+ realistic job listings
│   ├── hooks/
│   │   └── useJobs.js        # Core filter, search, and pagination hook logic
│   ├── layouts/
│   │   └── MainLayout.jsx    # Shared page structure and scroll-to-top handler
│   ├── pages/
│   │   ├── HomePage.jsx      # Home layout with stats & featured positions
│   │   ├── JobsPage.jsx      # Jobs directory with filter filters
│   │   ├── JobDetailPage.jsx # Job breakdown layout with interactive Sidebar actions
│   │   ├── SavedJobsPage.jsx # Bookmarked job dashboard
│   │   ├── AppliedJobsPage.jsx# Job applications tracker
│   │   └── NotFoundPage.jsx  # Standard 404 handler
│   ├── routes/
│   │   └── AppRoutes.jsx     # Client-side router mappings
│   ├── utils/
│   │   └── helpers.js        # Helper validations, formatters, and colors
│   ├── App.jsx               # Application root
│   ├── index.css             # Tailwind imports & custom global scrollbars
│   └── main.jsx              # React DOM entry point
└── package.json              # Dependencies and build scripts
```

---

## 💡 Feature Breakdown

### 1. Responsive Navbar & Mobile Sidebar
*   **Aesthetics**: Glassmorphism blur (`backdrop-blur-lg`) with subtle border lines matching light/dark mode.
*   **Responsive**: Hidden navigation links on small screens, replaced by a smooth hamburger menu toggling a dropdown layout.
*   **Dynamic Badges**: Automatically updates the absolute count of bookmarked saved jobs and submitted applications with dynamic, colored badges (indigo for Saved, violet for Applied).

### 2. Search & Browse Hero
*   **Visual Highlights**: Animated abstract gradient radial blobs in the background (`bg-gradient-to-br from-indigo-950 to-violet-950`).
*   **Popular Suggestion Chips**: Quick-search button chips allowing users to browse jobs matching popular search phrases (e.g., *React Developer*, *Product Manager*) with a single click.

### 3. Advanced Filtering & State-controlled Search
*   **Hook-driven Controller (`useJobs.js`)**: Encapsulates pagination, query searches, and selected filters.
*   **Multi-criteria Filter Panel**:
    *   **Filter categories**: Location, Job Type (Full-time, Remote, Hybrid, etc.), and Experience level.
    *   **Clean Reset Control**: "Reset Filters" triggers to flush all states back to default.
    *   **Mobile Filters**: Interactive toggle drawer that displays filters cleanly on mobile viewports.
    *   **Active Chips**: Display and remove individual active filters from the grid.

### 4. Interactive Job Cards
*   **Design**: Modern card design with rounded corners (`rounded-2xl`), smooth hover transforms (`hover:-translate-y-0.5`), and subtle drop shadows.
*   **Content**: Contains company avatar, role title, badges, salary range, location, experience levels, dynamic relative date indicator (e.g. *Today*, *Yesterday*, *3 days ago*), skill tags, toggle bookmark button, and details navigation.

### 5. Detailed Job Description Page
*   **Layout**: Balanced two-column grid (Main content cards on the left, sticky meta-details & actions widget on the right).
*   **Detailed Sections**: Company profile details, role description, numbered responsibilities, bulleted qualifications, and specialized skill pills.

### 6. Client-Side Application Form (`ApplyModal.jsx`)
*   **Inline Drawer**: Opens a modal with backdrop blur lockouts.
*   **State Validations**: Evaluates format constraints:
    *   *Full Name*: Length check.
    *   *Email*: regex check.
    *   *Phone Number*: regex checks.
    *   *Resume URL*: Valid http/https checks.
    *   *Cover Letter*: Minimum character constraints.
*   **Visual States**: Disables forms during submission, renders loaders, and fires a success notification Toast. Renders an "Already Applied" banner if the user accesses the modal again for a previously submitted job.

### 7. Saved & Applied Jobs Boards
*   **Saved Board**: Bookmarked items list with quick toggling to unsave/remove directly from card layouts.
*   **Applied Board**: Renders applied items with custom purple badges showing the applicant's name, application date, and dynamic stages (e.g., *Under Review*, *Interview Scheduled*, *Accepted*, *Rejected*).

### 8. Premium Micro-Interactions & Loading Skeletons
*   **Loading Skeletons (`SkeletonCard.jsx`)**: Renders high-fidelity grey animated pulse cards to maintain visual continuity while loading state resolves.
*   **Empty State Panel (`EmptyState.jsx`)**: Shows illustration-driven warnings when search results yield zero jobs.

### 9. Instant Dark Mode
*   **System Preference Sync**: Checks local preferences or browser color scheme setup (`prefers-color-scheme`) on initial mount.
*   **Transition Control**: Seamless class-based theme switcher that updates root element stylesheets instantly without reload glitches.

---

## ⚡ How to Run Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Build production version**:
    ```bash
    npm run build
    ```
