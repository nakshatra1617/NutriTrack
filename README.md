# NutriTrack 
NutriTrack is a full-stack web app that lets users track meals, calories, carbs, and fat. It evaluates each meal as Healthy ✅ or Not Recommended ❌, displays meal history, and helps users maintain a balanced diet. Built with React.js frontend and FastAPI backend.


NutriTrack is a **Fitness & Meal Tracker** web app built with:

- **Frontend:** React.js (Vite)  
- **Backend:** FastAPI  
- **Features:** Add meals, check if healthy, track meal history, color-coded status

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

