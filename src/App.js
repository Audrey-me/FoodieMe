import React, { useState } from "react";
import "./App.css";
import { IoBody } from "react-icons/io5";
import MenuList from "./MenuList";

const App = () => {
  const [mealData, setMealData] = useState("");
  const [calorie, setCalorie] = useState("");
  const [diet, setDiet] = useState("");
  const [error, setError] = useState(null);

  const Calorie = (e) => {
    setCalorie(e.target.value);
  };
  const dietPlan = (e) => {
    setDiet(e.target.value);
  };
  const getMeal = () => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=a5ded80956ef4b0cb92a96f7917b0fea&timeFrame=day&targetCalories=${calorie}&diet=${diet}`
    )
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw Error(
            "OOPS WE HAVE EXHAUSTED OUR DAILY REQUEST LIMIT,TRY AGAIN TOMMORROW..."
          );
        }
        return response.json();
      })
      .then((meals) => {
        setMealData(meals);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="section-contanier">
      <h1 className="foodie-me">
        Foodie Me
        <IoBody className="icon-style" />
      </h1>
      <p style={{ textAlign: "center" }}>
        A meal planner based on calorie content and diet to help rock your
        fitness goal.
      </p>

      <div className="input-category">
        <input type="text" placeholder="Calories eg. 2000" onChange={Calorie} />
        <input
          type="text"
          placeholder="Vegan,Vegetarian...."
          onChange={dietPlan}
        />
      </div>
      <button onClick={getMeal} className="button-style">
        Get Plan
      </button>
      {mealData && <MenuList mealData={mealData} />}
      {/* displays the error message */}
      {error && (
        <div
          style={{
            fontSize: 20,
            color: "#fd746c",
            marginTop: "100px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
