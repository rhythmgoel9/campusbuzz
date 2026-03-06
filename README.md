# 🎓 CampusBuzz — Delhi NCR College Events

Full-stack Next.js app with MongoDB backend, deployable on Vercel free tier.

---

## 🗂 Project Structure

```
campusbuzz/
├── pages/
│   ├── index.js              ← serves the frontend (public/app.html)
│   ├── _app.js
│   ├── 404.js
│   └── api/
│       ├── events/
│       │   ├── index.js      ← GET /api/events  (list + filter + search)
│       │   ├── trending.js   ← GET /api/events/trending
│       │   ├── closing.js    ← GET /api/events/closing
│       │   └── stats.js      ← GET /api/events/stats
│       ├── registrations/
│       │   └── index.js      ← POST /api/registrations  |  GET ?email=
│       └── submissions/
│           └── index.js      ← POST /api/submissions
├── models/
│   ├── Event.js
│   ├── Registration.js
│   └── Submission.js
├── lib/
│   ├── mongodb.js            ← singleton DB connection
│   ├── auth.js               ← JWT helpers
│   └── seed.js               ← one-time seed script
├── public/
│   └── app.html              ← full frontend (React + Babel, self-contained)
├── .env.example
└── package.json
```

---

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1 — MongoDB Atlas (free forever)

1. Go to **https://cloud.mongodb.com** → Sign up free
2. Create a **Free Shared Cluster** (M0, any region near India)
3. Under **Security → Database Access** → Add user (username + password)
4. Under **Security → Network Access** → Add IP: `0.0.0.0/0` (allow all — needed for Vercel)
5. Click **Connect → Drivers** → copy the connection string
6. Replace `<password>` and set the DB name to `campusbuzz`:
   ```
   mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/campusbuzz?retryWrites=true&w=majority
   ```

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/campusbuzz.git
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"Add New Project"** → Import your `campusbuzz` repo
3. Framework: **Next.js** (auto-detected)
4. Under **Environment Variables**, add:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/campusbuzz?retryWrites=true&w=majority` |
   | `JWT_SECRET` | any long random string (e.g. `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) |

5. Click **Deploy** → done in ~60 seconds ✅

### Step 4 — Seed the Database

After deploying, run the seed script once to populate events:

```bash
# In your local terminal (with .env.local set up):
npm install
node lib/seed.js
```

Or run it directly with your MongoDB URI:
```bash
MONGODB_URI="mongodb+srv://..." node lib/seed.js
```

---

## 💻 Local Development

```bash
npm install

# Create .env.local (copy from .env.example and fill values)
cp .env.example .env.local
# Edit .env.local with your MongoDB URI

npm run dev
# → http://localhost:3000
```

---

## 🔌 API Reference

### Events
| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/events` | List events. Query: `cat`, `search`, `page`, `limit` |
| `GET` | `/api/events/trending` | Top 6 by registrations |
| `GET` | `/api/events/closing` | Next 6 by deadline |
| `GET` | `/api/events/stats` | Platform stats (counts) |

### Registrations
| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/registrations` | Register. Body: `{eventId, name, email, phone, college}` |
| `GET` | `/api/registrations?email=x` | Get all registrations for an email |

### Submissions
| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/submissions` | Submit event for review. Body: `{name, college, date, cat, venue, email, ...}` |

---

## 🔧 Adding Events (Admin)

Events can be added in 3 ways:

1. **Re-run seed**: edit `lib/seed.js` and run `node lib/seed.js` again  
2. **MongoDB Atlas UI**: open your cluster → Browse Collections → insert documents directly  
3. **Approve submissions**: change `status: "pending"` → `status: "approved"` and add as Event

---

## 🆓 Free Tier Limits (Vercel + MongoDB Atlas)

| Service | Free Limit | Enough For |
|---------|-----------|------------|
| Vercel Hobby | 100GB bandwidth/mo | ~1M page loads |
| Vercel Functions | 100K invocations/mo | ~3K API calls/day |
| MongoDB Atlas M0 | 512MB storage | ~50K events/registrations |
| MongoDB Atlas | Unlimited reads/writes | No cap |

**You won't need to pay anything** for a college-scale app.

---

## 📦 Tech Stack

- **Frontend**: React 18 + Babel (standalone, in `public/app.html`)
- **Backend**: Next.js 14 API Routes
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: JWT (localStorage + cookie)
- **Deploy**: Vercel (free)
