# 💘 SimpEngine — Client

A fun pet project that turns awkward date planning into a playful, step-by-step experience.  
**Live demo:** [simpengine.xyz](https://simpengine.xyz)

---

## 💡 What is SimpEngine?

**SimpEngine** is a lightweight, fan-made app that helps a user create a thoughtful date/event for their *simp target* — a person they want to invite.

Event creation is **step-by-step**:
- Each step (Drinks → Entertainment → Food → Desserts → Outfits → …) includes predefined options like:
  - **Entertainment:** movies, hiking, karting, skiing, painting  
  - **Food:** sushi, Italian, street food, fine dining  
- Users can also add **custom steps** with their own icons/images.

When the event is ready, the app generates a **special invite link** that the target opens to choose between the creator’s options.  
The creator then sees the target’s selection in their dashboard.

SimpEngine also provides **event management**, **target invites**, and **analytics**.

This repo contains the **client side** of the project — a fully featured **Next.js + TypeScript** application with modular architecture, powered by:
- 🧠 TanStack Query  
- 🪶 React Hook Form + Zod  
- 🎨 shadcn/ui

---

## 🧩 Environment Variables

Create a `.env.local` file in the root:

```bash
NEXT_PUBLIC_API_URL=<your_backend_url>


🧰 Scripts
Command	Description
npm run dev	Start local dev server
npm run build	Build for production
npm run start	Serve production build
npm run lint	Run linter
