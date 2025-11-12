# API Setup Guide

## Environment Configuration

Create a `.env.local` file in the `hr-and-payroll` directory with the following:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend Setup

1. Make sure MongoDB is running on your system
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd hr-and-payroll
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

All HR API endpoints are available under `/api/hr`:

- **Employees**: `/api/hr/employees`
- **Holiday Lists**: `/api/hr/holiday-lists`
- **Leave Types**: `/api/hr/leave-types`
- **Leave Allocations**: `/api/hr/leave-allocations`
- **Leave Applications**: `/api/hr/leave-applications`

## Features Connected

✅ Employee management (Create, Read, Update, Delete)
✅ Leave Application management (Create, Read, Update, Delete, Approve, Reject)
✅ Contexts updated to use API
✅ Components updated to handle async operations

## Testing

1. Start both backend and frontend servers
2. Navigate to the HR section in the frontend
3. Try creating an employee or leave application
4. Data should be saved to MongoDB and persist across page refreshes

