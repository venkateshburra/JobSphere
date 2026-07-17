# 💼 JobSphere — Responsive Job Board App

JobSphere is a modern, responsive, and feature-rich Job Board web application built using **React 19**, **Vite**, and **Tailwind CSS v4**. 

This project was built as an assessment submission, demonstrating clean code structure, stateful client-side features, dynamic search engines, visual excellence, and automated CI/CD workflows.

---

## 🔗 Important Links

*   **Live Demo Link:** [https://job-sphere-lilac.vercel.app/](https://job-sphere-lilac.vercel.app/)
*   **Detailed Technical Documentation:** [DOCUMENTATION.md](./DOCUMENTATION.md)

---

## ✨ Features Implemented

1.  **Search & Filters:** Search by titles, skills, or companies. Advanced filter selectors for Locations, Job Types, and Experience levels.
2.  **Interactive Job Details:** In-depth information for each role including requirements, skills, responsibilities, and quick actions.
3.  **Client-Side Apply Form:** Fully validated form modal. Prevents duplicate submissions and notifies the user with success toasts.
4.  **Applied Jobs Tracking:** A separate page with custom card styles that stores details on submitted jobs and displays application statuses (e.g. *Under Review*).
5.  **Saved Jobs Board:** Quick toggle bookmark button to keep track of roles in `localStorage`.
6.  **Responsive Layout & Navbar:** Clean responsive design for mobile, tablet, and desktop with a hamburger menu drawer.
7.  **Theme Toggle:** Dark and Light mode support syncing with browser defaults and saving settings to the device.
8.  **Visual Polish:** Custom animated loading skeleton cards and empty search states.

---

## 🛠️ Tech Stack & Dependencies

*   **Core:** React 19 (Vite) & ES6+ JavaScript
*   **Styling:** Tailwind CSS v4 & Vanilla CSS variables
*   **Routing:** React Router DOM v7
*   **Utilities:** React Hot Toast, React Icons (`hi`, `fa`, `md`)
*   **Deployment:** Vercel

---

## ⚙️ How to Setup & Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/venkateshburra/JobSphere.git
    cd JobSphere
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run development server:**
    ```bash
    npm run dev
    ```
4.  **Build production artifacts:**
    ```bash
    npm run build
    ```

---

## 🔄 CI/CD Pipeline
This repository includes a pre-configured GitHub Actions pipeline at [deploy.yml](.github/workflows/deploy.yml) that:
1.  Runs code quality checkups and test builds on pushes to `main`.
2.  Automatically deploys verified builds to Vercel production hosting.
