<script setup>
import { computed } from 'vue';
import AppLayout from '../components/AppLayout.vue';
import MealThumb from '../components/MealThumb.vue';
import { useRootStore } from '@/stores/root';
import { storeToRefs } from 'pinia';
import { INGREDIENTS_PICTURE, CAREGORIES_PICTURE } from '../constants/api';

const rootStore = useRootStore();
rootStore.getIngredients();
rootStore.getCategories();
rootStore.getAreas();

const { ingredients, ingredient, ingredientDescription, meals, categories, areas, indicator} = storeToRefs(rootStore);

function getMealsByIngredient() {
    rootStore.setIndicator('ingredient');
    rootStore.getMeals(rootStore.ingredient);
};
function getMealsByCategory() {
    rootStore.setIndicator('category');
    rootStore.getMealsCategory(rootStore.ingredient);
};
function getMealsByArea() {
    rootStore.setIndicator(null);
    rootStore.getMealsArea(rootStore.ingredient);
};

function removeIngredient() {
    rootStore.getIngredient(null);
};

let imgUrl = computed(() => {
    if (ingredient.value == null || indicator.value == null) {
        return '/img/bg-1.png';
    }
    else if (indicator.value == 'category'){        
        return `${CAREGORIES_PICTURE}${ingredient.value.replaceAll(' ', '%20')}.png`;
    }
    else if (indicator.value == 'ingredient'){ 
        return `${INGREDIENTS_PICTURE}${ingredient.value.replaceAll(' ', '%20')}.png`;
    }
});

</script>

<template>
    <AppLayout :imgUrl="imgUrl" :backFunk="removeIngredient" :isBackButtonVisible="!!ingredient">

        <div class="wrapper">
            <div v-if="!ingredient || !meals" class="info">
            
                <div class="title">Choose your meal</div>
                <div class="line"></div>

                <div style="display:flex; justify-content:space-between;">

                    <div class="select-wrapper">
                        <el-select v-model="rootStore.ingredient" placeholder="Choose main ingredient" size="large"
                            filterable allow-create class="select" @change="getMealsByIngredient">
                            <el-option v-for="item in ingredients" :key="item.strIngredient" :label="item.strIngredient"
                                :value="item.strIngredient" />
                        </el-select>
                    </div>

                    <div class="select-wrapper">
                        <el-select v-model="rootStore.ingredient" placeholder="Choose catecory" size="large"
                            filterable allow-create class="select" @change="getMealsByCategory">
                            <el-option v-for="item in categories" :key="item.strCategory" :label="item.strCategory"
                                :value="item.strCategory" />
                        </el-select>
                    </div>

                    <div class="select-wrapper">
                        <el-select v-model="rootStore.ingredient" placeholder="Choose area" size="large"
                            filterable allow-create class="select" @change="getMealsByArea">
                            <el-option v-for="item in areas" :key="item.strArea" :label="item.strArea"
                                :value="item.strArea" />
                        </el-select>
                    </div>

                </div>


                <div class="text">
                    Try our delicious meal recipes for every occasion.<br>Find delicious meal recipes by ingredient through
                    our meal generator.
                </div>
                <img src="/img/meals.png" alt="meals" class="img">
            </div>
            <div v-else class="info">
                <div class="title">MEALS WITH {{ ingredient }}</div>
                <div class="line"></div>
                <div class="meals">
                    <MealThumb v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
                </div>
            </div>
        </div>
        <div v-if="ingredientDescription"  class="descriptionIngredient" v-html="ingredientDescription.replaceAll('\r\n', '<br>')"></div>
    </AppLayout>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'


.select-wrapper
    padding-top: 50px  
    margin: 0 20px 
         

.select
    width: 220px    

.text
    max-width: 640px
    margin: 0 auto
    padding-top: 50px
    line-height: 36px
    letter-spacing: 0.1em
    color: $textMuted

.img
    margin-top: 60px

.meals
    display: flex    
    align-items: center
    flex-wrap: wrap
    max-height: 355px
    min-width: 720px
    overflow: auto
    margin-top: 40px 
    padding: 10px 10px 0 10px 
    background-color: darken($accent, 1%)
    border-radius: 10px

.descriptionIngredient    
    margin: 0 auto
    padding: 10px
    line-height: 36px
    letter-spacing: 0.1em
    color: $textMuted
    font-size: 1.2em 
    background-color: darken($accent, 4%)
    border-radius: 10px  



</style>