# Feature Spec — Auth Flows

Covers two stubbed screens and the server endpoints they depend on.

---

## Part A — Password Recovery

### Current State

| Layer | File | State |
|---|---|---|
| App screen | `src/app/auth/recoverPassword.tsx` | Empty file |
| Server endpoint | `POST /auth/forgot-password` | Implemented (returns token in body — dev only) |
| Server endpoint | `POST /auth/reset-password` | **Does not exist** |

### User Flow

```
Login screen
  └─ "Forgot password?" link
        └─ /auth/recoverPassword   (Step 1: enter email)
              └─ success → show confirmation message in-screen (no navigation)
                    └─ User receives email with deep-link token (future)
                          └─ /auth/resetPassword?token=xxx   (Step 2: new password)
```

For now (dev phase), Step 2 can be triggered manually because `POST /auth/forgot-password` returns the token directly in its response body. This is explicitly marked as a TODO in `Digfinder-server/spec/AGENTS.md`.

### Step 1 — Recover Password Screen (`/auth/recoverPassword`)

**File:** `src/app/auth/recoverPassword.tsx`

#### UI States
1. **Form** — email input + submit button
2. **Loading** — button shows spinner, input disabled
3. **Success** — replace form with a confirmation message: *"If that email is registered, a recovery link was sent."* + "Back to login" link
4. **Error** — inline error below the email field

#### Form Validation (Zod)
```ts
const recoverSchema = z.object({
  email: z.string().email('Enter a valid email address'),
})
```
Use React Hook Form + Zod (`useForm`, `zodResolver`) — same pattern as `CreateRegisterForm`.

#### API Call
```ts
POST /auth/forgot-password
Body: { email: string }
// Server returns { token } in dev. Ignore the token value in the UI.
// Treat any 2xx response as success regardless of body content.
```
Do NOT show the token to the user, even in dev builds.

#### Navigation
- `<BackButton />` atom at the top-left (already exists, navigates `router.back()`).
- On success: do not navigate away — replace the form content in-screen with the confirmation message. This avoids the user accidentally re-submitting by going back.

#### Component Architecture
Follow the existing organisms pattern:
```
src/components/organisms/recoverPasswordForm/
  index.tsx
  styles.ts
```

---

### Step 2 — Reset Password Screen (`/auth/resetPassword`)

**This screen requires a new server endpoint first.** Implement in this order:

#### Server-side (Digfinder-server)

Add to `src/controllers/auth-controller.ts`:

```ts
// POST /auth/reset-password
// Body: { token: string, newPassword: string }
// 1. Verify the token with JWT_SECRET
// 2. If valid and not expired, bcrypt hash newPassword (cost 10)
// 3. UPDATE User WHERE id = decoded.userId SET password = hash
// 4. Return 200 { message: 'Password updated.' }
// 5. On invalid/expired token: throw AppError('Invalid or expired token', 400)
```

Add route to `src/routes/auth-routes.ts`:
```ts
authRouter.post('/reset-password', resetPasswordController)
```

#### App-side

**File:** `src/app/auth/resetPassword.tsx` ← new file  
**Route:** `/auth/resetPassword` (reads `token` from query params via `useLocalSearchParams`)

**UI:**
- Two password inputs: "New password" + "Confirm password"
- Submit button
- On success: navigate to `/` (login screen) with a success toast/message

**Zod schema:**
```ts
const resetSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
```

**API call:**
```ts
POST /auth/reset-password
Body: { token: string, newPassword: string }
```

---

## Part B — Email Verification

### Current State

| Layer | File | State |
|---|---|---|
| App screen | `src/app/auth/verifyEmail.tsx` | Empty file |
| Server — send verification | — | **Does not exist** |
| Server — confirm token | — | **Does not exist** |
| DB model | `Verification` table + `User.isVerified` | Exists, nothing writes to it |

### Scope Decision

Email verification is a multi-step feature that requires:
1. Sending emails (requires an email provider: Resend, SendGrid, Nodemailer, etc.)
2. A new server endpoint to generate and store the verification token
3. A new server endpoint to validate the token
4. The app screen to display "check your email" + handle deep-link token confirmation

**Recommended implementation order:**

#### Phase 1 — Server endpoints (no email yet)

**`POST /auth/send-verification`** (protected — requires auth):
```ts
// 1. If user.isVerified is already true, return 400.
// 2. Generate a random token (use crypto.randomUUID() or jwt.sign with short expiry).
// 3. Write to Verification table: { userId, token, type: 'email', expiresAt: now + 24h }
// 4. Return { token } in the response body for now (same dev-only approach as forgot-password).
//    TODO: replace with email delivery later.
```

**`GET /auth/verify-email?token=xxx`** (public):
```ts
// 1. Look up Verification WHERE token = token AND type = 'email' AND expiresAt > now
// 2. If not found: throw AppError('Invalid or expired token', 400)
// 3. UPDATE User SET isVerified = true WHERE id = verification.userId
// 4. DELETE the Verification record (one-time use)
// 5. Return 200 { message: 'Email verified.' }
```

Also add: check `user.isVerified` in `POST /auth/login`. If `false`, return 403 with message `"Please verify your email before logging in."` (decide with project owner whether to enforce this or just track it).

#### Phase 2 — App screen (`/auth/verifyEmail`)

Two sub-states:
1. **Confirmation pending** — shown right after signup: "We sent a verification email to {email}. Check your inbox." + "Resend" button (calls `POST /auth/send-verification`).
2. **Token landing** — when the user opens the deep-link URL. Reads `token` from query params, calls `GET /auth/verify-email?token=xxx`, shows success or error.

**Deep link setup** requires configuring `scheme` in `app.json` (already has `"scheme": "myapp"`) and registering a linking handler in `_layout.tsx`. This is a separate scope of work.

#### Phase 3 — Email delivery

Add an email provider. Recommended: [Resend](https://resend.com) (simple HTTP API, no SMTP config).
```
npm install resend    # in Digfinder-server
```
Replace the `return { token }` response body with an actual email send. The response should then return `{ message: 'Verification email sent.' }`.

### Screen — `/auth/verifyEmail` (Phase 2 minimal version)

**File:** `src/app/auth/verifyEmail.tsx`

Minimal implementation without deep-link handling:
```
[Logo / fossil icon]
"Check your email"
"We sent a verification link to {email}. 
 Click the link to activate your account."
[Resend button]   ← calls POST /auth/send-verification; disabled for 60s after click
[Back to Login]   ← router.replace('/')
```

The `email` value comes from navigation params passed by `createAccountForm` after signup. Pass it via `router.push('/auth/verifyEmail?email=...')`.

---

## Shared Notes for Both Flows

- Use `<BackButton />` atom for all "go back" actions — it already handles `router.back()`.
- Use the existing auth-flow background organism (`auth-flow-background`) for consistent screen wrapping.
- Add input error messages below each field using the same inline error pattern already established in `CreateRegisterForm`.
- All API errors from the server return `{ message: string }` via the `errorHandling` middleware — read `error.response.data.message` in the catch block.
