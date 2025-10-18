💘 SimpEngine — Client
A fun pet project that turns awkward date planning into a playful, step-by-step experience.
Live demo: https://simpengine.xyz/
💡 What is SimpEngine?
SimpEngine is a lightweight, fan-made app that helps a user create a thoughtful date/event for their “simp target” — a person they want to invite.
Event creation is step-by-step. For each step (Drinks → Entertainment → Food → Desserts → Outfits → …) the creator picks from predefined options (e.g. Entertainment → movies, hiking, karting, skiing, painting) or adds custom steps with their own icon/image.
When the event is ready the app generates a special invite link the target opens to choose between the creator’s options. The creator then sees the target’s selection in their dashboard. The app also provides event management and analytics.
This repo contains the client side of the project — a fully featured Next.js + TypeScript application with modular architecture, powered by Tanstack Query, React-Hook-Form, Zod, and shadcn/ui.

🧩 Environment Variables
Create a .env.local file:
NEXT_PUBLIC_API_URL

🧰 Scripts
Command	Description
npm run dev	Start local dev server
npm run build	Build for production
npm run start	Serve production build
npm run lint	Run linter
