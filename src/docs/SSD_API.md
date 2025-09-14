# iso-media-next – API SSD (Simplified with Resources)

---

## 1. Purpose

This REST API powers **iso-media-next**, the streaming platform built with Next.js. It supports authentication, profiles, subscriptions, billing (Stripe), browsing videos, playback, and user account management.

---

## 2. Audience

* **Frontend Developers** – connect the Next.js app to backend services.
* **QA Engineers** – verify and test API endpoints.
* **Backend Engineers** – maintain and extend the API.

---


# 3. iso-media-next – API Calls (Detailed SSD)
_Base URL: `https://api.iso-media-next.com/v1` • All timestamps ISO 8601 (UTC) • Money in **cents** • Auth via `Authorization: Bearer <token>` unless noted._

---

## 1) Authentication

### POST `/auth/register`
**Description:** Create a new user account and return an authenticated session.  
**Auth:** Public  
**Headers:** `Content-Type: application/json`  
**Body (JSON):**
```json
{ "first_name": "string", "email": "string(email)", "password": "string(min 8)" }
```
**Responses:**
- **201** (`AuthSession`)
```json
{
  "access_token": "string(JWT)",
  "refresh_token": "string(JWT)",
  "expires_in": 3600,
  "user": { "id": "string", "email": "string(email)", "name": "string" }
}
```
- **400** validation_error • **409** conflict(email exists)

---

### POST `/auth/login`
**Description:** Authenticate user and return tokens.  
**Auth:** Public  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{ "email": "string(email)", "password": "string" }
```
**Responses:**
- **200** (`AuthSession`) – same schema as above
- **401** unauthorized (invalid credentials)

---

### POST `/auth/logout`
**Description:** Invalidate the current access token.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **204** No Content

---

### POST `/auth/refresh`
**Description:** Exchange refresh token for a new access token.  
**Auth:** Public  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{ "refresh_token": "string(JWT)" }
```
**Responses:**
- **200**
```json
{ "access_token": "string(JWT)", "expires_in": 3600 }
```
- **401** unauthorized (expired/invalid)

---

### POST `/auth/password/forgot` (alias: `/auth/password/reset/request`)
**Description:** Sends password reset email if account exists.  
**Auth:** Public  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{ "email": "string(email)" }
```
**Responses:**
- **202**
```json
{ "message": "reset link sent if email exists" }
```

---

### POST `/auth/password/reset/confirm`
**Description:** Finalize reset with emailed token.  
**Auth:** Public  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{ "token": "string", "new_password": "string(min 8)" }
```
**Responses:**
- **200** 
```json
{ "message": "password updated" }
```
- **400** validation_error (weak password) • **410** token expired

---

### POST `/auth/password/change`
**Description:** Change password for logged-in user.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "current_password": "string", "new_password": "string(min 8)" }
```
**Responses:**
- **200**
```json
{ "message": "password changed" }
```
- **401** unauthorized (bad current password)

---

## 2) Profiles

### GET `/profiles/me`
**Description:** Get current user profile.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200** (`Profile`)
```json
{ "id": "string", "email": "string(email)", "name": "string", "phone": "string|null", "avatar_url": "string(url)|null" }
```

---

### PATCH `/profiles/me`
**Description:** Partially update profile.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body (partial):**
```json
{ "name": "string", "phone": "string", "avatar_url": "string(url)" }
```
**Responses:**
- **200** (`Profile`) – same schema as GET

---

## 3) Plans & Subscriptions

### GET `/plans`
**Description:** Public plans listing.  
**Auth:** Public  
**Responses:**
- **200** `Plan[]`
```json
[{ "id": "string", "name": "string", "price_cents": 799, "interval": "month|year", "devices": 1, "quality": "HD|4K" }]
```

---

### GET `/subscription`
**Description:** Get current user subscription.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200** (`Subscription`)
```json
{
  "id": "string",
  "plan": { "id": "string", "name": "string", "price_cents": 799, "interval": "month|year" },
  "status": "active|canceled|incomplete|trialing",
  "current_period_start": "2024-01-01T00:00:00Z",
  "current_period_end": "2024-02-01T00:00:00Z",
  "cancel_at_period_end": false
}
```

---

### POST `/subscription/change`
**Description:** Switch to a different plan.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "plan_id": "string" }
```
**Responses:**
- **200** (`Subscription`) – updated plan

---

### POST `/subscription/cancel`
**Description:** Cancel subscription now or at period end.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body (optional):**
```json
{ "at_period_end": true }
```
**Responses:**
- **200** (`Subscription`) – with `cancel_at_period_end` set accordingly

---

### POST `/subscription/resume`
**Description:** Resume a canceled-at-period-end subscription.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200** (`Subscription`) – status `active`

---

## 4) Billing (Stripe-backed)

