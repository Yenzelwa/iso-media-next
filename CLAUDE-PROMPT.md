# CLAUDE MASTER PROMPT — iso-media-next

This document describes how to use Claude with the provided playbooks and feature list to manage feature development and UI fixes for the **iso-media-next** repo.

---

## Files for Context

1. **claude.md** — Context-First Feature Playbook (UI frontend that calls external API).  
   - Defines workflow for new features: Inputs → Repo Understanding → Feature Design → Implementation Plan → Implement → Validate → Documentation/PR → Rollout.

2. **FEATURES-UI.md** — Feature List (UI Enhancements & Fixes).  
   - Contains all currently requested UI changes (Browse, Navigation, Footer, About Us, Contact Us, FAQ, Blog, Cookies, Series, Documentary, Watch, Login, Forgot Password, Register, Account Menu, Plan Selection, Profile, Security Settings).

---

## Prompt to Use in Claude

```markdown
You are to use the **claude.md** playbook as your strict operating guide for all actions.  
You are also given a feature list in **FEATURES-UI.md** that contains the current set of UI enhancements and fixes for the `iso-media-next` repo (Next.js frontend that calls an external API).

**Instructions:**

1. **Context & Rules**
   - Read and internalize all sections of `claude.md`.  
   - Follow it step by step: §0 Inputs → §1 Repo Understanding → §2 Feature Design → §3 Implementation Plan → §4 Implement → §5 Validate → §6 Docs & PR → rollout.  
   - Never skip sections. Always output artifacts listed in each section.

2. **Scope**
   - This repo (`iso-media-next`) is a **UI frontend only** project.  
   - All backend/database changes are out of scope.  
   - When a feature mentions API interactions, assume they are handled via external API calls only. For strictly UI changes, mark API endpoints as `N/A`.

3. **Feature Work**
   - The tasks to execute are defined in `FEATURES-UI.md`.  
   - For each feature or batch of features:
     - Start with §0 Inputs and fill them based on repo + feature list.  
     - Move through the playbook sequentially.  
     - At §4 (Implementation), output only **minimal diffs** of changed files.  
     - At §5 (Validate), generate test plans and validation artifacts.  
     - At §6 (Docs & PR), create a PR description and release notes snippet.

4. **Output Format**
   - Deliver work in **markdown** with clear section headers.  
   - Always show assumptions, risks, and rollback strategies.  
   - At each stage, pause for confirmation before moving to the next section.  
   - Group related tasks into **batched PRs** (as recommended in `FEATURES-UI.md`).

**Kickoff Task:**
- Begin with §0 Inputs for the `iso-media-next` repo.  
- Use the first batch of tasks from `FEATURES-UI.md` (Browse Page changes).  
- Output the filled Inputs section, plus a list of assumptions & open questions.  
- Wait for my “Proceed” before continuing.
```

---

## Usage Notes

- Always attach both **claude.md** and **FEATURES-UI.md** to Claude when starting a session.  
- Use the above prompt to ensure Claude stays within the structured workflow.  
- After each step, review outputs carefully before telling Claude to “Proceed.”  
