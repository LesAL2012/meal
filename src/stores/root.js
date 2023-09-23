import { defineStore } from 'pinia'
import axios from 'axios'
import { INGREDIENTS_URL, CATEGORIES_URL, AREAS_URL, MEALS_BY_ING_URL, MEALS_BY_CAT_URL, MEALS_BY_AR_URL } from '../constants/index'

export const useRootStore = defineStore('root', {
  state: ()=>({
    ingredients: [],
    ingredient: null,
    ingredientDescription: null,
    meals: [],

    categories: [], 
    areas: [],
    
    indicator: null

  }),
  actions:{
    async getIngredients(){ 

      const data = await axios.get(INGREDIENTS_URL);
      this.ingredients = data?.data?.meals;  

      this.ingredients.sort( (a, b) => {
        if (a.strIngredient > b.strIngredient) {
          return 1;
        }
        if (a.strIngredient < b.strIngredient) {
          return -1;
        }        
        return 0;
      });
    },

    async getCategories(){     

      const data = await axios.get(CATEGORIES_URL);

      this.categories = data?.data?.meals;      

      this.categories.sort( (a, b) => {
        if (a.strCategory > b.strCategory) {
          return 1;
        }
        if (a.strCategory < b.strCategory) {
          return -1;
        }        
        return 0;
      });      
    },

    async getAreas(){ 

      const data = await axios.get(AREAS_URL);
      this.areas = data?.data?.meals;      

      this.areas.sort( (a, b) => {
        if (a.strArea > b.strArea) {
          return 1;
        }
        if (a.strArea < b.strArea) {
          return -1;
        }        
        return 0;
      });      
    },

    async getMeals(ingredient){      
      const data = await axios.get(`${MEALS_BY_ING_URL}${ingredient}`);
      this.meals = data?.data?.meals;

      this.ingredients.map(element=>{
        if(element.strIngredient == ingredient){
          this.ingredientDescription = element.strDescription;
        }
      });
    },
    async getMealsCategory(ingredient){      
      const data = await axios.get(`${MEALS_BY_CAT_URL}${ingredient}`);
      this.meals = data?.data?.meals;      
    },
    async getMealsArea(ingredient){      
      const data = await axios.get(`${MEALS_BY_AR_URL}${ingredient}`);
      this.meals = data?.data?.meals;      
    },

    getIngredient(val){     
      this.ingredient = val;
      
      if(val == null){
        this.ingredientDescription = null;
      }
    },

    setIndicator(data){
      this.indicator = data;
    }
  }
})
