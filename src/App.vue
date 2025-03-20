<script setup>
import talkZone from './components/talkZone.vue'
import navBar from './components/navBar.vue'





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
