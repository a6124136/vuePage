<template>
    <div class="fullscreen-mask" >
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>


</script>

<style scoped>
.fullscreen-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); /* 半透明黑色 */
    z-index: 1; /* 確保在最上層 */
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px); /* 物化效果 */
}

.content {
    background: white; /* 蒙版內部內容的背景 */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>