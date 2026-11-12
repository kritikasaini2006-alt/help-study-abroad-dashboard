# Help Study Abroad — Admin Dashboard

A responsive admin dashboard built with Next.js, Material UI, Zustand, and NextAuth.js. The application provides authenticated access to user and product data using the DummyJSON API.

## Features

- **Authentication:** Credentials-based login using NextAuth.js and DummyJSON.
- **Protected routes:** Dashboard pages require an authenticated session.
- **Session persistence:** Authentication remains active across page refreshes.
- **Dashboard overview:** Dedicated dashboard landing page.
- **Users management:** Browse users in a table with search and pagination.
- **Products management:** Browse products with search, category filtering, and pagination.
- **Product details:** View individual product information.
- **State management:** Zustand stores manage authentication and API data.
- **API caching:** Reuses cached API responses to reduce repeated requests.
- **Responsive interface:** Material UI components adapt to desktop and mobile screens.
- **Logout:** Ends the NextAuth session and redirects to the login page.

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
- Git (optional, for version control)

### Installation

Clone the repository, then navigate into the project directory:

```bash
git clone https://github.com/kritikasaini2006-alt/help-study-abroad-dashboard
cd help-study-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

Generate a secret using:

```bash
openssl rand -base64 32
```

Replace `your_generated_secret` with the generated value. Never commit `.env.local` or expose your secret publicly.

### Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Test Login

Use the following DummyJSON test account:

- Username: `emilys`
- Password: `emilyspass`

These are public demo credentials for testing, not production administrator credentials.

## API

This project uses the [DummyJSON API](https://dummyjson.com/) for authentication and sample data.

- Authentication: `POST /auth/login`
- Users: `/users`
- User search: `/users/search?q=...`
- Products: `/products`
- Product search: `/products/search?q=...`
- Product categories: `/products/categories`
- Products by category: `/products/category/{category}`
- Product details: `/products/{id}`

## Project Structure

```text
src/app/
├── api/auth/[...nextauth]/
│   └── route.js
├── components/
│   ├── AuthGuard.js
│   └── DashboardLayout.js
├── dashboard/
│   ├── page.js
│   ├── users/
│   └── products/
├── store/
│   ├── authStore.js
│   └── apiStore.js
├── utils/
│   └── apiCache.js
├── layout.js
├── page.js
└── theme.js
```

## Security Notes

- Keep environment variables and secrets out of version control.
- DummyJSON is a demo API; this project is intended for assessment and demonstration.
- Production deployments should use a secure, production-ready authentication and authorization strategy.

## License

Add a license if you intend to distribute this project publicly.
