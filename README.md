# Flyers Friday - Mobile App Developer Assessment

This is the repository for the **Mobile App Developer (Intern) Assessment** for **Flyers Friday**. Built using **React Native Expo** with **Expo Router** (file-based routing) and styled with **Tailwind CSS (NativeWind)**.

---

## 🚀 Technical Stack

- **Framework**: [Expo SDK 56](https://expo.dev/) (React Native v0.85.3, React v19.2)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-Based Universal Routing)
- **Styling**: [NativeWind v2](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
- **Image Uploads**: [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Directory Structure

```
Flyers_Friday/
├── assets/                   # Media assets and custom native tab icons
├── src/
│   ├── app/                  # File-based routing views
│   │   ├── _layout.tsx       # Root layout, Stack Navigator & FlyersProvider
│   │   ├── (tabs)/           # Bottom tabs group navigator
│   │   │   ├── _layout.tsx   # Universal tabs routing layout
│   │   │   ├── index.tsx     # 1️⃣ Local Flyers Feed Screen (Home)
│   │   │   ├── map.tsx       # Mock Map Screen (High-fidelity pins & navigation)
│   │   │   ├── deals.tsx     # Mock Deals Screen (Stylized coupon codes)
│   │   │   └── profile.tsx   # Mock Profile Screen (User stats & context counts)
│   │   ├── flyer/
│   │   │   └── [id].tsx      # 2️⃣ Flyer Details Screen (Dynamic stack route)
│   │   └── create-posting.tsx# 3️⃣ Create New Posting Screen (Interactive form)
│   ├── components/           # Reusable UI & Layout components
│   │   ├── ui/
│   │   │   ├── Button.tsx    # Custom styled Buttons (FAB, Outline, Primary)
│   │   │   ├── Card.tsx      # Flyer card component with save/share states
│   │   │   ├── InputField.tsx# Controlled Form Inputs
│   │   │   └── SelectField.tsx# Segmented control pills for selectors
│   │   ├── CategoryTabs.tsx  # Horizontal sliding filters
│   │   ├── SearchBar.tsx     # Local list search inputs
│   │   └── app-tabs.tsx      # Universal tabs definitions (Native & Web)
│   ├── constants/
│   │   ├── mockData.ts       # Database schemas & rich Mock Flyers datasets
│   │   └── theme.ts          # Core styling variables
│   ├── context/
│   │   └── FlyersContext.tsx # Global State manager (Save, Follow, Publish)
│   └── global.css            # Typography setup
├── tailwind.config.js        # Tailwind compiler configurations
├── babel.config.js           # Babel plugins (NativeWind compiler integration)
└── nativewind-env.d.ts       # TypeScript helper declaration
```

---

## 🎯 Screen Features Completed

### 1️⃣ Local Flyers Feed Screen (Home)
- **Header**: Styled "Flyers Friday" brand header.
- **Search Bar**: Real-time searching that filters flyers by title or store name dynamically.
- **Category Tabs**: Horizontal scrollable categories filter (All, Grocery, Fashion, Electronics) to isolate listings.
- **Flyer Cards**: Visual rendering containing dynamic distance tags, brand logo badges, share actions, and save toggles.
- **Floating Action Button (FAB)**: Smoothly routes users directly to the creation flow.

### 2️⃣ Flyer Details Screen
- **Dynamic Routing**: Click a card on the feed to transition into a detailed view for that flyer.
- **Follow Interaction**: Dedicated follow button for brands that synchronizes state with feed.
- **Action Footers**:
  - **Share**: Launches native device share dialog populated with card metadata.
  - **Save**: Heart toggle that instantly saves the flyer to local state.
  - **Get Directions**: Integrates React Native `Linking` API to open target store coordinates automatically in Apple Maps, Google Maps, or web search.

### 3️⃣ Create New Posting Screen
- **Image Picker**: Implemented native `expo-image-picker` to select mock flyers directly from device photo library, with a fallback placeholder.
- **Dynamic Form**: Title, Description, Store, Validity, Location Address, and Category fields.
- **Posting Frequency**: Customized segmented select tabs (Daily / Weekly / Monthly).
- **Target Region Map Preview**: A visual stylized mapping layout representing the region location pin.
- **Preview & Post**:
  - **Preview**: Clicking "Preview" opens an overlay displaying exactly how the flyer card will look on the live feed.
  - **Post**: Instantly adds the custom flyer to the top of the local state, resets inputs, and navigates back to the feed.

### ⭐ Bonus & State Management
- **Local Context**: Integrated `FlyersContext` to share reactive states globally. Creating a new posting makes it immediately visible on the Feed. Following a store and saving a flyer changes badge indicators instantly and updates count metrics on the Profile tab!
- **Universal Compilation**: Formatted to compile on Web, iOS, and Android seamlessly.
- **Premium Aesthetics**: Set up dark mode style configurations, clean grid cards, card ticket indentations, and elegant color systems.

---

## 🛠️ How to Run the App

1. **Clone the repository** (if downloaded, navigate to the folder):
   ```bash
   cd Flyers_Friday
   ```

2. **Install node dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Expo server**:
   ```bash
   npx expo start
   ```

4. **Testing Environments**:
   - **Web Browser**: Press `w` in terminal to launch the web client.
   - **Android Emulator / iOS Simulator**: Press `a` or `i` respectively.
   - **Physical Device**: Download the **Expo Go** app from App Store / Google Play and scan the QR code displayed in your terminal.
