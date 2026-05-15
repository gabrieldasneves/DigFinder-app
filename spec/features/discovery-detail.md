# Feature Spec — Discovery Detail Screen

**Route:** `/register/[id]`  
**File:** `src/app/register/[id].tsx`  
**Status:** Route and data-fetch exist; screen renders an empty `<View>`

---

## Goal

Display the full details of a single fossil discovery — images, title, description, coordinates, categories, discovery date, and the reporting user's name. This screen is reached by tapping a pin on the community map or an item in the bottom sheet list.

---

## API

**Endpoint:** `GET /registers/:id`  
**Auth:** None (public)  
**Response shape:**
```ts
{
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
  discoveryDate: string       // ISO 8601
  status: string              // 'pending' | future moderation statuses
  createdAt: string
  categories: Array<{
    id: string
    name: string
    description: string | null
  }>
  images: Array<{
    id: string
    url: string               // Firebase Storage download URL
    isPrimary: boolean
    orderIndex: number
  }>
  user: {
    id: string
    name: string
    email: string
  }
}
```
Images are already ordered by `orderIndex` on the server. The primary image has `isPrimary: true` (always `images[0]` or the one with `orderIndex === 0`).

---

## Current File State

```ts
// src/app/register/[id].tsx
// The file fetches GET /registers/:id using the id from useLocalSearchParams()
// and stores result in local state. On success it renders:
return <View />
// The fetched data object is never used in JSX.
```

The fetch logic is already in place — only the JSX needs to be built.

---

## Screen Layout (implement in this order)

### 1. Loading state
While data is fetching, render the shared `<Loading />` atom centered on screen.

### 2. Error state
If the request fails or returns nothing, render a short error message with a back button.

### 3. Image carousel (top section)
- If `images.length > 0`: horizontal `FlatList` / `ScrollView` (paginated) showing each `image.url` as a full-width image. Height ~260px.
- If no images: render a gray placeholder with a fossil icon.
- Show a dot indicator (e.g. `index / images.length`) overlaid on the bottom of the carousel.

### 4. Header info (below image)
```
[Back button — top-left, absolute over image]

[Title]           ← discovery.title, typography titleLg, color brown.dark
[Status badge]    ← 'pending' shown as a small pill (gray), future: 'verified' (green)
[Author]          ← "Reported by {user.name}", typography textSm, color grays[4]
[Date]            ← formatted discoveryDate (e.g. "May 3, 2025"), textSm, grays[4]
```

### 5. Categories
Horizontal scroll of `<Category />` atom pills (already built — this atom accepts `name` and `isSelected`; render all as selected/active style since this is read-only).

### 6. Description
If `description` is present, render it as body text. If null, render "No description provided." in a lighter gray.

### 7. Location section
- Label: "Location"
- Small `<MapView>` (non-interactive, `scrollEnabled={false}`, `zoomEnabled={false}`) centered on `{ latitude, longitude }` with a marker pin. Height ~180px, borderRadius 12.
- Below the map: show formatted coordinates (4 decimal places each).

---

## Component Architecture

Do not put all JSX in `[id].tsx`. Follow the existing pattern:

```
src/
  app/
    register/
      [id].tsx           ← thin screen: fetch + pass data down
  components/
    organisms/
      discoveryDetail/   ← NEW: create this organism
        index.tsx
        styles.ts
```

`DiscoveryDetail` receives the full discovery object as a prop and renders all the sections above. This keeps the screen file thin and the organism testable.

---

## Data Types

Add these to a shared types file or inline in the organism:

```ts
type DiscoveryImage = {
  id: string
  url: string
  isPrimary: boolean
  orderIndex: number
}

type DiscoveryCategory = {
  id: string
  name: string
  description: string | null
}

type DiscoveryAuthor = {
  id: string
  name: string
  email: string
}

type DiscoveryDetail = {
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
  discoveryDate: string
  status: string
  createdAt: string
  categories: DiscoveryCategory[]
  images: DiscoveryImage[]
  user: DiscoveryAuthor
}
```

---

## Navigation

The screen is reached from:
1. **Map screen** (`map.tsx`) — `BottomSheetFlatList` item `onPress` already calls `router.push('/register/' + item.id)`. No changes needed there.
2. Potentially from a future user profile screen's discoveries list.

The back button should call `router.back()`.

---

## Style Notes

- Stick to the existing design system: `src/styles/colors.ts`, `src/styles/typography.ts`.
- Use `StyleSheet.create` in a companion `styles.ts` file, not inline styles.
- Image carousel should use `borderRadius: 0` (full bleed). Content below uses standard `paddingHorizontal: 24`.
- The non-interactive MapView should use the same custom sepia style from `src/styles/map.ts` (Android only — same pattern as the main map screen).

---

## What to Avoid

- Do not use `react-native-maps` `<Marker>` with any interactive press handler — this map is read-only.
- Do not re-fetch `/categories` — use the categories included in the discovery response.
- Do not show edit/delete controls unless the authenticated user's `id` matches `discovery.user.id` (defer this to a future iteration).
