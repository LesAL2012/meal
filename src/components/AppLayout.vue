<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue';
import { ROUTES_PATH } from '../constants/index';

const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    backFunk: {
        type: Function,        
    },
    isBackButtonVisible: {
        type: Boolean,
        default: true
    }
});

const route = useRoute();
const router = useRouter();
const routeName = computed(() => route.name);

function goForMealRandom() {
    router.push(ROUTES_PATH.MEAL_RANDOM);

    if (routeName.value === ROUTES_PATH.MEAL_RANDOM) {        
        router.go();
    }
};

function goBack(){
    props.backFunk ? props.backFunk() : router.go(-1);
};

</script>

<template>
    <div class="root">
        <!-- <div :style="`background-image: url(${imgUrl})`" class="img"> -->
        <div  class="img">        
            <img :src="imgUrl" alt="meal" class="img-2">        
        </div>
        <div class="main">
            <div class="btns">
                <el-button v-if="isBackButtonVisible" class="back" type="primary" :icon="Back" circle @click="goBack" />
                <el-button class="btn" @click="goForMealRandom">Get random meal</el-button>
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.root
    display: flex
    min-height: 100vh
    background-color: $background    

.img
    width: 30%
    max-height: 100vh
    background-repeat: no-repeat
    background-position: 50% 50%    
    background-size: 95% 

.img-2
    width: 30%
    position: fixed
    padding: 20px    
    border-radius: 50px 

.main
    position: relative
    width: 70%
    padding: 32px 40px

.btn
    position: absolute
    top: 10px
    right: 10px
    font-size: 16px
    font-family: 'Raleway', 'Arial', sans-serif
    background-color: $accent
    border: 2px solid darkorange
    color: $text

    &:hover,
    &:active
        background-color: darken($accent, 10%)
        border-color: darken($accent, 10%)

.btns
    display: flex
    justify-content: space-between
    align-items: center    

.back
    /* background-color: transparent */
    background-color: $accent
    border: 2px solid darkorange
    position: absolute
    top: 10px
    left: 10px    

    &:hover
        background-color: darken($accent, 10%)
        border-color: darken($accent, 10%)
    


</style>