<template>
    <header>
        <div v-for="e in navBarEle">
            <section>
                <h2>
                    {{ e.zoneName }}
                </h2>
            </section>
            <section>
                <p>
                    {{ e.describe }}
                </p>
            </section>
        </div>
    </header>
</template>
<script setup>
import { onMounted, onUnmounted} from 'vue';
import { myPiniaStore } from '../store/myPiniaStore.js'

const piniaSize = myPiniaStore();//執行piniaStore
const {navBarEle} = piniaSize

// 直接呼叫同名屬性或函數
const setWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

  // 設置 CSS 變數
    document.documentElement.style.setProperty('--window_width', `${width}px`);
    document.documentElement.style.setProperty('--window_height', `${height}px`);
    //已經作為css變數
    
};

onMounted(()=>{
    setWindowSize()
    window.addEventListener('resize', setWindowSize);
    //調整navBar尺寸一致
})

onUnmounted(() => {
    window.removeEventListener('resize', setWindowSize);
});
</script>


<style scoped lang="scss">
/* 區域CSS */


header{
    background-color: red;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    top:0;
    bottom: 0;
    box-sizing: border-box;
    width:calc(var(--window_width)/6);
    left: 0;

}


@media (min-width: 1024px) {
    *{
        transition: 1s;
    }
    header{
        perspective: 250px;
        background: linear-gradient(90deg,rgb(91, 0, 0)  40%,red 79%,transparent 14%);
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        position: absolute;
        top:0;
        bottom: 0;
        width:calc(var(--window_width)/4);
        left: 0;
        :hover{
                transform: translateX(50px) scale(1.3);
                filter: blur(0);
                //恢復清晰
                cursor: pointer;
            }
        div{
            margin: 20px;
            color: black;
            left: 30px;
            top:30px;
            transform-style: preserve-3d;
            transform: rotate3D(2,5,1,20deg) skewX(10deg);
            position: relative;
            background-color: #fff;
            border-left: black solid 20px;
            border-right: black solid 40px;
            border-top: black solid 25px;
            border-bottom: black solid 35px;
            filter: blur(1px);
            //字體模糊效果 懸停時恢復清晰
            min-width: 180px;
            height: calc(var(--window_height)/6);
            align-items: center;
            justify-content: center;
            clip-path: polygon(1% 10%, 86% 19%, 88% 35%, 100% 49%, 73% 86%, 0% 100%, 8% 33%);
            section:nth-child(odd){
                //section奇數黑底白字
                background-color: black;
                color: #fff;
            }
            :hover{
                transform: translate(0);
                //會繼承父元素的位移 把它取消掉
            }
        }
    }
}
</style>
