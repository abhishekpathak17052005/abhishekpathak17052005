# ⚡ CYBERPUNK 3D GITHUB DEVELOPER PORTFOLIO

A production-quality, futuristic 3D developer portfolio website connected to real-time GitHub data, powered by React 18, TypeScript, Three.js, React Three Fiber, Drei, Tailwind CSS, and Framer Motion.

---

## 🚀 Key Features

- **Genuine Real-Time 3D Environment**: Procedural rotating holographic energy core, concentric orbital rings with active satellite beacons, depth particle field with cyan and violet accents, and smooth pointer parallax.
- **Direct Live GitHub REST API Integration**:
  - Live public profile metrics (public repos, followers, following).
  - Aggregated stars and forks across fetched public repositories (strictly labeled).
  - Verified language distribution breakdown derived directly from repository metadata.
  - Live activity feed showing recently updated codebases.
- **Interactive Repository Matrix**:
  - Featured projects curated from your configuration.
  - Full repository directory with real-time name and description filtering.
  - Language filtering and sorting by stars or recently updated.
  - Interactive project detail modal with repository stats, tags, direct links, and one-click terminal clone commands.
- **Single Configuration Hub**:
  - Edit your settings in one place: `src/config/portfolio.ts`.
  - Supports environment variable `VITE_GITHUB_USERNAME`.
  - Polished interactive setup terminal modal when a username is not yet configured or when clicked in the navbar.
- **Cyberpunk Holographic Design System**:
  - Tailored color palette: Deep navy background (`#050713`), electric cyan (`#00E5FF`), neon violet (`#8B5CF6`), and icy blue-white.
  - Subtle scanlines, glassmorphism blur panels, cyber corner cutouts, and neon glows.
- **Performance & Accessibility**:
  - Zero fabricated stats, streaks, or fake percentages.
  - Respects GitHub REST API rate limits with in-memory and local caching (15-min TTL).
  - Graceful WebGL fallback for older hardware or when JavaScript 3D is unavailable.
  - Supports `prefers-reduced-motion` with simplified camera and particle settings.
  - Full keyboard accessibility (ESC to close modals, tab-indexed interactive elements).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18, TypeScript (Strict) |
| **Bundler & Tooling** | Vite 5 |
| **3D Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Styling & UI** | Tailwind CSS, Custom Cyberpunk CSS Utilities |
| **Motion & Transitions**| `framer-motion` |
| **Icons** | `lucide-react` |
| **Data Engine** | GitHub REST API v3 (Public Endpoints, Zero Access Token Required) |

---

## ⚙️ Configuration

All personal and theme configurations are centralized in:

📁 [`src/config/portfolio.ts`](./src/config/portfolio.ts)

```typescript
export const PORTFOLIO_CONFIG = {
  // Set your GitHub username here or use VITE_GITHUB_USERNAME in .env
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'abhishekpathak17052005',

  // Fallback Display Name
  displayName: 'Abhishek Pathak',

  // Headline & Bio
  headline: 'Full-Stack Engineer & Systems Architect',
  bio: 'Engineering high-performance web systems...',

  // Optional Contact & Social Links
  email: '', // Leave empty string if you don't want an email button
  socialLinks: [
    { platform: 'github', label: 'GitHub Profile', url: 'https://github.com/abhishekpathak17052005' },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
  ],

  // Repositories to pin in the Featured section (case-insensitive name match)
  featuredRepoNames: [
    'Pragyan',
    'ShikshaSetu',
    'SpectraShield',
    'RescueX',
    'OriginX',
  ],
};
```

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The server will boot at `http://localhost:5173/`.

### 3. Production Build
```bash
npm run build
```
Type checks and bundles the production assets into `dist/`.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository.
4. Keep the default settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. *(Optional)* Add environment variable:
   - Key: `VITE_GITHUB_USERNAME`
   - Value: `your-github-username`
6. Click **Deploy**.

### Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/<repository-name>/'`.
2. Add the `gh-pages` script or set up GitHub Actions with the official Vite workflow (`actions/deploy-pages`).
