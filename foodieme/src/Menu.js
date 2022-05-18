import React, { useState, useEffect } from "react";

const Menu = ({ meal }) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=a5ded80956ef4b0cb92a96f7917b0fea&includeNutrition=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setImgUrl(data.image);
      })
      .catch((err) => {
        console.log("image not found", err);
      });
  }, [meal.id]);

  return (
    <div className="bg-white dib pa2 br3 ma2 bw2 shadow-5 grow tc design">
      <img alt="food recipe" src={imgUrl}></img>
      <div>
        <p style={{ fontWeight: "bold" }}>{meal.title}</p>
        <button className="meal-source">
          <a href={meal.sourceUrl}>More..</a>
        </button>
      </div>
    </div>
  );
};

export default Menu;
