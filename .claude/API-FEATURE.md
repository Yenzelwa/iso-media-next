
# Web API System Specification Document (SSD)
## IsolaKwaMUNTU Streaming Platform — v1.1

---

## Document Information

| **Field** | **Value** |
|---|---|
| **Document Title** | Web API System Specification Document |
| **Project** | IsolaKwaMUNTU Streaming Platform (iso-media-next) |
| **Version** | 1.1 |
| **Date** | 2025-09-13 |
| **Author** | Development Team |
| **Status** | Draft |

> **Notes:** Money = **cents** (integers). All timestamps = **ISO 8601, UTC**. Public endpoints require no auth; others use `Authorization: Bearer <token>`.
> This SSD merges prior specs and normalizes naming, envelopes, and schemas. Mocked data may be served by Next.js API routes for now; replace with external API later without breaking clients.

---

## Table of Contents
1. [Overview](#overview)
2. [Architecture & Base URLs](#architecture--base-urls)
3. [Conventions](#conventions)
4. [Authentication](#authentication)
5. [Profiles & Account](#profiles--account)
6. [Plans & Subscriptions](#plans--subscriptions)
7. [Billing](#billing)
8. [Catalog (Videos, Documentaries, Series)](#catalog-videos-documentaries-series)
9. [Episodes & Playback](#episodes--playback)
10. [Security & Devices](#security--devices)
11. [Data Models](#data-models)
12. [JSON Schemas](#json-schemas)
13. [Coverage Matrix](#coverage-matrix)
14. [Errors](#errors)
15. [Recommendations](#recommendations)

---

## Overview
- Next.js app exposes **internal API routes** under `/api/...` that **proxy** to an **external API** (to be connected later).
- Until the external API is live, routes return **mock JSON** that conforms to schemas in this SSD to enable **TDD** and stable contracts.

---

## Architecture & Base URLs
| Component | Base URL | Purpose |
|---|---|---|
| Frontend API (Next.js) | `/api` | Internal routes consumed by the app |
| External Main API | `https://api.isolakwamuntu.com/v1` (TBD) | Auth, profiles, catalog |
| External Billing API | `https://billing.isolakwamuntu.com/v1` (TBD) | Stripe-backed billing |
| CDN (video) | `https://commondatastorage.googleapis.com/gtv-videos-bucket/` | Streaming assets |
| CDN (images) | `https://images.unsplash.com/` | Placeholder images |

---

## Conventions
- **HTTP**: JSON; `Content-Type: application/json`
- **Envelopes**: Success may be raw resource or wrapped (see schemas); errors use a standard envelope.
- **Pagination**: `Paginated<T>` with `page`, `page_size`, `total`, `next_cursor`.
- **Idempotency**: For write operations (e.g., subscriptions), support `Idempotency-Key` header.
- **Security**: Bearer tokens, HTTPS in production, SameSite=strict cookies when relevant.

---

## Authentication

### POST `/api/auth/register`
**Description:** Create account and return session.  
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

### POST `/api/auth/login`
**Description:** Authenticate and return tokens.  
**Auth:** Public  
**Body:**
```json
{ "email": "string(email)", "password": "string" }
```
**Responses:** **200** (`AuthSession`) • **401** unauthorized

### POST `/api/auth/logout`
**Description:** Invalidate current session.  
**Auth:** Bearer  
**Responses:** **204** No Content

### POST `/api/auth/refresh`
**Description:** Exchange refresh token for new access token.  
**Auth:** Public  
**Body:**
```json
{ "refresh_token": "string(JWT)" }
```
**Responses:** **200** `{ "access_token": "string(JWT)", "expires_in": 3600 }` • **401**

### POST `/api/auth/password/forgot`
**Description:** Send password reset link (if email exists).  
**Auth:** Public  
**Body:**
```json
{ "email": "string(email)" }
```
**Responses:** **202** `{ "message": "reset link sent if email exists" }`

### POST `/api/auth/password/reset/confirm`
**Description:** Complete reset with emailed token.  
**Auth:** Public  
**Body:**
```json
{ "token": "string", "new_password": "string(min 8)" }
```
**Responses:** **200** `{ "message": "password updated" }` • **400** • **410**

### POST `/api/auth/password/change`
**Description:** Change password for logged-in user.  
**Auth:** Bearer  
**Body:**
```json
{ "current_password": "string", "new_password": "string(min 8)" }
```
**Responses:** **200** `{ "message": "password changed" }` • **401**

---

## Profiles & Account

### GET `/api/profiles/me`
**Description:** Fetch current profile.  
**Auth:** Bearer  
**Responses:** **200** (`Profile`)

### PATCH `/api/profiles/me`
**Description:** Partial update of profile.  
**Auth:** Bearer  
**Body (partial):**
```json
{ "name": "string", "phone": "string", "avatar_url": "string(url)" }
```
**Responses:** **200** (`Profile`)

### GET `/api/me`
**Description:** Composite account: profile + subscription + payment + billing address.  
**Auth:** Bearer  
**Responses:** **200** (`Account`)

### PATCH `/api/me`
**Description:** Update account-level fields.  
**Auth:** Bearer  
**Body (partial):**
```json
{ "name": "string", "phone": "string", "billing_address": { "street":"string", "city":"string", "state":"string", "zipCode":"string", "country":"string" } }
```
**Responses:** **200** (`Account`)

### POST `/api/me/email/change`
**Description:** Change email with password confirmation.  
**Auth:** Bearer  
**Body:**
```json
{ "new_email": "string(email)", "password": "string" }
```
**Responses:** **200** `{ "message": "email updated" }` • **409** conflict

### POST `/api/me/phone/change`
**Description:** Change phone number.  
**Auth:** Bearer  
**Body:**
```json
{ "new_phone": "string" }
```
**Responses:** **200** `{ "message": "phone updated" }`

---

## Plans & Subscriptions

### GET `/api/plans`
**Description:** List available plans.  
**Auth:** Public  
**Responses:** **200** `Plan[]`

### GET `/api/subscription`
**Description:** Current user subscription.  
**Auth:** Bearer  
**Responses:** **200** (`Subscription`)

### POST `/api/subscription/change`
**Description:** Switch plan.  
**Auth:** Bearer  
**Body:**
```json
{ "plan_id": "string" }
```
**Responses:** **200** (`Subscription`)

### POST `/api/subscription/cancel`
**Description:** Cancel now or at period end.  
**Auth:** Bearer  
**Body (optional):**
```json
{ "at_period_end": true }
```
**Responses:** **200** (`Subscription`)

### POST `/api/subscription/resume`
**Description:** Resume cancel-at-period-end.  
**Auth:** Bearer  
**Responses:** **200** (`Subscription`)

---

## Billing

### POST `/api/billing/customers`
**Description:** Create billing customer (Stripe-ready).  
**Auth:** Bearer  
**Body:**
```json
{ "name": "string", "email": "string(email)", "profile_id": "string" }
```
**Responses:** **201** (`BillingCustomer`)

### POST `/api/billing/payment-methods/attach`
**Description:** Attach payment method & set default.  
**Auth:** Bearer  
**Body:**
```json
{ "payment_method_id": "string" }
```
**Responses:** **200** (`PaymentMethod`)

### POST `/api/billing/subscriptions`
**Description:** Create billing subscription.  
**Auth:** Bearer  
**Headers:** `Idempotency-Key: string` (optional)  
**Body:**
```json
{ "customer_id": "string", "price_id": "string" }
```
**Responses:** **201** (`Subscription`)

### DELETE `/api/billing/subscriptions/[id]`
**Description:** Cancel billing subscription by ID.  
**Auth:** Bearer  
**Responses:** **204** No Content

### GET `/api/billing/history`
**Description:** List transactions/invoices.  
**Auth:** Bearer  
**Query:** `limit?:number(1..100)`, `cursor?:string`  
**Responses:** **200** `BillingTransaction[]`

### POST `/api/billing/webhooks/stripe`
**Description:** Acknowledge Stripe events (mock).  
**Auth:** Signature (skipped in mocks)  
**Responses:** **200** `{ "received": true }`

---

## Catalog (Videos, Documentaries, Series)

### GET `/api/catalog/videos`
**Description:** Paginated browse with filters.  
**Auth:** Public  
**Query:** `q?`, `page?`, `page_size?`, `category?`, `type?`  
**Responses:** **200** `Paginated<Video>`

### GET `/api/catalog/videos/[id]`
**Description:** Video details.  
**Auth:** Public  
**Responses:** **200** (`Video`)

### POST `/api/catalog/videos/[id]/like`
**Description:** Like/unlike video.  
**Auth:** Bearer  
**Body:**
```json
{ "like": true }
```
**Responses:** **200** (`LikeResponse`)

### GET `/api/catalog/hero`
**Description:** Hero carousel items.  
**Auth:** Public  
**Responses:** **200** `{ "items": Video[] }`

### GET `/api/documentaries`
**Description:** List documentaries.  
**Auth:** Public  
**Query:** `q?`, `category?`, `sort?=latest|popular|rating`  
**Responses:** **200** `Paginated<Video>`

### GET `/api/documentaries/featured`
**Description:** Featured documentary.  
**Auth:** Public  
**Responses:** **200** (`Video`)

### GET `/api/documentaries/collections/[type]`
**Description:** Predefined collections.  
**Auth:** Public  
**Path:** `type = latest|top-rated|science|education`  
**Responses:** **200** `{ "title": "string", "items": Video[] }`

### GET `/api/series`
**Description:** List series.  
**Auth:** Public  
**Query:** `q?`, `category?`, `sort?`, `page?`, `page_size?`  
**Responses:** **200** `Paginated<Series>`

### GET `/api/series/[id]`
**Description:** Series details.  
**Auth:** Public  
**Responses:** **200** (`Series`)

### GET `/api/series/[id]/seasons/[season]/episodes`
**Description:** Episodes in a season.  
**Auth:** Public  
**Responses:** **200** `Episode[]`

### GET `/api/series/collections/[type]`
**Description:** Series collections.  
**Auth:** Public  
**Path:** `type = popular|spirituality|wellness|education`  
**Responses:** **200** `{ "title": "string", "items": Series[] }`

---

## Episodes & Playback

### GET `/api/episodes/[id]`
**Description:** Episode details.  
**Auth:** Public  
**Responses:** **200** (`Episode`)

### GET `/api/episodes/[id]/next`
**Description:** Next episode pointer.  
**Auth:** Public  
**Responses:** **200** `{ "next_episode_id": "string|number|null" }`

### POST `/api/videos/[id]/like`
**Description:** Like/unlike episode (alias).  
**Auth:** Bearer  
**Body:**
```json
{ "like": true }
```
**Responses:** **200** (`LikeResponse`)

### POST `/api/videos/[id]/dislike`
**Description:** Dislike/undislike episode.  
**Auth:** Bearer  
**Body:**
```json
{ "dislike": true }
```
**Responses:** **200** (`LikeResponse`)

### POST `/api/playback/videos/[id]/authorize`
**Description:** Return signed playback URL (mock).  
**Auth:** Bearer  
**Responses:** **200** (`AuthorizePlaybackResponse`)

---

## Security & Devices

### GET `/api/security`
**Description:** Security/privacy settings.  
**Auth:** Bearer  
**Responses:** **200** (`SecuritySettings`)

### PATCH `/api/security`
**Description:** Update security/privacy settings.  
**Auth:** Bearer  
**Body (partial):**
```json
{ "two_factor_enabled": true, "login_alerts": true, "auto_logout_minutes": 30, "data_collection": false }
```
**Responses:** **200** (`SecuritySettings`)

### GET `/api/security/devices`
**Description:** List active device sessions.  
**Auth:** Bearer  
**Responses:** **200** `DeviceSession[]`

### POST `/api/security/devices/[id]/logout`
**Description:** Logout a specific device.  
**Auth:** Bearer  
**Responses:** **200** `{ "message": "device logged out" }`

### POST `/api/security/devices/logout-all-others`
**Description:** Logout all sessions except current.  
**Auth:** Bearer  
**Responses:** **200** `{ "message": "other devices logged out" }`

---

## Data Models

> Canonical (snake_case) resources. See JSON Schemas for exact constraints.

- **AuthSession**: `access_token`, `refresh_token`, `expires_in`, `user`
- **Profile**
- **Plan**
- **Subscription**
- **BillingCustomer**
- **PaymentMethod**
- **BillingTransaction**
- **Video**, **Series**, **Season**, **Episode**
- **SecuritySettings**, **DeviceSession**
- **Paginated<T>**, **LikeResponse**, **AuthorizePlaybackResponse**
- **ErrorEnvelope**

---

## JSON Schemas

> Draft **2020-12**. Can be used in tests to validate mocks and real responses.

```json
{
  "$id": "https://isolakwamuntu.com/schemas/common.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "id": { "anyOf": [{"type":"string"},{"type":"number"}] },
    "email": { "type":"string", "format":"email" },
    "url": { "type":"string", "format":"uri" },
    "timestamp": { "type":"string", "format":"date-time" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/auth-session.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["access_token","refresh_token","expires_in","user"],
  "properties": {
    "access_token": { "type":"string" },
    "refresh_token": { "type":"string" },
    "expires_in": { "type":"integer", "minimum": 1 },
    "user": {
      "type":"object",
      "required":["id","email"],
      "properties": {
        "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
        "email": { "type":"string","format":"email" },
        "name": { "type":"string" }
      }
    }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/profile.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","email","name"],
  "properties": {
    "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "email": { "type":"string","format":"email" },
    "name": { "type":"string" },
    "phone": { "type":["string","null"] },
    "avatar_url": { "type":["string","null"], "format":"uri" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/plan.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","name","price_cents","interval"],
  "properties": {
    "id": { "type":"string" },
    "name": { "type":"string" },
    "price_cents": { "type":"integer","minimum":0 },
    "interval": { "enum":["month","year"] },
    "devices": { "type":"integer","minimum":1 },
    "quality": { "enum":["HD","4K"] }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/subscription.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","plan","status","current_period_start","current_period_end"],
  "properties": {
    "id": { "type":"string" },
    "plan": { "$ref":"https://isolakwamuntu.com/schemas/plan.json" },
    "status": { "enum":["active","canceled","incomplete","trialing","past_due"] },
    "current_period_start": { "type":"string","format":"date-time" },
    "current_period_end": { "type":"string","format":"date-time" },
    "cancel_at_period_end": { "type":"boolean" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/billing-customer.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","stripe_customer_id","email","name"],
  "properties": {
    "id": { "type":"string" },
    "stripe_customer_id": { "type":"string" },
    "email": { "type":"string","format":"email" },
    "name": { "type":"string" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/payment-method.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","brand","last4","exp_month","exp_year"],
  "properties": {
    "id": { "type":"string" },
    "brand": { "type":"string" },
    "last4": { "type":"string","pattern":"^\d{4}$" },
    "exp_month": { "type":"integer","minimum":1,"maximum":12 },
    "exp_year": { "type":"integer","minimum":2020 }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/billing-transaction.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","date","amount_cents","currency","status","description"],
  "properties": {
    "id": { "type":"string" },
    "date": { "type":"string","format":"date-time" },
    "amount_cents": { "type":"integer","minimum":0 },
    "currency": { "type":"string","minLength":3,"maxLength":3 },
    "status": { "enum":["paid","failed","refunded"] },
    "description": { "type":"string" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/video.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","title","image_path","rating","likes","release_date","type"],
  "properties": {
    "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "title": { "type":"string" },
    "description": { "type":"string" },
    "image_path": { "type":"string","format":"uri" },
    "video_path": { "type":["string","null"],"format":"uri" },
    "rating": { "type":"number","minimum":0 },
    "likes": { "type":"integer","minimum":0 },
    "dislikes": { "type":"integer","minimum":0,"default":0 },
    "release_date": { "type":"string","format":"date-time" },
    "type": {
      "type":"object",
      "required":["id","name","category"],
      "properties": {
        "id": { "type":"integer" },
        "name": { "enum":["Series","Documentary","Movie"] },
        "category": {
          "type":"object",
          "required":["id","name"],
          "properties": {
            "id": { "type":"integer" },
            "name": { "enum":["Spirituality","Wellness","Education","Science"] }
          }
        }
      }
    }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/series.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","title","image_path"],
  "properties": {
    "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "title": { "type":"string" },
    "description": { "type":"string" },
    "image_path": { "type":"string","format":"uri" },
    "seasons": {
      "type":"array",
      "items": {
        "type":"object",
        "required":["id","seasonNumber"],
        "properties": {
          "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
          "seasonNumber": { "type":"integer","minimum":1 }
        }
      }
    }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/episode.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","series_id","season_id","episode_number","title","image_path","likes","dislikes","ratings","release_date"],
  "properties": {
    "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "series_id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "season_id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "episode_number": { "type":"integer","minimum":1 },
    "title": { "type":"string" },
    "description": { "type":"string" },
    "image_path": { "type":"string","format":"uri" },
    "video_id": { "anyOf":[{"type":"string"},{"type":"number"}] },
    "video_path": { "type":["string","null"],"format":"uri" },
    "likes": { "type":"integer","minimum":0 },
    "dislikes": { "type":"integer","minimum":0 },
    "ratings": { "type":"number","minimum":0 },
    "release_date": { "type":"string","format":"date-time" },
    "user": {
      "type":"object",
      "properties": {
        "id": { "anyOf":[{"type":"string"},{"type":"number"}] },
        "like": { "type":"boolean" },
        "dislike": { "type":"boolean" },
        "rating": { "type":"number","minimum":0 }
      }
    }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/security-settings.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["two_factor_enabled","login_alerts","auto_logout_minutes","data_collection"],
  "properties": {
    "two_factor_enabled": { "type":"boolean" },
    "login_alerts": { "type":"boolean" },
    "auto_logout_minutes": { "type":"integer","minimum":5 },
    "data_collection": { "type":"boolean" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/device-session.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["id","device","browser","ip","location","current","last_active"],
  "properties": {
    "id": { "type":"string" },
    "device": { "type":"string" },
    "browser": { "type":"string" },
    "ip": { "type":"string","format":"ipv4" },
    "location": { "type":"string" },
    "current": { "type":"boolean" },
    "last_active": { "type":"string","format":"date-time" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/paginated.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["items","page","page_size","total"],
  "properties": {
    "items": { "type":"array" },
    "page": { "type":"integer","minimum":1 },
    "page_size": { "type":"integer","minimum":1 },
    "total": { "type":"integer","minimum":0 },
    "next_cursor": { "type":["string","null"] }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/like-response.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["likes","dislikes","user"],
  "properties": {
    "likes": { "type":"integer","minimum":0 },
    "dislikes": { "type":"integer","minimum":0 },
    "user": {
      "type":"object",
      "required":["like"],
      "properties": {
        "like": { "type":"boolean" },
        "dislike": { "type":"boolean" }
      }
    }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/authorize-playback.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["signed_url","expires_at"],
  "properties": {
    "signed_url": { "type":"string","format":"uri" },
    "expires_at": { "type":"string","format":"date-time" }
  }
}
```
```json
{
  "$id": "https://isolakwamuntu.com/schemas/error-envelope.json",
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "type":"object",
  "required":["error"],
  "properties": {
    "error": {
      "type":"object",
      "required":["code","message"],
      "properties": {
        "code": { "type":"string" },
        "message": { "type":"string" },
        "details": { "type":"object" }
      }
    }
  }
}
```

---

## Coverage Matrix

| Endpoint | Request Model | Response Model |
|---|---|---|
| `POST /api/auth/register` | Registration body | `AuthSession` |
| `POST /api/auth/login` | Login body | `AuthSession` |
| `POST /api/auth/logout` | — | — (204) |
| `POST /api/auth/refresh` | Refresh body | Access token object |
| `POST /api/auth/password/forgot` | Email body | Message |
| `POST /api/auth/password/reset/confirm` | Token + password | Message |
| `POST /api/auth/password/change` | Current + new password | Message |
| `GET /api/profiles/me` | — | `Profile` |
| `PATCH /api/profiles/me` | Partial profile | `Profile` |
| `GET /api/me` | — | `Account` |
| `PATCH /api/me` | Partial account | `Account` |
| `POST /api/me/email/change` | Email + password | Message |
| `POST /api/me/phone/change` | New phone | Message |
| `GET /api/plans` | — | `Plan[]` |
| `GET /api/subscription` | — | `Subscription` |
| `POST /api/subscription/change` | Plan id | `Subscription` |
| `POST /api/subscription/cancel` | at_period_end? | `Subscription` |
| `POST /api/subscription/resume` | — | `Subscription` |
| `POST /api/billing/customers` | Name/email/profile_id | `BillingCustomer` |
| `POST /api/billing/payment-methods/attach` | payment_method_id | `PaymentMethod` |
| `POST /api/billing/subscriptions` | customer_id + price_id | `Subscription` |
| `DELETE /api/billing/subscriptions/[id]` | — | 204 |
| `GET /api/billing/history` | limit/cursor | `BillingTransaction[]` |
| `POST /api/billing/webhooks/stripe` | Stripe event | Acknowledgement |
| `GET /api/catalog/videos` | query | `Paginated<Video>` |
| `GET /api/catalog/videos/[id]` | — | `Video` |
| `POST /api/catalog/videos/[id]/like` | like flag | `LikeResponse` |
| `GET /api/catalog/hero` | — | `{ "items": Video[] }` |
| `GET /api/documentaries` | query | `Paginated<Video>` |
| `GET /api/documentaries/featured` | — | `Video` |
| `GET /api/documentaries/collections/[type]` | path | Title + `Video[]` |
| `GET /api/series` | query | `Paginated<Series>` |
| `GET /api/series/[id]` | — | `Series` |
| `GET /api/series/[id]/seasons/[season]/episodes` | path | `Episode[]` |
| `GET /api/series/collections/[type]` | path | Title + `Series[]` |
| `GET /api/episodes/[id]` | — | `Episode` |
| `GET /api/episodes/[id]/next` | — | next id |
| `POST /api/videos/[id]/like` | like flag | `LikeResponse` |
| `POST /api/videos/[id]/dislike` | dislike flag | `LikeResponse` |
| `POST /api/playback/videos/[id]/authorize` | — | `AuthorizePlaybackResponse` |
| `GET /api/security` | — | `SecuritySettings` |
| `PATCH /api/security` | partial | `SecuritySettings` |
| `GET /api/security/devices` | — | `DeviceSession[]` |
| `POST /api/security/devices/[id]/logout` | path | Message |
| `POST /api/security/devices/logout-all-others` | — | Message |

---

## Errors

**Error Envelope** (all non-2xx unless noted):
```json
{ "error": { "code": "string", "message": "string", "details": {} } }
```
Common codes: `validation_error`, `unauthorized`, `forbidden`, `not_found`, `conflict`, `rate_limited`, `internal`.

---

## Recommendations
- Generate **TypeScript types** from schemas (Zod or `typescript-json-schema`).
- Add contract tests that validate **mock JSON** against these schemas (TDD).
- Keep endpoints stable; evolve via **backward-compatible** changes.
