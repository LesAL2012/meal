<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { MEALS_BY_ID_URL, INGREDIENTS_PICTURE } from '@/constants';
import AppLayout from '../components/AppLayout.vue';

const route = useRoute();

const meal = ref(null);
const mealId = computed(() => route.path.split('/').pop());

const ingredient = computed(() => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        if (!meal.value[`strIngredient${i}`]) break;

        const ingredient = {};
        ingredient.name = meal.value[`strIngredient${i}`];
        ingredient.measure = meal.value[`strMeasure${i}`];


        ingredients.push(ingredient);
    };

    return ingredients;
});

async function getMeal() {

    console.log(mealId.value);

    const data = await axios.get(`${MEALS_BY_ID_URL}${mealId.value}`);
    meal.value = data?.data?.meals[0];
};

getMeal();

</script>

<template>
    <div v-if="meal" class="wrap">
        <AppLayout :imgUrl="meal.strMealThumb">
            <div class="wrapper">
                <div class="info">
                    <div class="title">{{ meal.strMeal }}</div>
                    <div class="line"></div>
                    <div class="additional">{{ meal.strCategory }} - {{ meal.strArea }}</div>
                    <div class="line"></div>
                    <div class="list">
                        <div class="list-column">
                            <div 
                            v-for="(item, key) in ingredient" 
                            :key="key" 
                            class="list-item"
                            :class="{'d-none': key % 2 != 0}"
                            >                                
                                {{ item.name }}
                                <template v-if="item.measure">
                                    <span class="vertical-slash">|</span>
                                    <span class="name-measure">{{ item.measure }}</span>
                                    <span class="vertical-slash">|</span>
                                    <img :src="`${INGREDIENTS_PICTURE}${item.name.replaceAll(' ', '%20')}-Small.png`"
                                                :alt="`meal-${item.name}`" class="ing-img">
                                </template>                                
                            </div>
                        </div>
                        <div class="list-column">
                            <div 
                            v-for="(item, key) in ingredient" 
                            :key="key" 
                            class="list-item"
                            :class="{'d-none': key % 2 == 0}"
                            >                                
                                {{ item.name }}
                                <template v-if="item.measure">
                                    <span class="vertical-slash">|</span>
                                    <span class="name-measure">{{ item.measure }}</span>
                                    <span class="vertical-slash">|</span>
                                    <img :src="`${INGREDIENTS_PICTURE}${item.name.replaceAll(' ', '%20')}-Small.png`"
                                                :alt="`meal-${item.name}`" class="ing-img">
                                </template>                                
                            </div>
                        </div>
                    </div>
                    <div class="instructions" v-html="meal.strInstructions.replaceAll('\r\n', '<br>')"></div>
                </div>
            </div>
        </AppLayout>
    </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.vertical-slash
    color: $accent 
    font-weight: 900   

.ing-img
    max-height: 50px
    margin: 0 0 -20px 10px

.list-column    
    width: 50%
    display: inline-block    

</style>