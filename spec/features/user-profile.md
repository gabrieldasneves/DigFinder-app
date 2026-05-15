# Feature Spec — User Profile

**Entry point:** `UserMenu` molecule → "Profile" option (currently has a placeholder comment)  
**Status:** Not started — no screen file, no server endpoint

---

## Goal

Let users view their own profile information and see a list of their own fossil discoveries. A secondary iteration allows editing name and profile photo.

---

## Server Requirements

### Existing endpoints that cover profile needs

| Need | Endpoint | Notes |
|---|---|---|
| Current user data | `GET /auth/me` | Returns `{ id, name, email, isVerified, createdAt }` — already called in `AuthContext` on app start |
| User's own discoveries | `GET /discoveries/getDiscoveries` | Returns only the authenticated user's discoveries; requires Bearer token |

### New endpoint needed — Update Profile

```
PUT /auth/me
Authorization: Bearer <token>
Body: { name?: string, avatarUrl?: string }
```

Implementation notes for `Digfinder-server`:
1. Verify token via `authenticateToken` middleware.
2. Accept only `name` and `avatarUrl` — do NOT allow updating `email` or `password` via this endpoint (use separate flows).
3. Validate with Zod:
   ```ts
   const updateProfileSchema = z.object({
     name: z.string().min(2).optional(),
     avatarUrl: z.string().url().optional(),
   })
   ```
4. Run `prisma.user.update({ where: { id: req.user.id }, data: { name, avatarUrl } })`.
5. Add `avatarUrl String?` to the `User` model in `prisma/schema.prisma` and create a migration.
6. Return the updated user object (without password).

### New endpoint needed — Delete Account

```
DELETE /auth/me
Authorization: Bearer <token>
```

Implementation notes:
1. Verify token via `authenticateToken`.
2. Delete `User` where `id = req.user.id`. Prisma cascades should handle related Discoveries + Images in DB (verify `onDelete` settings). Firebase Storage images are NOT auto-deleted — log a warning comment.
3. Return 204.

---

## App Screen

**Route:** `/profile`  
**File:** `src/app/profile.tsx` ← new file

### Navigation

In `UserMenu` molecule, replace the placeholder comment with:
```ts
router.push('/profile')
```

### Screen Layout

#### Header / Avatar Section
```
[Back button]
                [Avatar circle — 80px]
                   initials fallback if no avatarUrl
                [user.name]              ← typography titleMd, brown.dark
                [user.email]             ← typography textSm, grays[4]
                [Edit profile button]    ← small outlined button → opens edit modal
```

Avatar rendering:
- If `user.avatarUrl` exists: render as `<Image>` inside a circle (borderRadius 40).
- If not: render a circle with the user's initials (first letter of first name + first letter of last name) in a `brown.light` background.

#### Stats Row
```
[ N Discoveries ]
```
Count fetched from `GET /discoveries/getDiscoveries` (length of the array). Keep this simple — just one stat for now.

#### Discoveries List
Reuse or adapt the existing `Place` atom / `places` molecule, but fix its legacy fields:
- Render `discovery.title` (not `name`)
- Render a formatted `discovery.discoveryDate` (not `address`)
- Tapping an item navigates to `/register/:id`

Use a `FlatList` for performance. Show a loading skeleton or the shared `<Loading />` while fetching.

#### Danger Zone (bottom)
```
[Delete account]   ← red text button, triggers ModalConfirm before DELETE /auth/me
```
On confirmed delete: call `signOut()` from `AuthContext` (clears token, navigates to `/`).

---

## Edit Profile Modal

Keep editing in a bottom sheet or modal rather than a separate route, to avoid complex navigation.

Use `@gorhom/bottom-sheet` (already a dependency).

**Fields:**
- Name (pre-filled with current `user.name`)
- Avatar — "Choose photo" button → `expo-image-picker` → upload to Firebase Storage (same `storage.ts` pattern, path: `avatars/{userId}.jpg`) → stores URL in `avatarUrl`

**On save:** call `PUT /auth/me`, then update the user object in `AuthContext` state so the rest of the app reflects the change immediately.

**AuthContext change needed:**
Add an `updateUser(partial: Partial<User>)` function to `AuthContext` that merges partial data into the current `user` state. This avoids re-fetching `/auth/me` after an update.

---

## Component Architecture

```
src/
  app/
    profile.tsx              ← thin screen: fetches data, composes below
  components/
    organisms/
      userProfile/           ← NEW
        index.tsx            ← layout + avatar + stats + list
        styles.ts
      editProfileSheet/      ← NEW (bottom sheet)
        index.tsx
        styles.ts
```

---

## Data Types

```ts
// Extend the existing User type in AuthContext
type User = {
  id: string
  name: string
  email: string
  isVerified: boolean
  avatarUrl?: string         // add after server migration
  createdAt: string
}
```

---

## Implementation Order

1. Add `avatarUrl` to Prisma schema + migrate.
2. Implement `PUT /auth/me` and `DELETE /auth/me` on the server.
3. Add `profile.tsx` screen + update `UserMenu` navigation.
4. Build `userProfile` organism (read-only view first — avatar initials, stats, list).
5. Build `editProfileSheet` organism.
6. Wire avatar upload via `storage.ts`.
7. Add `updateUser` to `AuthContext`.

---

## What to Avoid

- Do not navigate to `/profile` from `PrivateRoute` checks — it's an authenticated screen, covered by the existing guard.
- Do not fetch `/auth/me` again on the profile screen — the `user` object is already in `AuthContext`; use `useAuth()`.
- Do not show other users' profiles — this screen is strictly for the authenticated user's own data.
