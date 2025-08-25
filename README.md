# Dbuzzz-frontend (React)

This is the frontend for a simple Task Manager (To-Do App) built with **React.js**.  
It works with the backend APIs for user authentication and task management.

---

## 📦 Technologies Used
- **React.js** - Frontend library  
- **Redux Toolkit** - Global state management  
- **React Router DOM** - Routing & protected routes  
- **Axios** - HTTP requests  
- **Formik & Yup** - Form handling & validation  
- **Tailwind CSS** - Styling  
- **React Toastify** - Notifications  

---

## 🚀 Features
- **User Authentication**:
  - Register & Login pages with form validation
  - JWT-based protected routes
- **Dashboard**:
  - Display tasks (CRUD operations)
  - Add, edit, and delete tasks
- **UI/UX**:
  - Responsive sidebar navigation
  - Toast notifications for success/error
- **State Management**:
  - Redux Toolkit for authentication and tasks

---

## 📁 Folder Structure
frontend/
│
├─ src/
│ ├─ components/ # Shared components (Dashboard, Task Tabs, ProtectedRoute)
│ ├─ features/ # Redux slices (authSlice, taskSlice)
│ ├─ pages/ # Pages (Login, Register, Dashboard)
│ ├─ services/ # Axios instance & API calls
│ ├─ App.jsx
│ └─ main.jsx
├─ public/
├─ package.json
└─ tailwind.config.js

 

## ⚡ Installation

1. Clone the repo:
```bash
git clone [https://github.com/yourusername/task-manager-frontend.git](https://github.com/vimalraj687/Dbuzzz-frontend.git)
cd task-manager-frontend
Install dependencies:

 
npm install
Create a .env file in the root directory with your backend URL:

 
🛠️ Running the App
Development:
 
npm run dev
Open your browser at http://localhost:5173 (Vite default).
 