### POST `/billing/customers`
**Description:** Create a Stripe-linked billing customer.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "name": "string", "email": "string(email)", "profile_id": "string" }
```
**Responses:**
- **201** (`BillingCustomer`)
```json
{ "id": "string", "stripe_customer_id": "string", "email": "string(email)", "name": "string" }
```

---

### POST `/billing/payment-methods/attach`
**Description:** Attach a payment method to the customer and set default.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "payment_method_id": "string" }
```
**Responses:**
- **200** (`PaymentMethod`)
```json
{ "id": "string", "brand": "visa", "last4": "4242", "exp_month": 12, "exp_year": 2030 }
```

---

### POST `/billing/subscriptions`
**Description:** Create a Stripe subscription for a customer to a price.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "customer_id": "string", "price_id": "string" }
```
**Responses:**
- **201** (`Subscription`) – see schema above

---

### DELETE `/billing/subscriptions/{id}`
**Description:** Cancel a billing subscription by ID.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **204** No Content

---

### GET `/billing/history`
**Description:** List transactions/invoices.  
**Auth:** Required  
**Headers:** `Authorization`  
**Query:** `?limit=number&cursor=string`  
**Responses:**
- **200** `BillingTransaction[]`
```json
[
  {
    "id": "string",
    "date": "2024-01-15T10:00:00Z",
    "amount_cents": 1999,
    "currency": "USD",
    "status": "paid|failed|refunded",
    "description": "Premium Monthly Subscription"
  }
]
```

---

### POST `/billing/webhooks/stripe`
**Description:** Receive Stripe webhook events.  
**Auth:** Verified via `Stripe-Signature` header  
**Headers:** `Stripe-Signature`  
**Body:** Stripe event payload (varies)  
**Responses:**
- **200**
```json
{ "received": true }
```

---

## 5) Catalog – General Videos

### GET `/catalog/videos`
**Description:** Browse videos with pagination and filters.  
**Auth:** Public  
**Query:** `q`, `page`, `page_size`, `category`, `type`  
**Responses:**
- **200** `Paginated<Video>`
```json
{
  "items": [ { "id": "string|number", "title": "string", "description": "string", "image_path": "string(url)", "video_path": "string(url)|null", "rating": 0, "likes": 0, "release_date": "2023-05-25T00:00:00Z", "type": { "id": 1, "name": "Series|Documentary|Movie", "category": { "id": 1, "name": "Spirituality|Wellness|Education|Science" } } } ],
  "page": 1, "page_size": 24, "total": 120, "next_cursor": "string|null"
}
```

---

### GET `/catalog/videos/{id}`
**Description:** Retrieve video details by ID.  
**Auth:** Public  
**Responses:**
- **200** (`Video`) – see model schema

---

### POST `/catalog/videos/{id}/like`
**Description:** Like/unlike a video.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "like": true }
```
**Responses:**
- **200**
```json
{ "likes": 120, "dislikes": 0, "user": { "like": true, "dislike": false } }
```

---

### GET `/catalog/hero`
**Description:** Featured/hero carousel items.  
**Auth:** Public  
**Responses:**
- **200**
```json
{ "items": [ { "id": "string|number", "title": "string", "image_path": "string(url)" } ] }
```

---

## 6) Catalog – Documentaries

### GET `/documentaries`
**Description:** List documentaries.  
**Auth:** Public  
**Query:** `q`, `category`, `sort` = `latest|popular|rating`  
**Responses:**
- **200** `Paginated<Video>`

---

### GET `/documentaries/featured`
**Description:** Featured documentary.  
**Auth:** Public  
**Responses:**
- **200** (`Video`)

---

### GET `/documentaries/collections/{type}`
**Description:** Predefined collections.  
**Auth:** Public  
**Path:** `type=latest|top-rated|science|education`  
**Responses:**
- **200**
```json
{ "title": "string", "items": [ /* Video[] */ ] }
```

---

## 7) Catalog – Series

### GET `/series`
**Description:** List series.  
**Auth:** Public  
**Query:** `q`, `category`, `sort`  
**Responses:**
- **200** `Paginated<Series>`
```json
{ "items": [ { "id": "string|number", "title": "string", "description": "string", "image_path": "string(url)", "seasons": [] } ], "page": 1, "page_size": 24, "total": 12, "next_cursor": null }
```

---

### GET `/series/{id}`
**Description:** Series details.  
**Auth:** Public  
**Responses:**
- **200** (`Series`)

---

### GET `/series/{id}/seasons/{season}/episodes`
**Description:** List episodes in a season.  
**Auth:** Public  
**Responses:**
- **200** `Episode[]`
```json
[ { "id": "string|number", "series_id": "string|number", "season_id": "string|number", "episode_number": 1, "title": "string", "description": "string", "image_path": "string(url)", "video_id": "string|number", "video_path": "string(url)|null", "likes": 0, "dislikes": 0, "ratings": 0, "release_date": "2023-05-25T00:00:00Z", "user": { "id": "string|number", "like": false, "dislike": false, "rating": 0 } } ]
```

---

### GET `/series/collections/{type}`
**Description:** Predefined series collections.  
**Auth:** Public  
**Path:** `type=popular|spirituality|wellness|education`  
**Responses:**
- **200**
```json
{ "title": "string", "items": [ /* Series[] */ ] }
```

---

## 8) Episodes & Playback

