<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { MEALS_RANDOM, INGREDIENTS_PICTURE } from '@/constants';
import AppLayout from '../components/AppLayout.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'

const meal = ref(null);

const ingredient = computed(() => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        if (!meal.value[`strIngredient${i}`]) break;

        const ingredient = {
            ingredient: meal.value[`strIngredient${i}`],
            measure: meal.value[`strMeasure${i}`]
        };

        ingredients.push(ingredient);
    };

    return ingredients;
});

async function getMeal() {
    const data = await axios.get(MEALS_RANDOM);
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
                    <div class="slider">
                        <swiper :slides-per-view="6" :space-between="50" class="swiper">
                            <swiper-slide v-for="(item, key) in ingredient" :key="key">
                                <img :src="`${INGREDIENTS_PICTURE}${item.ingredient.replaceAll(' ', '%20')}-Small.png`"
                                    :alt="`meal-${item.ingredient}`" style="max-width: 100px; max-height: 100px;">
                                <div class="name-ingredient">
                                    {{ item.ingredient }}
                                </div>
                                <div class="name-measure">
                                    {{ item.measure }}
                                </div>

                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
            <div class="instructions" v-html="meal.strInstructions.replaceAll('\r\n', '<br>')"></div>
        </AppLayout>
    </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.vertical-slash
    color: $accent

.slider
    padding: 10px 0

.swiper
    width: 980px
    padding: 10px
    background-color: darken($accent, 1%)
    border-radius: 10px
    

    &:hover
        background-color: darken($accent, 2%)
        overflow: auto

.name-ingredient
    padding-top: 20px
    

    
</style>