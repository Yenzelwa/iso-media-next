# Complete API Endpoints Specification
## IsolaKwaMUNTU Streaming Platform

---

## Overview

This document lists ALL API endpoints with complete input/output specifications extracted from the actual codebase.

**Base URLs:**
- **Main API Server**: `http://172.24.74.185:4002`
- **Payment API Server**: `http://172.24.74.185:4000`

---

## 1. USER AUTHENTICATION API

### 1.1 User Login

**File Location:** `src/app/login/page.tsx` (lines 54-72)

#### **POST /login**

| Field | Value |
|-------|-------|
| **URL** | `http://172.24.74.185:4002/login` |
| **Method** | POST |
| **Authentication** | None required |
| **Purpose** | Authenticate user credentials and establish session |

**Request Headers:**
```javascript
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```typescript
interface LoginRequest {
  email: string;     // User email address
  password: string;  // User password
}
```

**Example Request:**
```javascript
const response = await fetch('http://172.24.74.185:4002/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    email: "user@example.com", 
    password: "password123" 
  }),
});
```

**Success Response (200 OK):**
```typescript
interface LoginResponse {
  id: number;           // User ID
  name: string;         // User full name  
  email: string;        // User email
  plan_id?: number;     // Subscription plan ID
  status?: string;      // Account status
  created_at?: string;  // Account creation date
  updated_at?: string;  // Last update date
  // Additional user properties as returned by API
}
```

**Example Success Response:**
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "user@example.com",
  "plan_id": 1,
  "status": "active"
}
```

**Error Response (Non-200 status):**
```typescript
interface LoginError {
  error: string;     // Error message
  status: number;    // HTTP status code
}
```

**Example Error Response:**
```json
{
  "error": "Invalid email or password",
  "status": 401
}
```

**Post-Processing:**
- Hardcoded token generation: `"gdjfgudishfioshg24545ds4gsgsdg_fdag"`
- User stored in AuthContext via `login(token, user)`
- Redirect to homepage on success
- Error message displayed on failure

### 1.2 User Registration

**File Location:** `src/app/(account)/register/page.tsx` (lines 38-69)

#### **POST /profile**

| Field | Value |
|-------|-------|
| **URL** | `http://172.24.74.185:4002/profile` |
| **Method** | POST |
| **Authentication** | None required |
| **Purpose** | Create new user account |

**Request Headers:**
```javascript
{
  "Content-Type": "application/json"
}
```

**Request Configuration:**
```javascript
{
  credentials: 'include'  // Equivalent to withCredentials: true
}
```

**Request Body:**
```typescript
interface RegisterRequest {
  id: null;                     // Always null for new registrations
  name: string;                 // User's first name from form
  email: string;                // User's email address
  plan_id: number;             // Hardcoded as 1 (default plan)
  status: "pending";           // Account status (always "pending")
  stripe_customer_id: null;    // Stripe customer (created later)
  currency: "USD";             // Account currency (hardcoded)
  phone: null;                 // Phone number (not collected in form)
  payment_method_id: null;     // Payment method (added later)
}
```

**Example Request:**
```javascript
const response = await fetch('http://172.24.74.185:4002/profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: null,
    name: "John Doe",
    email: "john@example.com",
    plan_id: 1,
    status: 'pending',
    stripe_customer_id: null,
    currency: "USD",
    phone: null,
    payment_method_id: null
  }),
  credentials: 'include',
});
```

**Success Response (200 OK):**
```typescript
interface RegisterResponse {
  id: number;           // Generated user ID
  name: string;         // User name
  email: string;        // User email
  plan_id: number;      // Plan ID
  status: string;       // Account status
  currency: string;     // Account currency
  created_at: string;   // Creation timestamp
  updated_at: string;   // Update timestamp
  // Additional fields as returned by API
}
```

**Example Success Response:**
```json
{
  "id": 124,
  "name": "John Doe",
  "email": "john@example.com", 
  "plan_id": 1,
  "status": "pending",
  "currency": "USD",
  "created_at": "2025-09-12T10:30:00Z",
  "updated_at": "2025-09-12T10:30:00Z"
}
```

**Error Response:**
```typescript
interface RegisterError {
  error: string;     // Error message (could be validation errors)
  status: number;    // HTTP status code
}
```

**Example Error Response:**
```json
{
  "error": "Email already exists",
  "status": 409
}
```

**Post-Processing:**
- Same hardcoded token: `"gdjfgudishfioshg24545ds4gsgsdg_fdag"`
- User stored in AuthContext via `login(token, user)`
- Redirect to `plan-selection` page on success
- Error message displayed on failure

---

