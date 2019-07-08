<template functional>
    <picture :class="imgClass">
        <!-- 使用getBoundingClientRect进行懒加载 -->
        <source :srcset="data.src" type="image/webp">
        <source :srcset="data.src" type="image/png">
        <slot />
        <img :class="data.imgClass" :src="data.src" :alt="data.alt">
    </picture>
</template>