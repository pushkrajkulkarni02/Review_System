# Project Report: Review System for Movies, Books & TV Series

## 1. Title & Team Details
*   **Project Title:** Multi-Category Review System (Movies, Books, and TV Series)
*   **Project Domain:** Full Stack Web Development
*   **Team Lead:** [Name]
*   **Core Developer:** [Name]
*   **Guide Name:** [Guide Name]
*   **Department:** Computer Engineering / Information Technology

---

## 2. Problem Statement
The current landscape of media reviews is highly fragmented. Users who want to track their progress or read reviews for different types of media must switch between platforms like IMDb (Movies), Goodreads (Books), and MyAnimeList (TV/Anime). This fragmentation leads to:
*   Difficulty in maintaining a unified "watchlist" or "readlist".
*   Inconsistent user experiences across different platforms.
*   Lack of a centralized community for diverse media enthusiasts.
*   Security concerns regarding open-access registration without moderation.

---

## 3. Objectives
The primary objective of this project is to develop a centralized, secure, and user-friendly platform for media enthusiasts.
*   **Unified Access:** One platform for Movies, Books, and TV Series.
*   **Role-Based Access Control:** Secure registration for Users and a moderated "Admin Approval" flow.
*   **Interactive Community:** Allow users to rate (1-5 stars) and write comprehensive reviews.
*   **Data Integrity:** Use a relational database (MySQL) to ensure consistency between media items and their reviews.
*   **Performance:** Implement a fast, modern frontend using React and Vite.

---

## 4. Literature Survey Summary
A comparative analysis of existing systems (IMDb, Letterboxd, Goodreads) revealed that while these platforms are excellent in their niches, there is a growing demand for "Integrated Entertainment Dashboards". 
*   **Tech Trend:** Transition from monolithic architectures to lightweight, API-driven architectures (like the one used in this project: Node/Express).
*   **UX Trend:** Preference for card-based designs and dark-mode aesthetics among younger demographics.
*   **Security Trend:** Adoption of Bcrypt for password hashing as a standard for safeguarding user data.

---

## 5. Existing System & Proposed System

### 5.1 Existing System
*   **Siloed Media:** Content restricted to one category per site.
*   **Registration:** Often either too open (spam issues) or too restricted (lengthy manual verification via email).
*   **Complex UI:** Heavy ad placement and cluttered interfaces.

### 5.2 Proposed System
*   **Hybrid Platform:** Merges Movies, Books, and TV Series into a single account.
*   **Admin-Vetted Registration:** New admins must be approved by the main administrator, ensuring only authorized personnel can manage content.
*   **Clean Minimalism:** A focus on posters and text readability.
*   **Real-time Interaction:** Immediate review updates using Express-based REST APIs.

---

## 6. System Architecture Diagram
The system follows a Three-Tier Architecture:
1.  **Presentation Tier:** React.js frontend providing the interface.
2.  **Application Tier:** Node.js/Express server handling the business logic.
3.  **Data Tier:** MySQL database for persistent storage.

(Visualized as: User -> React App -> Express API -> MySQL DB)

---

## 7. Methodology / Algorithms / Tools & Technologies Used

### Technologies
*   **Backend:** Node.js 20+, Express.js for routing.
*   **Frontend:** React 19, Vite (for building), Axios (for API communication).
*   **Database:** MySQL 8.0.
*   **Security:** `bcryptjs` for encryption.

### Algorithms
*   **Bcrypt Hashing (10 Rounds):** Used to transform plain-text passwords into secure hashes.
*   **Role-Based Authorization:** Middleware logic to determine permission levels (User vs. Pending Admin vs. Active Admin).
*   **Asynchronous Processing:** Use of `async/await` to handle database I/O without blocking the server main thread.

---

## 8. Database Design
The schema is designed to handle multiple media types with efficient cross-referencing.

*   **Users Table:** `id, name, email, password, role (user/admin), status (active/pending)`
*   **Role_Requests Table:** `id, name, email, role, status`
*   **Movies/Books/TVSeries Tables:** `id, title, description, poster_url, author_or_cast`
*   **Reviews Tables:** `id, media_id, user_name, rating, review_text, timestamp`

---

## 9. Implementation (Screenshots Analysis)
*   **Home Dashboard:** Features a dynamic grid of top-rated content across all categories.
*   **Content Details Page:** Displays high-resolution posters alongside a list of user reviews.
*   **Auth Flow:** Separate logic for user login and admin approval requests.
*   **Admin Panel:** A restricted area for adding new media entries (Movies, Books, etc.).

---

## 10. Results & Performance Analysis
*   **Functional Testing:** All CRUD (Create, Read, Update, Delete) operations for reviews verified.
*   **Security Testing:** Unauthorized users are successfully blocked from accessing Admin-only routes.
*   **Load Testing:** MySQL successfully handles concurrent review submissions with minimal latency (<100ms).
*   **Compatibility:** Fully responsive across mobile, tablet, and desktop viewports.

---

## 11. Conclusion
The "Review System" successfully addresses the problem of fragmented media tracking by providing a unified, secure platform. The integration of a moderated admin approval system significantly enhances the security and quality of the platform's content.

---

## 12. Future Scope
*   **Integrated Search:** Adding a global search bar with auto-suggestions.
*   **Mobile App:** Development of a React Native application for on-the-go reviewing.
*   **Social Features:** Implementing a "Following" system to see reviews from friends.
*   **Recommendation Engine:** Using basic collaborative filtering to suggest content based on user ratings.
