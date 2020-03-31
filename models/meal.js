class Meal {
    constructor(
      id,
      categoryIds,
      title,
      imageUrl,
      duration,
      ingredients,
      steps
    ) {
      this.id = id;
      this.categoryIds = categoryIds;
      this.title = title;
      this.imageUrl = imageUrl;
      this.ingredients = ingredients;
      this.steps = steps;
      this.duration = duration;
    }
  }
  
  export default Meal;