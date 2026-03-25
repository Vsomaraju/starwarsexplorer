# 🌌 Star Wars Explorer (React Native)

A clean, production-inspired React Native application built with **TypeScript**, showcasing API integration, state management, and modern UI patterns using the **Star Wars API (SWAPI & AKABAB [for Images])**.

---

## 🚀 Features

### 📱 Core Functionality

* Browse Star Wars characters (SWAPI)
* View detailed character information
* Navigate between list and detail screens

### 🔍 Search

* Real-time search with **debouncing**
* Optimized filtering to reduce unnecessary renders

### 📜 Pagination

* Infinite scrolling using SWAPI pagination
* Efficient data appending

### 🔄 Pull to Refresh

* Refresh character list with updated data
* Separate loading vs refreshing states

### 🖼️ Images

* Character images via **Star Wars Visual Guide API**
* Dynamic mapping using SWAPI IDs

### 🎬 Enriched Data

* Homeworld name resolution
* Film titles fetched dynamically using `Promise.all`

---

## 🧱 Tech Stack

* **React Native (Expo)**
* **TypeScript**
* **Redux Toolkit** (state management)
* **React Navigation**
* **SWAPI (Star Wars API)**
* **AKABAB (Character Images)**

---

## 📂 Project Structure

```
src/
 ├── services/      # API calls (SWAPI & AKABAB)
 ├── screens/       # Screens (List & Detail)
 ├── navigation/    # Navigation setup
 ├── store/         # Redux Toolkit slices
 ├── types/         # TypeScript types
 ├── utils/         # Custom hooks & helpers
```

---

## ⚙️ Installation & Setup

```bash
# Install dependencies
npm install

# Start app
npx expo start
```

---

## 🧠 Key Technical Decisions

### 1. State Management

Used **Redux Toolkit** for:

* Centralized state
* Predictable updates
* Async handling with `createAsyncThunk`

---

### 2. Pagination Strategy

* Leveraged SWAPI's `next` field
* Stored `page` and `hasMore` in Redux
* Appended results for infinite scroll

---

### 3. Debounced Search

* Implemented custom `useDebounce` hook
* Prevents excessive filtering and re-renders

---

### 4. Data Enrichment

* Resolved `homeworld` from URL
* Fetched film data in parallel using `Promise.all`

---

### 5. Image Handling

* Extracted character ID from SWAPI URL
* Mapped to external image API (Akabab) using `Promise.all` with updated character results

---

## ⚡ Performance Considerations

* Debounced search input
* Avoided unnecessary API calls
* Optimized FlatList rendering
* Controlled pagination triggers

## 🙌 Acknowledgements

* [Star Wars Visual Guide API](https://swapi.dev/)
* [AKABAB](https://akabab.github.io/starwars-api/)

---

## 📌 Author

Built as part of a technical interview project to demonstrate React Native expertise.
