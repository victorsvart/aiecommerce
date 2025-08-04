# Deployment Guide for AiECommerce

This guide will walk you through deploying your AiECommerce application to Vercel.

## Prerequisites

- A Git repository (GitHub, GitLab, or Bitbucket)
- A PostgreSQL database (Vercel Postgres, Neon, or Supabase)
- An OpenAI API key
- A Vercel account

## Step 1: Prepare Your Repository

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify your project structure**
   ```
   aiecommerce/
   ├── app/
   ├── components/
   ├── lib/
   ├── prisma/
   ├── public/
   ├── package.json
   ├── next.config.ts
   ├── vercel.json
   ├── env.example
   └── README.md
   ```

## Step 2: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. **Create Vercel Postgres**
   - Go to your Vercel dashboard
   - Navigate to "Storage" → "Create Database"
   - Choose "Postgres"
   - Select your region
   - Create the database

2. **Get your connection string**
   - Copy the `DATABASE_URL` from Vercel Postgres settings
   - This will be automatically available as an environment variable

### Option B: External PostgreSQL

1. **Set up a PostgreSQL database**
   - [Neon](https://neon.tech) (serverless)
   - [Supabase](https://supabase.com) (with additional features)
   - [Railway](https://railway.app) (easy setup)

2. **Get your connection string**
   - Format: `postgresql://username:password@host:port/database`

## Step 3: Deploy to Vercel

1. **Connect your repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your Git provider
   - Click "New Project"
   - Import your repository

2. **Configure project settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

3. **Set environment variables**
   In your Vercel project settings → Environment Variables, add:

   ```env
   # Database
   DATABASE_URL="your-postgres-connection-string"
   
   # Security
   SECRET_KEY="your-secret-key-at-least-32-characters-long"
   
   # Sample user
   SAMPLE_USER_PASSWORD="your-sample-user-password"
   
   # OpenAI
   OPEN_API_KEY="your-openai-api-key"
   
   # Environment
   NODE_ENV="production"
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

## Step 4: Set Up Database Schema

After deployment, you need to run database migrations:

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Pull environment variables**
   ```bash
   vercel env pull .env.local
   ```

4. **Run database migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

### Method 2: Using Vercel Postgres Dashboard

If using Vercel Postgres:
1. Go to your Vercel dashboard
2. Navigate to your Postgres database
3. Use the SQL editor to run migrations manually

### Method 3: Using Database Provider Dashboard

For external databases:
1. Use your database provider's dashboard
2. Run the SQL commands from `prisma/migrations/`

## Step 5: Verify Deployment

1. **Check your live URL**
   - Your app will be available at `https://your-project-name.vercel.app`

2. **Test the application**
   - Visit the homepage
   - Test user registration/login
   - Test AI search functionality
   - Test shopping cart
   - Test checkout process

3. **Check health endpoint**
   - Visit `https://your-project-name.vercel.app/api/health`
   - Should return a JSON response with status "healthy"

## Step 6: Custom Domain (Optional)

1. **Add custom domain**
   - Go to your Vercel project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **Configure SSL**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Database connection errors**
   - Verify `DATABASE_URL` is correct
   - Check if database is accessible from Vercel
   - Ensure database schema is set up

3. **Environment variables not working**
   - Verify all required variables are set in Vercel
   - Check variable names match exactly
   - Redeploy after adding variables

4. **API routes not working**
   - Check function timeout settings in `vercel.json`
   - Verify API route structure
   - Check serverless function logs

### Debugging

1. **View function logs**
   - Go to Vercel dashboard → Functions
   - Check logs for errors

2. **Test locally with production env**
   ```bash
   vercel env pull .env.local
   npm run build
   npm start
   ```

3. **Check Prisma client**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Performance Optimization

1. **Enable caching**
   - Vercel automatically caches static assets
   - Consider adding cache headers for API routes

2. **Optimize images**
   - Use Next.js Image component
   - Configure image domains in `next.config.ts`

3. **Monitor performance**
   - Use Vercel Analytics
   - Monitor Core Web Vitals

## Security Considerations

1. **Environment variables**
   - Never commit sensitive data to Git
   - Use Vercel's environment variable system

2. **Database security**
   - Use connection pooling
   - Enable SSL for database connections

3. **API security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS only

## Maintenance

1. **Regular updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities

2. **Database backups**
   - Set up automated backups
   - Test restore procedures

3. **Monitoring**
   - Set up uptime monitoring
   - Monitor error rates
   - Track performance metrics

## Support

If you encounter issues:

1. **Check Vercel documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Review build logs** in Vercel dashboard
3. **Check Next.js deployment guide**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
4. **Open an issue** on the project repository

---

Your AiECommerce application should now be successfully deployed and running on Vercel! 🎉 