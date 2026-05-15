# DigFinder App — Agent Notes

## Workspace Context

This repo (`Digfinder-app`) lives in the same parent folder as `Digfinder-server` — they are **two independent git repos**, not a monorepo. They communicate over HTTP; the app uses `src/services/api.ts` with **`EXPO_PUBLIC_API_URL`** na LAN (celular físico) ou **`http://localhost:3333`** quando a variável está omitida (simulador / web). When working here, only this repo is in scope.

**To run the server** (required for any API call to work):
```bash
cd ../Digfinder-server
npm start   # tsx watch src/server.ts → port 3333
```

**To run the app:**
```bash
npm start   # or: npm run android / npm run ios
```
**Celular físico (Expo Go / dev build):** defina `EXPO_PUBLIC_API_URL` no `.env` com a URL LAN do Mac, ex.: `http://192.168.1.4:3333` (mesma rede que o Metro). No telefone, `localhost` é o próprio aparelho — não serve para o Digfinder-server no Mac.

**Checklist:** servidor rodando (`npm start` em `Digfinder-server`); Mac e celular na mesma Wi‑Fi; firewall permitindo porta **3333**; reinicie o Metro após mudar `.env`.

**Required `.env` variables (this repo):**
```
EXPO_PUBLIC_API_URL=http://<LAN_IP_DO_MAC>:3333   ← obrigatório no celular físico; omitir no simulador (usa localhost)
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=<google-maps-key>
EXPO_PUBLIC_FIREBASE_API_KEY=<firebase-web-api-key>        ← separate from Maps key
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<project>.appspot.com
```

---

## Domain

DigFinder is a fossil discovery tracking mobile app. Users report fossil finds in the field (GPS coordinates, photos, category tags), and browse a community map of all reported discoveries. The tagline is *"Track your discoveries. Inspire others."*

The project was adapted from an NLW Pocket tutorial (a coupon/nearby-markets app by Rocketseat). Lingering vocabulary from that origin — `registers`, `PlaceProps`, `address`, `coupons`, `name` — still appears in frontend components even though the underlying data model no longer has those fields.

---

## Stack

- **Expo SDK ~54 / React Native 0.81.5**
- **Expo Router v6** — file-based routing (similar to Next.js for mobile)
- **Axios** — HTTP client, single shared instance; `baseURL` from `EXPO_PUBLIC_API_URL` or `http://localhost:3333` (`src/services/api.ts`)
- **React Context API** — only global state mechanism (no Redux, Zustand, etc.)
- **React Hook Form + Zod** — form state and validation (used only in the create-discovery form; auth forms use raw `useState`)
- **`@react-native-async-storage/async-storage`** — JWT token persistence
- **`react-native-maps`** — map view (Google Maps on Android, Apple Maps on iOS)
- **Firebase Storage** — image hosting (Firebase Auth is not used)
- **`expo-location`** — GPS coordinates and address geocoding
- **`expo-image-picker`** — device gallery access
- **`@gorhom/bottom-sheet`** — bottom sheet drawer on the map screen
- **`@tabler/icons-react-native`** — icon library
- **Google Font "Livvic"** — loaded via `@expo-google-fonts/livvic`, 4 weights (400/500/600/700)

---

## Authentication Flow

Authentication is managed entirely by `AuthContext` (`src/contexts/Authcontext.tsx`).

**On app start:**
1. Reads token from AsyncStorage under key `@PaleoHunter:token`.
2. If found, sets `Authorization: Bearer <token>` on the shared axios instance's default headers, then calls `GET /auth/me` to rehydrate the user object.
3. If that request fails (expired/invalid token), calls `signOut()`.

**`signIn(email, password)`:**
1. POSTs to `/auth/login`.
2. Stores token in AsyncStorage.
3. Sets the axios default `Authorization` header for all future requests.
4. Saves `user` in context state.
5. Navigates to `/home`.

**`signOut()`:**
1. Removes token from AsyncStorage.
2. Clears `user` from state (does NOT call `/auth/logout` — logout is purely client-side).
3. Navigates to `/` (login screen).

