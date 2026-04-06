# 💰 VaultX – Finance Management App (React Native)

VaultX is a **React Native CLI–based finance management mobile application** designed to help users manage transactions, track spending, and simulate digital payments with a modern and intuitive UI.

---

## 🚀 Features

- 🔐 **Firebase Authentication**
  - Email & Password Login / Register
  - Persistent user session

- 🏠 **Dashboard**
  - Balance overview
  - Quick action shortcuts
  - Recent transactions

- 💸 **Transactions**
  - View transaction history
  - Add new transactions
  - Managed using Redux Toolkit

- 💳 **Cards**
  - Card management UI (ready for future integrations)

- 👤 **Profile**
  - User profile screen
  - Extendable for account settings

- 🔄 **State Persistence**
  - Uses `redux-persist` + AsyncStorage
  - Data persists across app restarts

- 🎨 **UI & Animations**
  - Custom bottom tab navigation
  - Smooth animations with Reanimated
  - Light/Dark theme support

---

## 🛠️ Tech Stack

- React Native (CLI)
- TypeScript
- Redux Toolkit
- redux-persist + AsyncStorage
- Firebase Authentication
- React Navigation (Stack + Bottom Tabs)
- React Native Reanimated
- React Native Vector Icons

---

## 🔐 Authentication Flow

- App starts with Splash Screen  
- Firebase checks auth state  
- If authenticated → Navigate to Dashboard  
- If not → Show Login / Register  
- Session persists automatically  

---

## 📸 App Screenshots

### Splash Screen
<p float="left">
  <img src="screenshots/1.png" width="30%" />
</p>

### Authentication
<p float="left">
  <img src="screenshots/login.png" width="30%" />
  <img src="screenshots/register.png" width="30%" />
</p>

### Dashboard
<p float="left">
  <img src="screenshots/dashboard.png" width="30%" />
</p>

### Transactions
<p float="left">
  <img src="screenshots/transactions.png" width="30%" />
  <img src="screenshots/send-money.png" width="30%" />
</p>

### Payment & Receipt
<p float="left">
  <img src="screenshots/payment.png" width="30%" />
  <img src="screenshots/receipt.png" width="30%" />
</p>

---

## 🎥 Demo Video

[▶️ Watch Demo](https://your-demo-video-link.com)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- Android Studio
- React Native CLI

---

### Steps

```bash
# Clone the repository
git clone https://github.com/shiva9520/vaultX.git

# Navigate into project
cd vaultX

# Install dependencies
npm install

# Start Metro
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios
