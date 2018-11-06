export interface RecipeDetails {
  recipe: Recipe
}

export interface Recipe {
  f2f_url: string,
  image_url: string,
  ingredients: [string],
  publisher: string,
  publisher_url: string,
  recipe_id: string,
  social_rank: number,
  source_url: string,
  title: string,
  id?: string
}
