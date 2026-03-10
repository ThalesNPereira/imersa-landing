# AGENTS.md

## Overview
This project uses a modern, design-forward marketing site stack for **imersa**. The goal is to keep the site fast, premium-looking, easy to maintain, and well-instrumented for conversion. It is a portuguese website for the brazillian market.

## Frontend Stack
- **Next.js** — primary web framework for the marketing site
- **TypeScript** — type safety and maintainability
- **Tailwind CSS** — utility-first styling for rapid, high-control UI development
- **Framer Motion** — lightweight motion for polished interactions and transitions

## Hosting and Deployment
- **Cloudflare** — hosting and deployment platform

Cloudflare is the deployment target for the site and will also handle edge delivery and performance.

## Analytics
- **PostHog** — product and conversion analytics

PostHog should be used for:
- CTA click tracking
- form conversion analysis
- demo engagement tracking
- session behavior analysis
- experiments and funnel measurement

## Scheduling / Booking
- **Cal.com embed** — for booking demos directly on the site

The Cal.com embed should be integrated into the site for frictionless demo scheduling.

## Typography System
### Headlines
- **Hero headlines:** Satoshi Bold / Medium
- **Section titles:** Satoshi Medium

### Supporting Text
- **Body copy:** Inter Regular
- **Buttons / labels:** Inter Medium

## Design Intent
The overall design direction should feel:
- clean
- premium
- modern
- architectural
- easy to understand

The site should present imersa as a polished proptech company, not a generic AI startup.

## Implementation Notes
- Keep the frontend component system simple and consistent.
- Use Tailwind for all primary styling decisions.
- Use Framer Motion sparingly, only where motion improves clarity or perceived quality.
- Keep analytics implementation focused on conversion and demo interaction, not vanity metrics.
- Keep typography consistent across landing pages, product marketing sections, and supporting content.
