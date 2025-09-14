# 🎉 Asha AI 2.0: Empowering Health for All 🌟

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![React Native](https://img.shields.io/badge/React_Native-0.74.1-orange.svg)](https://reactnative.dev/)  
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)  
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)  

Welcome to **Asha AI 2.0**, a revolutionary ecosystem designed to combat the silent health crisis in regions like Madhya Pradesh. This project bridges the gap between overburdened frontline health workers and data-driven public health interventions with cutting-edge technology.

---

## 🎯 About The Project

In regions like Madhya Pradesh, a multi-faceted health crisis—encompassing **anemia**, **malnutrition**, and **maternal complications**—persists due to inaccessible diagnostics and a lack of real-time data for administrators. **Asha AI 2.0** is our bold solution, featuring:

- **React Native Mobile App**: Transforms smartphones into offline-first, AI-powered diagnostic tools for ASHA and Anganwadi workers.
- **React Web Dashboard**: Offers public health officials a live "Health Map" for targeted, data-driven decisions.

🌍 **Mission**: Empower communities with technology to save lives and improve health outcomes.

---

## ✨ Key Features

### 📱 For ASHA Workers (Mobile App)
- **Offline-First AI Diagnostics**: Screen for **Anemia**, **Jaundice**, and **Vitals** without internet.
- **On-Device Data Storage**: Securely manage citizen profiles and health histories locally.
- **AI Nutritionist**: Generate culturally relevant, budget-friendly weekly meal plans.
- **Health Center Locator**: Navigate to nearby PHCs and CHCs with GPS.
- **Smart Data Sync**: Anonymously sync aggregated data when online.

### 💻 For Health Officials (Web Dashboard)
- **Live Health Heatmap**: Visualize real-time risk levels across wards.
- **Data-Driven Analytics**: Explore trends with interactive charts and demographics.
- **AI-Powered Suggestions**: Identify optimal locations for health camps.
- **Campaign Planner**: Design effective, data-backed public health campaigns.
- **Secure & Role-Based Access**: Tailored login for different official levels.

---

## 🛠️ Tech Stack

| Category         | Technologies                          |
|------------------|---------------------------------------|
| **Backend API**  | Flask, SQLite, REST API               |
| **Web Dashboard**| React, Vite, Tailwind CSS             |
| **Mobile App**   | React Native, TensorFlow Lite, SQLite |
| **AI / ML**      | TensorFlow Lite, Custom Models        |

---

## 🏗️ System Architecture

Our "AI on the Edge" architecture ensures functionality in low-connectivity areas while prioritizing data privacy.  

![Architecture Diagram](documentation/AshaAI%202.0%20arch%20diagram.svg)

---

## 🚀 Getting Started

Ready to dive in? Follow these steps to set up the project locally. ✨

### Prerequisites
- **Node.js** (v18 or later) [Download](https://nodejs.org/)
- **Python** (v3.9 or later) [Download](https://www.python.org/)
- **An IDE** (e.g., VS Code) [Download](https://code.visualstudio.com/)
- **Git** [Download](https://git-scm.com/)

### 1. Backend API (backend-api)
```bash
# 1. Navigate to the backend directory
cd backend-api

# 2. Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Initialize and seed the database (one-time setup)
# On Windows:
set FLASK_APP=run.py
# On macOS/Linux:
# export FLASK_APP=run.py
flask create_db
flask seed_db

# 5. Run the server
flask run --host=0.0.0.0
```
✅ **Backend running at http://localhost:5000**

### 2. Web Dashboard (dashboard-web)
```bash
# 1. Open a new terminal and navigate to the dashboard directory
cd dashboard-web

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```
✅ **Web dashboard live at http://localhost:5173 (or similar)**

### 3. Mobile App (mobile-app)
```bash
# 1. Open a third terminal and navigate to the mobile app directory
cd mobile-app

# 2. Install dependencies
npm install

# 3. Start the Metro bundler
npx react-native start

# 4. In a new terminal, run on your emulator/device
# For Android:
npx react-native run-android
# For iOS:
# npx react-native run-ios
```
✅ **Mobile app running on emulator/device**

---

## Group Members

<table style="width: 100%; border-collapse: collapse; text-align:center;">
        <tr>
            <th><a href="https://github.com/Peeyush2473">Peeyush Chauhan</a></th>
            <th><a href="https://github.com/AnuragWaskle">Anurag Waskle</a></th>
            <th><a href="https://github.com/AjitPatil">Ajit Patil</a></th>
            <th><a href="https://github.com/KanakGarg">Kanak Garg</a></th>
            <th><a href="https://github.com/Soham16Malvankar">Soham Malvankar</a></th>
        </tr>
        <tr>
            <td><img src="https://avatars.githubusercontent.com/Peeyush2473" alt="Peeyush Chauhan"></td>
            <td><img src="https://avatars.githubusercontent.com/AnuragWaskle" alt="Anurag Waskle"></td>
            <td><img src="https://avatars.githubusercontent.com/AjitPatil" alt="Ajit Patil"></td>
            <td><img src="https://avatars.githubusercontent.com/KanakGarg" alt="Kanak Garg"></td>
            <td><img src="https://avatars.githubusercontent.com/Soham16Malvankar" alt="Soham Malvankar"></td>
        </tr>
</table>

## License

MIT © Project NETRA contributors