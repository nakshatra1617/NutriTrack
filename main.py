from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# FastAPI instance
app = FastAPI(title="NutriTrack Backend")

# CORS settings
origins = [
    "http://localhost:5174",  # Vite
    "http://localhost:3000"   # CRA
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Meal model
class Meal(BaseModel):
    name: str
    calories: float
    carbs: float
    fat: float
    date: str

# In-memory storage
meals: List[dict] = []
id_counter = 1

# Health check function
def check_meal_health(meal: dict) -> str:
    if meal["calories"] > 500 or meal["carbs"] > 60 or meal["fat"] > 20:
        return "Not Recommended ❌"
    return "Healthy ✅"

# GET all meals
@app.get("/meals/", response_model=List[dict])
def get_meals():
    return meals

# POST add meal
@app.post("/meals/", response_model=dict)
def add_meal(meal: Meal):
    global id_counter
    meal_dict = meal.dict()
    meal_dict["id"] = id_counter
    id_counter += 1
    # Add health status
    meal_dict["status"] = check_meal_health(meal_dict)
    meals.append(meal_dict)
    return meal_dict

# DELETE meal by ID
@app.delete("/meals/{meal_id}")
def delete_meal(meal_id: int):
    global meals
    meals = [m for m in meals if m["id"] != meal_id]
    return {"message": "Meal deleted successfully"}

@app.get("/")
def root():
    return {
        "message": "✅ Welcome to NutriTrack - Healthy Meal Advisor Backend!",
        "endpoints": {
            "GET /meals/": "Fetch all meals",
            "POST /meals/": "Add a new meal",
            "DELETE /meals/{meal_id}": "Delete a meal by ID"
        }
    }

