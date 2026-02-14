

# Job Notification Tracker — Full Implementation Plan

## Overview
Build the complete Job Notification Tracker SaaS application within the existing KodNest Premium Build System. This covers data, matching engine, all pages, persistence, and ship-lock logic.

---

## 1. Local Job Dataset
**New file**: `src/data/jobs.ts`

- 60 realistic Indian tech jobs with all required fields: `id`, `title`, `company`, `location`, `mode`, `experience`, `skills[]`, `source`, `postedDaysAgo`, `salaryRange`, `applyUrl`, `description`
- Companies: Infosys, TCS, Wipro, Accenture, Amazon, Flipkart, Swiggy, Razorpay, PhonePe, Zoho, Freshworks, CRED, Juspay, plus startups
- Salary ranges: "3-5 LPA", "6-10 LPA", "10-18 LPA", "15k-40k/month Internship"
- Each description: 3-6 believable lines
- TypeScript types exported for `Job`

---

## 2. Preferences & localStorage Utilities
**New file**: `src/lib/preferences.ts`

- Type: `JobTrackerPreferences` with `roleKeywords`, `preferredLocations`, `preferredMode`, `experienceLevel`, `skills`, `minMatchScore`
- `getPreferences()` / `savePreferences()` reading/writing `jobTrackerPreferences` in localStorage

**New file**: `src/lib/storage.ts`

- `getSavedJobs()` / `saveJob()` / `unsaveJob()` — persists saved job IDs
- `getJobStatus(id)` / `setJobStatus(id, status)` — persists `jobTrackerStatus[jobId]`
- `getDigest(date)` / `saveDigest(date, jobs)` — persists `jobTrackerDigest_YYYY-MM-DD`
- `getTestResults()` / `setTestResult()` — persists test checklist state
- `getProofLinks()` / `saveProofLinks()` — persists artifact URLs

---

## 3. Match Score Engine
**New file**: `src/lib/matchEngine.ts`

- `calculateMatchScore(job, preferences)` returning 0-100 using exact rules:
  - +25 roleKeyword in title, +15 in description, +15 location match, +10 mode match, +10 experience match, +15 skills overlap, +5 if postedDaysAgo <= 2, +5 if source = "LinkedIn"
  - Capped at 100
- `getScoreBadgeColor(score)` returning green/amber/neutral/grey thresholds
- `filterAndScoreJobs(jobs, preferences, showOnlyAboveThreshold)` — main pipeline

---

## 4. Route Updates
**Modified file**: `src/App.tsx`

Add new routes inside AppShell:
- `/` — Landing page (separate from AppShell, no nav bar)
- `/dashboard`, `/saved`, `/digest`, `/settings` — existing, replace placeholders
- `/jt/07-test` — Test checklist
- `/jt/proof` — Proof page
- `/jt/08-ship` — Ship lock page

Update NavBar to include all relevant links.

---

## 5. Landing Page (`/`)
**New file**: `src/pages/LandingPage.tsx`

- Rendered outside AppShell (no nav bar)
- Large serif headline: "Stop Missing The Right Jobs."
- Subtext: "Precision-matched job discovery delivered daily at 9AM."
- CTA button: "Start Tracking" linking to `/settings`
- Calm, centered layout with generous whitespace
- KodNest branding in top-left

---

## 6. Settings Page
**Modified file**: `src/pages/SettingsPage.tsx` (new)

- Form fields:
  - `roleKeywords` — comma-separated text input
  - `preferredLocations` — multi-select (Bangalore, Hyderabad, Mumbai, Pune, Chennai, Delhi, Remote)
  - `preferredMode` — checkboxes (Remote, Hybrid, On-site)
  - `experienceLevel` — dropdown (Fresher, 1-3 years, 3-5 years, 5-8 years, 8+ years)
  - `skills` — comma-separated text input
  - `minMatchScore` — slider 0-100, default 40
- Prefill from localStorage if exists
- Save to `jobTrackerPreferences` key
- Toast on save: "Preferences saved."

---

## 7. Dashboard Page
**New file**: `src/pages/DashboardPage.tsx`