The axios instance has a single shared `Authorization` header mutated on login/logout. All API calls across the app inherit this header automatically.

---

## Route Guard

`PrivateRoute` (`src/components/feature/auth/privateRoute/index.tsx`) wraps the entire navigator. It uses `useSegments()` and `useAuth()` to enforce:
- Not authenticated + not in `auth/` segment → redirect to `/`
- Authenticated + in `auth/` segment → redirect to `/home`
- Renders `<Loading />` while auth state resolves (`loading === true`)

---

## Route Map

| Path | Screen | Status |
|---|---|---|
| `/` | Login | Implemented |
| `/auth/createAccount` | Registration form | Implemented |
| `/auth/recoverPassword` | Password recovery | **Empty file** |
| `/auth/verifyEmail` | Email verification | **Empty file** |
| `/home` | Home dashboard | Implemented |
| `/map` | Community map + bottom sheet | Implemented (with bugs) |
| `/register/createRegister` | New discovery form | Implemented |
| `/register/[id]` | Discovery detail | **Fetches data, renders empty `<View>`** |
| `/categoryExplained` | Category descriptions | Implemented |

---

## Create Discovery Form — Detailed Flow

This is the most complex screen in the app (`src/components/feature/registers/CreateRegisterForm`).

**Validation schema (Zod + React Hook Form):**
- `title`: min 3 chars
- `categoryId`: single UUID string (note: the backend endpoint expects `categoryIds: string[]` — the form wraps this in an array at submit time)
- `description`: min 10 chars
- `latitude` / `longitude`: numbers
- `photos`: array, min 1 image

**Location input modes:**
- **Map mode**: renders a draggable map; the pin's final position sets `latitude`/`longitude` in the form.
- **Address mode**: user types an address; `expo-location`'s `geocodeAsync` converts it to coordinates.

**On mount:** requests `CAMERA` and `MEDIA_LIBRARY` permissions, then calls `expo-location`'s `getCurrentPositionAsync` to center the map on the user's current GPS position.

**Photo handling:** images are picked via `expo-image-picker` and stored as local device URIs in component state (not in the form directly). They are passed to the submit handler separately.

**Submit sequence:**
1. Uploads all local photo URIs to Firebase Storage in parallel via `Promise.all` → receives array of Firebase download URLs.
2. POSTs `{ title, description, latitude, longitude, discoveryDate: new Date().toISOString(), categoryIds: [data.categoryId], imageUrls }` to `POST /discoveries/createDiscovery`.
3. On success, navigates back.

---

## Map Screen — Key Details and Bugs

- On mount: fetches `/categories` and `/registers` (public endpoints, no auth required).
- Category filter at the top re-fetches `/registers/category/:id` when a non-"All" category is selected.
- The map is **initialized to Tokyo coordinates** (`35.6938, 139.7034`) — a placeholder left over from the original tutorial.
- Map pins use a custom `pin.png` image. Tapping a pin shows a `Callout` that references `name` and `address` fields on the register data object — but the current `/registers` response does not have these fields (legacy from the `markets` era). These fields will render as `undefined`.
- The `Places` bottom sheet has two snap points: `278px` and `screenHeight - 128px`. It lists all registers via a `BottomSheetFlatList`. Tapping an item navigates to `/register/:id`.

---

## Firebase Image Storage

`src/services/storage.ts`:
- Fetches the local image URI as a Blob, then uploads it to Firebase Storage.
- Storage path: `discoveries/{userId}/{timestamp}_{randomString}.jpg`
- Returns the Firebase download URL.

**Bug:** `src/services/firebase.ts` sets the Firebase `apiKey` to `process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`. This reuses the Google Maps API key as the Firebase API key, which is almost certainly wrong — they are separate credentials and should be separate environment variables.

Firebase Auth is not used. Storage bucket access appears to be open (no Firebase auth token is passed during upload).

---

## Component Architecture

The project follows atomic design:

**Atoms** — single-responsibility primitives: `Button` (composable: `Button`, `Button.Text`, `Button.Icon`, supports `isLoading`), `BackButton`, `Loading`, `Welcome`, `Category` (pill badge, toggleable), `Place` (card row), `ButtonFlow` (large action card), `ButtonFlowList`.

