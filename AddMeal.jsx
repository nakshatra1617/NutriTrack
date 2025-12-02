import { useState } from "react";
import { createMeal } from "../api";

export default function AddMeal({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    calories: "",
    carbs: "",
    fat: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const mealData = {
      ...form,
      calories: Number(form.calories),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
    };

    const savedMeal = await createMeal(mealData);
    setStatus(savedMeal.status || "Error ❌");
    if (savedMeal.id) onAdd(savedMeal);

    // Reset form values
    setForm({ ...form, name: "", calories: "", carbs: "", fat: "" });
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}
      >
        <input name="name" placeholder="Meal Name" value={form.name} onChange={handleChange} required />
        <input name="calories" type="number" placeholder="Calories" value={form.calories} onChange={handleChange} required />
        <input name="carbs" type="number" placeholder="Carbs (g)" value={form.carbs} onChange={handleChange} required />
        <input name="fat" type="number" placeholder="Fat (g)" value={form.fat} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <button
          type="submit"
          style={{ backgroundColor: "#4CAF50", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Check & Add Meal
        </button>
      </form>
      {status && (
        <p style={{ fontWeight: "bold", color: status.includes("Healthy") ? "green" : "red" }}>
          Status: {status}
        </p>
      )}
    </div>
  );
}
