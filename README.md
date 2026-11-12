# Help Study Abroad — Admin Dashboard

A responsive admin dashboard built with **Next.js, React, Material UI, Zustand, and NextAuth.js**. It provides authenticated access to user and product data through the DummyJSON REST API.

## Features

- **Authentication:** Credentials-based login using NextAuth.js and DummyJSON.
- **Protected routes:** Dashboard pages require an authenticated session.
- **Session persistence:** Authentication remains active across page refreshes.
- **Dashboard overview:** Dedicated dashboard landing page.
- **User management:** Browse users with search, pagination, and user information including name, email, gender, phone, and company.
- **User details:** View an individual user's profile, personal information, address, and company details.
- **Product management:** Browse products with search, category filtering, and pagination.
- **Product details:** View product images through an interactive carousel, along with pricing, ratings, availability, and specifications.
- **State management:** Zustand stores manage shared application and API data.
- **API caching:** Reuses cached responses and deduplicates concurrent requests.
- **Responsive UI:** Material UI layouts adapt to desktop and mobile screens.
- **Logout:** Ends the authentication session and returns the user to the login page.

## Tech Stack

- Next.js (App Router)
- React
- Material UI (MUI)
- Zustand
- NextAuth.js v4
- DummyJSON REST API
- JavaScript

## Getting Started

### Prerequisites

- Node.js and npm
- Git

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/kritikasaini2006-alt/help-study-abroad-dashboard.git
cd help-study-abroad-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_with_your_generated_secret
```

Generate a secure secret using:

```bash
openssl rand -base64 32
```

Replace the placeholder with the generated value. Keep `.env.local` private and never commit secrets to GitHub.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Login

Use the following DummyJSON demo credentials:

- **Username:** `emilys`
- **Password:** `emilyspass`

These are public demonstration credentials, not production administrator credentials.

## API Endpoints

This project uses the [DummyJSON API](https://dummyjson.com/) for authentication and sample data.

### Authentication

- `POST /auth/login`

### Users

- `GET /users?limit=10&skip=0`
- `GET /users/search?q=...`
- `GET /users/{id}`

### Products

- `GET /products?limit=10&skip=0`
- `GET /products/search?q=...`
- `GET /products/categories`
- `GET /products/category/{category}`
- `GET /products/{id}`

The application uses API-side pagination where supported by the endpoint.

## State Management — Why Zustand?

Zustand was chosen because it provides simple, lightweight global state management with minimal boilerplate.

It allows shared API data and asynchronous fetching actions to be organized in reusable stores without requiring the additional setup associated with more complex state-management solutions.

In this project, Zustand helps centralize user and product data, loading and fetching logic, and reusable API actions. This keeps components focused on rendering the interface while making state easier to maintain.

## API Caching Strategy

The project uses a lightweight in-memory cache to reduce repeated API requests.

- **Cache lifetime:** Cached entries remain valid for 60 seconds.
- **Cache reuse:** Repeated requests can reuse valid cached responses.
- **Request deduplication:** Concurrent requests for the same resource can share an in-flight promise.
- **Expiration:** Expired entries can be fetched again.
- **Persistence:** The cache exists in application memory and is cleared when the application page is fully reloaded.

This approach reduces unnecessary network requests while keeping the implementation simple for an assessment project.

## Project Structure

```text
src/app/
├── api/
│   └── auth/
│       └── [...nextauth