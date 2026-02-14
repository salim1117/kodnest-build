

# UI/UX Refactor Plan — Job Notification Tracker

## Overview
Pure visual and layout upgrade across 5 files. No logic, data, or routing changes.

---

## 1. Dashboard — 2-Column Grid Layout
**File**: `src/pages/DashboardPage.tsx`

- Wrap outer `<div>` with `bg-accent/30 min-h-screen` styling
- Add `max-w-7xl mx-auto` container for centered content
- Change job grid from `grid gap-4` to `grid grid-cols-1 md:grid-cols-2 gap-6`
- Improve section spacing between filter bar, toggle, count, and grid

## 2. Job Card Redesign
**File**: `src/components/jobs/JobCard.tsx`

- Card wrapper: `bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
- **Top section**: Title (bold, text-lg) on left, match score badge + status badge on right
- **Middle section**: Company, location/mode/experience/salary as structured rows with `space-y-1`
- **Bottom section**: Action buttons (View, Save, Apply) and status dropdown in a clean row with `border-t pt-4 mt-4`

## 3. Navigation Elevation
**File**: `src/components/layout/NavBar.tsx`

- Add `shadow-sm` and `sticky top-0 z-50` to the nav bar
- Add `hover:text-foreground` transition on nav links for smoother hover effect

## 4. Settings Page Card Container
**File**: `src/pages/SettingsPage.tsx`

- Wrap the form in a white card: `bg-white p-8 rounded-xl shadow-sm border border-gray-200`
- Make labels bolder with `font-semibold`
- Increase spacing between form groups from `space-y-8` to `space-y-10`
- Add more breathing room around the slider

## 5. App Shell Background
**File**: `src/components/layout/AppShell.tsx`

- Update main padding to `px-6 py-8` for slightly tighter horizontal padding
- Add `max-w-7xl mx-auto w-full` to main for centered content on wide screens

---

## Technical Notes

### Files Modified (5 total)
1. `src/pages/DashboardPage.tsx` — grid layout, spacing, background
2. `src/components/jobs/JobCard.tsx` — card redesign with hover, structure
3. `src/components/layout/NavBar.tsx` — sticky, shadow, hover states
4. `src/pages/SettingsPage.tsx` — card wrapper, bolder labels, spacing
5. `src/components/layout/AppShell.tsx` — centered max-width container

### No Changes To
- Business logic, match scoring, data, routes, localStorage, or any other pages

