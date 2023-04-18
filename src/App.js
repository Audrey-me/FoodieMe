import React, { useState } from "react";
import "./App.css";
import { IoBody } from "react-icons/io5";
import MenuList from "./MenuList";
import Loader from "./Loader";

const App = () => {
  const [mealData, setMealData] = useState("");
  const [calorie, setCalorie] = useState("");
  const [diet, setDiet] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const Calorie = (e) => {
    setCalorie(e.target.value);
  };
  
  const dietPlan = (e) => {
    setDiet(e.target.value);
  };

  const getMeal = () => {
    setLoading(true)
    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=a5ded80956ef4b0cb92a96f7917b0fea&timeFrame=day&targetCalories=${calorie}&diet=${diet}`)
      .then((response) => response.json())
      .then((meals) => {
        setLoading(false)
        setMealData(meals);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        setError("OOPS WE HAVE EXHAUSTED OUR DAILY REQUEST LIMIT,TRY AGAIN TOMMORROW...")
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
      {loading && <Loader/>}
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
