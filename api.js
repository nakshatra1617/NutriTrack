const BASE = "http://127.0.0.1:8000"; // backend URL

export async function fetchMeals() {
  try {
    const res = await fetch(`${BASE}/meals/`);
    if (!res.ok) throw new Error("Failed to fetch meals");
    return res.json();
  } catch (err) {
    console.error("fetchMeals error:", err);
    return [];
  }
}

export async function createMeal(meal) {
  try {
    const res = await fetch(`${BASE}/meals/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error("Failed to create meal");
    return res.json();
  } catch (err) {
    console.error("createMeal error:", err);
    return { status: "Error ❌" };
  }
}

export async function deleteMeal(id) {
  try {
    const res = await fetch(`${BASE}/meals/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete meal");
    return res.json();
  } catch (err) {
    console.error("deleteMeal error:", err);
    return { message: "Error ❌" };
  }
}