## 2. VIDEO INTERACTION API

### 2.1 Video Like

**File Location:** `src/app/(root)/watch/[id]/watch-video.tsx` (lines 190-212)

#### **POST /videos/{videoId}/like**

| Field | Value |
|-------|-------|
| **URL** | `http://172.24.74.185:4002/videos/{videoId}/like` |
| **Method** | POST |
| **Authentication** | Implicit (user must be logged in) |
| **Purpose** | Like or unlike a video |

**URL Parameters:**
```typescript
interface LikeVideoParams {
  videoId: number;    // Video ID from route parameter
}
```

**Request Headers:**
```javascript
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```typescript
interface LikeVideoRequest {
  userId: number;     // Current user's ID
  like: boolean;      // true to like, false to unlike
}
```

**Example Request:**
```javascript
const response = await fetch(`http://172.24.74.185:4002/videos/123/like`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 456,
    like: true,
  }),
});
```

**Success Response (200 OK):**
```typescript
interface LikeVideoResponse {
  likes: number;      // Updated total likes count
  dislikes: number;   // Updated total dislikes count
  // May include additional video metadata
}
```

**Example Success Response:**
```json
{
  "likes": 1250,
  "dislikes": 45
}
```

**Error Handling:**
- API failure triggers error state: `'Error occurred updating likes'`
- Optimistic UI update is performed before API call
- UI update is rolled back if API call fails

**Frontend Behavior:**
- **Optimistic Updates**: UI updates immediately before API call
- **Error Recovery**: Rollback changes if API fails
- **State Management**: Updates local video state with API response

---

### 2.2 Video Dislike

**File Location:** `src/app/(root)/watch/[id]/watch-video.tsx` (lines 236-258)

#### **POST /videos/{videoId}/dislike**

| Field | Value |
|-------|-------|
| **URL** | `http://172.24.74.185:4002/videos/{videoId}/dislike` |
| **Method** | POST |
| **Authentication** | Implicit (user must be logged in) |
| **Purpose** | Dislike or remove dislike from a video |

**URL Parameters:**
```typescript
interface DislikeVideoParams {
  videoId: number;    // Video ID from route parameter
}
```

**Request Headers:**
```javascript
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```typescript
interface DislikeVideoRequest {
  userId: number;     // Current user's ID
  dislike: boolean;   // true to dislike, false to remove dislike
}
```

**Example Request:**
```javascript
const response = await fetch(`http://172.24.74.185:4002/videos/123/dislike`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 456,
    dislike: true,
  }),
});
```

**Success Response (200 OK):**
```typescript
interface DislikeVideoResponse {
  likes: number;      // Updated total likes count
  dislikes: number;   // Updated total dislikes count
  // May include additional video metadata
}
```

**Example Success Response:**
```json
{
  "likes": 1249,
  "dislikes": 46
}
```

**Error Handling:**
- API failure triggers error state: `'Error occurred updating dislikes'`
- Optimistic UI update is performed before API call
- UI update is rolled back if API call fails

**Frontend Behavior:**
- **Optimistic Updates**: UI updates immediately before API call
- **Error Recovery**: Rollback changes if API fails
- **State Management**: Updates local video state with API response

---

## 3. PAYMENT API

### 3.1 Create Stripe Customer

**File Location:** `src/components/StripeCheckOutForm.tsx` (lines 61-77)

#### **POST /customer**

| Field | Value |
|-------|-------|
| **URL** | `http://172.24.74.185:4000/customer` |
| **Method** | POST |
| **Authentication** | None specified |
| **Purpose** | Create Stripe customer for payment processing |

**Request Headers:**
```javascript
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```typescript
interface CreateCustomerRequest {
  name: string;              // Cardholder name from billing form
  email: string;             // User email from user context
  payment_method_id: string; // Stripe payment method ID
  profile_id: number;        // User profile ID from user context
}
```

**Example Request:**
```javascript
const response = await fetch('http://172.24.74.185:4000/customer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    payment_method_id: "pm_1234567890",
    profile_id: 124
  }),
});
```

**Success Response (200 OK):**
```typescript
interface CreateCustomerResponse {
  customer: string;     // JSON string containing customer object
  // The customer field contains: { "customer": "cus_S6FTECPO0iJTpB" }
}
```

**Example Success Response:**
```json
{
  "customer": "{\"customer\": \"cus_S6FTECPO0iJTpB\"}"
}
```

**Response Processing:**
```javascript
// Extract customer ID from nested JSON
const customerData = await customerResponse.json();
const customerObject = JSON.parse(customerData.customer);
const customerId = customerObject.customer; // "cus_S6FTECPO0iJTpB"
```

**Error Handling:**
- API failure throws error: `'Failed to create customer'`
- Error propagates to payment form error state

---

### 3.2 Create Subscription

**File Location:** `src/components/StripeCheckOutForm.tsx` (lines 88-102)

#### **POST /subscription**

| Field | Value |
|-------|-------|
| **URL** | `http://172.24.74.185:4000/subscription` |
| **Method** | POST |
| **Authentication** | Required (credentials: 'include') |
| **Purpose** | Process subscription payment |

