# UTTT Web - Architecture Documentation

## System Overview

UTTT Web is a comprehensive web-based Ultimate Tic Tac Toe gaming platform built with modern web technologies.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (planned)
- **Data Fetching**: TanStack Query (planned)
- **UI Components**: Custom React components

### Backend (Planned)
- **API**: Next.js API Routes / tRPC
- **Database**: PostgreSQL / Supabase
- **Authentication**: NextAuth.js
- **Real-time**: WebSockets / Supabase Realtime
- **Payment**: Stripe
- **File Storage**: S3 / Supabase Storage

### Infrastructure (Planned)
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics
- **Monitoring**: Sentry
- **Email**: SendGrid / Resend

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page with game
│   ├── play/              # Game selection
│   ├── tournaments/       # Tournament listings
│   ├── challenges/        # Challenges & achievements
│   ├── shop/              # Point shop
│   ├── subscription/      # Subscription plans
│   ├── leaderboard/       # Rankings
│   ├── profile/           # User profiles
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── Board/            # Game board components
│   │   ├── UTTTBoard.tsx # Ultimate TTT board
│   │   └── SmallBoard.tsx# 3x3 board
│   ├── Game/             # Game UI components
│   │   ├── GameTimer.tsx # Timer component
│   │   └── GameInfo.tsx  # Game information
│   ├── Profile/          # User profile components
│   │   ├── TierBadge.tsx
│   │   └── SubscriptionBadge.tsx
│   ├── Navigation/       # Navigation components
│   │   └── Header.tsx
│   └── Layout/           # Layout components
│       └── MainLayout.tsx
│
├── lib/                   # Utility functions
│   ├── gameLogic.ts      # Core game logic
│   ├── subscription.ts   # Subscription & monetization
│   ├── variants.ts       # Variant game modes
│   └── index.ts          # Exports
│
├── types/                 # TypeScript types
│   ├── game.ts           # Game-related types
│   ├── user.ts           # User & profile types
│   ├── tournament.ts     # Tournament types
│   ├── challenges.ts     # Challenge types
│   └── index.ts          # Exports
│
└── hooks/                 # Custom React hooks (planned)
    ├── useGame.ts
    ├── useAuth.ts
    └── useTimer.ts
```

## Data Models

### User
```typescript
{
  id: string
  username: string
  email: string
  displayName: string
  avatar?: string
  subscription: SubscriptionTier
  points: number
  mileage: number
  vipLevel: 'none' | 'bronze' | 'silver' | 'gold'
  ratings: Rating[]
  achievements: string[]
  createdAt: timestamp
  lastLogin: timestamp
}
```

### Game
```typescript
{
  id: string
  mode: 'UTTT' | 'STTT' | 'HTTT'
  variant: VariantMode
  timeControl: TimeControl
  playerX: string (user ID)
  playerO: string (user ID)
  board: BoardState
  moves: Move[]
  winner: Player | 'draw' | null
  startTime: timestamp
  endTime?: timestamp
  playerXTime: number
  playerOTime: number
  status: 'waiting' | 'active' | 'finished'
}
```

### Tournament
```typescript
{
  id: string
  mode: GameMode
  timeControl: TimeControl
  format: TournamentFormat
  maxPlayers: number
  participants: string[]
  status: TournamentStatus
  startTime: timestamp
  rounds: TournamentRound[]
  winners: string[]
}
```

## Game Logic Flow

### UTTT Game Flow
1. Player selects mode, time control, and variant
2. Matchmaking finds opponent (or creates AI game)
3. Game initializes with empty board
4. Players alternate turns:
   - Player makes move on valid board
   - System validates move
   - Board state updates
   - Check for small board win
   - Check for main board win
   - Determine next valid boards
   - Switch player
   - Update timer
5. Game ends when:
   - Main board has winner
   - Time runs out
   - Player resigns
   - Draw by agreement
6. Calculate rating changes
7. Award points and achievements
8. Save game to history

### Rating Calculation
- Uses Elo system with K-factor of 32
- Expected score = 1 / (1 + 10^((opponent - player) / 400))
- Rating change = K * (actual - expected)
- Different ratings for each mode/time control combination

### Variant Modifications

#### Tag Team
- Maintains team rosters for X and O
- Rotates player each turn
- All team members share rating

#### Countdown Chaos
- Decreases countdown timer each turn (3% UTTT, 0.3% STTT)
- When timer reaches 0, random valid move made automatically

#### Time Thief
- 18 special squares (UTTT) or 162 (STTT)
- Playing on special square steals 25% of opponent time

#### Dice Roll
- Roll two dice each turn
- Can only play on boards matching dice values

#### Swap Mode
- Every 5 turns, X and O players swap roles
- Continues with swapped identities

## State Management Strategy

### Client State (Zustand)
- Current game state
- UI state (modals, menus)
- User preferences
- Temporary data

### Server State (React Query)
- User profile
- Game history
- Leaderboards
- Tournament data
- Challenges progress

### Real-time State (WebSocket)
- Active game moves
- Timer synchronization
- Tournament updates
- Chat messages

## API Routes (Planned)

```
/api/auth/*              - Authentication
/api/users/*             - User management
/api/games/*             - Game operations
/api/tournaments/*       - Tournament operations
/api/challenges/*        - Challenge tracking
/api/shop/*              - Shop operations
/api/subscriptions/*     - Subscription management
/api/leaderboard/*       - Ranking data
/api/analysis/*          - Game analysis
```

## Security Measures

### Authentication
- JWT-based authentication
- Secure session management
- Password hashing with bcrypt
- OAuth integration

### Game Integrity
- Server-side move validation
- Anti-cheat detection algorithms
- Rate limiting on game actions
- Move timestamp verification

### Payment Security
- PCI-DSS compliant (via Stripe)
- Secure webhooks
- Transaction logging
- Fraud detection

### Data Protection
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

## Performance Optimizations

### Frontend
- Code splitting by route
- Lazy loading components
- Image optimization
- CSS purging
- Component memoization
- Virtual scrolling for long lists

### Backend
- Database indexing
- Query optimization
- Caching strategy (Redis)
- CDN for static assets
- Connection pooling

### Real-time
- Efficient WebSocket message format
- Delta updates (only changes)
- Client-side prediction
- Optimistic updates

## Scaling Strategy

### Horizontal Scaling
- Stateless API servers
- Load balancing
- Database read replicas
- Redis cluster for sessions

### Vertical Scaling
- Database optimization
- Caching layers
- CDN utilization
- Asset optimization

### Monitoring
- Performance metrics
- Error tracking
- User analytics
- Server health checks

## Deployment Pipeline

1. **Development**
   - Local development environment
   - Hot module replacement
   - TypeScript type checking

2. **Staging**
   - Preview deployments on Vercel
   - Integration testing
   - Performance testing

3. **Production**
   - Automated deployment via Git
   - Blue-green deployment
   - Automated rollback on errors
   - Database migrations

## Future Architecture Considerations

### Microservices (if scale requires)
- Game service
- User service
- Tournament service
- Payment service
- Analytics service

### Event-Driven Architecture
- Game events
- Achievement events
- Payment events
- Notification events

### Machine Learning
- AI opponent training
- Opening book generation
- Position evaluation
- Cheating detection
- Matchmaking optimization
