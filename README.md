# Class Tracker Attendance System

A lightweight, browser-based app for recording and reviewing student attendance. No installation, no build step, no backend: open it in a browser and start taking attendance.

**Live demo:** [https://casymany.github.io/class-tracker-attendance](https://casymany.github.io/class-tracker-attendance)
*(Enable GitHub Pages under Settings → Pages → Deploy from branch `main` to make this link work.)*

![Class Tracker Attendance screenshot](screenshots/preview.png)
*(Replace with a real screenshot or GIF of your app.)*

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Data Storage](#data-storage)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## About

Paper registers are slow to fill, easy to lose and hard to total up at the end of a semester. Class Tracker Attendance replaces them with a simple web interface where a lecturer or class representative can mark who is present or absent, keep a record per class session, and see attendance at a glance.

## Features

- **Mark attendance** for each student as present or absent
- **Manage students:** add and remove students from the class list
- **Date-based records:** save attendance per session and review past records
- **Attendance summary:** see totals or percentages per student
- **Responsive layout:** works on desktop, tablet and phone
- **Works offline:** runs entirely in the browser

> Edit this list so it matches exactly what your app does. Specific features are more convincing than general ones.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 |
| Styling | CSS3 (Flexbox / Grid) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |

## Getting Started

### Prerequisites

Any modern web browser (Chrome, Firefox, Edge or Safari). Git is optional.

### Run locally

```bash
# 1. Clone the repository
git clone https://github.com/easymany/class-tracker-attendance.git

# 2. Move into the project folder
cd class-tracker-attendance

# 3. Open index.html in your browser
#    macOS:   open index.html
#    Windows: start index.html
#    Linux:   xdg-open index.html
```

You can also download the repository as a ZIP from GitHub, extract it and double-click `index.html`.

## How to Use

1. Open the app in your browser.
2. Add your students to the class list.
3. Pick the date or class session.
4. Mark each student as present or absent.
5. Save the record and review it any time from the records view.

## Data Storage

Attendance data is saved in your browser's `localStorage`. This means:

- Data stays on your device and is never sent to a server.
- Data is **per browser and per device**. Records made on your laptop will not appear on your phone.
- Clearing your browser's cache or site data **will erase your records**.

> If your app stores data differently, update this section.

## Project Structure

```
class-tracker-attendance/
├── index.html      # Page structure
├── style.css       # Styling and layout
├── script.js       # Application logic
├── screenshots/    # Images used in this README
├── LICENSE         # MIT License
└── README.md
```

> Make sure this tree matches your actual files.

## Future Improvements

- [ ] Export attendance records to CSV or PDF
- [ ] Lecturer login and authentication
- [ ] Backend (Node.js and Express) with a database (MongoDB or PostgreSQL) for shared, permanent storage
- [ ] Support for multiple classes and courses
- [ ] Charts and analytics for attendance trends
- [ ] Automatic alerts for students below an attendance threshold

## Contributing

Suggestions and pull requests are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**casymany**
GitHub: [@casymany](https://github.com/casymany)

If you find this project useful, consider giving it a star.