**Request Headers:**
```javascript
{
  "Content-Type": "application/json"
}
```

**Request Configuration:**
```javascript
{
  credentials: 'include'  // Equivalent to withCredentials: true
}
```

**Request Body:**
```typescript
interface CreateSubscriptionRequest {
  customer_id: string;  // Stripe customer ID from previous API call
  plan_id: string;      // Hardcoded Stripe price ID
}
```

**Example Request:**
```javascript
const response = await fetch('http://172.24.74.185:4000/subscription', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customer_id: "cus_S6FTECPO0iJTpB",
    plan_id: "price_1QWXBTADdfkz5weOBz0VcbeW",
  }),
  credentials: 'include',
});
```

**Success Response (200 OK):**
```typescript
interface CreateSubscriptionResponse {
  // Response structure not specified in code
  // Likely contains subscription details
  subscription_id?: string;
  status?: string;
  current_period_start?: string;
  current_period_end?: string;
}
```

**Hardcoded Values:**
- **Plan ID**: `"price_1QWXBTADdfkz5weOBz0VcbeW"` (Stripe price ID)

**Error Handling:**
- API failure throws error: `'Payment processing failed'`
- Error propagates to payment form error state

**Payment Flow:**
1. Create Stripe payment method (client-side Stripe API)
2. Create customer on backend (`/customer` endpoint)
3. Process subscription (`/subscription` endpoint)
4. Handle success/failure states in UI

---

## 4. MOCK/PLACEHOLDER API

### 4.1 Contact Form Submission (Mock)

**File Location:** `src/app/(root)/contact-us/page.tsx` (lines 69-91)

#### **Contact Form API (Not Implemented)**

| Field | Value |
|-------|-------|
| **URL** | Not implemented (client-side simulation) |
| **Method** | Would be POST |
| **Authentication** | None required |
| **Purpose** | Submit contact form messages |
| **Status** | Mock implementation with setTimeout |

**Current Mock Implementation:**
```javascript
// Simulate API call - replace with actual contact service
await new Promise(resolve => setTimeout(resolve, 2000));
```

**Expected Request Body:**
```typescript
interface ContactFormRequest {
  name: string;           // User's full name
  email: string;          // User's email address
  subject: string;        // Message subject/category
  message: string;        // Message content
}
```

**Example Mock Request Data:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "technical",
  "message": "Having trouble with video playback..."
}
```

**Proposed API Implementation:**
```javascript
// Future implementation would look like:
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

**Expected Response:**
```typescript
interface ContactFormResponse {
  success: boolean;
  message: string;
  ticket_id?: string;
}
```

**Current Mock Behavior:**
- 2-second delay simulation
- Always succeeds with success message
- Form reset after 5-second display
- Error state possible but not currently triggered

---

### 4.2 Password Reset (Mock)

**File Location:** `src/app/(root)/forgot-password/page.tsx` (lines 42-59)

#### **Password Reset API (Not Implemented)**

| Field | Value |
|-------|-------|
| **URL** | Not implemented (client-side simulation) |
| **Method** | Would be POST |
| **Authentication** | None required |
| **Purpose** | Send password reset email |
| **Status** | Mock implementation with setTimeout |

**Current Mock Implementation:**
```javascript
// Simulate API call for password reset
await new Promise(resolve => setTimeout(resolve, 2000));
```

**Expected Request Body:**
```typescript
interface PasswordResetRequest {
  email: string;    // User's email address
}
```

**Example Mock Request Data:**
```json
{
  "email": "user@example.com"
}
```

**Commented Proposed Implementation:**
```javascript
// In production, make actual API call:
// const response = await fetch('/api/forgot-password', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email }),
// });
```

**Expected Response:**
```typescript
interface PasswordResetResponse {
  success: boolean;
  message: string;
}
```

**Current Mock Behavior:**
- 2-second delay simulation
- Always succeeds (sets `emailSent: true`)
- Error handling placeholder available
- No actual email sent

---

## 5. PROFILE API ENDPOINTS ❌

### **CRITICAL FINDING: NO PROFILE API ENDPOINTS EXIST**

All profile functionality currently uses **mock/local state management only** with no backend API integration.

