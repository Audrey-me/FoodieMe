import React from "react";
import Menu from "./Menu";
const MenuList = ({ mealData }) => {
  const nutrients = mealData.nutrients;
  return (
    <div>
      <ul className="nutrient-fact">
        <li>Total Calorie <span style={{fontSize:25}}>:</span> {nutrients.calories.toFixed(0)}g</li>
        <li>Carbohydrates <span style={{fontSize:25}}>:</span>  {nutrients.carbohydrates.toFixed(0)}g</li>
        <li>Fat <span style={{fontSize:25}}>:</span>  {nutrients.fat.toFixed(0)}g</li>
        <li>Protein <span style={{fontSize:25}}>:</span>  {nutrients.protein.toFixed(0)}g</li>
      </ul>

      <div>
        {mealData.meals?.map((meal) => {
          return <Menu key={meal.id} meal={meal} />;
        })}
      </div>
    </div>
  );
};

export default MenuList;
