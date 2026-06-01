<img width="1920" height="818" alt="{A37FDA76-1F91-41AF-A486-1794DFDA2B0F}" src="https://github.com/user-attachments/assets/8620aedb-9e98-4ea1-aa06-2466f8c95760" />

# 🚀 Blog Management System

A full-stack MERN Blog Management System built with **React, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, and Mongoose**. This application allows users to create, view, edit, delete, search, and export blog posts through a modern and responsive dashboard.

---

## 📌 Features

### 📝 Blog Post Management

* Create new blog posts
* View complete blog post details
* Edit existing blog posts
* Delete blog posts

### 🔍 Search & Filter

* Search posts by title
* Search posts by author
* Search posts by category

### 📊 Dashboard

* Modern responsive UI
* Pagination support
* Status badges (Published / Draft)
* Action dropdown menu

### 📤 Export Functionality

* Export all blog posts as CSV

### 🎨 Modern UI

* Tailwind CSS styling
* Responsive design
* Clean dashboard layout
* Professional form design

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Deployment

* Render (Frontend)
* Render (Backend)
* MongoDB Atlas

---

# 📂 Project Structure

```bash
Blog-Management-System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── styles
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/Blog-Management-System.git
```

```bash
cd Blog-Management-System
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=3000
MONGOOSE_URL=your_mongodb_connection_string
```

Run backend

```bash
npm run dev
```

or

```bash
npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Start frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📡 API Endpoints

## Get All Posts

```http
GET /api/posts
```

---

## Get Single Post

```http
GET /api/posts/:id
```

---

## Create Post

```http
POST /api/posts
```

---

## Update Post

```http
PUT /api/posts/:id
```

---

## Delete Post

```http
DELETE /api/posts/:id
```

---

## Search Posts

```http
GET /api/posts/search?q=react
```

---

## Export CSV

```http
GET /api/posts/export/csv
```

---

# 📸 Screenshots

### Dashboard

* Blog listing page
* Search functionality
* Pagination
* Action menu

### Add Post

* Create new blog posts
* Form validation
* Category and status selection

### Edit Post

* Update existing posts
* Prefilled data
* Save changes instantly

### View Post

* Detailed blog information
* Content preview
* Author information

---

# ☁️ Deployment

## Backend Deployment (Render)

1. Create Web Service
2. Connect GitHub Repository
3. Root Directory:

```bash
backend
```

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Add Environment Variables:

```env
PORT=10000
MONGOOSE_URL=your_mongodb_connection_string
```

---

## Frontend Deployment (Render)

Create Static Site

Root Directory:

```bash
frontend
```

Build Command:

```bash
npm install && npm run build
```

Publish Directory:

```bash
dist
```

---

# 🔐 MongoDB Atlas Configuration

Add the following IP to Atlas Network Access:

```txt
0.0.0.0/0
```

This allows Render services to connect to MongoDB Atlas.
