import { useState, useEffect } from "react";
import { fetchMeals, deleteMeal } from "./api";
import AddMeal from "./components/AddMeal";
import MealsList from "./components/MealsList";

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals().then(setMeals);
  }, []);

  function handleAdd(meal) {
    setMeals([...meals, meal]);
  }

  async function handleDelete(id) {
    await deleteMeal(id);
    setMeals(meals.filter((m) => m.id !== id));
  }

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 30,
        borderRadius: 15,
        width: "90%",
        maxWidth: 600,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: 10, color: "#333" }}>NutriTrack</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>Your Healthy Meal Advisor</p>
      <AddMeal onAdd={handleAdd} />
      <MealsList meals={meals} onDelete={handleDelete} />
    </div>
  );
}

export default App;
