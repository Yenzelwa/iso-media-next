# CLAUDE MASTER PROMPT — iso-media-next

This document describes how to use Claude with the provided playbooks and feature list to manage feature development for the **iso-media-next** repo.

---

## Files for Context

1. **CLAUDE-API-RULE.md** — Context-First Feature Playbook (UI frontend that calls external API).  
   - Defines workflow for new features: Inputs → Repo Understanding → Feature Design → Implementation Plan → Implement → Validate → Documentation/PR → Rollout.

2. **API-FEATURE.md** — Feature List (API calls to be created).  
   - Contains all api calls required for each page (Browse Series, Documentary, Watch, Login, Forgot Password, Register, Plan Selection, Profile, Security Settings).

---

## Prompt to Use in Claude

```markdown
You are to use the **CLAUDE-API-RULE.md** playbook as your strict operating guide for all actions.  
You are also given a feature list in **API-FEATURE-UI.md** that contains the structure of the api.
You must use mock data for all api calls, refer to mocks folder for the json data

**Instructions:**

1. **Context & Rules**
   - Read and internalize all sections of `CLAUDE-API-RULE.md`.  
   - Follow it step by step: §0 Inputs → §1 Repo Understanding → §2 Feature Design → §3 Implementation Plan → §4 Implement → §5 Validate → §6 Docs & PR → rollout.  
   - Never skip sections. Always output artifacts listed in each section.

2. **Scope**
   - This repo (`iso-media-next`) is a **UI frontend using extenal API** project.  
   - Create api calls for the next js project  
   - Use mocks as test data.

3. **Feature Work**
   - The tasks to execute are defined in `CLAUDE-API-RULE.md`.  
   - For each feature or batch of features:
     -Follow steps frpm  Kickoff (Per API Endpoint)

4. **Output Format**
   - Deliver work in **markdown** with clear section headers.  
   - Always show assumptions, risks, and rollback strategies.  
   - At each stage, pause for confirmation before moving to the next section.  
   - Group related tasks into **batched PRs** (as recommended in `CLAUDE-API-RULE.md`).


---

## Usage Notes

- Always attach both **CLAUDE-API-RULE.md** and **API-FEATUREI.md** to Claude when starting a session.  
- Use the above prompt to ensure Claude stays within the structured workflow.  
- After each step, review outputs carefully before telling Claude to “Proceed.”  



