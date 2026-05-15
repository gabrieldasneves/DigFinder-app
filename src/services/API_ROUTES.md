# API Routes — Current State

Base URL (dev): `http://localhost:3333`  
All authenticated routes require `Authorization: Bearer <token>` header.  
The token is injected automatically by the shared `axios` instance in `api.ts` via `AuthContext`.

> This document reflects the **actual implemented routes** in `Digfinder-server`.  
> For planned / future routes see `spec/features/`.

---

## Auth — `/auth`

| Method | Path | Auth | Body | Response | Notes |
|---|---|---|---|---|---|
| POST | `/auth/signup` | No | `{ name, email, password }` | `{ user }` | Does **not** auto-login. Navigate to login after. |
| POST | `/auth/login` | No | `{ email, password }` | `{ user, token }` | Token expires in 24h. |
| POST | `/auth/logout` | No | — | `200` | Stateless. Invalidation is client-only. |
| POST | `/auth/forgot-password` | No | `{ email }` | `{ token }` (dev only) | Token returned in body **in dev only**. Production: email delivery. |
| GET | `/auth/me` | Yes | — | `{ id, name, email, isVerified, createdAt }` | Called in `AuthContext` to rehydrate session. |

---

## Categories — `/categories`

| Method | Path | Auth | Body | Response | Notes |
|---|---|---|---|---|---|
| GET | `/categories` | No | — | `Category[]` | Ordered by `name` asc. All 10 fossil types. |

```ts
type Category = {
  id: string
  name: string
  description: string | null
  createdAt: string
}
```

---

## Discoveries — `/discoveries` (authenticated user's own data)

All routes below require `Authorization: Bearer <token>`.

| Method | Path | Auth | Body | Response | Notes |
|---|---|---|---|---|---|
| POST | `/discoveries/createDiscovery` | Yes | see below | `{ discovery }` | Creates discovery + images + category links. |
| GET | `/discoveries/getDiscoveries` | Yes | — | `Discovery[]` | Only the current user's discoveries. |
| GET | `/discoveries/getDiscoveryById/:id` | Yes | — | `Discovery` | Must be owned by current user. |
| PUT | `/discoveries/updateDiscovery/:id` | Yes | see below | `{ discovery }` | Replaces category relations entirely. Ownership-checked. |
| DELETE | `/discoveries/deleteDiscovery/:id` | Yes | — | `204` | Ownership-checked. Does NOT delete Firebase images. |

**POST/PUT body:**
```ts
{
  title: string              // min 3 chars
  description?: string
  latitude: number
  longitude: number
  discoveryDate: string      // ISO 8601, e.g. new Date().toISOString()
  categoryIds: string[]      // array of Category UUIDs — required, min 1
  imageUrls?: string[]       // Firebase Storage download URLs
}
```

**Discovery response shape:**
```ts
type Discovery = {
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
  discoveryDate: string
  status: string             // default: 'pending'
  createdAt: string
  updatedAt: string
  userId: string
  categories: Category[]
  images: DiscoveryImage[]
}

type DiscoveryImage = {
  id: string
  url: string
  isPrimary: boolean
  orderIndex: number
  createdAt: string
}
```

---

## Registers — `/registers` (public read feed)

No auth required. Exposes discoveries from **all users** for community map viewing.

| Method | Path | Auth | Response | Notes |
|---|---|---|---|---|
| GET | `/registers` | No | `Register[]` | All discoveries, ordered by title. |
| GET | `/registers/category/:category_id` | No | `Register[]` | Filtered by category UUID. |
| GET | `/registers/:id` | No | `RegisterDetail` | Single discovery with all images + author. |

**Register (list item):**
```ts
type Register = {
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
  discoveryDate: string
  status: string
  categories: Category[]
  images: DiscoveryImage[]   // includes isPrimary — use images[0] or find where isPrimary = true
  user: {
    id: string
    name: string
  }
}
```

**RegisterDetail (single item — `GET /registers/:id`):**
```ts
type RegisterDetail = Register & {
  user: {
    id: string
    name: string
    email: string             // email included only in detail view
  }
}
```

> ⚠️ **Legacy naming alert:** In `map.tsx` and `Place` atom, some code still reads `item.name` and `item.address` from registers. These fields do not exist. Use `item.title` and omit `address`.

---

## Planned Routes (not yet implemented)

| Method | Path | Auth | Purpose | Spec |
|---|---|---|---|---|
| PUT | `/auth/me` | Yes | Update name / avatar | `spec/features/user-profile.md` |
| DELETE | `/auth/me` | Yes | Delete account | `spec/features/user-profile.md` |
| POST | `/auth/reset-password` | No | Reset password with token | `spec/features/auth-flows.md` |
| POST | `/auth/send-verification` | Yes | Send email verification | `spec/features/auth-flows.md` |
| GET | `/auth/verify-email` | No | Confirm email token | `spec/features/auth-flows.md` |

---

## Error Response Format

All errors from the server follow this shape (via the `errorHandling` middleware):

```ts
// AppError (custom) or ZodError
{ message: string }           // statusCode varies: 400, 401, 403, 404, 500

// ZodError (validation failure)
{ message: string, issues: ZodIssue[] }
```

Always read `error.response.data.message` in catch blocks.
