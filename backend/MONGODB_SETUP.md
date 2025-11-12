# MongoDB Setup Guide

## Issue: MongoDB Connection Error

If you see this error:
```
Error: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

It means **MongoDB is not running** on your computer.

## Solutions

### Option 1: Start MongoDB Locally (Windows)

1. **If you have MongoDB installed:**
   - Open **MongoDB Compass** (GUI tool)
   - Or open Command Prompt/PowerShell as Administrator and run:
     ```bash
     mongod
     ```

2. **If MongoDB is installed as a Windows Service:**
   - Open **Services** (Win + R, type `services.msc`)
   - Find "MongoDB" service
   - Right-click → **Start**

3. **If MongoDB is not installed:**
   - Download from: https://www.mongodb.com/try/download/community
   - Install MongoDB Community Edition
   - During installation, choose "Install MongoDB as a Service"

### Option 2: Use MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Create a `.env` file in the `backend` folder:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/frappe-hr?retryWrites=true&w=majority
   ```
   Replace `username` and `password` with your Atlas credentials.

### Option 3: Use Docker

If you have Docker installed:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Verify MongoDB is Running

After starting MongoDB, you should see:
```
✅ MongoDB Connected: localhost
📊 Database: frappe-hr
```

## Current Connection String

The backend is configured to connect to:
- **Local**: `mongodb://localhost:27017/frappe-hr`
- **Custom**: Set `MONGO_URI` in `.env` file

## Need Help?

- Check MongoDB logs for errors
- Verify MongoDB is listening on port 27017
- Check Windows Firewall isn't blocking MongoDB
- Try connecting with MongoDB Compass to test the connection

