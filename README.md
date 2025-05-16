<img width="1440" alt="Screenshot 2025-05-16 at 1 15 48 PM" src="https://github.com/user-attachments/assets/266f9456-816d-4ce6-9eb1-649f27889ab1" /># Expense_Tracker
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


 ### 📊**Charts & Visualization**
	•	Line & Pie Charts with Chart.js and ApexCharts
	•	Real-time user statistics and admin-level visual insights

 ### ✅**Future Enhancements**
	•	Export expenses as PDF
	•	Monthly email reports
	•	Dark Mode
	•	OTP-based login

 ### ✅**Project Screenshot**

<img width="1440" alt="Screenshot 2025-05-16 at 1 16 06 PM" src="https://github.com/user-attachments/assets/0d0a5b46-b8e3-473d-a243-c52f2550161c" />
<img width="1439" alt="Screenshot 2025-05-16 at 1 16 16 PM" src="https://github.com/user-attachments/assets/5c08db62-7a9c-42e9-aade-84da7bc9cec3" />
<img width="1431" alt="Screenshot 2025-05-16 at 1 16 34 PM" src="https://github.com/user-attachments/assets/6c5e4235-c917-446e-956d-aa2a3b5591c1" />
<img width="1430" alt="Screenshot 2025-05-16 at 1 16 51 PM" src="https://github.com/user-attachments/assets/5a331636-20bb-464d-83e9-92366b052f0a" />
<img width="1440" alt="Screenshot 2025-05-16 at 1 17 06 PM" src="https://github.com/user-attachments/assets/0816f7e3-804f-4ef6-93a7-2231c6686c83" />
<img width="1438" alt="Screenshot 2025-05-16 at 1 17 25 PM" src="https://github.com/user-attachments/assets/d3224d0e-7336-4aae-8f9d-702aac71ab2b" />
<img width="1432" alt="Screenshot 2025-05-16 at 1 17 38 PM" src="https://github.com/user-attachments/assets/48710a0e-658a-40b2-ba92-c9d5d66af7b9" />
<img width="1435" alt="Screenshot 2025-05-16 at 1 17 53 PM" src="https://github.com/user-attachments/assets/524abc64-1323-4672-917e-6fc07b4b0ec3" />
<img width="1435" alt="Screenshot 2025-05-16 at 1 18 32 PM" src="https://github.com/user-attachments/assets/df7fd7ac-0594-45ba-a479-c14bad75339b" />
<img width="1433" alt="Screenshot 2025-05-16 at 1 18 43 PM" src="https://github.com/user-attachments/assets/904304c1-71a1-4ae3-9cac-6373a2797110" />
<img width="1433" alt="Screenshot 2025-05-16 at 1 19 15 PM" src="https://github.com/user-attachments/assets/9dbbb1c1-73e2-4312-b0b9-ed01a83250dd" />
<img width="1438" alt="Screenshot 2025-05-16 at 1 19 27 PM" src="https://github.com/user-attachments/assets/e2283181-ff10-4069-bea9-ecb74f5fbaa5" />



