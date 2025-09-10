# iso-media-next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

---

## Using Claude AI for Development

This repo includes two key documents for guiding feature work with Claude AI:

- `claude-feature.md` → The **Context-First Feature Playbook**  
- `FEATURES-UI.md` → The **UI Feature List**

### Quick Start Prompt

When starting a Claude session, attach both `claude-feature.md` and `FEATURES-UI.md`, then paste this:

```markdown
Use **claude-feature.md** as your workflow guide and **FEATURES-UI.md** for the feature list.  
Repo: `iso-media-next` (UI frontend calling external API).  
Follow the playbook step by step (§0 → §1 → … → §6).  
Start with §0 Inputs using the **Browse Page tasks** in FEATURES-UI.md.  
Pause after each step and wait for me to say “Proceed.”
```

### Running Instructions

1. **Attach Files**: Upload `claude-feature.md` and `FEATURES-UI.md` into your Claude session.  
2. **Paste Prompt**: Use the Quick Start prompt above.  
3. **Work in Steps**: Claude will begin with §0 Inputs, then move through the playbook.  
4. **Control Flow**: After reviewing each output, say **“Proceed”** to move forward.  
5. **Outputs**: At each stage Claude will provide specs, plans, diffs, validations, and PR docs as defined in the playbook.  
6. **Batching**: Group related UI changes into PR batches (Browse, Header/Footer, etc.) as outlined in `FEATURES-UI.md`.  

This ensures feature work follows a **repeatable, high-quality workflow** with clear inputs, outputs, and checkpoints.
