# UTTT Web - Ultimate Tic Tac Toe Game System

A comprehensive web-based Ultimate Tic Tac Toe game system with multiple game modes, tournaments, achievements, and monetization features.

## 🎮 Game Modes

### Ultimate Tic Tac Toe (UTTT)
Standard Ultimate Tic Tac Toe - Tic Tac Toe within Tic Tac Toe

### Super Tic Tac Toe (STTT)
Three levels deep - Tic Tac Toe within UTTT within Tic Tac Toe

### Hyper Tic Tac Toe (HTTT)
Four levels deep - Tic Tac Toe within STTT within Tic Tac Toe

## ⏱️ Time Controls

- **Light**: < 10s (UTTT), < 100s (STTT), < 1000s (HTTT)
- **Hyper Bullet**: 10s-1min (UTTT), 100s-10min (STTT), 1000s-100min (HTTT)
- **Bullet**: 1-3min (UTTT), 10-30min (STTT), 100-300min (HTTT)
- **Blitz**: 3-10min (UTTT), 30-100min (STTT), 300-1000min (HTTT)
- **Rapid**: 10-30min (UTTT), 100-300min (STTT), 1000-3000min (HTTT)
- **Ordinary**: 30min+ (UTTT), 300min+ (STTT), 3000min+ (HTTT)

## 🎯 Variant Modes

- **Tag Team**: Switch teammates every turn
- **Countdown Chaos**: Random placement when countdown reaches 0
- **Time Thief**: Special squares that steal 25% of opponent's time
- **Dice Roll**: Roll dice to determine playable zones
- **Swap Mode**: X and O roles swap every 5 turns

## 🏆 Rating & Tiers

Starting at 2000 rating, players can achieve the following tiers:

- Black (< 2000)
- Gray (2000-2499)
- White (2500-2999) - +100 bonus on first achievement
- Brown (3000-3499) - +200 bonus
- Purple (3500-3999) - +400 bonus
- Blue (4000-4499) - +800 bonus
- Light Blue (4500-4999) - +1600 bonus
- Green (5000-5499) - +3200 bonus
- Light Green (5500-5999) - +6400 bonus
- Yellow (6000-6999) - +12800 bonus
- Orange (7000-7999) - +25600 bonus
- Pink (8000-8999) - +51200 bonus
- Red (9000-9999) - +102400 bonus
- Master (10000+) - +204800 bonus

## 🎪 Tournaments

Automatically scheduled tournaments for each mode and time control:
- Single and double elimination formats
- Tier-restricted tournaments available
- Entry fees paid in points
- Regular schedules (every 5 minutes to monthly)

## 🎯 Challenges & Achievements

### Daily Challenges (100 points each, +200 for all)
- Speed Demon: Win 3 games in under 30 seconds
- Win Streak: Achieve 3-win streak
- Variety Seeker: Win with 3 different time controls
- Analyst: Analyze 2 lost games

### Weekly Challenges (300 points each, +500 for all)
- Victory God: 70%+ win rate (min 20 games)
- Marathoner: 10 hours playtime
- All-Rounder: 3 wins in each mode
- Clutch Master: 5 wins with < 10s remaining
- Revenge Hunter: Beat same opponent 3+ times

### Monthly Challenges (700 points each, +1000 for all)
- Rating Climber: Gain 1000+ rating
- Iron Will: Play daily for entire month
- Puzzle Master: Solve all 30 monthly puzzles
- Social Player: 50+ games with friends
- Tournament Fighter: Top 10% tournament finish

### Permanent Achievements
Various achievements for wins, streaks, and special accomplishments

## 💰 Subscription Tiers

### Free
- 2 analyses per day
- 5 puzzles per day
- 20 saved games
- 1 variant game per day

### Ultimate Supporter ($5/month)
- 5 analyses per day
- 20 puzzles per day
- Ad-free experience
- Faster matchmaking
- 100 saved games
- 5 basic themes
- Ultimate Supporter badge
- 5 variant games per day

### Super Supporter ($10/month)
- Unlimited analyses
- Unlimited puzzles
- Detailed statistics dashboard
- Position analysis
- 15 premium themes
- Unlimited saved games
- Custom bot 3 times per day
- Super Supporter badge
- 10 variant games per day

### Hyper Supporter ($30/month)
- All Super benefits
- AI coach with daily personalized analysis
- Unlimited custom bots
- Unlimited variant games
- All 25+ themes
- Private practice rooms
- 2 pro lessons per month (coming soon)
- Beta feature access
- Custom matching range
- Feature voting rights
- Hyper Supporter badge

## 💎 VIP Loyalty Program

Earn 100 mileage per $1 spent (6-month validity):

- **Bronze VIP** (3,500 mileage): Early package access, monthly 10% coupon
- **Silver VIP** (10,500 mileage): All Bronze + 10% auto-discount, beta access
- **Gold VIP** (28,000 mileage): All Silver + 20% auto-discount, custom packages, dev feedback

## 🛒 Point Shop

- Club Creation: 50,000 points
- Custom Avatars: 1,000-5,000 points
- Extra Analysis: 200 points (max 3/day)
- Matching Priority: 100 points (max 5/day)
- Tournament Entry: 500-2,000 points

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom React components

## 📁 Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # React components
│   ├── Board/         # Game board components
│   ├── Game/          # Game-related components
│   ├── Profile/       # User profile components
│   └── Navigation/    # Navigation components
├── lib/               # Utility functions and game logic
├── types/             # TypeScript type definitions
└── ...
```

## 🎮 Game Rules

### UTTT Rules
1. Win small boards to claim them on the main board
2. Your move determines which board your opponent plays in next
3. If the designated board is won or full, play anywhere
4. Win 3 small boards in a row to win the game

### STTT/HTTT Rules
Same principle but nested deeper (3 and 4 levels respectively)

## 👤 Default Administrator

- Username: Oganesson118
- Subscription: Hyper Supporter
- Points: 100,000,000
- VIP Level: Gold

## 📝 Features

- ✅ Multiple game modes (UTTT, STTT, HTTT)
- ✅ Time controls for all skill levels
- ✅ Variant game modes for variety
- ✅ Comprehensive rating system with tiers
- ✅ Automated tournament system
- ✅ Daily/Weekly/Monthly challenges
- ✅ Achievement system
- ✅ Point-based economy
- ✅ Subscription tiers with benefits
- ✅ VIP loyalty program
- ✅ Guest play support
- ✅ Anti-cheating measures
- ✅ AI analysis integration (uttt.ai)
- ✅ Tutorial system
- ⏳ Pro lessons (coming soon)

## 🔒 Security

- Anti-cheating algorithms implemented
- Secure authentication system
- Rate limiting on critical endpoints
- Input validation and sanitization

## 📊 Analytics

- Game analysis via uttt.ai integration
- Detailed statistics for subscribers
- Position analysis and opening patterns
- Blunder detection

## 🌐 Additional Features

- Theme marketplace for user trading
- Leaderboards by mode and time control
- Friend system and social features
- League play and tier-restricted tournaments
- Custom tournaments and private rooms

## 📄 License

© 2025 UTTT Web. All rights reserved.

---

Created by Oganesson118
