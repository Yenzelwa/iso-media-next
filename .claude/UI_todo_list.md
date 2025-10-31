ï»¿Ã¯Â»Â¿ÃƒÂ¯Ã‚Â»Ã‚Â¿ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â»Ãƒâ€šÃ‚Â¿# Ticket Logging Structure

> Tracking convention: mark tasks with `[x]` when complete and `[ ]` when pending. When selecting the next task, scan from the top of each epic for the first unchecked item.


### Epic: Browse Page Ei

[x] Fix the Hero background so it visually matches the EnhancedCarousel styling.

[x] Resolve issue where EnhancedCarousel fails to load or render content.

[x] Update the Hero component layout ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it should use the same layout and styling as the Series hero section.

[x] Implement proper navigation logic:

When the user clicks Play Now on the Hero carousel or an image in the EnhancedCarousel,

Redirect to the Series page if the content is a series.

Redirect to the Watch page if the content is a documentary.

### Epic: Series Page

[x] Style the Series hero content to remove unnecessary spacing and align with design guidelines.

[x] Fix the issue where Episodes fail to load on the page.

### Epic: Watch Page

[x] Fix the bug that throws an error when the All Episodes button is clicked.

[x] Add and display a functional Next Episode button to enable smooth episode progression.

### Epic: Register Page

[x] Adjust the layout so the Register page fits mobile screens correctly (no horizontal scrolling).

[x] Refactor the Netflix-style Navigation used across Register, Plan Selection, and Payment pages to avoid duplication and give it a modern look and feel.

[x] Update button colors to match the design reference provided in the attached image (C:\\Users\\NokukhanyaD\\source\\repos\\iso-media-next\\.claude\\screen_shoot\\menu-image.png).

### Epic: Profile
   ## Account Details
    [x] Format phone numbers to include full international codes (e.g., +27 for South Africa).
    [x] Fix the bug causing an error when saving the First Name field.
    [x] Make the Update Card modal fully visible within the viewport (no scrolling needed).
    [x] Connect the Update Card modal to the Stripe API so users can successfully update their card details.

   ## Plan Details
    [x] Complete and fix the Update Plan feature so users can modify their plan seamlessly.
  ## Settings & Privacy
  [x] Review and ensure Settings & Privacy section functions correctly and adheres to UI/UX consistency.
