# Ticket Logging Structure

> Tracking convention: mark tasks with `[x]` when complete and `[ ]` when pending. When selecting the next task, scan from the top of each epic for the first unchecked item.

### Epic: Browse Page

- [x] **Task 1: Background color alignment**
  - **Input:** Browse page background loads.
  - **Expected Outcome:** Background matches site theme color.
  - **Validation:** Verify page background is identical to site theme.
- [x] **Task 2: EnhancedCarousel not loading**
  - **Input:** Load Browse page with carousel content.
  - **Expected Outcome:** EnhancedCarousel loads correctly.
  - **Validation:** Confirm carousel displays expected content.
- [x] **Task 3: Hero component layout update**
  - **Input:** Load Browse page hero section.
  - **Expected Outcome:** Hero matches layout of Series hero.
  - **Validation:** Compare Browse Hero with Series Hero — must be identical.
- [x] **Task 4: Remove empty EnhancedCarousel**
  - **Input:** Browse page with no videos in carousel.
  - **Expected Outcome:** EnhancedCarousel is hidden/removed.
  - **Validation:** Confirm no empty carousel renders.

---

### Epic: Series Page

- [ ] **Task 1: Background blending issue**
  - **Input:** Load Series page.
  - **Expected Outcome:** Background color blends with menu background.
  - **Validation:** Visual consistency check.
- [ ] **Task 2: Remove "Series" label on carousel images**
  - **Input:** Series page with EnhancedCarousel.
  - **Expected Outcome:** No "Series" label on images.
  - **Validation:** Check images — label removed.

---

### Epic: Series/[id] Page

- [ ] **Task 1: Episode image sizing**
  - **Input:** Load Series detail page.
  - **Expected Outcome:** Episode images are normal width.
  - **Validation:** Compare dimensions with design.
- [ ] **Task 2: Remove hover play icon**
  - **Input:** Hover over episode image.
  - **Expected Outcome:** No play icon appears.
  - **Validation:** Hover test.
- [ ] **Task 3: Simplify Hero section**
  - **Input:** Load Hero section.
  - **Expected Outcome:** SERIES label, likes, time average removed.
  - **Validation:** Check Hero displays without these elements.
- [ ] **Task 4: Remove engagement actions**
  - **Input:** Series detail page.
  - **Expected Outcome:** No love/likes, share, or download options.
  - **Validation:** Confirm UI elements are absent.

---

### Epic: Documentary Page

- [ ] **Task 1: Style category span**
  - **Input:** Load documentary page.
  - **Expected Outcome:** `[documentary.type.category.name]` span styled correctly.
  - **Validation:** UI check.
- [ ] **Task 2: Fix Watch button**
  - **Input:** Click Watch button.
  - **Expected Outcome:** Watch button works (navigates/plays).
  - **Validation:** Functional test.
- [ ] **Task 3: Remove empty EnhancedCarousel**
  - **Input:** Documentary page with no videos.
  - **Expected Outcome:** Carousel removed.
  - **Validation:** Confirm no empty carousel renders.
- [ ] **Task 4: Style EnhancedCarousel**
  - **Input:** Load page.
  - **Expected Outcome:** Carousel styled consistently.
  - **Validation:** Visual design check.

---

### Epic: Profile – Account Details

- [ ] **Task 1: Update phone number flow**
  - **Input:** Edit phone number.
  - **Expected Outcome:** Works like full name update.
  - **Validation:** Save/update phone successfully.
- [ ] **Task 2: Update card modal visibility**
  - **Input:** Open update card modal.
  - **Expected Outcome:** Modal visible without scroll.
  - **Validation:** Modal opens at viewport center.
- [ ] **Task 3: Load StripeCheckoutForm in modal**
  - **Input:** Open card update modal.
  - **Expected Outcome:** StripeCheckoutForm loads inside modal (not redirect).
  - **Validation:** Test with API + ensure full payment flow works.

---

### Epic: Profile – Plan Details

- [ ] **Task 1: Manage Plan modal fix**
  - **Input:** Click Manage Plan.
  - **Expected Outcome:** Modal visible immediately.
  - **Validation:** No scroll required.
- [ ] **Task 2: Cancel Plan modal fix**
  - **Input:** Click Cancel Plan.
  - **Expected Outcome:** Modal visible immediately.
  - **Validation:** No scroll required.
- [ ] **Task 3: Change Plan modal fix**
  - **Input:** Click Change Plan.
  - **Expected Outcome:** Modal visible immediately.
  - **Validation:** No scroll required.
- [ ] **Task 4: Confirmation modal styling**
  - **Input:** Click upgrade/downgrade.
  - **Expected Outcome:** Styled confirmation modal shown.
  - **Validation:** Modal appears and styled correctly.

---

### Epic: Profile – Settings & Privacy

- [ ] **Task 1: 2FA modal visibility fix**
  - **Input:** Toggle 2FA.
  - **Expected Outcome:** Modal visible without scroll.
  - **Validation:** Modal appears correctly.
- [ ] **Task 2: Auto logout functionality**
  - **Input:** Stay idle past timeout.
  - **Expected Outcome:** User auto-logged out.
  - **Validation:** Session ends automatically.

---

### Epic: Register Page

- [ ] **Task 1: Hide label from user**
  - **Input:** Register page load.
  - **Expected Outcome:** Label hidden.
  - **Validation:** UI check.
- [ ] **Task 2: Background + styling match Login**
  - **Input:** Register page load.
  - **Expected Outcome:** Styling consistent with Login.
  - **Validation:** Compare UI.
- [ ] **Task 3: Style Create button**
  - **Input:** Register page load.
  - **Expected Outcome:** Create button matches Login button style.
  - **Validation:** Visual check.

---

### Epic: Plan Selection Page

- [ ] **Task 1: Style button**
  - **Input:** Plan selection load.
  - **Expected Outcome:** Button matches Create page style.
  - **Validation:** UI check.
- [ ] **Task 2: Reduce spacing**
  - **Input:** Page load.
  - **Expected Outcome:** Space between "Choose your plan" & back arrow reduced.
  - **Validation:** Visual check.
- [ ] **Task 3: Hide Navigation component**
  - **Input:** Plan selection load.
  - **Expected Outcome:** Nav component not displayed.
  - **Validation:** Confirm hidden.

---

### Epic: Payment Page

- [ ] **Task 1: Background + styling match Login**
  - **Input:** Payment page load.
  - **Expected Outcome:** Background matches Login styling.
  - **Validation:** Compare UI.
- [ ] **Task 2: Adjust Plan Summary display**
  - **Input:** Load Plan Summary.
  - **Expected Outcome:** Today's charges & first month price moved to link to Plan Selection.
  - **Validation:** Confirm link + style correct.
- [ ] **Task 3: Disable Complete Payment button when invalid**
  - **Input:** Leave fields empty or invalid.
  - **Expected Outcome:** Button greyed out until valid.
  - **Validation:** Test null/invalid fields.
- [ ] **Task 4: Hide Navigation component**
  - **Input:** Payment page load.
  - **Expected Outcome:** Nav not displayed.
  - **Validation:** Confirm hidden.
