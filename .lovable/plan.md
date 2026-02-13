

# KodNest Premium Build System — Design System Foundation

## Overview
A premium, cohesive design system built with calm confidence. Every element follows strict visual rules — no drift, no noise, just intentional design.

---

## 1. Design Tokens & Theme Setup
- **Background**: `#F7F6F3` (off-white), **Text**: `#111111`, **Accent**: `#8B0000` (deep red), **Success**: muted green, **Warning**: muted amber
- Strict 4-color palette enforced across all CSS variables
- Spacing scale: 8px, 16px, 24px, 40px, 64px — no exceptions
- Border radius, transitions (150–200ms ease-in-out), and focus states standardized globally

## 2. Typography System
- **Headings**: Serif font (e.g., Playfair Display or Lora from Google Fonts), generous letter-spacing, confident sizing
- **Body**: Clean sans-serif (Inter), 16–18px, line-height 1.6–1.8
- Text blocks capped at 720px max-width
- Consistent heading hierarchy (h1–h4) with no decorative variations

## 3. Global Layout Shell
Every page wrapped in a consistent structure:
- **Top Bar**: Project name (left), progress indicator "Step X / Y" (center), status badge (right) with states: Not Started, In Progress, Shipped
- **Context Header**: Large serif headline + single-line subtext describing page purpose
- **Split Workspace**: Primary content area (70%) + Secondary panel (30%)
- **Proof Footer**: Persistent bottom checklist — UI Built, Logic Working, Test Passed, Deployed — each requiring user confirmation

## 4. Core Components (Restyled)
- **Buttons**: Primary = solid deep red (`#8B0000`), Secondary = outlined with deep red border. Uniform hover, radius, and sizing
- **Cards**: Subtle `1px` border, no shadows, balanced padding using the spacing scale
- **Inputs**: Clean borders, clear focus ring (deep red), no heavy shadows
- **Badges**: Status badges for the top bar (muted, pill-shaped)
- **Checkboxes**: Clean, matching the proof footer style

## 5. Secondary Panel Component
- Step explanation block (short text)
- Copyable prompt box with copy button
- Action buttons: Copy, Build in Lovable, It Worked, Error, Add Screenshot
- All styled calmly with consistent spacing

## 6. Error & Empty States
- **Error state component**: Explains what went wrong + actionable fix suggestion, never blames user
- **Empty state component**: Shows next action with a clear CTA, never feels dead or broken

## 7. Demo/Showcase Page
A single page demonstrating all design system elements together — typography, colors, buttons, cards, inputs, layout shell, states — proving visual coherence from one unified design mind.

