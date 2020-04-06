export const menBMR = (weight, height, age) => {
    const calories = (
      88.362 +
      13.397 * weight +
      4.799 * height -
      5.677 * age
    ).toFixed();
    return calories;
  };
  
  export const womenBMR = (weight, height, age) => {
    const calories = (
      447.593 +
      9.247 * weight +
      3.098 * height -
      4.33 * age
    ).toFixed();
    return calories;
  };
  
  export const activityIndicator = (dailyCalories, activity) => {
    if (activity === "bmr") {
      return dailyCalories;
    }
    if (activity === "sedentary") {
      return (dailyCalories * 1.2).toFixed();
    }
    if (activity === "moderate") {
      return (dailyCalories * 1.375).toFixed();
    }
    if (activity === "mild") {
      return dailyCalories * (1.55).toFixed();
    }
    if (activity === "heavy") {
      return (dailyCalories * 1.725).toFixed();
    }
    if (activity === "extreme") {
      return (dailyCalories * 1.9).toFixed();
    }
  };

   export const activityFactors = {
    extreme: 1.9,
    heavy: 1.725,
    mild: 1.375,
    moderate: 1.55,
    sedentary: 1.2
  };