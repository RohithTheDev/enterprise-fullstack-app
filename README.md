# 📱 RP Digital Hub Application

[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203-brightgreen)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Frontend-Angular%2017-red)](https://angular.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Container-Docker-blue)](https://www.docker.com/)

A comprehensive full-stack solution for managing a mobile showroom, featuring a robust Spring Boot backend with JWT security and a dynamic Angular frontend.

---

## 🚀 Features

- **User Authentication**: Secure Login/Signup using JWT (JSON Web Tokens).
- **Product Management**: Browse, search, and view detailed mobile specifications.
- **Category Management**: Organize products by brands and types.
- **Order System**: Add products to cart and place orders.
- **Role-Based Access**: Different permissions for Users and Admins.
- **Dockerized**: Easy deployment using Docker and Docker Compose.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL
- **Build Tool**: Maven

### Frontend
- **Framework**: Angular
- **Language**: TypeScript
- **Styling**: Bootstrap / CSS
- **State Management**: RxJS

---

## 📂 Project Structure

```text
mobile-showroom/
├── backend/            # Spring Boot Application
│   ├── src/            # Source code
│   └── pom.xml         # Maven dependencies
├── frontend/           # Angular Application
│   ├── src/            # Source code
│   └── package.json    # NPM dependencies
├── docker-compose.yml  # Docker orchestration
└── deploy.bat          # One-click deployment script (Windows)
```

---

## 🚦 Getting Started

### Prerequisites

- **Docker Desktop** (Recommended)
- **Java 17 JDK** (For local development)
- **Node.js 18+** (For local development)
- **PostgreSQL** (For local development)

### 🐳 Option 1: Using Docker (Quickest)

1. Clone the repository.
2. Run the deployment script:
   ```powershell
   .\deploy.bat
   ```
   *Alternatively, run:* `docker-compose up --build`

3. **Access the Apps:**
   - **Frontend**: [http://localhost:4200](http://localhost:4200)
   - **Backend API**: [http://localhost:8080](http://localhost:8080)
   - **Database**: `localhost:5432`

---

### 💻 Option 2: Local Development

#### 1. Database Setup
Create a PostgreSQL database named `mobileshowroom`. Update credentials in `backend/src/main/resources/application.properties`.

#### 2. Run Backend
```bash
cd backend
mvn spring-boot:run
```

#### 3. Run Frontend
```bash
cd frontend
npm install
npm start
```
Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## 🌐 Deployment

### 1. Backend (Spring Boot)
The backend requires a Java runtime and a PostgreSQL database. It is recommended to deploy it to a platform like **Railway**, **Render**, or **AWS**.
- **Environment Variables**:
  - `SPRING_DATASOURCE_URL`: PostgreSQL connection string.
  - `SPRING_DATASOURCE_USERNAME`: Database username.
  - `SPRING_DATASOURCE_PASSWORD`: Database password.
  - `JWT_SECRET`: A secure random string for JWT signing.
  - `ALLOWED_ORIGIN`: The URL of your deployed frontend (e.g., `https://your-app.vercel.app`).

### 2. Frontend (Angular) on Vercel
1. Push your code to a GitHub repository.
2. Connect the repository to **Vercel**.
3. Vercel will automatically detect the Angular project.
4. Update the `destination` URL in [vercel.json](file:///d:/RP%20Digital%20Hub/mobile-showroom/vercel.json) to point to your deployed backend.

---

## 🛠️ Troubleshooting

- **Docker Issues**: Ensure Docker Desktop is running. If `deploy.bat` fails, try running `docker-compose down -v` and then `docker-compose up`.
- **Port Conflicts**: Ensure ports `8080`, `4200`, and `5432` are not being used by other applications.
- **Database Connection**: Verify that your PostgreSQL service is running and the database `mobileshowroom` exists.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
