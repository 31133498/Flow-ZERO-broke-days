# FLOW: The Work Utility for Zero Broke Days

*"No one should go broke waiting to get paid."*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/teenovatexlabs-5657s-projects/v0-flow-app-frontend)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/phoqBuIaquS)

## Overview

Flow is a Work Utility that converts large-scale corporate, community, and everyday tasks into atomized, instant-pay gigs. Students and workers complete tasks anywhere, in minutes, not months, with payment within 60 seconds of approval.

## Key Features Implemented

### 🚀 **Core Functionality**
- **Instant Payment System**: 60-second payouts after task verification
- **Task Atomization**: Large projects broken into manageable Flow Units (5-60 minutes)
- **Dual Interface**: Separate dashboards for workers and clients
- **Real-time Task Management**: Live task claiming, submission, and verification

### 👥 **For Workers (Students)**
- **Task Discovery**: Browse and filter available tasks by difficulty, location, and reward
- **Instant Claiming**: One-click task claiming with immediate access
- **Proof Submission**: Upload work proof with detailed descriptions
- **Earnings Tracking**: Real-time earnings dashboard with performance metrics
- **Instant Withdrawals**: Withdraw earnings immediately to bank account

### 🏢 **For Clients (Organizations)**
- **Task Creation**: Post tasks with detailed requirements and fair pricing
- **Submission Review**: Review worker submissions with approve/reject workflow
- **Quality Control**: Built-in verification system with feedback mechanisms
- **Analytics Dashboard**: Track task completion rates and spending

### 🔧 **Technical Implementation**
- **Dummy Data System**: Complete mock backend for demonstration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Modular, reusable React components
- **State Management**: Client-side state with React hooks

## Demo Features

### Sample Tasks Available:
1. **Data Entry** - Customer record input ($15.00, 25 min)
2. **Content Moderation** - Social media review ($22.50, 35 min)
3. **Research** - Product analysis ($28.00, 45 min)
4. **Surveys** - Market research completion ($18.75, 30 min)
5. **Image Classification** - Product categorization ($20.00, 40 min)
6. **Local Delivery** - Package pickup/delivery ($35.00, 1h 15min)
7. **Transcription** - Video to text conversion ($42.00, 1h)
8. **Email Verification** - List cleaning ($12.50, 20 min)

### User Flows Implemented:

**Worker Flow:**
1. Browse available tasks with filters
2. Claim task with one click
3. Complete work and submit proof
4. Get paid within 60 seconds of approval
5. Track earnings and performance

**Client Flow:**
1. Post new task with requirements
2. Review worker submissions
3. Approve/reject with feedback
4. Automatic instant payment to workers
5. Monitor task completion analytics

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Demo Accounts

**Worker Account:**
- Click "I'm a Student - Let's Earn" on landing page
- Access task dashboard, earnings, and submission features

**Client Account:**
- Click "I'm an Organization - Let's Scale" on landing page
- Access task posting, submission review, and analytics

## Architecture

```
/app
  /api                 # API routes with dummy data
  /client             # Client-specific pages
  /tasks              # Task-related pages
  /earnings           # Earnings dashboard
  /payout-settings    # Bank account setup

/components
  /ui                 # Reusable UI components
  /client-*           # Client-specific components
  /earnings-*         # Earnings-related components
  /task-*             # Task-related components

/lib
  /dummy-data.ts      # Mock backend data and logic
  /utils.ts           # Utility functions
```

## Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

## Future Enhancements

- Real backend integration (Supabase/PostgreSQL)
- Payment processing (Stripe/PayPal)
- Real-time notifications (WebSockets)
- Mobile app (React Native)
- AI task matching and pricing
- Blockchain payment verification
- GPS verification for location-based tasks
- Video/voice task instructions
- Team collaboration features

## The Vision

Flow eliminates the "waiting economy" by providing:
- **Instant Income** for students and workers
- **Scalable Workforce** for organizations
- **Quality Assurance** through verification systems
- **Economic Empowerment** through accessible work opportunities

*"Zero Broke Days" isn't just a slogan—it's a commitment to ensuring no one has to wait to get paid for work they've completed.*

## Deployment

Your project is live at:

**[https://vercel.com/teenovatexlabs-5657s-projects/v0-flow-app-frontend](https://vercel.com/teenovatexlabs-5657s-projects/v0-flow-app-frontend)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/phoqBuIaquS](https://v0.app/chat/phoqBuIaquS)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository