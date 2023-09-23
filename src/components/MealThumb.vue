<script setup>

const props = defineProps({
    meal: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="root">
        <RouterLink :to="`/${meal.idMeal}`">
            <div :style="`background-image: url(${meal.strMealThumb})`" class="pic"></div>
            <div class="name">{{ meal.strMeal }}</div>
        </RouterLink>
    </div>
</template>


<style lang="sass" scoped>
@import '../assets/styles/main'

.root
    width: calc( (100% - 100px)/5 )    
    margin-right: 25px
    padding-bottom: 20px    

    &:nth-child(5n + 5)
        margin-right: 0

.pic
    width: 120px
    height: 120px
    margin: 0 auto
    background-repeat: no-repeat
    background-position: 50% 50%
    background-size: 100%
    border-radius: 10px
        
.name
    width: 100%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    padding-top: 15px
    letter-spacing: 0.1em


</style>