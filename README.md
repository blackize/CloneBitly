# Bitly Clone v1.0

A fully functional, modern URL shortening platform built with a high-performance tech stack. 

## 🚀 Features
- **URL Shortening**: Fast and reliable URL shortening with unique slugs.
- **Redirection**: Seamlessly redirect from shortened links to original URLs.
- **Click Tracking**: Analytics tracking for every link click, with denormalized counts for performance.
- **System Monitoring**: Integrated health checks for Backend, Database, and Redis.
- **Dockerized Architecture**: Easy setup and deployment using Docker Compose.

## 🛠 Tech Stack
- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework)
- **Frontend**: [Next.js](https://nextjs.org/) (React framework)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Caching/Queue**: [Redis](https://redis.io/)
- **Infrastructure**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 🚦 Getting Started

### Prerequisites
- Docker & Docker Compose installed on your machine.

### Local Development
1. **Clone the repository**:
   ```bash
   git clone https://github.com/blackize/CloneBitly.git
   cd CloneBitly
   ```

2. **Spin up the services**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure
- `/backend`: NestJS application logic, Prisma schema, and API endpoints.
- `/frontend`: Next.js web interface for link management.
- `docker-compose.yml`: Multi-container setup for the entire platform.

## 🔒 Security & Performance
- **Environment Isolation**: Secure configuration via `.env` files.
- **Asynchronous Tracking**: Click counts are updated asynchronously to ensure minimal latency during redirection.
- **Database Indexing**: Optimized queries using Prisma indices on slugs and timestamps.

## 📜 License
This project is [MIT licensed](https://github.com/blackize/CloneBitly/blob/main/LICENSE).
