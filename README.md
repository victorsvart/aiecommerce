# AiECommerce

A modern e-commerce platform powered by AI search capabilities, built with Next.js, Prisma, and OpenAI.

## Features

- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 🔍 **AI-Powered Search** - Natural language product search using OpenAI
- 👤 **User Authentication** - Secure login/signup with JWT
- 💳 **Checkout System** - Complete payment flow with order confirmation
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** - Optimized for all devices
- 🔒 **Secure** - Protected routes and secure payment handling

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **AI Search**: OpenAI GPT-4 for natural language queries
- **Styling**: Tailwind CSS with Radix UI components
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aiecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/aiecommerce"
   SECRET_KEY="your-secret-key-at-least-32-characters-long"
   SAMPLE_USER_PASSWORD="your-sample-user-password"
   OPEN_API_KEY="your-openai-api-key"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### 1. Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Set Up Database

For production, you'll need a PostgreSQL database. Recommended options:
- **Vercel Postgres** (recommended for Vercel deployment)
- **Neon** (serverless PostgreSQL)
- **Supabase** (PostgreSQL with additional features)

### 3. Deploy to Vercel

1. **Connect your repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your Git provider
   - Click "New Project"
   - Import your repository

2. **Configure environment variables**
   In your Vercel project settings, add these environment variables:
   ```env
   DATABASE_URL="your-production-database-url"
   SECRET_KEY="your-production-secret-key-at-least-32-characters"
   SAMPLE_USER_PASSWORD="your-sample-user-password"
   OPEN_API_KEY="your-openai-api-key"
   NODE_ENV="production"
   ```

3. **Deploy**
   - Vercel will automatically detect Next.js
   - Click "Deploy"
   - Wait for the build to complete

### 4. Set Up Database Schema

After deployment, you need to run database migrations:

1. **Access Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Run database migrations**:
   ```bash
   vercel env pull .env.local
   npx prisma db push
   npx prisma db seed
   ```

   Or use Vercel's built-in database setup if using Vercel Postgres.

### 5. Verify Deployment

Your app should now be live at `https://your-project-name.vercel.app`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `SECRET_KEY` | JWT secret (min 32 chars) | Yes |
| `SAMPLE_USER_PASSWORD` | Password for sample user | Yes |
| `OPEN_API_KEY` | OpenAI API key | Yes |
| `NODE_ENV` | Environment (dev/prod) | No |

## Project Structure

```
aiecommerce/
├── app/
│   ├── (pages)/           # Route groups
│   │   ├── admin/         # Admin dashboard
│   │   ├── auth/          # Authentication pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout flow
│   │   └── products/      # Product catalog
│   ├── actions/           # Server actions
│   ├── api/              # API routes
│   ├── components/        # Reusable components
│   └── lib/              # Utilities and config
├── components/            # UI components
├── lib/                  # Shared libraries
├── prisma/               # Database schema
└── public/              # Static assets
```

## Features in Detail

### AI-Powered Search
- Natural language product queries
- Intelligent filtering and categorization
- Real-time search suggestions

### Shopping Cart
- Persistent cart across sessions
- Quantity management
- Real-time total calculation

### Checkout System
- Secure payment processing
- Order confirmation
- Email notifications (simulated)

### Admin Dashboard
- Product management
- User management
- Order tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