**Molecules** — composed from atoms: `Categories` (horizontal filter list), `Places` (bottom sheet with list), `UserMenu` (user icon → modal with profile/logout), `ModalConfirm` (reusable confirmation dialog), `CategoryExplained` (scrollable category descriptions).

**Organisms** — complex feature UI: `LoginForm`, `CreateAccountForm`, `CreateRegisterForm`.

**Feature** — cross-cutting: `PrivateRoute`.

---

## Design System

**Colors** (`src/styles/colors.ts`):
- Primary brand: **brown** (4 shades: dark, strong, middle, light) — used for the login screen, splash background, and brand accents.
- Supporting: grays (6 shades), greens, blues (4 shades), red/orange (attention/warning).

**Typography** (`src/styles/typography.ts`):
- Font: "Livvic" (Google Fonts), weights 400/500/600/700.
- Predefined scales: `titleXl/Lg/Md/Sm`, `subtitle`, `action`, `textMd/Sm/Xs`.

**Custom Map Style** (`src/styles/map.ts`):
- Warm parchment/sepia-toned Google Maps style applied **only on Android** (Google Maps provider). iOS uses native Apple Maps with no custom style.

---

## Known Bugs and Technical Debt

### CreateAccountForm Redirects to Nonexistent Route
After successful signup, the form calls `router.replace("/auth/login")`. This route does not exist in Expo Router — the login screen is at `/` (the index route). This will cause a navigation error after account creation.

### Map Initialized to Tokyo
The map default coordinates (`35.6938, 139.7034`) are Tokyo — a leftover from the original tutorial project. The map should initialize to the user's current location or a relevant default.

### Callout Fields Reference Undefined Data
`MapView` pin callouts render `item.name` and `item.address`, but the `/registers` response contains `title` and no `address` field. Both will render as `undefined` in the UI.

### Firebase API Key Misconfiguration
`EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` is used as the Firebase `apiKey`. These are separate credentials. A dedicated `EXPO_PUBLIC_FIREBASE_API_KEY` environment variable should be used.

### Auth Forms Lack Validation
`LoginForm` and `CreateAccountForm` use raw `useState` with no client-side validation. Invalid inputs are only caught by the API response, which degrades UX. These should use React Hook Form + Zod like `CreateRegisterForm`.

### `signOut` Does Not Call `/auth/logout`
The server's `/auth/logout` endpoint exists but is never called by the app's sign-out logic. Logout is purely client-side (removes token from AsyncStorage). This is acceptable given the stateless JWT design, but the backend endpoint is dead code.

### Home Screen Double Export
`home.tsx` exports `Home` both as a named export and a default export. This is inconsistent with the rest of the codebase and could cause confusion.

### `Place` Component Uses Legacy Fields
The `Place` atom still renders `address` and shows an `IconTicket` — both remnants from the `markets`/coupon tutorial. These fields no longer exist in the current `Discovery` / Register data model.

### No Caching or Loading State Management
Every screen fetches its data fresh on mount with no caching. There is no global data layer (no React Query, SWR, or similar). If the same data is needed in multiple screens, it is re-fetched each time.

---

## Pending / Stubbed Features

- **Discovery detail screen** (`/register/[id]`) — fetches data but renders an empty `<View>`.
- **Password recovery screen** (`/auth/recoverPassword`) — empty file.
- **Email verification screen** (`/auth/verifyEmail`) — empty file.
- **User profile** — `UserMenu` has a "Profile" option with a placeholder comment: "Navigation will be implemented later."
- **Custom map style on iOS** — the sepia map style is only applied on Android; iOS uses a plain default map.

---

## Environment Variables

| Variable | Description | Notes |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | REST API base URL for Axios | Physical device: `http://<Mac-LAN-IP>:3333`. Simulator: omit (defaults to `http://localhost:3333`). |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | Also incorrectly used as Firebase `apiKey` — should be separated |
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Should be added as a dedicated variable |
