# Expense_Tracker
A full-featured Expense Tracker Application built with React, Node.js, and MySQL. It supports two types of users: Admin and User, each with their own dashboards, features, and data access capabilities.

## 🧑‍💼 User Credentials

| Role  | Email                | Password   |
|-------|----------------------|------------|
| User  | shubham@gmail.com    | User@123   |
| Admin | admin@gmail.com      | Admin@123  |


## 📚 Features

### 🧑‍💻 User Module
- ✅ **Register/Login**
- 📊 **Statistics Dashboard**
  - **Statistic 1**: Top 3 days by total expenditure (Line & Pie Chart)
  - **Statistic 2**: % change in monthly expenditure vs previous month (Line & Pie Chart)
  - **Statistic 3**: Predicted expenditure for next month using last 3 months' average (Line & Pie Chart)
- ➕ **Add Expense**: Category, Date, Amount, Description
- 📃 **Expense List**:
  - Filter by Category, Date Range
  - Edit & Delete Expense

### 🛠️ Admin Module
- 📊 **Admin Dashboard**:
  - View total expense per category (Line & Pie Chart)
- 👥 **User Management**:
  - View all users
  - View/Edit/Delete user's expenses
  - Delete users

## 🛠️ Tech Stack

### Frontend:
- React.js, Vite
- TailwindCSS, MUI (Material UI)
- Chart.js, React-ApexCharts
- React Router DOM
- Formik + Yup for form handling & validation
- Axios

### Backend:
- Node.js, Express.js
- MySQL2, Joi for validation
- JWT for authentication
- Helmet, CORS, Rate Limiting for security


### 🔒**Middleware & Validations**
	•	Backend and frontend form validations using Joi & Yup.
	•	Middleware includes:
	•	Authentication
	•	Role-based Authorization
	•	Rate Limiting
	•	Error Handling
	•	Security headers via Helmet

 ### 🚀**Getting Started Locally***

🔧 Prerequisites
	•	Node.js v18+
	•	MySQL Server
	•	Vite (comes with project)

 ### 📦**Install Dependencies**

 # Frontend
  cd PROJECT-FRONTEND
  npm install

# Backend
  cd EXPENSE-TRACKER-BACKEND
  npm install

### 🧪**Run the Project**
  # Run Backend
    npm run dev

# Run Frontend
  npm run dev

 ### 📊**Charts & Visualization**
	•	Line & Pie Charts with Chart.js and ApexCharts
	•	Real-time user statistics and admin-level visual insights

 ### ✅**Future Enhancements**
	•	Export expenses as PDF
	•	Monthly email reports
	•	Dark Mode
	•	OTP-based login

 ### ✅**Project Screenshot**

 **User Side**

 <img width="1436" alt="Screenshot 2025-05-15 at 10 58 06 PM" src="https://github.com/user-attachments/assets/c4950224-824b-403d-a16b-9d6634fceb9c" />

 <img width="1440" alt="Screenshot 2025-05-15 at 10 59 04 PM" src="https://github.com/user-attachments/assets/f9ab815d-54aa-4c0c-8ad4-6d996367bd52" />

 <img width="1196" alt="Screenshot 2025-05-15 at 10 59 31 PM" src="https://github.com/user-attachments/assets/ee5c9fd9-adc2-4c14-a998-14ec99dcbed1" />

<img width="1199" alt="Screenshot 2025-05-15 at 10 59 47 PM" src="https://github.com/user-attachments/assets/6ea5911d-c89d-42c8-8a51-602d3b1a152b" />

<img width="1212" alt="Screenshot 2025-05-15 at 11 00 00 PM" src="https://github.com/user-attachments/assets/30d90b1e-3d8e-4be4-8fbc-48daf81cf374" />

<img width="1201" alt="Screenshot 2025-05-15 at 11 00 15 PM" src="https://github.com/user-attachments/assets/34d1fab8-4414-4dc7-ac93-3434de3d1725" />

<img width="1432" alt="Screenshot 2025-05-15 at 11 00 37 PM" src="https://github.com/user-attachments/assets/122de17b-e2ee-4b8d-88af-65f7f16f4bbd" />

<img width="1439" alt="Screenshot 2025-05-15 at 11 00 50 PM" src="https://github.com/user-attachments/assets/748b06ae-5c6e-44bd-ade6-1b586908de8f" />

<img width="1440" alt="Screenshot 2025-05-15 at 11 01 08 PM" src="https://github.com/user-attachments/assets/de219b80-011d-42db-b1ea-d99b455fe1e1" />

**Admin Side**
<img width="1436" alt="Screenshot 2025-05-15 at 11 02 33 PM" src="https://github.com/user-attachments/assets/83902158-8806-4548-becf-b7846af47738" />

<img width="1430" alt="Screenshot 2025-05-15 at 11 02 56 PM" src="https://github.com/user-attachments/assets/adcfa740-b2fc-4b24-a678-07bc29f7d9f7" />

<img width="1437" alt="Screenshot 2025-05-15 at 11 03 08 PM" src="https://github.com/user-attachments/assets/9eba32ff-2f13-43f4-ba21-49c1f8aeb3b9" />


**For Login/Register**
<img width="1423" alt="Screenshot 2025-05-15 at 11 03 51 PM" src="https://github.com/user-attachments/assets/80f0ca3b-a2f9-4a39-bd3c-22e5387a1af5" />

<img width="1420" alt="Screenshot 2025-05-15 at 11 04 04 PM" src="https://github.com/user-attachments/assets/17165fc0-870f-4cbf-90e2-d4329f293f53" />


