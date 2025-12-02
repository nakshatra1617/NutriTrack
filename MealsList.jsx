export default function MealsList({ meals, onDelete }) {
  return (
    <div>
      <h2>Meal History</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {meals.map((meal) => (
          <li
            key={meal.id}
            style={{
              marginBottom: 15,
              padding: 15,
              borderRadius: 10,
              backgroundColor: meal.status.includes("Healthy") ? "#e0ffe0" : "#ffe0e0",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <strong>{meal.name}</strong>
              <div>
                Calories: {meal.calories} | Carbs: {meal.carbs} | Fat: {meal.fat} | Date: {meal.date}
              </div>
              <span style={{ fontWeight: "bold", color: meal.status.includes("Healthy") ? "green" : "red" }}>
                {meal.status}
              </span>
            </div>
            <button
              style={{
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={() => onDelete(meal.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
