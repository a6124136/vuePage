<script setup>
import talkZone from './components/talkZone.vue'
import navBar from './components/navBar.vue'
import { userStateStore } from './store/userState'
import { onMounted } from 'vue';
const userStore = userStateStore();
onMounted(() => {
  userStore.checkUserLogin();
  console.log(userStore.userLogInState)
  //檢查用戶登入狀態
  setInterval(() => {
    userStore.checkUserLogin();
  }, 2000);
  //每2秒檢查一次用戶狀態
})

</script>


<template>
  <header>
    <div class="wrapper">
      <navBar  />
      <talkZone />
    </div>
  </header>
  <main>
  </main>

</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
}

#line {
  position: absolute;
  right:0;
  top:0;
}

@media (min-width: 1024px) {
  header {
    .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    }
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
