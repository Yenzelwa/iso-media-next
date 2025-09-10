# FEATURES-UI.md — UI Enhancements & Fixes (Consolidated)

**Scope:** Browse, Navigation, Footer, About Us, Contact Us, FAQ, Blog, Cookies, Series, Documentary, Watch, Login, Forgot Password, Register, Account Menu, Plan Selection, Profile, Plan Details, Security Settings  
**Type:** UI/UX only (no backend or API changes unless noted)  
**Date:** 2025-09-10

---

## Browse Page

- **Spacing:** Reduce the vertical space between the **Hero carousel** and **Top Trending** section.  
- **Ad images:**  
  - Add border radius to all ad images.  
  - Add a subtle shade/overlay behind text on bright images to ensure legibility.  
- **Likes:** Remove all like icons and counters from this page.  
- **Carousel navigation:** Add **left and right navigation arrows** to the `EnhancedCarousel` component.  
- **Clickable buttons:** Ensure all buttons and CTAs are functional and navigate correctly.  
- **User session:** Verify that session state is reflected in the UI (logged-in vs logged-out view works correctly).

---

## Navigation (Header)

- **Logo:** Replace existing logo with a new design.  
- **Slogan:** Add a short slogan directly below the logo.  

---

## Footer

- **Logo:** Update the footer logo to match the header.  
- **Subscribe:** Fix the “Subscribe now” functionality so it properly validates and shows correct UI states.  
- **Clickable buttons:** Ensure all footer links and buttons are functional.  

---

## About Us Page

- **CTA button:** Fix the “Start your journey” button so it works and navigates correctly.  

---

## Contact Us Page

- **Form validation:** Update validation text CSS for clear, accessible error styling.  
- **Send email:** Fix the “Send message” form so submission works and shows proper UI feedback.  

---

## FAQ Page

- **Email:** Fix the email functionality.  
- **Popular topics:** Ensure the “Popular topics” section works and is interactive.  

---

## Blog Page

- **Page & component:** Create a Blog page and its component.  
- **Functionality:** Page must be fully functional (list posts, view post, navigation).  
- **Testing:** Add test coverage for rendering, navigation, and interaction.  

---

## Cookies Page

- **Page & component:** Create a Cookies page and its component.  
- **Functionality:** Page must be fully functional (display policies, user actions).  
- **Testing:** Add tests to validate layout and interactions.  

---

## Series Page

- **Top margin:** Fix text margin so it isn’t too close to the top line.  
- **Images:** Add radius and shade to all images (same as Browse page).  
- **Carousel:** Add navigation arrows to `EnhancedCarousel`.  
- **Likes:** Remove all likes from this page.  
- **Navigation speed:** Improve navigation performance to `series/2`.  
- **Buttons:** Ensure all buttons are functional.  

---

## Documentary Page

- **Remove:** Delete “View” and “Learn more” text.  
- **Trailer:** Add a trailer to items; on hover, the trailer should auto-play.  
- **Likes:** Remove all likes from this page.  

---

## Watch Page

- **Next episode button:** Fix color so it is visible; hide button entirely if there is no next episode.  
- **Episode images:** Reduce size (fix CSS).  
- **Episode navigation:** Clicking on an episode must work.  
- **Replies:** Remove “Reply” under reply messages.  
- **Comments:** Like/dislike toggles must work correctly.  
- **Replies:** Add missing “Dislike” under reply items.  

---

## Login Page

- **Background:** Change to match site’s theme.  
- **Form size:** Reduce to medium.  
- **Validation:**  
  - Invalid email must disable the login button.  
  - Password < 6 characters must disable the login button.  

---

## Forgot Password Page

- **Styling:** Fix page styling.  
- **Validation:** Add proper validation to the form.  
- **Functionality:** Ensure reset flow works.  
- **Testing:** Add tests for form validation and submission.  

---

## Register Page

- **Background:** Change to site’s theme.  
- **Form size:** Reduce to medium.  
- **T’s & C’s:** Fix styling for clarity and consistency.  

---

## Account Menu

- **Bug:** Fix navigation menu duplication; account menu must display correctly without overlapping.  

---

## Plan Selection

- **Top spacing:** Reduce padding/margin at the top.  

---

## Profile

### Left Pane
- **Profile image:** Remove profile image icon.  

### Account Settings Component
- **Change email:** Remove this option.  
- **Change cellphone:** Must work correctly.  
- **Update card:** Must redirect to the **Payment page** for updates.  

### Plan Details
- **Popups:**  
  - Popups should open near user’s viewport or force-scroll to them.  
  - Style popups consistently with theme.  
- **Manage popup:** Fix functionality so it works.  
- **Cancel subscription:** Must work.  
- **Upgrade plan:** Must work.  
- **Buttons:** Ensure plan buttons have visible colors.  
- **Alignment:** Align plan options with the Plan Selection page; remove “Family” option.  

---

## Security Settings

- **Remove:** Login alerts and privacy settings sections.  
- **Device icons:** Update to match device types (mobile, desktop, tablet, etc.).  
- **Two-factor authentication:** Fix functionality so it works end-to-end.  

---

## Definition of Done (UI-only)

- All listed UI changes implemented and tested.  
- Accessibility maintained (contrast, focus states, ARIA labels).  
- Functional tests cover new pages/components (Blog, Cookies, Forgot Password).  
- No console errors, broken links, or dead buttons.  
- Visual QA validated against design/theme.  

---

## Release Notes (draft)

- Browse: spacing adjustments, polished ad images, carousel arrows, likes removed.  
- Navigation/Footer: refreshed logo and slogan; subscribe works; buttons wired.  
- About/Contact/FAQ: CTAs fixed; forms styled and functional; FAQ topics interactive.  
- Blog & Cookies: new pages created, fully functional with tests.  
- Series/Documentary/Watch: layouts polished, trailers on hover, comment/reply fixes, buttons functional.  
- Login/Register/Forgot Password: themed backgrounds, form sizing, validations fixed, reset flow working with tests.  
- Profile & Plans: popups styled and positioned, subscription actions functional, redundant options removed.  
- Security: cleaned sections, device icons updated, two-factor auth restored.  