- If no preferences set: show banner "Set your preferences to activate intelligent matching." with link to `/settings`
- Filter bar: keyword, location, mode, experience, source, status, sort (Latest / Match Score / Salary) — AND logic
- Toggle: "Show only jobs above my threshold"
- Job cards showing: title, company, location+mode, experience, salary, source badge, postedDaysAgo, matchScore badge (color-coded)
- Buttons per card: View (opens modal), Save (localStorage toggle), Apply (new tab)
- Job detail modal with full description

**New file**: `src/components/jobs/JobCard.tsx`
**New file**: `src/components/jobs/JobDetailModal.tsx`
**New file**: `src/components/jobs/FilterBar.tsx`

---

## 8. Saved Page
**New file**: `src/pages/SavedPage.tsx`

- Renders saved jobs from localStorage
- Premium empty state using existing `EmptyState` component if none saved
- Same card format as Dashboard
- Unsave button available

---

## 9. Status Tracking (integrated into job cards)
- Status per job: Not Applied, Applied, Rejected, Selected
- Dropdown on each card to change status
- Persisted in `jobTrackerStatus[jobId]`
- Badge colors: neutral / blue / red / green
- Status filter available in Dashboard filter bar
- Toast on change: "Status updated: {status}"

---

## 10. Daily Digest Page
**New file**: `src/pages/DigestPage.tsx`

- If no preferences: block with message and link to settings
- Button: "Generate Today's 9AM Digest (Simulated)"
- Selects top 10 jobs by matchScore desc, then postedDaysAgo asc
- Stores as `jobTrackerDigest_YYYY-MM-DD`; loads if already exists for today
- Email-style layout: white card on off-white background
- Buttons: "Copy Digest to Clipboard", "Create Email Draft" (mailto: link)

---

## 11. Test Checklist Page (`/jt/07-test`)
**New file**: `src/pages/TestPage.tsx`

- 10 checkbox items (the exact list from spec)
- Counter: "Tests Passed: X / 10"
- If less than 10: warning message "Resolve all issues before shipping."
- "Reset Test Status" button
- Persisted in localStorage

---

## 12. Proof Page (`/jt/proof`)
**New file**: `src/pages/ProofPage.tsx`

- Step Completion Summary (8 steps overview)
- Artifact inputs: Lovable Link, GitHub Repo, Live Deployment — with URL validation
- Stored in localStorage
- "Copy Final Submission" button producing formatted text block including core features list

---

## 13. Ship Lock Page (`/jt/08-ship`)
**New file**: `src/pages/ShipPage.tsx`

- Locked state until all 10 tests passed AND all 3 links provided
- Status badge: Not Started / In Progress / Shipped
- When shipped: "Project 1 Shipped Successfully." — no confetti
- Clean, minimal, premium layout

---

## 14. Navigation Updates
**Modified**: `src/components/layout/NavBar.tsx`

- Update nav items to include: Dashboard, Saved, Digest, Settings, Test, Proof, Ship
- Keep existing responsive hamburger behavior

---

## Technical Details

### File Creation Summary (14 new files)
1. `src/data/jobs.ts` — 60-job dataset + types
2. `src/lib/preferences.ts` — preferences read/write
3. `src/lib/storage.ts` — all localStorage utilities
4. `src/lib/matchEngine.ts` — scoring engine
5. `src/pages/LandingPage.tsx` — landing page
6. `src/pages/SettingsPage.tsx` — settings form
7. `src/pages/DashboardPage.tsx` — main dashboard
8. `src/pages/SavedPage.tsx` — saved jobs
9. `src/pages/DigestPage.tsx` — daily digest
10. `src/pages/TestPage.tsx` — test checklist
11. `src/pages/ProofPage.tsx` — proof artifacts
12. `src/pages/ShipPage.tsx` — ship lock
13. `src/components/jobs/JobCard.tsx` — reusable job card
14. `src/components/jobs/FilterBar.tsx` — filter bar component

### File Modifications (2 files)
1. `src/App.tsx` — new routes, landing page outside AppShell
2. `src/components/layout/NavBar.tsx` — expanded navigation

### Removed Files
- `src/pages/PlaceholderPage.tsx` — no longer needed (replaced by real pages)

### Dependencies
No new packages needed. Uses existing: react-hook-form, radix primitives, lucide-react, sonner, date-fns.

### Performance
- All filtering/scoring computed via `useMemo`
- No unnecessary re-renders (stable callbacks via `useCallback`)
- localStorage reads cached in state, not called on every render