### GET `/episodes/{id}`
**Description:** Episode details by ID.  
**Auth:** Public  
**Responses:**
- **200** (`Episode`)

---

### GET `/episodes/{id}/next`
**Description:** Next episode pointer.  
**Auth:** Public  
**Responses:**
- **200**
```json
{ "next_episode_id": "string|null" }
```

---

### POST `/videos/{id}/like`
**Description:** Like/unlike an episode (alias for video like).  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "like": true }
```
**Responses:**
- **200** same structure as `/catalog/videos/{id}/like`

---

### POST `/videos/{id}/dislike`
**Description:** Dislike/undislike an episode (alias for video dislike).  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "dislike": true }
```
**Responses:**
- **200**
```json
{ "likes": 0, "dislikes": 6, "user": { "like": false, "dislike": true } }
```

---

### POST `/playback/videos/{id}/authorize`
**Description:** Get a short-lived signed URL for playback.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200**
```json
{ "signed_url": "string(url)", "expires_at": "2025-01-01T00:00:00Z" }
```

---

## 9) Profile & Account

### GET `/me`
**Description:** Extended account view (profile, subscription, payment method, billing address).  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200** (`Account`)
```json
{
  "profile": { "id": "string", "email": "string(email)", "name": "string", "phone": "string|null", "avatar_url": "string(url)|null" },
  "subscription": {
    "id": "string",
    "plan": { "id": "string", "name": "string", "price_cents": 799, "interval": "month|year" },
    "status": "active|canceled|incomplete|trialing",
    "current_period_start": "2024-01-01T00:00:00Z",
    "current_period_end": "2024-02-01T00:00:00Z",
    "cancel_at_period_end": false
  },
  "payment_method": { "id": "string", "brand": "visa", "last4": "4242", "exp_month": 12, "exp_year": 2030 },
  "billing_address": { "street": "string", "city": "string", "state": "string", "zipCode": "string", "country": "string" }
}
```

---

### PATCH `/me`
**Description:** Update account-level fields.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body (partial):**
```json
{ "name": "string", "phone": "string", "billing_address": { "street": "string", "city": "string", "state": "string", "zipCode": "string", "country": "string" } }
```
**Responses:**
- **200** (`Account`) – updated

---

### POST `/me/email/change`
**Description:** Change email with password confirmation.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "new_email": "string(email)", "password": "string" }
```
**Responses:**
- **200**
```json
{ "message": "email updated" }
```

---

### POST `/me/phone/change`
**Description:** Change phone number.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body:**
```json
{ "new_phone": "string" }
```
**Responses:**
- **200**
```json
{ "message": "phone updated" }
```

---

## 10) Security & Privacy

### GET `/security`
**Description:** Get security/privacy settings.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200** (`SecuritySettings`)
```json
{ "two_factor_enabled": false, "login_alerts": true, "auto_logout_minutes": 30, "data_collection": false }
```

---

### PATCH `/security`
**Description:** Update security/privacy settings.  
**Auth:** Required  
**Headers:** `Authorization`, `Content-Type: application/json`  
**Body (partial):**
```json
{ "two_factor_enabled": true, "login_alerts": true, "auto_logout_minutes": 30, "data_collection": false }
```
**Responses:**
- **200** (`SecuritySettings`) – updated

---

### GET `/security/devices`
**Description:** List active device sessions.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200** `DeviceSession[]`
```json
[ { "id": "string", "device": "MacBook Pro", "browser": "Chrome", "ip": "203.0.113.10", "location": "Los Angeles, CA", "current": true, "last_active": "2024-01-15T10:00:00Z" } ]
```

---

### POST `/security/devices/{id}/logout`
**Description:** Logout a specific device session.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200**
```json
{ "message": "device logged out" }
```

---

### POST `/security/devices/logout-all-others`
**Description:** Logout all sessions except current.  
**Auth:** Required  
**Headers:** `Authorization`  
**Responses:**
- **200**
```json
{ "message": "other devices logged out" }
```

---

## 11) Error Envelope
**Structure (all non-2xx responses use this envelope unless otherwise noted):**
```json
{ "error": { "code": "string", "message": "string", "details": {} } }
```
_Common codes:_ `validation_error`, `unauthorized`, `forbidden`, `not_found`, `conflict`, `rate_limited`, `internal`.

---

## 12) Curl Quick Start

### Login then Get Profile
```bash
BASE=https://api.iso-media-next.com/v1
TOKEN=$(curl -s -X POST "$BASE/auth/login" -H 'Content-Type: application/json' -d '{"email":"user@example.com","password":"P@ssw0rd!"}' | jq -r '.access_token')
curl -s "$BASE/profiles/me" -H "Authorization: Bearer $TOKEN"
```

### Forgot + Reset Password
```bash
BASE=https://api.iso-media-next.com/v1
curl -s -X POST "$BASE/auth/password/forgot" -H 'Content-Type: application/json' -d '{"email":"user@example.com"}'
curl -s -X POST "$BASE/auth/password/reset/confirm" -H 'Content-Type: application/json' -d '{"token":"<from-email>","new_password":"NewP@ssw0rd!"}'
```