#### **Profile Pages Analyzed:**
- **Main Profile Page**: `src/app/(root)/profile/page.tsx`
- **Membership & Billing**: `src/app/(root)/profile/membershipBilling.tsx`  
- **Plan Details**: `src/app/(root)/profile/PlanDetails.tsx`
- **Security Settings**: `src/app/(root)/profile/SecurityPrivacy.tsx`
- **Profile Sidebar**: `src/app/(root)/profile/ProfileSidebar.tsx`

### 6.1 Current Mock Implementation Details

#### **User Profile Data (Mock)**
**File Location:** `src/app/(root)/profile/page.tsx` (lines 38-59)

**Mock Data Structure:**
```typescript
interface ExtendedUser {
  id: string;
  name: string;              // From auth context
  email: string;             // From auth context
  phone: "+1 (555) 123-4567";           // HARDCODED
  paymentMethod: "Visa ****-****-****-1234";  // HARDCODED
  cardExpiry: "12/26";                  // HARDCODED
  billingAddress: {                     // ALL HARDCODED
    street: "123 Main Street",
    city: "Los Angeles", 
    state: "CA",
    zipCode: "90210",
    country: "United States"
  };
  cellPhone: "+1 (555) 987-6543";       // HARDCODED
}
```

**Update Function (Local State Only):**
```typescript
const updateUser = (updates: any) => {
  // Only updates local React state
  const updated = { ...extendedUser, ...updates };
  setExtendedUser(updated);
  // No API call made
};
```

#### **Billing History (Mock)**
**File Location:** `src/app/(root)/profile/membershipBilling.tsx` (lines 49-60)

**Mock Data:**
```typescript
const billingHistory = [
  { date: '2024-01-15', amount: '$29.99', status: 'Paid', method: 'Visa ****1234' },
  { date: '2023-12-15', amount: '$29.99', status: 'Paid', method: 'Visa ****1234' },
  { date: '2023-11-15', amount: '$29.99', status: 'Paid', method: 'Visa ****1234' },
  { date: '2023-10-15', amount: '$29.99', status: 'Paid', method: 'Visa ****1234' },
  { date: '2023-09-15', amount: '$29.99', status: 'Failed', method: 'Visa ****1234' }
];
```

#### **Subscription Plans (Mock)**
**File Location:** `src/app/(root)/profile/PlanDetails.tsx` (lines 9-31)

**Mock Data:**
```typescript
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    period: 'month',
    features: ['HD streaming on 1 device', 'Access to basic content library'],
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'premium', 
    name: 'Premium',
    price: '$29.99',
    period: 'month',
    features: ['4K Ultra HD streaming on 4 devices', 'Complete content library access'],
    current: true,  // HARDCODED as current plan
    color: 'from-red-600 to-red-800'
  }
];
```

#### **Security Settings (Mock)**
**File Location:** `src/app/(root)/profile/SecurityPrivacy.tsx` (lines 5-50)

**Mock Data:**
```typescript
const [settings, setSettings] = useState({
  twoFactorEnabled: false,     // Local state only
  emailNotifications: true,    // Local state only
  autoLogout: "30"            // Local state only
});

const [devices, setDevices] = useState([
  {
    id: 1,
    device: "MacBook Pro",             // HARDCODED
    location: "Los Angeles, CA",       // HARDCODED
    ip: "192.168.1.100",              // HARDCODED
    lastActive: "Active now"
  }
  // ... more mock device data
]);
```

### 6.2 Missing API Endpoints (Should Be Implemented)

#### **User Profile Management APIs**
```typescript
// These endpoints DO NOT EXIST but should be implemented:

GET    /api/user/profile                    // Fetch user profile
PUT    /api/user/profile                    // Update user information  
PUT    /api/user/profile/phone              // Update phone number
PUT    /api/user/profile/cellphone          // Update cell phone
```

#### **Billing & Payment Management APIs**
```typescript
// These endpoints DO NOT EXIST but should be implemented:

GET    /api/user/billing                    // Fetch billing information
PUT    /api/user/billing/address            // Update billing address
POST   /api/user/payment-methods            // Add payment method
PUT    /api/user/payment-methods/{id}       // Update payment method
DELETE /api/user/payment-methods/{id}       // Remove payment method
GET    /api/user/billing/history            // Fetch transaction history
```

#### **Subscription Management APIs**
```typescript
// These endpoints DO NOT EXIST but should be implemented:

GET    /api/user/subscription               // Fetch subscription details
POST   /api/user/subscription/upgrade       // Upgrade plan
POST   /api/user/subscription/downgrade     // Downgrade plan  
DELETE /api/user/subscription               // Cancel subscription
POST   /api/user/subscription/reactivate    // Reactivate subscription
```

