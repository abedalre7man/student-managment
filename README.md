[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mZhVaZvy)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/pwM4Ru9N)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19133734&assignment_repo_type=AssignmentRepo)
Below is a professional and detailed `README.md` file for your **Student Management App** project. This README provides an overview of the project, instructions for setup, features, and additional details that will help users understand and run the app.

---

# Student Management App

A simple React-based application that allows users to perform CRUD (Create, Read, Update, Delete) operations on student records stored in a local JSON server. The app uses React state management, controlled forms, Fetch API for data interaction, custom hooks for reusable logic, and navigation using React Router.

##  Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

##  Features

- **CRUD Operations**: Add, view, edit, and delete student records.
- **State Management**: Manage student data using React's `useState` and `useEffect`.
- **Controlled Forms**: Use controlled components for form handling.
- **Navigation**: Navigate between views (e.g., Home, Add, Edit) using React Router.
- **Custom Hooks**: Reusable logic for fetching and updating data via the Fetch API.
- **Local JSON Server**: Simulate a backend API with a local JSON server.

---



## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/njuneidi/student-management-app.git
   cd student-management-app
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up JSON Server**:
   - Start the JSON server to simulate the backend:
     ```
     npm run server
     ```
   - The JSON server will run on `http://localhost:5000`.

4. **Start the Development Server**:
   In a new terminal, start the React development server:
   ```
   npm run dev
   ```
   - The app will be available at `http://localhost:5173` (or another port if specified).

---

##  Usage

### 1. View Students
- Navigate to the **Home** page (`/`) to see a list of all students.

### 2. Add a New Student
- Go to the **Add Student** page (`/add`) and fill out the form to add a new student.

### 3. Edit a Student Record
- Click the "Edit" button next to a student's name to update their details.

### 4. Delete a Student Record
- Click the "Delete" button next to a student's name to remove them from the list.

---

##  Project Structure

The project is organized as follows:

```
student-management-app/
├── public/               # Static assets (if any)
├── src/
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom hooks (e.g., useApi)
│   ├── pages/            # Page components (e.g., StudentList, AddStudent)
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point for the app
│   └── index.css         # Global styles
├── db.json               # Local JSON server database
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration
```

---

##  API Endpoints

The JSON server provides the following endpoints:

- **GET `/students`**: Retrieve all student records.
- **POST `/students`**: Add a new student record.
- **PUT `/students/:id`**: Update an existing student record.
- **DELETE `/students/:id`**: Delete a student record.

Example JSON structure:
```json
{
  "students": [
    { "id": 1, "name": "Alice", "age": 20, "grade": "A" },
    { "id": 2, "name": "Bob", "age": 22, "grade": "B" }
  ]
}
```



# student-management
