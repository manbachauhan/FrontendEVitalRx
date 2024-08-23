# 🌟 Frontend: React.js with Tailwind CSS

This is the frontend for the full-stack project built with React.js and Tailwind CSS. It provides the user interface for the application, handling all client-side interactions and communication with the backend API.

## 🚀 Features

- **User Authentication**: Login, Signup, Forgot Password, and Reset Password functionality.
- **Profile Management**: Update and view user profiles.
- **Responsive Design**: Modern, responsive design using Tailwind CSS.
- **Form Validation**: Implemented using Yup and React-Hook-Form.
- **Protected Routes**: Ensure users are authenticated to access certain pages.

## 🏗️ Project Structure

- **Frontend**: React.js
- **Styling**: Tailwind CSS

## 📂 Installation and Setup

### 1. Clone the Repository
```bash
https://github.com/manbachauhan/FrontendEVitalRx.git
cd your-repo/FrontendEVitalRx
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Variables
 - Create a .env file in the frontend directory with the following variable
```bash
REACT_APP_API_URL=your_backend_api_url
```
### 4. Run the Frontend Server

```bash
npm run dev
```
- The frontend will run on http://localhost:5173.

## 🚀 Deployment
 ### Deploy on Vercel
 - Sign Up/Login: Create an account or log in to Vercel at Vercel.
 - Import Project: Connect your GitHub repository and import the frontend project.
 - Configure Environment Variables: Set the REACT_APP_API_URL environment variable in the Vercel dashboard.
 - Deploy: Vercel will automatically build and deploy your frontend application.
 #### Deployed frontend  : https://frontend-e-vital-rx.vercel.app/

## 🧪 API Integration
This frontend interacts with the following backend endpoints:

- Signup: /api/auth/signup
- Login: /api/auth/login
- Forgot Password: /api/auth/forgot-password
- Reset Password: /api/auth/reset-password
- Get Profile: /api/profile
- Update Profile: /api/update

## 🎨 Design
The application uses Tailwind CSS for styling, providing a clean and modern user interface. The design is responsive and optimized for different screen sizes.

## 🤝 Contributing
Contributions are welcome! Please submit a Pull Request to improve the frontend. 

happy coding!🤝
