# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git
- Vercel account (recommended) or other hosting platform

## Local Development

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd uttt-web

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Payment
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
EMAIL_SERVER="smtp://..."
EMAIL_FROM="noreply@uttt.com"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="..."

# Feature Flags
NEXT_PUBLIC_ENABLE_TOURNAMENTS="true"
NEXT_PUBLIC_ENABLE_SHOP="true"
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Production Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables**
- Go to Vercel Dashboard
- Select your project
- Go to Settings > Environment Variables
- Add all production environment variables

5. **Deploy to Production**
```bash
vercel --prod
```

### Deploy to Other Platforms

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# Build Docker image
docker build -t uttt-web .

# Run container
docker run -p 3000:3000 uttt-web
```

## Database Setup

### PostgreSQL with Supabase

1. Create a Supabase project
2. Copy the connection string
3. Run migrations:

```bash
npm run db:migrate
```

### Database Migrations

```bash
# Create a new migration
npm run db:migrate:create

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:migrate:rollback
```

## Build Process

### Production Build

```bash
npm run build
```

This will:
- Compile TypeScript
- Optimize code
- Generate static pages
- Create optimized bundles

### Build Output

```
.next/
├── cache/              # Build cache
├── server/             # Server bundles
├── static/             # Static assets
└── ...
```

## Performance Optimization

### Enable Caching

Configure caching in `next.config.js`:

```javascript
module.exports = {
  // ... other config
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

### Enable Compression

```javascript
module.exports = {
  compress: true,
  // ...
}
```

### Image Optimization

Images are automatically optimized by Next.js Image component.

## Monitoring

### Error Tracking with Sentry

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Analytics

```javascript
// Add Google Analytics
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Enable CSRF protection
- [ ] Sanitize user inputs
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up WAF (Web Application Firewall)
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Backup Strategy

### Database Backups

```bash
# Automated daily backups with Supabase
# Or manual backup
pg_dump $DATABASE_URL > backup.sql
```

### Code Backups

- Use Git for version control
- Maintain multiple branches
- Regular pushes to remote repository

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Manual Rollback

```bash
# Checkout previous version
git checkout <previous-commit>

# Deploy
npm run deploy
```

## Health Checks

### API Health Endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

### Monitoring Script

```bash
# Simple uptime monitor
curl https://your-domain.com/api/health
```

## Scaling

### Horizontal Scaling

- Vercel automatically scales
- Configure auto-scaling for custom deployments

### Database Scaling

- Connection pooling with PgBouncer
- Read replicas for queries
- Database sharding if needed

### CDN Configuration

- Static assets served via Vercel Edge Network
- Configure custom CDN if needed

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Performance Issues

- Check Vercel Analytics
- Review Lighthouse scores
- Optimize images and fonts
- Enable caching

### Database Connection Issues

- Check connection string
- Verify firewall rules
- Check connection pool limits

## Post-Deployment

- [ ] Test all critical paths
- [ ] Verify payment processing
- [ ] Check real-time features
- [ ] Monitor error rates
- [ ] Review performance metrics
- [ ] Update documentation
- [ ] Notify users of new features

## Maintenance

### Regular Tasks

- Weekly dependency updates
- Monthly security audits
- Quarterly performance reviews
- Regular database optimization
- Log rotation and cleanup

### Update Process

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test
npm test

# Deploy
npm run deploy
```