#### **Security & Authentication APIs**
```typescript
// These endpoints DO NOT EXIST but should be implemented:

POST   /api/user/2fa/enable                 // Enable 2FA
POST   /api/user/2fa/disable                // Disable 2FA
POST   /api/user/2fa/verify                 // Verify 2FA setup
GET    /api/user/sessions                   // Fetch active sessions
DELETE /api/user/sessions/{sessionId}       // Logout device
DELETE /api/user/sessions/all               // Logout all devices
PUT    /api/user/settings/auto-logout       // Update auto-logout
```

### 6.3 Profile Component Behavior

#### **Current Frontend Behavior:**
- **Form submissions**: Only update local React state
- **Plan changes**: Display alert messages, no actual API calls
- **Payment updates**: Store in component state, not persisted
- **Security settings**: Local state changes only
- **Device management**: Mock data manipulation only

#### **What Happens Currently:**
1. User updates profile information → Changes local state only
2. User changes payment method → Modal displays but no API call
3. User upgrades/downgrades plan → Alert shown, no backend change
4. User enables 2FA → Local state toggle only
5. User logs out device → Removes from local array only

### 6.4 Integration Gap Analysis

**The profile section represents a complete disconnect between UI and backend:**

| **Feature** | **UI Implementation** | **API Integration** | **Status** |
|-------------|----------------------|---------------------|------------|
| Profile Updates | ✅ Complete | ❌ None | **Not Functional** |
| Billing Management | ✅ Complete | ❌ None | **Not Functional** |
| Plan Management | ✅ Complete | ❌ None | **Not Functional** |
| Security Settings | ✅ Complete | ❌ None | **Not Functional** |
| Payment Methods | ✅ Complete | ❌ None | **Not Functional** |
| Transaction History | ✅ Complete | ❌ None | **Not Functional** |

---

## 6. STATIC CONTENT & CDN

### 6.1 Video Content Delivery

**File Location:** `src/app/(root)/watch/[id]/watch-video.tsx` (line 42)

#### **Video Streaming**

| Field | Value |
|-------|-------|
| **URL** | `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` |
| **Method** | GET |
| **Authentication** | None |
| **Purpose** | Video content delivery |
| **Type** | External CDN |

**Usage:**
```typescript
const videoData = {
  video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
};
```

### 6.2 Image Content Delivery

**File Location:** Various pages (Browse, Series, etc.)

#### **Image Assets**

| Field | Value |
|-------|-------|
| **URL** | `https://images.unsplash.com/photo-*` |
| **Method** | GET |
| **Authentication** | None |
| **Purpose** | Placeholder images for content |
| **Type** | External CDN (Unsplash) |

**Example URLs:**
```typescript
const imageExamples = [
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
  'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80'
];
```

---

## 7. API SUMMARY

### **Active API Endpoints**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/login` | POST | User authentication |
| `/profile` | POST | User account creation |
| `/videos/{id}/like` | POST | Like video |
| `/videos/{id}/dislike` | POST | Dislike video |
| `/customer` | POST | Create Stripe customer |
| `/subscription` | POST | Process subscription |

### **Mock/Placeholder Endpoints**
| Feature | Status | Purpose |
|---------|--------|---------|
| Contact Form | Mock | Contact form submission |
| Password Reset | Mock | Password reset email |

### **Missing Profile API**
| Feature Area | Missing Endpoints | Impact |
|--------------|-------------------|--------|
| Profile Management | 4 endpoints | No profile updates |
| Billing Management | 5 endpoints | No payment updates |
| Subscription Management | 5 endpoints | No plan changes |
| Security Settings | 7 endpoints | No security features |

---

## 8. TECHNICAL PATTERNS

### **Request Configuration**
- Content-Type: `application/json`
- Credentials: `include` for authenticated endpoints
- Base URLs: Main API (`:4002`), Payment API (`:4000`)

### **Error Handling**
- Response status checking via `response.ok`
- Component-level error state management
- Optimistic UI updates with rollback

### **Authentication**
- Cookie-based session management
- Hardcoded token: `gdjfgudishfioshg24545ds4gsgsdg_fdag`
- 7-day cookie expiration

---

**Total API Endpoints:**
- **Active Endpoints**: 6 (Login, Register, Like, Dislike, Create Customer, Create Subscription)
- **Mock Endpoints**: 2 (Contact Form, Password Reset)
- **Static Content**: Multiple CDN URLs for videos and images
- **No API**: Profile, Browse, Series, Documentary, FAQ, About Us (use static/context data)