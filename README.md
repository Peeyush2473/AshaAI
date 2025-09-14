<div align="center"><img src="https://www.google.com/search?q=https://placehold.co/150x150/0D47A1/FFFFFF%3Ftext%3DAshaAI" alt="Asha AI Logo" width="150"/><h1>Asha AI 2.0</h1><p><b>Swasthya Aapke Saath, Data Sarkar Ke Paas.</b></p><p>An AI-powered, offline-first health ecosystem empowering community health workers and enabling data-driven governance.</p><p><img src="https://www.google.com/search?q=https://img.shields.io/badge/status-in%2520development-orange" alt="Status"/><img src="https://www.google.com/search?q=https://img.shields.io/badge/license-MIT-blue" alt="License"/><img src="https://www.google.com/search?q=https://img.shields.io/github/stars/Peeyush2473/AshaAI%3Fstyle%3Dsocial" alt="GitHub Stars"/></p></div>🎯 About The ProjectIn regions like Madhya Pradesh, a silent, multi-faceted health crisis of anemia, malnutrition, and maternal complications persists. Frontline health workers are overburdened, diagnostic tests are inaccessible, and the administration lacks the real-time, hyperlocal data needed to intervene effectively.Asha AI 2.0 is our solution: a comprehensive ecosystem designed to bridge this gap. It consists of two core components:A React Native Mobile App that transforms a smartphone into an AI-powered, offline-first diagnostic lab for ASHA and Anganwadi workers.A React Web Dashboard that provides public health officials with a live "Health Map" of their administrative area, enabling targeted, data-driven interventions.✨ Key Features📱 For ASHA Workers (Mobile App)Offline-First AI Diagnostics: Conduct non-invasive screenings for Anemia, Jaundice, and Vitals without an internet connection.On-Device Data Storage: Securely manage citizen profiles and their complete health history locally on the device.AI Nutritionist: Generate culturally relevant and budget-friendly weekly meal plans.Health Center Locator: Instantly find and navigate to the nearest PHCs and CHCs using GPS.Smart Data Sync: Automatically syncs anonymous, aggregated data to the backend when an internet connection is available.💻 For Health Officials (Web Dashboard)Live Health Heatmap: Visualize real-time health risk levels across different administrative wards.Data-Driven Analytics: Track health trends over time with interactive charts and demographic breakdowns.AI-Powered Suggestions: Get recommendations on where to deploy mobile health camps and allocate resources.Campaign Planner: Design targeted and effective public health campaigns based on real data.Secure & Role-Based Access: A secure login system for different levels of officials.🛠️ Tech StackOur entire platform is built on a modern, scalable, and open-source stack.CategoryTechnologiesBackend APIWeb DashboardMobile AppAI / ML🏗️ System ArchitectureOur system is built on an "AI on the Edge" principle, ensuring functionality in low-connectivity areas and maintaining data privacy.(Note: You will need to upload the architecture diagram image to your GitHub repo and update this link.)🚀 Getting StartedFollow these steps to get the entire project up and running on your local machine.PrerequisitesNode.js (v18 or later)Python (v3.9 or later)An IDE (e.g., VS Code)Git1. Backend API (backend-api)# 1. Navigate to the backend directory
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
✅ Your backend is now running at http://localhost:50002. Web Dashboard (dashboard-web)# 1. Open a new terminal and navigate to the dashboard directory
cd dashboard-web

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
✅ Your web dashboard is now live at http://localhost:5173 (or similar).3. Mobile App (mobile-app)# 1. Open a third terminal and navigate to the mobile app directory
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
