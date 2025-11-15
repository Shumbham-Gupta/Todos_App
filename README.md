# Todo List Application - Full Stack TypeScript

A complete Todo List application built with React TypeScript (Frontend) and Node.js TypeScript (Backend).

## ✨ Features

### Authentication
- ✅ User Signup with validation
- ✅ User Sign-in with JWT
- ✅ Forgot Password functionality
- ✅ Reset Password with token verification

### Todo Management
- ✅ Create Todo
- ✅ List all Todos
- ✅ Update Todo
- ✅ Delete Todo
- ✅ Mark Todo as completed/not completed

### Technical Implementation
- ✅ **Backend**: Node.js + Express + TypeScript
- ✅ **Frontend**: React + TypeScript
- ✅ **State Management**: Zustand
- ✅ **Data Fetching**: React Query with Zod validation
- ✅ **Forms**: React Hook Form with Zod resolver
- ✅ **Routing**: React Router v6
- ✅ **Error Logging**: All errors logged to MongoDB
- ✅ **Database**: MongoDB (Atlas compatible)

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
```bash
mkdir todo-backend
cd todo-backend
```

2. **Initialize and install dependencies**
```bash
npm init -y
# Copy package.json content from the artifact
npm install
```

3. **Create project structure**
```bash
mkdir -p src/models src/routes src/middleware
```

4. **Copy all backend TypeScript files** from the artifacts:
   - `tsconfig.json`
   - `src/server.ts`
   - `src/models/index.ts`
   - `src/middleware/auth.ts`
   - `src/middleware/errorHandler.ts`
   - `src/routes/auth.ts`
   - `src/routes/todos.ts`

5. **Configure environment variables**
```bash
# Create .env file
cp .env.example .env
```

Edit `.env` with your MongoDB Atlas credentials:
```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/todoapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
```

6. **MongoDB Atlas Setup**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Whitelist your IP (or use 0.0.0.0/0 for development)
   - Copy the connection string to `.env`

7. **Run the backend**
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Backend will run on: `http://localhost:5000`

---

### Frontend Setup

1. **Navigate to frontend directory**
```bash
mkdir todo-frontend
cd todo-frontend
```

2. **Initialize Vite project**
```bash
npm create vite@latest . -- --template react-ts
```

3. **Install dependencies**
```bash
# Copy package.json dependencies from artifact
npm install react-router-dom zustand @tanstack/react-query react-hook-form zod @hookform/resolvers axios
```

4. **Create project structure**
```bash
mkdir -p src/components src/pages src/hooks src/services src/store src/types src/lib
```

5. **Copy all frontend TypeScript files** from the artifacts:
   - `vite.config.ts`
   - `tsconfig.json`
   - `index.html`
   - `src/main.tsx`
   - `src/App.tsx`
   - `src/index.css`
   - `src/types/index.ts`
   - `src/lib/api.ts`
   - `src/store/authStore.ts`
   - `src/services/authService.ts`
   - `src/services/todoService.ts`
   - `src/hooks/useAuth.ts`
   - `src/hooks/useTodos.ts`
   - `src/components/ProtectedRoute.tsx`
   - `src/pages/SignUp.tsx`
   - `src/pages/SignIn.tsx`
   - `src/pages/ForgotPassword.tsx`
   - `src/pages/ResetPassword.tsx`
   - `src/pages/Todos.tsx`

6. **Configure environment variables**
```bash
# Create .env file
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

7. **Run the frontend**
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Todos (Protected Routes)
- `GET /api/todos` - List all user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

---

## 🧪 Testing the Application

1. **Start backend**: `cd todo-backend && npm run dev`
2. **Start frontend**: `cd todo-frontend && npm run dev`
3. **Open browser**: Navigate to `http://localhost:3000`

### Test Flow:
1. Sign up with a new account
2. Sign in with credentials
3. Create some todos
4. Mark todos as complete
5. Edit todos
6. Delete todos
7. Test forgot/reset password flow

---

## 📦 Project Structure

### Backend
```
todo-backend/
├── src/
│   ├── models/
│   │   └── index.ts          # User, Todo, ErrorLog models
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication
│   │   └── errorHandler.ts  # Error logging middleware
│   ├── routes/
│   │   ├── auth.ts           # Authentication routes
│   │   └── todos.ts          # Todo CRUD routes
│   └── server.ts             # Express server setup
├── package.json
├── tsconfig.json
└── .env
```

### Frontend
```
todo-frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── SignUp.tsx
│   │   ├── SignIn.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   └── Todos.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useTodos.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── todoService.ts
│   ├── store/
│   │   └── authStore.ts      # Zustand state
│   ├── types/
│   │   └── index.ts          # Zod schemas & types
│   ├── lib/
│   │   └── api.ts            # Axios config
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env
```

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Request validation with express-validator
- Secure password reset flow
- Error logging without exposing sensitive data

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **React Query** - Data fetching
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

---

## 📝 Notes

- Error logs are automatically stored in MongoDB's `errorlogs` collection
- JWT tokens expire after 7 days
- Password reset tokens expire after 1 hour
- All TypeScript files are strictly typed (no JavaScript files)
- Development reset token is returned in API response for testing

---

## 🚀 Deployment Tips

### Backend (Render)
```bash
npm run build
# Set environment variables on platform
# Start with: npm start
```

### Frontend (render/vercel)
```bash
npm run build
# Deploy dist folder
# Set VITE_API_URL to production API
```

---

## 📄 License

MIT License - Feel free to use this project for learning and development!

---

## 👨‍💻 Author

Built with ❤️ using TypeScript, React, and Node.js
