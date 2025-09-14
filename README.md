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
*(Note: Upload the architecture diagram image to your GitHub repo and update the link below.)*  
![Architecture Diagram](path/to/architecture-diagram.png)

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

## 👥 Team Members

| Name            | Role             | GitHub ID          |
|-----------------|------------------|--------------------|
| Anurag Sharma   | Project Lead     | @anurag-sharma-dev |
| Priya Patel     | Backend Developer| @priya-patel-code  |
| Rahul Verma     | Mobile Developer | @rahul-verma-tech  |
| Sneha Gupta     | UI/UX Designer   | @sneha-gupta-ui    |

*(Add your team members' names and GitHub IDs here!)*

---

## 📝 Contributing

We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request. Follow our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it!

---

## 🌟 Support

Have questions or need help? Open an issue on our [GitHub Issues](https://github.com/your-repo/asha-ai-2.0/issues) page or join our community on [Discord](https://discord.gg/your-invite-link).

---

### 🎨 Made with ❤️ by the Asha AI Team
```

### Enhancements and Notes
1. **Attractive Design**:
   - Used emojis (🎉, 🌟, 📱, 💻, etc.) for a vibrant look.
   - Added badges for tech stacks and license to make it professional yet eye-catching.
   - Structured with clear sections using headers and horizontal rules (`---`).

2. **Content Integration**:
   - Incorporated all provided content (About, Features, Tech Stack, Architecture, Getting Started).
   - Added placeholders for the architecture diagram and team members (customize with real data).

3. **Team Members**:
   - Included a table with sample names and GitHub IDs. Replace `@anurag-sharma-dev`, etc., with your actual team members' GitHub handles.
   - Add or remove rows as needed.

4. **Customization**:
   - Update the architecture diagram path (e.g., `path/to/architecture-diagram.png`) with the actual file location after uploading to your repo.
   - Replace GitHub/Discord links with your project's URLs.
   - Create a `LICENSE` file and `CONTRIBUTING.md` if not already present.

5. **Next Steps**:
   - Save this as `README.md` in `D:\asha-ai-project\mobile-app`.
   - Commit and push to your GitHub repo:
     ```
     git add README.md
     git commit -m "Add beautiful README file"
     git push origin main
     ```
   - View it on GitHub to ensure it renders correctly.

Let me know if you'd like to tweak the design or add more sections! (Current time: 04:50 PM IST, September 14, 2025.)